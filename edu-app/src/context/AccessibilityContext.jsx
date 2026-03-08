import { createContext, useContext, useState } from "react";

const AccessibilityContext = createContext(null);

export const AccessibilityProvider = ({ children }) => {
  const [accessibilityEnabled, setAccessibilityEnabled] = useState(true);

  return (
    <AccessibilityContext.Provider value={{ accessibilityEnabled, setAccessibilityEnabled }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
};