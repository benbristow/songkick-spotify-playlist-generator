import React   from 'react';
import * as classNames from 'classnames';

export const Button = ({ children, icon, disabled, theme, size, block, type, loading, onClick }) => {
  const buttonClass = classNames('btn', 'text-light', {
    [`btn-${theme}`]: theme,
    [`btn-${size}`]: size,
    'btn-block': block
  });

  const iconClass = icon ? `fa fa-${icon}` : null;

  const buttonIcon = () => {
    if (loading) {
      return (
        <div className="btn__spinner spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    if (iconClass) {
      return <i className={iconClass}></i>
    }

    return null;
  };
    
  return (
    <button className={buttonClass} disabled={disabled || loading} type={type ?? 'button'} onClick={onClick}>
      {buttonIcon()} { loading ? 'Please wait...' : children }
    </button>
  );
}