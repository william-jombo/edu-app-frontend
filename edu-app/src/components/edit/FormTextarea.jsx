// // src/components/edit/FormTextarea.jsx
// function FormTextarea({ 
//   label, 
//   name, 
//   value, 
//   onChange, 
//   rows = 3, 
//   required = false,
//   icon: Icon = null,
//   iconColor = 'indigo-500',
//   colSpan = 'sm:col-span-2'
// }) {
//   return (
//     <div className={colSpan}>
//       <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
//         {Icon && <Icon className={`w-4 h-4 text-${iconColor}`} />}
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <textarea
//         name={name}
//         value={value}
//         onChange={onChange}
//         rows={rows}
//         className="input-field w-full px-4 py-3 rounded-xl bg-white text-gray-800 font-medium resize-none"
//         required={required}
//       />
//     </div>
//   );
// }

// export default FormTextarea;






function FormTextarea({ label, name, value, onChange, rows = 3, required = false, colSpan = '' }) {
  return (
    <div className={colSpan}>
      <p className="text-xs font-semibold text-slate-600 mb-1.5">
        {label} {required && <span className="text-rose-400">*</span>}
      </p>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all resize-none"
      />
    </div>
  );
}

export default FormTextarea;