import Modal from 'react-modal';

export default function ImageModal({ photo, isOpen, closeModal }) {
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },

    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      backgroundColor: 'transparent',
      border: 0,
    },
  };

  Modal.setAppElement('#root');

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={closeModal}
    >
      {photo && (
        <div>
          <img src={photo.urls.regular} alt={photo.alt_description} />
        </div>
      )}
    </Modal>
  );
};