// // src/components/manage/FormSelector.jsx
// function FormSelector({ forms, selectedForm, onFormClick, studentCounts }) {
//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
//       {forms.map((form, index) => (
//         <button
//           key={form.number}
//           onClick={() => onFormClick(form.number)}
//           className={`form-card bg-gradient-to-br ${form.color} text-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all ${
//             selectedForm === form.number ? 'selected ring-4 ring-white ring-opacity-50' : ''
//           } animate-fade-in`}
//           style={{ animationDelay: `${index * 0.1}s` }}
//         >
//           <div className="text-center">
//             <div className="text-3xl sm:text-4xl mb-2 animate-pulse-subtle">{form.icon}</div>
//             <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">{form.name}</h4>
//             <p className="text-xs sm:text-sm opacity-90">
//               {selectedForm === form.number ? '✓ Selected' : 'Click to view'}
//             </p>
//             {selectedForm === form.number && studentCounts[form.number] > 0 && (
//               <div className="mt-2 bg-white bg-opacity-20 rounded-full px-3 py-1 text-xs font-bold">
//                 {studentCounts[form.number]} Student{studentCounts[form.number] !== 1 ? 's' : ''}
//               </div>
//             )}
//           </div>
//         </button>
//       ))}
//     </div>
//   );
// }

// export default FormSelector;



function FormSelector({ forms, selectedForm, onFormClick, studentCounts }) {
  const colors = [
    { tile: 'bg-indigo-600', ring: 'ring-indigo-300' },
    { tile: 'bg-emerald-600', ring: 'ring-emerald-300' },
    { tile: 'bg-violet-600',  ring: 'ring-violet-300' },
    { tile: 'bg-amber-500',   ring: 'ring-amber-300'  },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
      {forms.map((form, index) => {
        const active = selectedForm === form.number;
        const { tile, ring } = colors[index] || colors[0];
        const count = studentCounts[form.number];
        return (
          <button key={form.number} onClick={() => onFormClick(form.number)}
            className={`flex flex-col items-center gap-1.5 py-4 px-3 rounded-2xl border-2 transition-all ${
              active
                ? `${tile} border-transparent text-white ring-2 ${ring}`
                : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/40'
            }`}>
            <p className={`text-sm font-black ${active ? 'text-white' : 'text-slate-700'}`}>{form.name}</p>
            <p className={`text-[10px] font-semibold ${active ? 'text-white/80' : 'text-slate-400'}`}>
              {active && count != null ? `${count} student${count !== 1 ? 's' : ''}` : 'Click to view'}
            </p>
          </button>
        );
      })}
    </div>
  );
}

export default FormSelector;