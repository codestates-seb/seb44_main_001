import ReactModal from 'react-modal';

export const AlramStyle: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 'calc(100vh - 45rem)',
    left: 'calc(100vw - 25rem)',
    right: '3rem',
    bottom: '15rem',
    backgroundColor: 'transparent',
    zIndex: 1,
    borderRadius: '10px',
  },
  content: {
    position: 'fixed',
    border: '2px solid var(--color-black)',
    display: 'flex',
    justifyContent: 'center',
    background: 'var(--color-pink-3)',
    overflow: 'scroll',
    top: 'calc(100vh - 45rem)',
    left: 'calc(100vw - 25rem)',
    right: '3rem',
    bottom: '15rem',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '10px',
    outline: 'none',
    // zIndex: 11,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: 0,
  },
};
