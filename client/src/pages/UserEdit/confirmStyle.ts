import ReactModal from 'react-modal';

export const ConfirmStyle: ReactModal.Styles = {
  overlay:{
    position: 'fixed',
  },
  content: {
    position: 'fixed',
    border: '2px solid var(--color-black)',
    display: 'flex',
    justifyContent: 'center',
    background: 'var(--color-pink-3)',
    overflow: 'scroll',
    transform: 'translate(-50%, -50%)',
    width: '30rem',
    height: '15rem',
    top: '50%',
    left: '50%',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '10px',
    outline: 'none',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: 0,
  },
};
