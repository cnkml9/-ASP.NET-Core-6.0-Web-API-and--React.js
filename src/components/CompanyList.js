import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CompanyList() {
  const [customerSize, setCustomerSize] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7271/CustomerSize');
      setCustomerSize(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Customer Size</h5>
              <p className="card-text">{customerSize}</p>
            </div>
          </div>
        </div>
        {/* Diğer kartları buraya ekleyebilirsiniz */}
      </div>
    </div>
  );
}

export default CompanyList;
