import React from 'react';

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <path 
      d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2ZM15 16H9V15.5C9.83 15.19 10.58 14.72 11.22 14.11C11.39 13.94 11.69 13.94 11.86 14.11C12.52 14.77 13.28 15.24 14.13 15.5V16H15ZM14 20H10V19H14V20Z" 
      fill="currentColor"
    />
  </svg>
);

export default LightbulbIcon;

