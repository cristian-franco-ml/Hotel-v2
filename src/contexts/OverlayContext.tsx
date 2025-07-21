import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
export type OverlayKey = 'search' | 'notif' | 'saved' | 'settings' | 'help' | 'profile' | null;
interface OverlayContextType {
  open: OverlayKey;
  setOpen: (overlay: OverlayKey) => void;
  toggleOverlay: (overlay: OverlayKey) => void;
  closeAll: () => void;
}
export const OverlayContext = createContext<OverlayContextType>({
  open: null,
  setOpen: () => {},
  toggleOverlay: () => {},
  closeAll: () => {}
});
export const useOverlay = () => useContext(OverlayContext);
export const OverlayProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [open, setOpen] = useState<OverlayKey>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  // Toggle overlay function - if the same overlay is clicked, close it
  const toggleOverlay = (overlay: OverlayKey) => {
    if (open === overlay) {
      setOpen(null);
    } else {
      // Store the currently focused element before opening a new overlay
      previousFocusRef.current = document.activeElement as HTMLElement;
      setOpen(overlay);
    }
  };
  // Close all overlays
  const closeAll = () => {
    setOpen(null);
  };
  // Lock scroll and set inert when overlay is open
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open !== null) {
        setOpen(null);
        // Return focus to the previously focused element
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      }
    };
    // Handle slash key to open search
    const handleSlash = (e: KeyboardEvent) => {
      if (e.key === '/' && open === null && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setOpen('search');
      }
    };
    if (open !== null) {
      // Lock scroll when overlay is open
      document.body.classList.add('overflow-hidden');
    } else {
      // Remove scroll lock when overlay is closed
      document.body.classList.remove('overflow-hidden');
    }
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleSlash);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleSlash);
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);
  return <OverlayContext.Provider value={{
    open,
    setOpen,
    toggleOverlay,
    closeAll
  }}>
      {children}
    </OverlayContext.Provider>;
};