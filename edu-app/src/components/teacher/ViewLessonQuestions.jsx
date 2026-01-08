// import { useState, useEffect } from 'react';

// function ViewLessonQuestions({ user, teacherId, onBack }) {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [answerText, setAnswerText] = useState({});

//   useEffect(() => {
//     if (teacherId) {
//       loadQuestions();
//     }
//   }, [teacherId]);

//   const loadQuestions = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`http://localhost/backend/api/teachers/get_lesson_questions.php?teacher_id=${teacherId}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setQuestions(data.questions || []);
//       } else {
//         setMessage('Error: ' + data.message);
//       }
//     } catch (error) {
//       setMessage('Error loading questions: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnswer = async (questionId) => {
//     const answer = answerText[questionId];
    
//     if (!answer || !answer.trim()) {
//       setMessage('Please enter an answer');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost/backend/api/teachers/answer_question.php', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           question_id: questionId,
//           teacher_id: teacherId,
//           answer: answer
//         })
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         setMessage('Answer posted successfully!');
//         setAnswerText({ ...answerText, [questionId]: '' });
//         loadQuestions();
//       } else {
//         setMessage('Error: ' + data.message);
//       }
//     } catch (error) {
//       setMessage('Failed to post answer');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading questions...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <h1 className="text-3xl font-bold text-gray-900">Student Questions</h1>
//             <button
//               onClick={onBack}
//               className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
//             >
//               <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//               </svg>
//               Back
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {message && (
//           <div className={`mb-4 p-4 rounded ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
//             {message}
//             <button onClick={() => setMessage('')} className="ml-4 font-bold">×</button>
//           </div>
//         )}

//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">
//             {questions.length} Question{questions.length !== 1 ? 's' : ''}
//           </h2>

//           {questions.length === 0 ? (
//             <p className="text-gray-500 text-center py-8">No questions yet</p>
//           ) : (
//             <div className="space-y-6">
//               {questions.map((q) => (
//                 <div key={q.id} className="border border-gray-200 rounded-lg p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <p className="font-medium text-gray-900">{q.student_name} ({q.student_number})</p>
//                       <p className="text-sm text-gray-600">Lesson: {q.lesson_title}</p>
//                       <p className="text-xs text-gray-500">{new Date(q.created_at).toLocaleString()}</p>
//                     </div>
//                     <div className="flex gap-2">
//                       {q.is_private && (
//                         <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">🔒 Private</span>
//                       )}
//                       <span className={`text-xs px-2 py-1 rounded ${
//                         q.status === 'answered' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
//                       }`}>
//                         {q.status}
//                       </span>
//                     </div>
//                   </div>
                  
//                   <p className="text-gray-700 mb-4 bg-gray-50 p-3 rounded">{q.question}</p>

//                   {/* Existing Answers */}
//                   {q.answers && q.answers.length > 0 && (
//                     <div className="mb-4 space-y-2">
//                       {q.answers.map((a) => (
//                         <div key={a.id} className="bg-indigo-50 border border-indigo-200 p-3 rounded">
//                           <div className="flex justify-between items-start mb-1">
//                             <p className="font-medium text-indigo-900 text-sm">Your Answer:</p>
//                             <p className="text-xs text-gray-500">{new Date(a.created_at).toLocaleString()}</p>
//                           </div>
//                           <p className="text-gray-800 text-sm">{a.answer}</p>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* Answer Form */}
//                   <div className="mt-4">
//                     <textarea
//                       value={answerText[q.id] || ''}
//                       onChange={(e) => setAnswerText({ ...answerText, [q.id]: e.target.value })}
//                       className="w-full border border-gray-300 rounded px-4 py-2 mb-2"
//                       rows="3"
//                       placeholder="Type your answer here..."
//                     />
//                     <button
//                       onClick={() => handleAnswer(q.id)}
//                       className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
//                     >
//                       Post Answer
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewLessonQuestions;























import { useState, useEffect } from 'react';

function ViewLessonQuestions({ user, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [answerText, setAnswerText] = useState({});
  const [teacherId, setTeacherId] = useState(null);

  // Fetch teacher_id from user_id when component mounts
  useEffect(() => {
    const fetchTeacherId = async () => {
      try {
        console.log('🔍 Fetching teacher_id for user_id:', user.id);
        
        const response = await fetch(
          `http://localhost/backend/api/teachers/get_teacher_id.php?user_id=${user.id}`
        );
        const data = await response.json();
        
        console.log('📥 get_teacher_id response:', data);
        
        if (data.success) {
          setTeacherId(data.teacher_id);
          console.log('✅ Teacher ID set to:', data.teacher_id);
        } else {
          setMessage('Error: ' + data.message);
          console.error('❌ Failed to get teacher_id:', data.message);
        }
      } catch (error) {
        setMessage('Error fetching teacher ID: ' + error.message);
        console.error('💥 Exception fetching teacher_id:', error);
      }
    };

    if (user && user.id) {
      fetchTeacherId();
    }
  }, [user]);

  // Load questions when teacherId is available
  useEffect(() => {
    if (teacherId) {
      console.log('✅ Teacher ID is ready, loading questions...');
      loadQuestions();
    } else {
      console.log('⏳ Waiting for teacher ID...');
    }
  }, [teacherId]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      
      const url = `http://localhost/backend/api/teachers/get_lesson_questions.php?teacher_id=${teacherId}`;
      console.log('📡 Fetching questions from:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('📦 Questions response:', data);
      
      if (data.success) {
        setQuestions(data.questions || []);
        console.log('✅ Loaded', data.questions.length, 'questions');
      } else {
        setMessage('Error: ' + data.message);
        console.error('❌ Error loading questions:', data.message);
      }
    } catch (error) {
      setMessage('Error loading questions: ' + error.message);
      console.error('💥 Exception loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (questionId) => {
    const answer = answerText[questionId];
    
    if (!answer || !answer.trim()) {
      setMessage('Please enter an answer');
      return;
    }

    try {
      console.log('📤 Posting answer for question:', questionId);
      
      const response = await fetch('http://localhost/backend/api/teachers/answer_question.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_id: questionId,
          teacher_id: teacherId,
          answer: answer
        })
      });

      const data = await response.json();
      
      console.log('📥 Answer response:', data);
      
      if (data.success) {
        setMessage('Answer posted successfully!');
        setAnswerText({ ...answerText, [questionId]: '' });
        loadQuestions();
        console.log('✅ Answer posted successfully');
      } else {
        setMessage('Error: ' + data.message);
        console.error('❌ Error posting answer:', data.message);
      }
    } catch (error) {
      setMessage('Failed to post answer');
      console.error('💥 Exception posting answer:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-gray-900">Student Questions</h1>
            <button
              onClick={onBack}
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {message && (
          <div className={`mb-4 p-4 rounded ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message}
            <button onClick={() => setMessage('')} className="ml-4 font-bold">×</button>
          </div>
        )}

        {/* Debug info - Remove this after fixing */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-900">
            <strong>Debug Info:</strong> User ID: {user?.id} | Teacher ID: {teacherId || 'Loading...'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {questions.length} Question{questions.length !== 1 ? 's' : ''}
          </h2>

          {questions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No questions yet</p>
          ) : (
            <div className="space-y-6">
              {questions.map((q) => (
                <div key={q.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{q.student_name} ({q.student_number})</p>
                      <p className="text-sm text-gray-600">Lesson: {q.lesson_title}</p>
                      <p className="text-xs text-gray-500">{new Date(q.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      {q.is_private && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">🔒 Private</span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded ${
                        q.status === 'answered' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {q.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 bg-gray-50 p-3 rounded">{q.question}</p>

                  {/* Existing Answers */}
                  {q.answers && q.answers.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {q.answers.map((a) => (
                        <div key={a.id} className="bg-indigo-50 border border-indigo-200 p-3 rounded">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-medium text-indigo-900 text-sm">Your Answer:</p>
                            <p className="text-xs text-gray-500">{new Date(a.created_at).toLocaleString()}</p>
                          </div>
                          <p className="text-gray-800 text-sm">{a.answer}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Answer Form */}
                  <div className="mt-4">
                    <textarea
                      value={answerText[q.id] || ''}
                      onChange={(e) => setAnswerText({ ...answerText, [q.id]: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 mb-2"
                      rows="3"
                      placeholder="Type your answer here..."
                    />
                    <button
                      onClick={() => handleAnswer(q.id)}
                      className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                    >
                      Post Answer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewLessonQuestions;