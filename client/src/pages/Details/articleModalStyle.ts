import ReactModal from 'react-modal';

export const articleModalStyle: ReactModal.Styles = {
  overlay: {
    position: 'absolute',
    backgroundColor: 'var(--color-white)',
    top: '26rem',
    left: 'calc((100% - 46rem)/2)',
    width: '8rem',
    height: '7rem',
    zIndex: 1000,
    borderRadius: '5px',
  },
  content: {
    position: 'absolute',
    border: '1px solid var(--color-black)',
    display: 'flex',
    justifyContent: 'center',
    background: 'var(--color-white)',
    overflow: 'auto',
    top: '0',
    left: '0',
    width: '8rem',
    height: '7rem',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '5px',
    outline: 'none',
    zIndex: 1000,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: 0,
  },
};
