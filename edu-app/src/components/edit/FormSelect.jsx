// // src/components/edit/FormSelect.jsx
// function FormSelect({ 
//   label, 
//   name, 
//   value, 
//   onChange, 
//   options = [], 
//   required = false,
//   icon: Icon = null,
//   iconColor = 'indigo-500'
// }) {
//   return (
//     <div>
//       <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
//         {Icon && <Icon className={`w-4 h-4 text-${iconColor}`} />}
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <select
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="input-field w-full px-4 py-3 rounded-xl bg-white text-gray-800 font-medium"
//         required={required}
//       >
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default FormSelect;





function FormSelect({ label, name, value, onChange, options = [], required = false }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-600 mb-1.5">
        {label} {required && <span className="text-rose-400">*</span>}
      </p>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all appearance-none"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;