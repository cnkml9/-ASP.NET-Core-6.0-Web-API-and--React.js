import React, { useState } from 'react';
import axios from 'axios';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyWeb: '',
    companyMail: '',
    companyTel: '',
    companySector: '',
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:7271/addcustomer', formData);
      if (response.status === 200) {
        setStatusMessage('Registration successful');
      } else {
        setStatusMessage('Registration failed');
      }
    } catch (error) {
      setStatusMessage('Registration failed');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    // Clear the form fields by setting formData to empty values
    setFormData({
      companyName: '',
      companyWeb: '',
      companyMail: '',
      companyTel: '',
      companySector: '',
    });
    setStatusMessage('');
  };
  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="companyName" className="col-md-2 col-form-label">
            Company Name:
          </label>
          <div className="col-md-10">
            <input
              type="text"
              className="form-control"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="companyWeb" className="col-md-2 col-form-label">
            Company Website:
          </label>
          <div className="col-md-10">
            <input
              type="text"
              className="form-control"
              id="companyWeb"
              name="companyWeb"
              value={formData.companyWeb}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="companyMail" className="col-md-2 col-form-label">
            Company Email:
          </label>
          <div className="col-md-10">
            <input
              type="email"
              className="form-control"
              id="companyMail"
              name="companyMail"
              value={formData.companyMail}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="companyTel" className="col-md-2 col-form-label">
            Company Phone:
          </label>
          <div className="col-md-10">
            <input
              type="number"
              className="form-control"
              id="companyTel"
              name="companyTel"
              value={formData.companyTel}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="companySector" className="col-md-2 col-form-label">
            Company Sector:
          </label>
          <div className="col-md-10">
            <input
              type="text"
              className="form-control"
              id="companySector"
              name="companySector"
              value={formData.companySector}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {statusMessage && (
          <div className={`alert ${statusMessage === 'Registration successful' ? 'alert-success' : 'alert-danger'}`} role="alert">
            {statusMessage}
          </div>
        )}
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-10 d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{marginLeft: 15 }}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;