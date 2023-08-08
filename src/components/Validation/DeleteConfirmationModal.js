import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteConfirmationModal = ({ show, onClose, onConfirm, itemId }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.post(`https://localhost:7271/Customer/passive/${itemId}`, {}, {
        headers: {
          'Content-Type': 'application/json', // Örneğin JSON verisi gönderiliyorsa
        },
      });
      onConfirm(); // Silme işlemi başarılı olduğunda çağrılacak işlev
    } catch (error) {
      console.error('Error deleting item:', error);
      // Silme işlemi başarısız olduğunda hata işlemleri burada yapılabilir
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
