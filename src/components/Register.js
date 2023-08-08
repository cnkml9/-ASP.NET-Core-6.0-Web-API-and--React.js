import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Hata durumunda gösterilecek mesajı depolamak için kullanılan durum

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { userName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      setErrorMessage('Passwords do not match!');
      return;
    }

    // Reset password mismatch flag if passwords match
    setPasswordMismatch(false);
    setErrorMessage(''); // Hata mesajını temizle

    if (!userName || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill all fields.'); // Tüm alanların doldurulması gerektiği uyarısı
      return;
    }

    // Create an object to send to the API
    const user = {
      userName,
      email,
      password,
    };

    axios
      .post('https://localhost:7271/register', user)
      .then((response) => {
        if (response.data.success) {
          setIsRegistered(true);
          setIsSuccess(true);
        } else {
          setIsRegistered(true);
          setIsSuccess(true);
        }
      })
      .catch((error) => {
        console.error('Network Error:', error);
        setIsSuccess(false);
        setErrorMessage('Network error. Please try again later.'); // Ağ hatası durumunda kullanıcıya uygun bir mesaj göster
      });
  };

  if (isRegistered) {
    return (
      <div className="container mt-5" >
        <div className="row justify-content-center">
          <div className="col-md-4">
            {isSuccess ? (
              <div>
                <h4 className="text-center mb-4">Congratulations!</h4>
                <p className="text-center">You have successfully registered.</p>
                <div className="text-center mb-4">
                <Link to="/Login"> click this </Link>   to login 
              </div>
              </div>
            ) : (
              <div>
                <h4 className="text-center mb-4">Registration Failed</h4>
                <p className="text-center">{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{    marginBottom: 270}}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div>
            <h4 className="text-center mb-4">Register</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              {passwordMismatch && <p style={{ color: 'red', marginBottom: '10px' }}></p>}
              {errorMessage && <p style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</p>}
              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            <div className="mt-3">
              All ready have an account? <Link to="/Login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;