import React from 'react';
import { getViewTitle } from '../../utils/headTeacherUtils';

const HTDesktopHeader = ({ activeView }) => {
  return (
    <div className="hidden lg:block glass-effect shadow-lg px-8 py-6 animate-slide-in">
      <h2 className="text-3xl font-bold heading-font bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        {getViewTitle(activeView)}
      </h2>
    </div>
  );
};
///C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\head-teacher\HTDesktopHeader.jsx
export default HTDesktopHeader;