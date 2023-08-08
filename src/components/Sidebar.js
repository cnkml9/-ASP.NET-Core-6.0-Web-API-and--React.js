import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../App.css'; // Ekstra CSS dosyası
import DataTable from './DataTable';
import AddUser from './AddUser';
import AddCompany from './addCompany';
import { useNavigate } from 'react-router-dom';
import Accordion from './Admin/Accordion';
import SelectBar from './Admin/SelectBar';
import CompanyList from './CompanyList';

const Sidebar = ( ) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [content, setContent] = useState('dashboard'); // İçerik durumunu izleyin
  
  const navigate = useNavigate();
  const onLogout=()=>{
    navigate("/");
  }
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <nav
          id="sidebar"
          className={`col-md-2 ${sidebarOpen ? 'active' : ''}`}
        >
          <div className="sidebar-header">
            <h3 style={{ color: 'white' }}>Kosb</h3>
          
          </div>
          {sidebarOpen && (
            <ul className="list-unstyled components">
               <li>
                <Button variant="light"
                  block  onClick={() => handleContentChange('CompanyList')}  style={{
                    backgroundColor: content === 'CompanyList' ? '#510882' : ''
                  
                  }}>
                 Dashboard
                </Button>
              </li>
              <li>
                <Button
                  variant="light"
                  block
                  onClick={() => handleContentChange('dashboard')}
                  style={{
                    backgroundColor: content === 'dashboard' ? '#510882' : ''
                   
                  }}
                >
                  Company List
                </Button>
              </li>
 
              <li>
                <Button
                  variant="light"
                  block
                  onClick={() => handleContentChange('AddCompany')}
                  style={{
                    backgroundColor: content === 'AddCompany' ? '#510882' : ''
                  
                  }}
                >
                  Add Company
                </Button>
              </li>
          
              <li>
                <Button variant="light"
                  block  onClick={() => handleContentChange('Accordion')}  style={{
                    backgroundColor: content === 'Accordion' ? '#510882' : ''
                  
                  }}>
                 Accordion
                </Button>
              </li>
              <li>
                <Button variant="light"
                  block  onClick={() => handleContentChange('SelectBar')}  style={{
                    backgroundColor: content === 'SelectBar' ? '#510882' : ''
                  
                  }}>
                 SelectBar
                </Button>
              </li>
              <li>
                <Button variant="light"
                  block onClick={onLogout}  style={{
                    backgroundColor: content === 'addUser' ? '#510882' : ''
                  
                  }}>
                 Logout
                </Button>
              </li>
            </ul>
          )}
        </nav>
  
        {/* Content */}
        <Col md={10} className={`content ${sidebarOpen ? 'shifted' : ''}`}>
          {content === 'dashboard' && <DataTable />}
          {content === 'addUser' && <AddUser />}
          {content === 'AddCompany' && <AddCompany />}
          {content === 'Accordion' && <Accordion />}
          {content === 'SelectBar' && <SelectBar />}
          {content === 'CompanyList' && <CompanyList />}

          {/* Diğer içerikler */}
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
