// // hooks/useLessonQuestions.js

// import { useState, useEffect } from 'react';
// import { get, post } from '../utils/api';
// import { validateAnswer } from '../utils/lessonQuestionsUtils';

// export const useLessonQuestions = (user) => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [answerText, setAnswerText] = useState({});
//   const [teacherId, setTeacherId] = useState(null);

//   // Fetch teacher ID on mount
//   useEffect(() => {
//     const fetchTeacherId = async () => {
//       try {
//         console.log('🔍 Fetching teacher_id for user_id:', user.id);
        
//         const data = await get(`/api/teachers/get_teacher_id.php?user_id=${user.id}`);
        
//         console.log('📥 get_teacher_id response:', data);
        
//         if (data.success) {
//           setTeacherId(data.teacher_id);
//           console.log('✅ Teacher ID set to:', data.teacher_id);
//         } else {
//           setMessage('Error: ' + data.message);
//           console.error('❌ Failed to get teacher_id:', data.message);
//         }
//       } catch (error) {
//         setMessage('Error fetching teacher ID: ' + error.message);
//         console.error('💥 Exception fetching teacher_id:', error);
//       }
//     };

//     if (user && user.id) {
//       fetchTeacherId();
//     }
//   }, [user]);

//   // Load questions when teacher ID is available
//   useEffect(() => {
//     if (teacherId) {
//       console.log('✅ Teacher ID is ready, loading questions...');
//       loadQuestions();
//     } else {
//       console.log('⏳ Waiting for teacher ID...');
//     }
//   }, [teacherId]);

//   const loadQuestions = async () => {
//     try {
//       setLoading(true);
      
//       const url = `/api/teachers/get_lesson_questions.php?teacher_id=${teacherId}`;
//       console.log('📡 Fetching questions from:', url);
      
//       const data = await get(url);
      
//       console.log('📦 Questions response:', data);
      
//       if (data.success) {
//         setQuestions(data.questions || []);
//         console.log('✅ Loaded', data.questions?.length || 0, 'questions');
//       } else {
//         setMessage('Error: ' + data.message);
//         console.error('❌ Error loading questions:', data.message);
//       }
//     } catch (error) {
//       setMessage('Error loading questions: ' + error.message);
//       console.error('💥 Exception loading questions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnswer = async (questionId) => {
//     const answer = answerText[questionId];
    
//     const validation = validateAnswer(answer);
//     if (!validation.valid) {
//       setMessage(validation.message);
//       return;
//     }

//     try {
//       console.log('📤 Posting answer for question:', questionId);
      
//       const data = await post('/api/teachers/answer_question.php', {
//         question_id: questionId,
//         teacher_id: teacherId,
//         answer: answer
//       });
      
//       console.log('📥 Answer response:', data);
      
//       if (data.success) {
//         setMessage('Answer posted successfully!');
//         setAnswerText({ ...answerText, [questionId]: '' });
//         loadQuestions();
//         console.log('✅ Answer posted successfully');
//       } else {
//         setMessage('Error: ' + data.message);
//         console.error('❌ Error posting answer:', data.message);
//       }
//     } catch (error) {
//       setMessage('Failed to post answer');
//       console.error('💥 Exception posting answer:', error);
//     }
//   };

//   const updateAnswerText = (questionId, text) => {
//     setAnswerText({ ...answerText, [questionId]: text });
//   };

//   return {
//     questions,
//     loading,
//     message,
//     answerText,
//     teacherId,
//     setMessage,
//     handleAnswer,
//     updateAnswerText,
//     loadQuestions
//   };
// };












import { useState, useEffect } from 'react';
import { get, post } from '../utils/api';
import { validateAnswer } from '../utils/lessonQuestionsUtils';

export const useLessonQuestions = (user) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [answerText, setAnswerText] = useState({});
  const [teacherId, setTeacherId] = useState(null);

  useEffect(() => {
    const fetchTeacherId = async () => {
      try {
        const response = await get(`/api/teachers/get_teacher_id.php?user_id=${user.id}`);
        const data = await response.json(); // ✅ FIXED
        if (data.success) {
          setTeacherId(data.teacher_id);
        } else {
          setMessage('Error: ' + data.message);
          setLoading(false);
        }
      } catch (error) {
        setMessage('Error fetching teacher ID: ' + error.message);
        setLoading(false);
      }
    };
    if (user && user.id) fetchTeacherId();
  }, [user]);

  useEffect(() => {
    if (teacherId) loadQuestions();
  }, [teacherId]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const response = await get(`/api/teachers/get_lesson_questions.php?teacher_id=${teacherId}`);
      const data = await response.json(); // ✅ FIXED
      if (data.success) {
        setQuestions(data.questions || []);
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('Error loading questions: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (questionId) => {
    const answer = answerText[questionId];
    const validation = validateAnswer(answer);
    if (!validation.valid) { setMessage(validation.message); return; }

    try {
      const response = await post('/api/teachers/answer_question.php', {
        question_id: questionId,
        teacher_id: teacherId,
        answer: answer
      });
      const data = await response.json(); // ✅ FIXED
      if (data.success) {
        setMessage('Answer posted successfully!');
        setAnswerText({ ...answerText, [questionId]: '' });
        loadQuestions();
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('Failed to post answer');
    }
  };

  const updateAnswerText = (questionId, text) => {
    setAnswerText({ ...answerText, [questionId]: text });
  };

  return { questions, loading, message, answerText, teacherId, setMessage, handleAnswer, updateAnswerText, loadQuestions };
};