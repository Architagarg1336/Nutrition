import React from 'react';

export const Select = React.forwardRef(({ children, className, ...props }, ref) => (
  <select
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    ref={ref}
    {...props}
  >
    {children}
  </select>
));