
// import React, { useState, useEffect } from 'react';
// import { get, post } from '../../utils/api';

// const StudentReportGenerator = ({ onClose }) => {
//   const [loading, setLoading] = useState(false);
//   const [reportType, setReportType] = useState('single'); // 'single' or 'class'
//   const [classes, setClasses] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState('');
//   const [selectedStudent, setSelectedStudent] = useState('');
//   const [academicYear, setAcademicYear] = useState('');
//   const [semester, setSemester] = useState('');
//   const [schoolName, setSchoolName] = useState('edu-app');
//   const [error, setError] = useState('');
//   const [generating, setGenerating] = useState(false);
//   const [debugInfo, setDebugInfo] = useState('');

//   // Generate academic years (current year ± 2 years)
//   // Use single year format to match database (e.g., "2025" instead of "2024/2025")
//   const currentYear = new Date().getFullYear();
//   const academicYears = [];
//   for (let i = -2; i <= 2; i++) {
//     const year = currentYear + i;
//     academicYears.push(`${year}`); // Single year format
//   }

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     if (selectedClass) {
//       fetchStudents(selectedClass);
//     }
//   }, [selectedClass]);

//   const fetchClasses = async () => {
//     setLoading(true);
//     setError('');
//     setDebugInfo('Fetching classes from API...');
    
//     try {
//       console.log('Fetching classes from: /api/common/get_classes.php');
      
//       const response = await get('/api/common/get_classes.php');
//       const data = await response.json();
      
//       console.log('Classes API data:', data);
//       setDebugInfo(`API Response: ${JSON.stringify(data)}`);
      
//       if (data.success) {
//         setClasses(data.data || []);
//         setDebugInfo(`Successfully loaded ${data.data?.length || 0} classes`);
        
//         if (!data.data || data.data.length === 0) {
//           setError('No classes found in the database. Please add classes first.');
//         }
//       } else {
//         throw new Error(data.message || 'Unknown error from API');
//       }
//     } catch (err) {
//       console.error('Error fetching classes:', err);
//       setError(`Failed to load classes: ${err.message}`);
//       setDebugInfo(`Error: ${err.message}\nStack: ${err.stack}`);
      
//       // Show more helpful error messages
//       if (err.message.includes('Failed to fetch')) {
//         setError('Cannot connect to server. Make sure PHP server is running on http://localhost:8080');
//       } else if (err.message.includes('Unauthorized')) {
//         setError('Please login as an administrator to access this feature.');
//       } else if (err.message.includes('404')) {
//         setError('API endpoint not found. Check if get_classes.php exists in backend/api/admin/');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStudents = async (classId) => {
//     setLoading(true);
//     setError('');
    
//     try {
//       console.log(`Fetching students for class ${classId}`);
      
//       const response = await get(`/api/admin/get_students.php?class_id=${classId}`);
//       const data = await response.json();
//       console.log('Students API data:', data);
      
//       if (data.success) {
//         setStudents(data.data || []);
        
//         if (!data.data || data.data.length === 0) {
//           setError('No students found in this class. Please add students first.');
//         }
//       } else {
//         throw new Error(data.message || 'Failed to load students');
//       }
//     } catch (err) {
//       console.error('Error fetching students:', err);
//       setError(`Failed to load students: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenerateReport = async () => {
//     setError('');
    
//     // Validation
//     if (!academicYear) {
//       setError('Please select academic year');
//       return;
//     }

//     if (reportType === 'single' && !selectedStudent) {
//       setError('Please select a student');
//       return;
//     }

//     if (reportType === 'class' && !selectedClass) {
//       setError('Please select a class');
//       return;
//     }

//     setGenerating(true);

//     try {
//       const response = await post('/api/admin/generate_report.php', {
//         report_type: reportType,
//         student_id: reportType === 'single' ? selectedStudent : null,
//         class_id: selectedClass,
//         academic_year: academicYear,
//         semester: semester,
//         school_name: schoolName
//       });
//  const data = await response.json();
//       if (data.success) {
//         // Generate PDF from the data
//         if (reportType === 'single') {
//           await generateSinglePDF(data.data);
//         } else {
//           await generateClassPDFs(data.data);
//         }
//       } else {
//         setError(data.message || 'Failed to generate report');
//       }
//     } catch (err) {
//       console.error('Error generating report:', err);
//       setError(err.message || 'Failed to generate report');
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const generateSinglePDF = async (reportData) => {
//     // Import jsPDF and autoTable
//     const { jsPDF } = await import('jspdf');
//     await import('jspdf-autotable');

//     const doc = new jsPDF();
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();
//     let yPosition = 20;

//     // School Header
//     doc.setFontSize(20);
//     doc.setFont(undefined, 'bold');
//     doc.text(reportData.school_name, pageWidth / 2, yPosition, { align: 'center' });
    
//     yPosition += 10;
//     doc.setFontSize(14);
//     doc.text('STUDENT PROGRESS REPORT', pageWidth / 2, yPosition, { align: 'center' });
    
//     yPosition += 8;
//     doc.setFontSize(10);
//     doc.setFont(undefined, 'normal');
//     doc.text(`Academic Year: ${reportData.academic_year}${reportData.semester ? ' - ' + reportData.semester : ''}`, pageWidth / 2, yPosition, { align: 'center' });
    
//     yPosition += 15;

//     // Student Information Box
//     doc.setDrawColor(0, 102, 204);
//     doc.setLineWidth(0.5);
//     doc.rect(15, yPosition - 5, pageWidth - 30, 35);
    
//     doc.setFontSize(10);
//     doc.setFont(undefined, 'bold');
//     doc.text('Student Information', 20, yPosition);
    
//     yPosition += 8;
//     doc.setFont(undefined, 'normal');
//     doc.text(`Name: ${reportData.student.firstname} ${reportData.student.lastname}`, 20, yPosition);
//     doc.text(`Student No: ${reportData.student.student_number}`, pageWidth / 2, yPosition);
    
//     yPosition += 6;
//     doc.text(`Class: ${reportData.student.class_name}`, 20, yPosition);
//     doc.text(`Gender: ${reportData.student.gender || 'N/A'}`, pageWidth / 2, yPosition);
    
//     yPosition += 6;
//     doc.text(`Position: ${reportData.position} of ${reportData.total_students}`, 20, yPosition);
//     doc.text(`Overall Average: ${reportData.overall_average}%`, pageWidth / 2, yPosition);
    
//     yPosition += 6;
//     doc.text(`Grade: ${reportData.grade_interpretation.grade}`, 20, yPosition);
//     doc.text(`Remark: ${reportData.grade_interpretation.remark}`, pageWidth / 2, yPosition);
    
//     yPosition += 15;

//     // Subject Performance Table
//     doc.setFontSize(12);
//     doc.setFont(undefined, 'bold');
//     doc.text('ACADEMIC PERFORMANCE', 20, yPosition);
//     yPosition += 5;

//     const subjectTableData = [];
//     Object.entries(reportData.subjects).forEach(([subjectName, subjectData]) => {
//       subjectTableData.push([
//         subjectName,
//         subjectData.subject_code,
//         subjectData.teacher,
//         `${subjectData.total_score}/${subjectData.total_max}`,
//         `${subjectData.average}%`,
//         getGrade(subjectData.average)
//       ]);
//     });

//     doc.autoTable({
//       startY: yPosition,
//       head: [['Subject', 'Code', 'Teacher', 'Score', 'Average', 'Grade']],
//       body: subjectTableData,
//       theme: 'grid',
//       headStyles: { fillColor: [0, 102, 204], fontSize: 9, fontStyle: 'bold' },
//       styles: { fontSize: 8, cellPadding: 3 },
//       columnStyles: {
//         0: { cellWidth: 45 },
//         1: { cellWidth: 20 },
//         2: { cellWidth: 40 },
//         3: { cellWidth: 25 },
//         4: { cellWidth: 25 },
//         5: { cellWidth: 20 }
//       }
//     });

//     yPosition = doc.lastAutoTable.finalY + 10;

//     // Attendance Summary
//     if (yPosition > pageHeight - 60) {
//       doc.addPage();
//       yPosition = 20;
//     }

//     doc.setFontSize(12);
//     doc.setFont(undefined, 'bold');
//     doc.text('ATTENDANCE SUMMARY', 20, yPosition);
//     yPosition += 5;

//     const attendanceData = reportData.attendance;
//     const attendanceRate = attendanceData.total_days > 0 
//       ? ((attendanceData.present_days / attendanceData.total_days) * 100).toFixed(1)
//       : 0;

//     doc.autoTable({
//       startY: yPosition,
//       head: [['Total Days', 'Present', 'Absent', 'Late', 'Excused', 'Attendance Rate']],
//       body: [[
//         attendanceData.total_days || 0,
//         attendanceData.present_days || 0,
//         attendanceData.absent_days || 0,
//         attendanceData.late_days || 0,
//         attendanceData.excused_days || 0,
//         `${attendanceRate}%`
//       ]],
//       theme: 'grid',
//       headStyles: { fillColor: [0, 102, 204], fontSize: 9, fontStyle: 'bold' },
//       styles: { fontSize: 8, cellPadding: 3 }
//     });

//     yPosition = doc.lastAutoTable.finalY + 15;

//     // Detailed Grades by Subject
//     if (yPosition > pageHeight - 40) {
//       doc.addPage();
//       yPosition = 20;
//     }

//     doc.setFontSize(12);
//     doc.setFont(undefined, 'bold');
//     doc.text('DETAILED ASSESSMENT BREAKDOWN', 20, yPosition);
//     yPosition += 5;

//     Object.entries(reportData.subjects).forEach(([subjectName, subjectData]) => {
//       if (yPosition > pageHeight - 50) {
//         doc.addPage();
//         yPosition = 20;
//       }

//       doc.setFontSize(10);
//       doc.setFont(undefined, 'bold');
//       doc.text(`${subjectName} - ${subjectData.teacher}`, 20, yPosition);
//       yPosition += 5;

//       const gradeDetails = subjectData.grades.map(g => [
//         g.type,
//         g.date,
//         `${g.score}/${g.max_score}`,
//         `${g.percentage}%`,
//         g.comments || '-'
//       ]);

//       doc.autoTable({
//         startY: yPosition,
//         head: [['Type', 'Date', 'Score', 'Percentage', 'Comments']],
//         body: gradeDetails,
//         theme: 'striped',
//         headStyles: { fillColor: [51, 51, 51], fontSize: 8 },
//         styles: { fontSize: 7, cellPadding: 2 },
//         columnStyles: {
//           0: { cellWidth: 30 },
//           1: { cellWidth: 25 },
//           2: { cellWidth: 20 },
//           3: { cellWidth: 20 },
//           4: { cellWidth: 80 }
//         }
//       });

//       yPosition = doc.lastAutoTable.finalY + 8;
//     });

//     // Footer
//     const totalPages = doc.internal.getNumberOfPages();
//     for (let i = 1; i <= totalPages; i++) {
//       doc.setPage(i);
//       doc.setFontSize(8);
//       doc.setFont(undefined, 'italic');
//       doc.text(
//         `Generated on ${reportData.generated_date} | Page ${i} of ${totalPages}`,
//         pageWidth / 2,
//         pageHeight - 10,
//         { align: 'center' }
//       );
//     }

//     // Save PDF
//     const fileName = `Report_${reportData.student.student_number}_${reportData.academic_year.replace('/', '-')}.pdf`;
//     doc.save(fileName);
//   };

//   const generateClassPDFs = async (classData) => {
//     const { jsPDF } = await import('jspdf');
//     await import('jspdf-autotable');

//     for (const reportData of classData.reports) {
//       await generateSinglePDF(reportData);
//       // Add small delay to prevent overwhelming the browser
//       await new Promise(resolve => setTimeout(resolve, 500));
//     }

//     alert(`Successfully generated ${classData.total_reports} reports!`);
//   };

//   const getGrade = (percentage) => {
//     if (percentage >= 90) return 'A+';
//     if (percentage >= 80) return 'A';
//     if (percentage >= 70) return 'B';
//     if (percentage >= 60) return 'C';
//     if (percentage >= 50) return 'D';
//     return 'F';
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
//           <div className="flex justify-between items-center">
//             <div>
//               <h2 className="text-2xl font-bold">📊 Generate Progress Report</h2>
//               <p className="text-blue-100 text-sm mt-1">Create comprehensive student reports</p>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all"
//             >
//               <span className="text-2xl">×</span>
//             </button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* Loading State */}
//           {loading && (
//             <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg flex items-center">
//               <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//               </svg>
//               Loading...
//             </div>
//           )}

//           {/* Error Display */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//               <div className="flex items-start">
//                 <span className="text-xl mr-2">⚠️</span>
//                 <div className="flex-1">
//                   <p className="font-semibold">Error</p>
//                   <p className="text-sm mt-1">{error}</p>
//                   <button
//                     onClick={fetchClasses}
//                     className="mt-2 text-sm underline hover:no-underline"
//                   >
//                     Try Again
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Debug Info (only in development) */}
//           {process.env.NODE_ENV === 'development' && debugInfo && (
//             <details className="bg-gray-50 border border-gray-200 rounded-lg p-3">
//               <summary className="cursor-pointer text-sm font-semibold text-gray-700">
//                 Debug Info (Dev Mode)
//               </summary>
//               <pre className="text-xs mt-2 overflow-auto">{debugInfo}</pre>
//             </details>
//           )}

//           {/* School Name */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               School Name
//             </label>
//             <input
//               type="text"
//               value={schoolName}
//               onChange={(e) => setSchoolName(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Enter school name"
//             />
//           </div>

//           {/* Report Type */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Report Type
//             </label>
//             <div className="grid grid-cols-2 gap-4">
//               <button
//                 onClick={() => setReportType('single')}
//                 className={`p-4 rounded-lg border-2 transition-all ${
//                   reportType === 'single'
//                     ? 'border-blue-500 bg-blue-50 text-blue-700'
//                     : 'border-gray-200 hover:border-blue-300'
//                 }`}
//               >
//                 <div className="text-3xl mb-2">👤</div>
//                 <div className="font-semibold">Single Student</div>
//                 <div className="text-xs text-gray-500 mt-1">Generate one report</div>
//               </button>
//               <button
//                 onClick={() => setReportType('class')}
//                 className={`p-4 rounded-lg border-2 transition-all ${
//                   reportType === 'class'
//                     ? 'border-blue-500 bg-blue-50 text-blue-700'
//                     : 'border-gray-200 hover:border-blue-300'
//                 }`}
//               >
//                 <div className="text-3xl mb-2">👥</div>
//                 <div className="font-semibold">Entire Class</div>
//                 <div className="text-xs text-gray-500 mt-1">Generate all reports</div>
//               </button>
//             </div>
//           </div>

//           {/* Academic Year */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Academic Year <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={academicYear}
//               onChange={(e) => setAcademicYear(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">Select Academic Year</option>
//               {academicYears.map(year => (
//                 <option key={year} value={year}>{year}</option>
//               ))}
//             </select>
//           </div>

//           {/* Semester */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Semester (Optional)
//             </label>
//             <select
//               value={semester}
//               onChange={(e) => setSemester(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">Full Year</option>
//               <option value="Semester 1">Semester 1</option>
//               <option value="Semester 2">Semester 2</option>
//               <option value="Semester 3">Semester 3</option>
//             </select>
//           </div>

//           {/* Class Selection */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Class <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={selectedClass}
//               onChange={(e) => setSelectedClass(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               disabled={classes.length === 0}
//             >
//               <option value="">
//                 {classes.length === 0 ? 'No classes available' : 'Select Class'}
//               </option>
//               {classes.map(cls => (
//                 <option key={cls.id} value={cls.id}>
//                   {cls.class_name} {cls.grade_level ? `- ${cls.grade_level}` : ''} 
//                   {` (${cls.enrolled_students} students)`}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Student Selection (only for single report) */}
//           {reportType === 'single' && selectedClass && (
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Student <span className="text-red-500">*</span>
//               </label>
//               <select
//                 value={selectedStudent}
//                 onChange={(e) => setSelectedStudent(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 disabled={students.length === 0}
//               >
//                 <option value="">
//                   {students.length === 0 ? 'No students in this class' : 'Select Student'}
//                 </option>
//                 {students.map(student => (
//                   <option key={student.id} value={student.id}>
//                     {student.firstname} {student.lastname} - {student.student_number}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* Info Box */}
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//             <div className="flex items-start space-x-3">
//               <span className="text-2xl">ℹ️</span>
//               <div className="text-sm text-blue-800">
//                 <p className="font-semibold mb-1">Report will include:</p>
//                 <ul className="list-disc list-inside space-y-1">
//                   <li>Student information and class position</li>
//                   <li>Subject-wise performance with teacher details</li>
//                   <li>Attendance summary</li>
//                   <li>Detailed assessment breakdown</li>
//                   <li>Overall grade and remarks</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Generate Button */}
//           <button
//             onClick={handleGenerateReport}
//             disabled={generating || classes.length === 0}
//             className={`w-full py-4 rounded-lg font-bold text-white transition-all ${
//               generating || classes.length === 0
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
//             }`}
//           >
//             {generating ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                 </svg>
//                 Generating Report...
//               </span>
//             ) : (
//               <span className="flex items-center justify-center">
//                 <span className="text-xl mr-2">📄</span>
//                 Generate {reportType === 'class' ? 'Class Reports' : 'Report'}
//               </span>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentReportGenerator;








import React, { useState, useEffect } from 'react';
import { X, FileText, User, Users, AlertCircle, Loader2, Send } from 'lucide-react';
import { get, post } from '../../utils/api';

const f = "w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all appearance-none placeholder:text-slate-400";

const StudentReportGenerator = ({ onClose }) => {
  const [loading, setLoading]               = useState(false);
  const [generating, setGenerating]         = useState(false);
  const [reportType, setReportType]         = useState('single');
  const [classes, setClasses]               = useState([]);
  const [students, setStudents]             = useState([]);
  const [selectedClass, setSelectedClass]   = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [academicYear, setAcademicYear]     = useState('');
  const [semester, setSemester]             = useState('');
  const [schoolName, setSchoolName]         = useState('edu-app');
  const [error, setError]                   = useState('');
  const [debugInfo, setDebugInfo]           = useState('');

  const currentYear   = new Date().getFullYear();
  const academicYears = Array.from({ length: 5 }, (_, i) => `${currentYear - 2 + i}`);

  useEffect(() => { fetchClasses(); }, []);
  useEffect(() => { if (selectedClass) fetchStudents(selectedClass); }, [selectedClass]);

  const fetchClasses = async () => {
    setLoading(true); setError(''); setDebugInfo('Fetching classes...');
    try {
      const response = await get('/api/common/get_classes.php');
      const data     = await response.json();
      setDebugInfo(`Loaded ${data.data?.length || 0} classes`);
      if (data.success) {
        setClasses(data.data || []);
        if (!data.data?.length) setError('No classes found. Please add classes first.');
      } else throw new Error(data.message || 'Unknown error');
    } catch (err) {
      setError(err.message.includes('Failed to fetch')
        ? 'Cannot connect to server. Make sure the PHP server is running.'
        : `Failed to load classes: ${err.message}`);
    } finally { setLoading(false); }
  };

  const fetchStudents = async (classId) => {
    setLoading(true); setError('');
    try {
      const response = await get(`/api/admin/get_students.php?class_id=${classId}`);
      const data     = await response.json();
      if (data.success) {
        setStudents(data.data || []);
        if (!data.data?.length) setError('No students found in this class.');
      } else throw new Error(data.message || 'Failed to load students');
    } catch (err) {
      setError(`Failed to load students: ${err.message}`);
    } finally { setLoading(false); }
  };

  const handleGenerateReport = async () => {
    setError('');
    if (!academicYear)                              return setError('Please select an academic year');
    if (reportType === 'single' && !selectedStudent) return setError('Please select a student');
    if (reportType === 'class'  && !selectedClass)   return setError('Please select a class');
    setGenerating(true);
    try {
      const response = await post('/api/admin/generate_report.php', {
        report_type: reportType,
        student_id:  reportType === 'single' ? selectedStudent : null,
        class_id: selectedClass, academic_year: academicYear,
        semester, school_name: schoolName,
      });
      const data = await response.json();
      if (data.success) {
        if (reportType === 'single') await generateSinglePDF(data.data);
        else await generateClassPDFs(data.data);
      } else setError(data.message || 'Failed to generate report');
    } catch (err) {
      setError(err.message || 'Failed to generate report');
    } finally { setGenerating(false); }
  };

  const getGrade = (pct) => {
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B';
    if (pct >= 60) return 'C';
    if (pct >= 50) return 'D';
    return 'F';
  };

  const generateSinglePDF = async (reportData) => {
    const { jsPDF } = await import('jspdf');
    await import('jspdf-autotable');
    const doc = new jsPDF();
    const pw  = doc.internal.pageSize.getWidth();
    const ph  = doc.internal.pageSize.getHeight();
    let y = 20;

    doc.setFontSize(20); doc.setFont(undefined, 'bold');
    doc.text(reportData.school_name, pw / 2, y, { align: 'center' });
    y += 10;
    doc.setFontSize(14);
    doc.text('STUDENT PROGRESS REPORT', pw / 2, y, { align: 'center' });
    y += 8;
    doc.setFontSize(10); doc.setFont(undefined, 'normal');
    doc.text(`Academic Year: ${reportData.academic_year}${reportData.semester ? ' - ' + reportData.semester : ''}`, pw / 2, y, { align: 'center' });
    y += 15;

    doc.setDrawColor(0, 102, 204); doc.setLineWidth(0.5);
    doc.rect(15, y - 5, pw - 30, 35);
    doc.setFontSize(10); doc.setFont(undefined, 'bold');
    doc.text('Student Information', 20, y); y += 8;
    doc.setFont(undefined, 'normal');
    doc.text(`Name: ${reportData.student.firstname} ${reportData.student.lastname}`, 20, y);
    doc.text(`Student No: ${reportData.student.student_number}`, pw / 2, y); y += 6;
    doc.text(`Class: ${reportData.student.class_name}`, 20, y);
    doc.text(`Gender: ${reportData.student.gender || 'N/A'}`, pw / 2, y); y += 6;
    doc.text(`Position: ${reportData.position} of ${reportData.total_students}`, 20, y);
    doc.text(`Overall Average: ${reportData.overall_average}%`, pw / 2, y); y += 6;
    doc.text(`Grade: ${reportData.grade_interpretation.grade}`, 20, y);
    doc.text(`Remark: ${reportData.grade_interpretation.remark}`, pw / 2, y); y += 15;

    doc.setFontSize(12); doc.setFont(undefined, 'bold');
    doc.text('ACADEMIC PERFORMANCE', 20, y); y += 5;
    doc.autoTable({
      startY: y,
      head: [['Subject','Code','Teacher','Score','Average','Grade']],
      body: Object.entries(reportData.subjects).map(([name, s]) => [
        name, s.subject_code, s.teacher, `${s.total_score}/${s.total_max}`, `${s.average}%`, getGrade(s.average)
      ]),
      theme: 'grid',
      headStyles: { fillColor: [0,102,204], fontSize: 9, fontStyle: 'bold' },
      styles: { fontSize: 8, cellPadding: 3 },
      columnStyles: { 0:{cellWidth:45},1:{cellWidth:20},2:{cellWidth:40},3:{cellWidth:25},4:{cellWidth:25},5:{cellWidth:20} }
    });
    y = doc.lastAutoTable.finalY + 10;

    if (y > ph - 60) { doc.addPage(); y = 20; }
    doc.setFontSize(12); doc.setFont(undefined, 'bold');
    doc.text('ATTENDANCE SUMMARY', 20, y); y += 5;
    const att  = reportData.attendance;
    const rate = att.total_days > 0 ? ((att.present_days / att.total_days) * 100).toFixed(1) : 0;
    doc.autoTable({
      startY: y,
      head: [['Total Days','Present','Absent','Late','Excused','Rate']],
      body: [[att.total_days||0, att.present_days||0, att.absent_days||0, att.late_days||0, att.excused_days||0, `${rate}%`]],
      theme: 'grid',
      headStyles: { fillColor: [0,102,204], fontSize: 9, fontStyle: 'bold' },
      styles: { fontSize: 8, cellPadding: 3 }
    });
    y = doc.lastAutoTable.finalY + 15;

    if (y > ph - 40) { doc.addPage(); y = 20; }
    doc.setFontSize(12); doc.setFont(undefined, 'bold');
    doc.text('DETAILED ASSESSMENT BREAKDOWN', 20, y); y += 5;
    Object.entries(reportData.subjects).forEach(([name, s]) => {
      if (y > ph - 50) { doc.addPage(); y = 20; }
      doc.setFontSize(10); doc.setFont(undefined, 'bold');
      doc.text(`${name} - ${s.teacher}`, 20, y); y += 5;
      doc.autoTable({
        startY: y,
        head: [['Type','Date','Score','%','Comments']],
        body: s.grades.map(g => [g.type, g.date, `${g.score}/${g.max_score}`, `${g.percentage}%`, g.comments || '-']),
        theme: 'striped',
        headStyles: { fillColor: [51,51,51], fontSize: 8 },
        styles: { fontSize: 7, cellPadding: 2 },
        columnStyles: { 0:{cellWidth:30},1:{cellWidth:25},2:{cellWidth:20},3:{cellWidth:20},4:{cellWidth:80} }
      });
      y = doc.lastAutoTable.finalY + 8;
    });

    const total = doc.internal.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
      doc.setPage(i); doc.setFontSize(8); doc.setFont(undefined, 'italic');
      doc.text(`Generated on ${reportData.generated_date} | Page ${i} of ${total}`, pw / 2, ph - 10, { align: 'center' });
    }
    doc.save(`Report_${reportData.student.student_number}_${reportData.academic_year.replace('/', '-')}.pdf`);
  };

  const generateClassPDFs = async (classData) => {
    for (const r of classData.reports) {
      await generateSinglePDF(r);
      await new Promise(res => setTimeout(res, 500));
    }
    alert(`Successfully generated ${classData.total_reports} reports!`);
  };

  const isReady = academicYear &&
    (reportType === 'class' ? !!selectedClass : !!selectedStudent) &&
    !generating && classes.length > 0;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Generate Progress Report</h2>
              <p className="text-[10px] text-slate-400">Create comprehensive student reports</p>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <X className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto max-h-[80vh]">

          {/* Loading */}
          {loading && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-indigo-50 border border-indigo-100">
              <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin flex-shrink-0" />
              <span className="text-xs font-semibold text-indigo-600">Loading...</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-rose-50 border border-rose-100">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-rose-700">{error}</p>
                <button onClick={fetchClasses} className="text-[10px] text-rose-500 underline mt-0.5">Try Again</button>
              </div>
            </div>
          )}

          {/* Debug */}
          {process.env.NODE_ENV === 'development' && debugInfo && (
            <details className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <summary className="cursor-pointer text-xs font-semibold text-slate-500">Debug Info</summary>
              <pre className="text-[10px] mt-2 overflow-auto text-slate-600">{debugInfo}</pre>
            </details>
          )}

          {/* School Name */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">School Name</p>
            <input type="text" value={schoolName} onChange={e => setSchoolName(e.target.value)}
              placeholder="Enter school name" className={f} />
          </div>

          {/* Report Type */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Report Type</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: 'single', icon: <User className="w-4 h-4" />, label: 'Single Student', sub: 'Generate one report' },
                { type: 'class',  icon: <Users className="w-4 h-4" />, label: 'Entire Class',   sub: 'Generate all reports' },
              ].map(({ type, icon, label, sub }) => (
                <button key={type} onClick={() => setReportType(type)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                    reportType === type
                      ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                      : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-indigo-200'
                  }`}>
                  {icon}
                  <span className="text-xs font-bold">{label}</span>
                  <span className="text-[10px] text-slate-400">{sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Academic Year */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Academic Year <span className="text-rose-400">*</span></p>
            <select value={academicYear} onChange={e => setAcademicYear(e.target.value)} className={f}>
              <option value="">Select Academic Year</option>
              {academicYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {/* Semester */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Semester <span className="text-slate-400 font-normal">(optional)</span></p>
            <select value={semester} onChange={e => setSemester(e.target.value)} className={f}>
              <option value="">Full Year</option>
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
              <option value="Semester 3">Semester 3</option>
            </select>
          </div>

          {/* Class */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Class <span className="text-rose-400">*</span></p>
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
              disabled={classes.length === 0} className={f}>
              <option value="">{classes.length === 0 ? 'No classes available' : 'Select Class'}</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.class_name}{cls.grade_level ? ` - ${cls.grade_level}` : ''} ({cls.enrolled_students} students)
                </option>
              ))}
            </select>
          </div>

          {/* Student */}
          {reportType === 'single' && selectedClass && (
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1.5">Student <span className="text-rose-400">*</span></p>
              <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}
                disabled={students.length === 0} className={f}>
                <option value="">{students.length === 0 ? 'No students in this class' : 'Select Student'}</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.firstname} {s.lastname} - {s.student_number}</option>
                ))}
              </select>
            </div>
          )}

          {/* Info */}
          <div className="px-3 py-2.5 rounded-xl bg-indigo-50 border border-indigo-100">
            <p className="text-xs font-bold text-indigo-700 mb-1.5">Report includes:</p>
            <p className="text-[10px] text-indigo-600 leading-relaxed">
              Student info & class position · Subject-wise performance · Attendance summary · Detailed assessment breakdown · Overall grade & remarks
            </p>
          </div>

          {/* Generate */}
          <button onClick={handleGenerateReport} disabled={!isReady}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors ${
              isReady
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}>
            {generating
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
              : <><Send className="w-4 h-4" /> Generate {reportType === 'class' ? 'Class Reports' : 'Report'}</>
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentReportGenerator;