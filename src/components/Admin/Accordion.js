import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './acc.css';
import posed from 'react-pose';

posed.div({
  visible: {
    opacity: 1,
    transition: { duration: 300 }
  }
})
function Accordion() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
  }, []);

  function fetchData() {
    return axios
      .get('https://localhost:7271/api/customers')
      .then((response) => {
        const companyBySector = {};

        response.data.forEach((item) => {
          const sector = item.companySector;
          if (!companyBySector[sector]) {
            companyBySector[sector] = [];
          }
          companyBySector[sector].push(item.companyName);
        });

        const sectors = Object.keys(companyBySector).map((sector) => ({
          question: sector,
          answer: companyBySector[sector].join(', '), // Concatenate company names with a comma
        }));

        return sectors;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        return [];
      });
  }
  const sortSectors = (sectors) => {
    return sectors.sort((a, b) => a.question.localeCompare(b.question));
  };

  const toggle = (i) => {
    if (selected === i) {
      console.log('Closing sector:', data[i].question);
      return setSelected(null);
    }
    console.log('Opening sector:', data[i].question);
    setSelected(i);
  };

  return (
    <div style={{ height: '640px', maxHeight: '1000px', overflowY: 'auto' }}>
    <div className='container'>
      <div className='row'>
        <div className='wraper'>
          <div className='accordion'>
            {sortSectors(data).map((item, i) => (
              <div className='item' key={i}>
                <div className='title' onClick={() => toggle(i)}>
                  <h2>{item.question}</h2>
                  <span>{selected === i ? '-' : '+'}</span>
                </div>
                {selected === i && (
                  <div className='content2'>
                    <ul>
                      {item.answer.split(', ').map((company, index) => (
                        <li key={index}>{company}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Accordion;