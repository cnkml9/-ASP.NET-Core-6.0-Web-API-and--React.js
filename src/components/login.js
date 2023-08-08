import { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap'; // Import Bootstrap components
import { useNavigate,Link } from 'react-router-dom';

const Login = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { userName, password } = formData;
    const newErrors = {};
    if (!userName) {
      newErrors.userName = 'Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios
      .post('https://localhost:7271/login', formData)
      .then((response) => {
        if (response.data.success) {
          onSuccess();
          navigate("/admin");
        } else {
          navigate("/admin");
        }
      })
      .catch((error) => {
        // Handle network errors here
        // Display user-friendly error message or redirect to error page
        setErrors({ ...errors, general: 'Login failed' });
      });
  };

  return (
    <div className="container mt-5" style={{    marginBottom: 355}}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h4 className="text-center mb-2 mt-2">Login Form</h4>
          <Form onSubmit={handleSubmit}>

            <Form.Group controlId="userName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Username"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Text className="text-danger">
              {errors.userName && `- ${errors.userName} `}
              {errors.password && `- ${errors.password}`}
              {errors.general && '- Login failed'}
            </Form.Text>
            <Button type="submit" variant="primary" className='w-100'>Login</Button>
            <div className="mt-3 ">
              Don't have an account? <Link to="/register">Register</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;