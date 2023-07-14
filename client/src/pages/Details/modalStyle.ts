import ReactModal from 'react-modal';

export const modalStyle: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: '5rem',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'transparent',
    zIndex: 10,
    borderRadius: '10px',
  },
  content: {
    position: 'fixed',
    border: '1px solid var(--color-black)',
    display: 'flex',
    justifyContent: 'center',
    background: 'var(--color-pink-3)',
    overflow: 'auto',
    top: '5rem',
    left: '0',
    right: '0',
    bottom: '0',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '10px',
    outline: 'none',
    zIndex: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: 0,
  },
};
