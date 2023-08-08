import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteConfirmationModal from './Validation/DeleteConfirmationModal';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7271/api/Customers');
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleShowDeleteModal = (id) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingId(null);
  };

  const handleConfirmDelete = () => {
    // İlgili işlemler burada yapılabilir
    fetchData(); // Silme işlemi tamamlandığında veriyi güncellemek için
    setShowDeleteModal(false);
  };

  const formatCellValue = (value) => {
    return value !== null ? value : "No Data";
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'companyName',
      headerName: 'Company Name',
      width: 200,
      valueGetter: (params) => formatCellValue(params.value),
    },
    { field: 'companyWeb', headerName: 'Company Web', width: 200,valueGetter: (params) => formatCellValue(params.value), },
    { field: 'companyMail', headerName: 'Company Mail', width: 200,valueGetter: (params) => formatCellValue(params.value), },
    { field: 'companyTel', headerName: 'Company Tel', width: 150,valueGetter: (params) => formatCellValue(params.value), },
    { field: 'companySector', headerName: 'Company Sector', width: 150,valueGetter: (params) => formatCellValue(params.value), },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <FaEdit
            style={{ cursor: 'pointer', marginRight: '30px' }}
            onClick={() => navigate('/edit/' + params.id)} 
          />
          <FaTrash
            style={{ cursor: 'pointer' }}
            onClick={() => handleShowDeleteModal(params.id)}
          />
        </div>
      ),
    }
  ];

  return (
    <div style={{ height: 680, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        itemId={deletingId}
      />
    </div>
  );
};

export default DataTable;
