

import { useState, useEffect, useRef, useCallback } from "react";

const useSpeech = () => {
  const [isListening, setIsListening]     = useState(false);
  const [transcript, setTranscript]       = useState("");
  const [isSpeaking, setIsSpeaking]       = useState(false);
  const [isSupported, setIsSupported]     = useState(false);
  const [isDictating, setIsDictating]     = useState(false);
  const [error, setError]                 = useState(null);

  const recognitionRef      = useRef(null);
  const commandHandlerRef   = useRef(null);
  const dictationHandlerRef = useRef(null);
  const isDictatingRef      = useRef(false); // sync ref for onresult closure

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const supported = !!SpeechRecognition && !!window.speechSynthesis;
    setIsSupported(supported);

    if (!supported) return;

    const recognition = new SpeechRecognition();
    recognition.continuous     = false;
    recognition.interimResults = false;
    recognition.lang           = "en-US";

    recognition.onstart = () => { setIsListening(true); setError(null); };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.trim();
      setTranscript(spokenText);

      if (isDictatingRef.current) {
        // In dictation mode → append to written answer
        if (dictationHandlerRef.current) {
          dictationHandlerRef.current(spokenText);
        }
        // Restart listening automatically for continuous dictation
        setTimeout(() => {
          if (isDictatingRef.current) {
            try { recognition.start(); } catch (_) {}
          }
        }, 300);
      } else {
        // Normal command mode
        if (commandHandlerRef.current) {
          commandHandlerRef.current(spokenText.toLowerCase());
        }
      }
    };

    recognition.onerror = (event) => {
      // 'no-speech' is normal — just restart if dictating
      if (event.error === 'no-speech' && isDictatingRef.current) {
        setTimeout(() => {
          if (isDictatingRef.current) {
            try { recognition.start(); } catch (_) {}
          }
        }, 300);
        return;
      }
      setError(`Speech error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => { setIsListening(false); };

    recognitionRef.current = recognition;

    return () => {
      recognitionRef.current?.abort();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported) { setError("Speech recognition not supported in this browser."); return; }
    if (isListening) return;
    try { recognitionRef.current.start(); }
    catch (e) { setError("Could not start microphone."); }
  }, [isSupported, isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) recognitionRef.current.stop();
  }, [isListening]);

  // ── Dictation mode ──────────────────────────────────────────────────────────
  const startDictation = useCallback((onDictated) => {
    if (!isSupported) return;
    isDictatingRef.current      = true;
    dictationHandlerRef.current = onDictated;
    setIsDictating(true);
    try { recognitionRef.current.start(); }
    catch (_) {}
  }, [isSupported]);

  const stopDictation = useCallback(() => {
    isDictatingRef.current      = false;
    dictationHandlerRef.current = null;
    setIsDictating(false);
    try { recognitionRef.current.stop(); } catch (_) {}
  }, []);

  // ── TTS ─────────────────────────────────────────────────────────────────────
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance     = new SpeechSynthesisUtterance(text);
    utterance.rate      = 0.95;
    utterance.pitch     = 1;
    utterance.volume    = 1;
    utterance.onstart   = () => setIsSpeaking(true);
    utterance.onend     = () => setIsSpeaking(false);
    utterance.onerror   = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  const registerCommandHandler = useCallback((handler) => {
    commandHandlerRef.current = handler;
  }, []);

  return {
    isListening,
    transcript,
    isSpeaking,
    isSupported,
    isDictating,
    error,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    registerCommandHandler,
    startDictation,
    stopDictation,
  };
};

export default useSpeech;