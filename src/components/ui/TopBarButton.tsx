import React from 'react';
interface TopBarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  ariaControls?: string;
}
// Refactor to forward ref
const TopBarButton = React.forwardRef<HTMLButtonElement, TopBarButtonProps>(
  ({
    active = false,
    className,
    ariaControls,
    children,
    ...props
  }, ref) => {
    const baseStyle = 'p-2 rounded-full transition-colors hover:bg-neutral-200/60 dark:hover:bg-neutral-700/50 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/70';
    const activeStyle = 'text-white bg-blue-600 shadow focus:ring-2 focus:ring-blue-500/50';
    return (
      <button
        ref={ref}
        className={`${baseStyle} ${active ? activeStyle : 'text-gray-400 dark:text-gray-500'} ${className || ''}`}
        aria-pressed={active}
        aria-controls={ariaControls}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TopBarButton.displayName = 'TopBarButton';
export default TopBarButton;