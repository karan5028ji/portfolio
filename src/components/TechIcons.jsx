import React from 'react';

export const ReactIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.8" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
  </svg>
);

export const PythonIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.91 2C6.88 2 7.21 4.18 7.21 4.18L7.22 6.46H12.06V7.17H5.27S2 6.8 2 11.85C2 16.9 4.86 16.66 4.86 16.66H6.57V14.25S6.48 11.37 9.4 11.37H14.18S16.96 11.47 16.96 8.7V4.24S17.3 2 11.91 2ZM9.37 3.38A0.82 0.82 0 1 1 8.55 4.2A0.82 0.82 0 0 1 9.37 3.38Z" opacity="0.9" />
    <path d="M12.09 22C17.12 22 16.79 19.82 16.79 19.82L16.78 17.54H11.94V16.83H18.73S22 17.2 22 12.15C22 7.1 19.14 7.34 19.14 7.34H17.43V9.75S17.52 12.63 14.6 12.63H9.82S7.04 12.53 7.04 15.3V19.76S6.7 22 12.09 22ZM14.63 20.62A0.82 0.82 0 1 1 15.45 19.8A0.82 0.82 0 0 1 14.63 20.62Z" opacity="0.65" />
  </svg>
);

export const CppIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M10 9a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3" />
    <path d="M14 12h2" />
    <path d="M15 11v2" />
    <path d="M18 12h2" />
    <path d="M19 11v2" />
  </svg>
);

export const ThreejsIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L2 7l10 5 10-5-10-5Z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
    <line x1="12" y1="22" x2="12" y2="12" strokeDasharray="1 1" />
  </svg>
);

export const TailwindIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
  </svg>
);

export const JavaScriptIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M8 16c0 1.5 1 2 2.5 2s2.5-.5 2.5-2v-6" />
    <path d="M18 13.5c0-.8-.7-1.5-1.5-1.5h-1c-.8 0-1.5-.7-1.5-1.5v0c0-.8.7-1.5 1.5-1.5h2" />
    <path d="M14 16.5c0 .8.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5v0c0-.8-.7-1.5-1.5-1.5h-2" />
  </svg>
);

export const AudioEngineeringIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 10v4" />
    <path d="M8 6v12" />
    <path d="M12 3v18" />
    <path d="M16 8v8" />
    <path d="M20 11v2" />
    <circle cx="8" cy="10" r="1.5" fill="currentColor" />
    <circle cx="16" cy="14" r="1.5" fill="currentColor" />
  </svg>
);

export const TerminalSystemsIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M7 9l3 3-3 3" />
    <path d="M13 15h4" />
  </svg>
);
