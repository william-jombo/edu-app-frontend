// // src/components/edit/SectionHeader.jsx
// function SectionHeader({ icon: Icon, title, gradient = 'from-indigo-500 to-purple-500', textColor = 'section-header' }) {
//   return (
//     <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
//       <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white`}>
//         <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
//       </div>
//       <h4 className={`text-lg sm:text-xl font-bold heading-font ${textColor}`}>{title}</h4>
//     </div>
//   );
// }

// export default SectionHeader;




function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 pt-1">
      <div className="w-5 h-5 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-3 h-3 text-indigo-600" />
      </div>
      <p className="text-xs font-bold text-slate-600">{title}</p>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

export default SectionHeader;