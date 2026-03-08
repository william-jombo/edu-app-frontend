// // src/components/edit/FormInput.jsx
// function FormInput({ 
//   label, 
//   name, 
//   value, 
//   onChange, 
//   type = 'text', 
//   required = false, 
//   placeholder = '', 
//   icon: Icon = null,
//   iconColor = 'indigo-500'
// }) {
//   return (
//     <div>
//       <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
//         {Icon && <Icon className={`w-4 h-4 text-${iconColor}`} />}
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="input-field w-full px-4 py-3 rounded-xl bg-white text-gray-800 font-medium placeholder:text-gray-400"
//         required={required}
//       />
//     </div>
//   );
// }

// export default FormInput;



function FormInput({ label, name, value, onChange, type = 'text', required = false, placeholder = '' }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-600 mb-1.5">
        {label} {required && <span className="text-rose-400">*</span>}
      </p>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400"
      />
    </div>
  );
}

export default FormInput;