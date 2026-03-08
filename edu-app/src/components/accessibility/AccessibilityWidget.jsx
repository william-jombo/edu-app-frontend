// import { useState, useEffect, useRef } from "react";
// import useSpeech from "../../hooks/useSpeech";
// import { matchCommand, getHelpText } from "../../utils/voiceCommands";
// import "./AccessibilityWidget.css";

// const AccessibilityWidget = ({ commandList, onCommand, onNavigate, onLogout }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [statusMessage, setStatusMessage] = useState("");
//   const [commandHistory, setCommandHistory] = useState([]);
//   const [showHistory, setShowHistory] = useState(false);
//   const panelRef = useRef(null);

//   const {
//     isListening,
//     isSpeaking,
//     isSupported,
//     error,
//     startListening,
//     stopListening,
//     speak,
//     stopSpeaking,
//     registerCommandHandler,
//     transcript,
//   } = useSpeech();

//   useEffect(() => {
//     registerCommandHandler((spokenText) => {
//       handleVoiceCommand(spokenText);
//     });
//   }, [commandList]);

//   const handleVoiceCommand = (spokenText) => {
//     const command = matchCommand(spokenText, commandList);

//     const historyEntry = {
//       text: spokenText,
//       time: new Date().toLocaleTimeString(),
//       matched: !!command,
//     };
//     setCommandHistory((prev) => [historyEntry, ...prev].slice(0, 10));

//     if (!command) {
//       const msg = `Sorry, I didn't understand "${spokenText}". Say "help" to hear available commands.`;
//       setStatusMessage(msg);
//       speak(msg);
//       return;
//     }

//     if (command.feedback) {
//       setStatusMessage(command.feedback);
//       speak(command.feedback);
//     }

//     if (command.action === "navigate" && onNavigate) {
//       setTimeout(() => onNavigate(command.target), 600);
//     }

//     if (command.action === "read") {
//       readPageContent();
//     }

//     if (command.action === "logout" && onLogout) {
//       setTimeout(() => onLogout(), 1200);
//     }

//     if (command.action === "help") {
//       const helpText = getHelpText(commandList);
//       setStatusMessage(helpText);
//       speak(helpText);
//     }

//     if (onCommand) {
//       onCommand(command, spokenText);
//     }
//   };

//   const readPageContent = () => {
//     const mainContent = document.querySelector(
//       "main, [role='main'], .dashboard-content, .tab-content"
//     );
//     if (mainContent) {
//       const text = mainContent.innerText
//         .replace(/\s+/g, " ")
//         .trim()
//         .substring(0, 600);
//       speak(text || "No readable content found on this page.");
//     } else {
//       speak("No content area found to read.");
//     }
//   };

//   const handleMicClick = () => {
//     if (isListening) {
//       stopListening();
//     } else {
//       setStatusMessage("Listening...");
//       startListening();
//     }
//   };

//   const handleStopSpeaking = () => {
//     stopSpeaking();
//     setStatusMessage("");
//   };

//   // Close panel on outside click
//   useEffect(() => {
//     const handleOutside = (e) => {
//       if (panelRef.current && !panelRef.current.contains(e.target)) {
//         const btn = document.getElementById("acc-toggle-btn");
//         if (btn && !btn.contains(e.target)) setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleOutside);
//     return () => document.removeEventListener("mousedown", handleOutside);
//   }, []);

//   if (!isSupported) return null;

//   return (
//     <div className="acc-widget-root">
//       {/* Floating Toggle Button */}
//       <button
//         id="acc-toggle-btn"
//         className={`acc-fab ${isListening ? "acc-fab--listening" : ""} ${isSpeaking ? "acc-fab--speaking" : ""}`}
//         onClick={() => setIsOpen((v) => !v)}
//         aria-label="Accessibility panel - voice commands"
//         title="Voice Accessibility"
//       >
//         <span className="acc-fab-icon">
//           {isListening ? "🎙️" : isSpeaking ? "🔊" : "♿"}
//         </span>
//         {isListening && <span className="acc-pulse-ring" />}
//       </button>

//       {/* Panel */}
//       {isOpen && (
//         <div className="acc-panel" ref={panelRef} role="dialog" aria-label="Voice accessibility panel">
//           <div className="acc-panel-header">
//             <span className="acc-panel-title">Voice Assistant</span>
//             <button
//               className="acc-close-btn"
//               onClick={() => setIsOpen(false)}
//               aria-label="Close panel"
//             >
//               ✕
//             </button>
//           </div>

//           {/* Status */}
//           {(statusMessage || error) && (
//             <div className={`acc-status ${error ? "acc-status--error" : ""}`}>
//               {error || statusMessage}
//             </div>
//           )}

//           {/* Transcript */}
//           {transcript && (
//             <div className="acc-transcript">
//               <span className="acc-transcript-label">You said:</span>
//               <span className="acc-transcript-text">"{transcript}"</span>
//             </div>
//           )}

//           {/* Controls */}
//           <div className="acc-controls">
//             <button
//               className={`acc-btn acc-btn--mic ${isListening ? "acc-btn--active" : ""}`}
//               onClick={handleMicClick}
//               aria-label={isListening ? "Stop listening" : "Start voice command"}
//             >
//               <span>{isListening ? "🛑 Stop" : "🎙️ Speak"}</span>
//             </button>

//             <button
//               className={`acc-btn acc-btn--read ${isSpeaking ? "acc-btn--active" : ""}`}
//               onClick={isSpeaking ? handleStopSpeaking : readPageContent}
//               aria-label={isSpeaking ? "Stop reading" : "Read page content"}
//             >
//               <span>{isSpeaking ? "🔇 Stop" : "🔊 Read Page"}</span>
//             </button>
//           </div>

//           {/* Command Cheat Sheet */}
//           <div className="acc-commands-section">
//             <p className="acc-commands-title">Voice Commands:</p>
//             <ul className="acc-commands-list">
//               {commandList
//                 .filter((c) => c.action !== "read")
//                 .map((cmd, i) => (
//                   <li key={i} className="acc-command-item">
//                     <span className="acc-command-say">"{cmd.keywords[0]}"</span>
//                     <span className="acc-command-desc">→ {cmd.feedback || cmd.action}</span>
//                   </li>
//                 ))}
//               <li className="acc-command-item">
//                 <span className="acc-command-say">"read page"</span>
//                 <span className="acc-command-desc">→ Read page aloud</span>
//               </li>
//             </ul>
//           </div>

//           {/* History toggle */}
//           {commandHistory.length > 0 && (
//             <div className="acc-history-section">
//               <button
//                 className="acc-history-toggle"
//                 onClick={() => setShowHistory((v) => !v)}
//               >
//                 {showHistory ? "Hide" : "Show"} Command History
//               </button>
//               {showHistory && (
//                 <ul className="acc-history-list">
//                   {commandHistory.map((h, i) => (
//                     <li
//                       key={i}
//                       className={`acc-history-item ${h.matched ? "" : "acc-history-item--unmatched"}`}
//                     >
//                       <span className="acc-history-time">{h.time}</span>
//                       <span className="acc-history-text">"{h.text}"</span>
//                       <span>{h.matched ? "✓" : "✗"}</span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AccessibilityWidget;






import { useState, useEffect, useRef, useCallback } from "react";
import useSpeech from "../../hooks/useSpeech";
import { matchCommand, getHelpText } from "../../utils/voiceCommands";
import "./AccessibilityWidget.css";

/**
 * AccessibilityWidget
 *
 * Extra props for exam voice control:
 *   activeExam        — the current exam object (null when not in exam)
 *   currentQuestion   — the current question object
 *   onExamAnswer      — fn(optionLetter)  → select MCQ answer
 *   onExamNext        — fn()              → go to next question
 *   onExamPrev        — fn()              → go to previous question
 *   onExamSubmit      — fn()              → submit exam
 *   onWrittenAnswer   — fn(text)          → append/set text for written answer
 *   timeRemaining     — number (seconds)  → so voice can read the time
 */
const AccessibilityWidget = ({
  commandList,
  onCommand,
  onNavigate,
  onLogout,
  // exam props
  activeExam       = null,
  currentQuestion  = null,
  onExamAnswer     = null,
  onExamNext       = null,
  onExamPrev       = null,
  onExamSubmit     = null,
  onWrittenAnswer  = null,
  timeRemaining    = null,
}) => {
  const [isOpen, setIsOpen]               = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [showHistory, setShowHistory]     = useState(false);
  const panelRef = useRef(null);

  const {
    isListening, isSpeaking, isSupported, error,
    startListening, stopListening,
    speak, stopSpeaking,
    registerCommandHandler,
    transcript,
    isDictating,
    startDictation,
    stopDictation,
  } = useSpeech();

  useEffect(() => {
    registerCommandHandler((spokenText) => handleVoiceCommand(spokenText));
  }, [commandList, activeExam, currentQuestion, timeRemaining]);

  // ── Read page content ────────────────────────────────────────────────────────
  const readPageContent = useCallback(() => {
    // Try multiple selectors to find main content
    const selectors = [
      '[data-voice-content]',
      '.space-y-3',
      'main',
      '[role="main"]',
      '.dashboard-content',
    ];

    let text = '';
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) {
        text = el.innerText?.replace(/\s+/g, ' ').trim().substring(0, 800);
        if (text.length > 30) break;
      }
    }

    if (!text || text.length < 10) {
      // Last resort: grab all visible text from body excluding nav/header/buttons
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName?.toLowerCase();
          if (['script','style','noscript','button','nav','header'].includes(tag)) return NodeFilter.FILTER_REJECT;
          if (node.textContent.trim().length < 2) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      const parts = [];
      while (walker.nextNode()) {
        parts.push(walker.currentNode.textContent.trim());
        if (parts.join(' ').length > 600) break;
      }
      text = parts.join(' ').replace(/\s+/g, ' ').trim();
    }

    if (text) {
      speak(text);
      setStatusMessage("Reading page...");
    } else {
      speak("No readable content found on this page.");
      setStatusMessage("No content found.");
    }
  }, [speak]);

  // ── Main command handler ─────────────────────────────────────────────────────
  const handleVoiceCommand = useCallback((spokenText) => {
    const command = matchCommand(spokenText, commandList);

    setCommandHistory(prev => [{
      text: spokenText,
      time: new Date().toLocaleTimeString(),
      matched: !!command,
    }, ...prev].slice(0, 10));

    if (!command) {
      // If we're in active exam written mode — anything not a command = dictation
      if (activeExam && currentQuestion?.question_type === 'written' && onWrittenAnswer) {
        onWrittenAnswer(spokenText + ' ');
        setStatusMessage(`Wrote: "${spokenText}"`);
        speak(`Recorded: ${spokenText}`);
        return;
      }
      const msg = `I didn't understand "${spokenText}". Say help for available commands.`;
      setStatusMessage(msg);
      speak(msg);
      return;
    }

    // ── stop reading ──
    if (command.action === 'stop_reading') {
      stopSpeaking();
      setStatusMessage('');
      return;
    }

    if (command.feedback) {
      setStatusMessage(command.feedback);
      speak(command.feedback);
    }

    // ── navigate ──
    if (command.action === 'navigate' && onNavigate) {
      setTimeout(() => onNavigate(command.target), 600);
      return;
    }

    // ── read page ──
    if (command.action === 'read') {
      readPageContent();
      return;
    }

    // ── logout ──
    if (command.action === 'logout' && onLogout) {
      setTimeout(() => onLogout(), 1200);
      return;
    }

    // ── help ──
    if (command.action === 'help') {
      const helpText = getHelpText(commandList);
      setStatusMessage(helpText);
      speak(helpText);
      return;
    }

    // ── exam: MCQ answer ──
    if (command.action === 'exam_answer' && activeExam && onExamAnswer) {
      onExamAnswer(command.target);
      return;
    }

    // ── exam: next ──
    if (command.action === 'exam_next' && activeExam && onExamNext) {
      onExamNext();
      return;
    }

    // ── exam: prev ──
    if (command.action === 'exam_prev' && activeExam && onExamPrev) {
      onExamPrev();
      return;
    }

    // ── exam: submit ──
    if (command.action === 'exam_submit' && activeExam && onExamSubmit) {
      onExamSubmit();
      return;
    }

    // ── exam: read question ──
    if (command.action === 'exam_read_question' && currentQuestion) {
      const opts = ['a','b','c','d']
        .filter(o => currentQuestion[`option_${o}`]?.trim())
        .map(o => `${o.toUpperCase()}: ${currentQuestion[`option_${o}`]}`);
      const text = currentQuestion.question_text + (opts.length ? '. Options: ' + opts.join('. ') : '');
      speak(text);
      setStatusMessage('Reading question...');
      return;
    }

    // ── exam: start dictation ──
    if (command.action === 'exam_start_dictate' && activeExam && onWrittenAnswer) {
      startDictation((dictatedText) => {
        onWrittenAnswer(prev => (prev || '') + dictatedText + ' ');
        setStatusMessage(`Wrote: "${dictatedText}"`);
      });
      return;
    }

    // ── exam: stop dictation ──
    if (command.action === 'exam_stop_dictate') {
      stopDictation();
      setStatusMessage('Dictation stopped.');
      speak('Voice dictation stopped.');
      return;
    }

    // ── exam: clear answer ──
    if (command.action === 'exam_clear_answer' && onWrittenAnswer) {
      onWrittenAnswer('');
      return;
    }

    // ── exam: time ──
    if (command.action === 'exam_time' && timeRemaining !== null) {
      const mins = Math.floor(timeRemaining / 60);
      const secs = timeRemaining % 60;
      const timeText = mins > 0
        ? `You have ${mins} minute${mins !== 1 ? 's' : ''} and ${secs} seconds remaining.`
        : `You have ${secs} seconds remaining.`;
      speak(timeText);
      setStatusMessage(timeText);
      return;
    }

    if (onCommand) onCommand(command, spokenText);
  }, [
    commandList, activeExam, currentQuestion,
    onNavigate, onLogout, onExamAnswer, onExamNext, onExamPrev, onExamSubmit,
    onWrittenAnswer, timeRemaining, readPageContent,
    speak, stopSpeaking, startDictation, stopDictation,
  ]);

  const handleMicClick = () => {
    if (isDictating) { stopDictation(); return; }
    if (isListening) { stopListening(); }
    else { setStatusMessage("Listening..."); startListening(); }
  };

  // Close on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        const btn = document.getElementById("acc-toggle-btn");
        if (btn && !btn.contains(e.target)) setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  if (!isSupported) return null;

  const inExam = !!activeExam;
  const isWrittenQ = currentQuestion?.question_type === 'written';

  return (
    <div className="acc-widget-root">
      {/* Floating button */}
      <button
        id="acc-toggle-btn"
        className={`acc-fab ${isListening || isDictating ? "acc-fab--listening" : ""} ${isSpeaking ? "acc-fab--speaking" : ""}`}
        onClick={() => setIsOpen(v => !v)}
        aria-label="Accessibility panel - voice commands"
        title="Voice Accessibility"
      >
        <span className="acc-fab-icon">
          {isDictating ? "✍️" : isListening ? "🎙️" : isSpeaking ? "🔊" : "♿"}
        </span>
        {(isListening || isDictating) && <span className="acc-pulse-ring" />}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="acc-panel" ref={panelRef} role="dialog" aria-label="Voice accessibility panel">
          <div className="acc-panel-header">
            <div>
              <span className="acc-panel-title">Voice Assistant</span>
              {inExam && (
                <span style={{ display:'block', fontSize:'11px', color:'rgba(255,255,255,0.7)', marginTop:'2px' }}>
                  {isWrittenQ ? '✍️ Written question — say "start writing"' : '🔤 MCQ — say "select A/B/C/D"'}
                </span>
              )}
            </div>
            <button className="acc-close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* Status / error */}
          {(statusMessage || error) && (
            <div className={`acc-status ${error ? "acc-status--error" : ""}`}>
              {error || statusMessage}
            </div>
          )}

          {/* Dictation indicator */}
          {isDictating && (
            <div className="acc-status" style={{ background:'#fff7ed', color:'#c2410c', borderLeft:'3px solid #f97316' }}>
              ✍️ <strong>Dictating…</strong> speak your answer. Say <em>"stop writing"</em> to finish.
            </div>
          )}

          {/* Transcript */}
          {transcript && (
            <div className="acc-transcript">
              <span className="acc-transcript-label">You said:</span>
              <span className="acc-transcript-text">"{transcript}"</span>
            </div>
          )}

          {/* Controls */}
          <div className="acc-controls">
            <button
              className={`acc-btn acc-btn--mic ${isListening || isDictating ? "acc-btn--active" : ""}`}
              onClick={handleMicClick}
            >
              <span>{isDictating ? "⏹ Stop Dictation" : isListening ? "🛑 Stop" : "🎙️ Speak"}</span>
            </button>
            <button
              className={`acc-btn acc-btn--read ${isSpeaking ? "acc-btn--active" : ""}`}
              onClick={isSpeaking ? () => { stopSpeaking(); setStatusMessage(''); } : readPageContent}
            >
              <span>{isSpeaking ? "🔇 Stop" : "🔊 Read Page"}</span>
            </button>
          </div>

          {/* Exam quick actions */}
          {inExam && (
            <div style={{ padding:'0 12px 12px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
              {!isWrittenQ && ['A','B','C','D'].map(opt => (
                <button
                  key={opt}
                  onClick={() => onExamAnswer && onExamAnswer(opt)}
                  className="acc-btn"
                  style={{ background:'#ede9fe', color:'#6d28d9', borderColor:'#6d28d9', padding:'8px' }}
                >
                  Select {opt}
                </button>
              ))}
              {isWrittenQ && !isDictating && (
                <button
                  onClick={() => onWrittenAnswer && startDictation((t) => { onWrittenAnswer(p => (p||'')+t+' '); setStatusMessage(`Wrote: "${t}"`); })}
                  className="acc-btn"
                  style={{ gridColumn:'1/-1', background:'#fff7ed', color:'#c2410c', borderColor:'#f97316' }}
                >
                  ✍️ Start Dictating Answer
                </button>
              )}
              {isWrittenQ && isDictating && (
                <button
                  onClick={() => { stopDictation(); speak('Dictation stopped.'); setStatusMessage('Dictation stopped.'); }}
                  className="acc-btn acc-btn--active"
                  style={{ gridColumn:'1/-1', background:'#f97316', color:'white', borderColor:'#f97316' }}
                >
                  ⏹ Stop Dictating
                </button>
              )}
              <button onClick={() => onExamPrev && onExamPrev()} className="acc-btn" style={{ background:'#f1f5f9', color:'#475569', borderColor:'#cbd5e1' }}>◀ Prev</button>
              <button onClick={() => onExamNext && onExamNext()} className="acc-btn" style={{ background:'#f1f5f9', color:'#475569', borderColor:'#cbd5e1' }}>Next ▶</button>
              <button
                onClick={() => { speak('Reading question.'); if (currentQuestion) { const opts=['a','b','c','d'].filter(o=>currentQuestion[`option_${o}`]?.trim()).map(o=>`${o.toUpperCase()}: ${currentQuestion[`option_${o}`]}`); speak(currentQuestion.question_text+(opts.length?'. Options: '+opts.join('. '):'')); }}}
                className="acc-btn"
                style={{ gridColumn:'1/-1', background:'#e0f2fe', color:'#0369a1', borderColor:'#0369a1' }}
              >
                🔊 Read Question
              </button>
              <button
                onClick={() => onExamSubmit && onExamSubmit()}
                className="acc-btn"
                style={{ gridColumn:'1/-1', background:'#dcfce7', color:'#15803d', borderColor:'#15803d' }}
              >
                ✅ Submit Exam
              </button>
            </div>
          )}

          {/* Command list */}
          <div className="acc-commands-section">
            <p className="acc-commands-title">{inExam ? 'Exam Commands:' : 'Voice Commands:'}</p>
            <ul className="acc-commands-list">
              {(inExam
                ? commandList.filter(c => c.action.startsWith('exam_') || c.action === 'help')
                : commandList.filter(c => c.action !== 'read' && !c.action.startsWith('exam_'))
              ).map((cmd, i) => (
                <li key={i} className="acc-command-item">
                  <span className="acc-command-say">"{cmd.keywords[0]}"</span>
                  <span className="acc-command-desc">→ {cmd.feedback || cmd.action}</span>
                </li>
              ))}
              {!inExam && (
                <li className="acc-command-item">
                  <span className="acc-command-say">"read page"</span>
                  <span className="acc-command-desc">→ Read page aloud</span>
                </li>
              )}
            </ul>
          </div>

          {/* History */}
          {commandHistory.length > 0 && (
            <div className="acc-history-section">
              <button className="acc-history-toggle" onClick={() => setShowHistory(v => !v)}>
                {showHistory ? "Hide" : "Show"} Command History
              </button>
              {showHistory && (
                <ul className="acc-history-list">
                  {commandHistory.map((h, i) => (
                    <li key={i} className={`acc-history-item ${h.matched ? "" : "acc-history-item--unmatched"}`}>
                      <span className="acc-history-time">{h.time}</span>
                      <span className="acc-history-text">"{h.text}"</span>
                      <span>{h.matched ? "✓" : "✗"}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccessibilityWidget;