import React from 'react';

export const GamepadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="12" x2="18" y2="12" />
        <line x1="12" y1="6" x2="12" y2="18" />
        <path d="M17.03 12.47a2.5 2.5 0 0 0-2.98-2.98" />
        <path d="M6.97 12.47a2.5 2.5 0 0 1 0-4.95" />
        <path d="M12.47 17.03a2.5 2.5 0 0 0 4.95 0" />
        <path d="M12.47 6.97a2.5 2.5 0 0 1-2.98 2.98" />
        <path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z" />
    </svg>
);

export const CircuitBoardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
        <path d="M6 12h4m-2-2v4"></path>
        <path d="M14 8h.01"></path><path d="M14 16h.01"></path><path d="M18 12h.01"></path>
        <path d="M6 6h.01"></path><path d="M18 6h.01"></path><path d="M6 18h.01"></path><path d="M18 18h.01"></path>
    </svg>
);

export const BrainCircuitIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2.5 2.5 0 0 0-2.5 2.5v.75a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 0 3.5 10v4A2.5 2.5 0 0 0 6 16.5h1a2.5 2.5 0 0 1 2.5 2.5v.75a2.5 2.5 0 0 0 2.5 2.5h.01a2.5 2.5 0 0 0 2.5-2.5v-.75a2.5 2.5 0 0 1 2.5-2.5h1A2.5 2.5 0 0 0 20.5 14v-4A2.5 2.5 0 0 0 18 7.5h-1a2.5 2.5 0 0 1-2.5-2.5V4.25A2.5 2.5 0 0 0 12 2Z"></path>
        <path d="M12 11.5v1"></path><path d="M10 10.5v1"></path><path d="M14 10.5v1"></path>
        <path d="M10 14.5v-1"></path><path d="M14 14.5v-1"></path>
    </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
);

export const TeacherIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20c0-2.21-1.79-4-4-4s-4 1.79-4 4"></path>
        <path d="M12 11v5"></path><path d="M12 3a5 5 0 0 0-5 5v3h10v-3a5 5 0 0 0-5-5Z"></path>
    </svg>
);

export const AdminIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-6 h-6"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-5 h-5"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-5 h-5"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

export const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-5 h-5"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);

export const ControllerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/>
        <path d="M17.5 15c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
        <path d="M4 6c-1.25 1.25-2 2.88-2 4.5S2.75 13.25 4 14.5l1-1c-.75-.75-1.2-1.7-1.2-2.5s.45-1.75 1.2-2.5Z"/>
        <path d="M19 5l1 1c.75.75 1.2 1.7 1.2 2.5s-.45 1.75-1.2 2.5l-1 1c1.25-1.25 2-2.88 2-4.5s-.75-3.25-2-4.5Z"/>
    </svg>
);

export const HelpCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);

export const HandRockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13V9a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1z" /><path d="M16 9h1a2 2 0 1 1 0 4h-1" /><path d="M12 9h1a2 2 0 1 1 0 4h-1" /><path d="M6 13V9a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4c0 .55.45 1 1 1h1c.55 0 1-.45 1-1z" /><path d="M9 13V9a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v4c0 .55.45 1 1 1h1c.55 0 1-.45 1-1z" /><path d="M4 16.5A2.5 2.5 0 0 1 6.5 19H18a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 20.5v-4Z" />
    </svg>
);

export const HandPaperIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 16.5V9a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v7.5c0 .83.67 1.5 1.5 1.5H11a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 20.5v-10A2.5 2.5 0 0 1 6.5 8H11a2 2 0 0 1 2 2v6.5" /><path d="M18 13.5V9a1 1 0 0 0-1-1h-1.5a1.5 1.5 0 0 0-1.5 1.5V13" /><path d="M8 12h3" />
    </svg>
);

export const HandScissorsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 16.5V9a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v7.5c0 .83.67 1.5 1.5 1.5H11a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 20.5v-10A2.5 2.5 0 0 1 6.5 8H11a2 2 0 0 1 2 2v6.5" /><path d="M16 13.5V9a1 1 0 0 1 1-1h1.5a1.5 1.5 0 0 1 1.5 1.5V13" /><path d="M22 12.5a2.5 2.5 0 0 0-2.5-2.5h-1a2.5 2.5 0 0 0-2.5 2.5v1.5a1 1 0 0 0 1 1H21a1 1 0 0 0 1-1Z" />
    </svg>
);

export const HashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="9" y1="4" x2="9" y2="20" /><line x1="15" y1="4" x2="15" y2="20" />
    </svg>
);

export const ALargeSmallIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 14h-5" /><path d="M16 16v-3.5a2.5 2.5 0 0 1 5 0V16" /><path d="M18.5 12.5v3.5" /><path d="M4 6h7" /><path d="M7 4v5" />
    </svg>
);

export const ZapIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);

export const MousePointerClickIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 9 5 12 1.8-5.2L21 14Z" /><path d="M3.5 3.5 9 9" /><path d="M14.5 9.5a.5.5 0 0 1 0 1" /><path d="M11.5 12.5a.5.5 0 0 1 0 1" /><path d="M8.5 15.5a.5.5 0 0 1 0 1" /><path d="M12 21.5a.5.5 0 0 1 1 0" /><path d="M15 18.5a.5.5 0 0 1 1 0" /><path d="M18 15.5a.5.5 0 0 1 1 0" /><path d="M21 12.5a.5.5 0 0 1 1 0" />
    </svg>
);
