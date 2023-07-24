import ReactModal from 'react-modal';

export const modalStyle: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 'calc(100vh - 34rem)',
    left: 'calc(100vw - 20rem)',
    right: '3rem',
    bottom: '9rem',
    backgroundColor: 'transparent',
    zIndex: 10,
    borderRadius: '10px',
  },
  content: {
    position: 'fixed',
    border: '2px solid var(--color-black)',
    display: 'flex',
    justifyContent: 'center',
    background: 'var(--color-pink-3)',
    overflow: 'auto',
    top: 'calc(100vh - 40rem)',
    left: 'calc(100vw - 25rem)',
    right: '3rem',
    bottom: '9rem',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '10px',
    outline: 'none',
    zIndex: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: 0,
  },
};
