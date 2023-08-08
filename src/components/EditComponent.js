import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const EditComponent = () => {
  const { id } = useParams(); // URL'den gelen ID parametresini alıyoruz
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    companyName: '',
    companyWeb: '',
    companyMail: '',
    companyTel: '',
    companySector: '',
  });

  const [errors, setErrors] = useState({
    companyName: '',
    companyWeb: '',
    companyMail: '',
    companyTel: '',
    companySector: '',
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://localhost:7271/Customer/GetById/${id}`);
      const data = response.data; // API'den gelen veriyi alıyoruz
      setFormData({
        companyName: data.companyName,
        companyWeb: data.companyWeb,
        companyMail: data.companyMail,
        companyTel: data.companyTel,
        companySector: data.companySector,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      companyName: '',
      companyWeb: '',
      companyMail: '',
      companyTel: '',
      companySector: '',
    };

    if (!formData.companyName) {
      newErrors.companyName = 'Company Name is required.';
      isValid = false;
    }

    // ... Diğer alanlar için de doğrulama kurallarını burada ekleyebilirsiniz ...

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`https://localhost:7271/api/customers/customer/update/${id}`, formData);

      if (response.status === 200) {
        console.log('Edit successful:', response.data);
        // Edit işlemi başarılı olduğunda yönlendirme veya başka bir işlem yapılabilir
        setSuccessMessage('Edit was successful. Changes have been saved.');

      } else {
        console.log('Edit failed. Validation errors:', response.data.errors);
        setErrors(response.data.errors);
      }
    } catch (error) {
      console.error('Error editing data:', error);
      setErrors({
        ...errors,
        generalError: 'An error occurred while editing. Please try again later.',
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h4 className="text-center mb-4">Edit Company</h4>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                required
              />
              {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="companyWeb" className="form-label">Company Web</label>
              <input
                type="text"
                name="companyWeb"
                value={formData.companyWeb}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="companyMail" className="form-label">Company Mail</label>
              <input
                type="email"
                name="companyMail"
                value={formData.companyMail}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="companyTel" className="form-label">Company Tel</label>
              <input
                type="text"
                name="companyTel"
                value={formData.companyTel}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="companySector" className="form-label">Company Sector</label>
              <input
                type="text"
                name="companySector"
                value={formData.companySector}
                onChange={handleChange}
                className="form-control"
                required
              />
              </div>
            <button type="submit" className="btn btn-primary mb-3">Save Changes</button>
            {errors.generalError && <div className="alert alert-danger">{errors.generalError}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditComponent;
