import React, { useState, useEffect } from 'react';
import './sb.css';

function SelectBar() {
  const [data, setData] = useState([]); // State, verileri tutmak için kullanılacak.
  const [loading, setLoading] = useState(true); // State, veriler yüklenirken gösterilecek yükleme durumu.
  const [selectedSector, setSelectedSector] = useState(''); // State, seçilen sektörü tutmak için kullanılacak.
  const [uniqueSectors, setUniqueSectors] = useState([]); // State, benzersiz sektörleri tutmak için kullanılacak.

  useEffect(() => {
    // Verileri almak için fetch isteği yaparız.
    fetch('https://localhost:7271/api/customers')
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Verileri state'e kaydedelim.
        const uniqueCompanySectors = getUniqueCompanySectors(data); // Get unique company sectors
        const sortedCompanySectors = sortCompanySectors(uniqueCompanySectors); // Sort the sectors alphabetically
        setUniqueSectors(sortedCompanySectors);
        setLoading(false); // Yükleme tamamlandı, yükleme durumunu false yapalım.
      })
      .catch((error) => {
        console.error('Veriler alınırken bir hata oluştu:', error);
        setLoading(false); // Hata durumunda da yükleme tamamlandı, yükleme durumunu false yapalım.
      });
  }, []);

  // Helper function to get unique company sectors
  const getUniqueCompanySectors = (data) => {
    const sectorSet = new Set();
    data.forEach((item) => {
      sectorSet.add(item.companySector);
    });
    return Array.from(sectorSet);
  };

  // Helper function to sort company sectors alphabetically
  const sortCompanySectors = (data) => {
    return data.sort((a, b) => a.localeCompare(b));
  };

  // Function to handle sector selection
  const handleSectorChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSector(selectedValue);
  };

  // Yükleme sürecindeyken kullanıcıya bir yükleme mesajı gösterelim.
  if (loading) {
    return <div>Loading...</div>;
  }

  // Veriler alındıktan sonra select box'u oluşturalım.
  return (

<div className='mehmet' style={{ maxHeight: '400px', overflowY: 'auto' }}>
  <h2 className='company2' htmlFor="companySector">Company Sector</h2>
  <select class="form-select" aria-label="Default select example" id="companySector" onChange={handleSectorChange} value={selectedSector}>
    <option value="">Select a sector</option>
    {uniqueSectors.map((sector, index) => (
      <option key={index} value={sector}>
        {sector}
      </option>
    ))}
  </select>

  {selectedSector  && (
    <div className='dacia'>
      <h2 className='kamil'> {selectedSector}</h2>
      <ul>
        {data
          .filter((item) => item.companySector === selectedSector)
          .map((company, index) => (
            <li key={index}>{company.companyName}</li>
          ))}
      </ul>
    </div>
  )}
</div>

 
  );
}

export default SelectBar;