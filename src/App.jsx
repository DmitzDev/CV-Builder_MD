import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Preview from './components/Preview';
import { initialCVData } from './sampleData';
import Editor from './components/Editor';

const emptyCVData = {
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: ""
  },
  experience: [],
  education: [],
  skills: []
};

function App() {
  const [cvData, setCvData] = useState(() => {
    const saved = localStorage.getItem('minimalist_cv_data');
    return saved ? JSON.parse(saved) : initialCVData;
  });

  // Kusa itong magse-save sa browser sa bawat pindot
  useEffect(() => {
    localStorage.setItem('minimalist_cv_data', JSON.stringify(cvData));
  }, [cvData]);

  const handleLoadSample = () => {
    setCvData(initialCVData);
  };

  const handleReset = () => {
    if (window.confirm("Sigurado ka bang gusto mong i-clear ang lahat ng inputs?")) {
      setCvData(emptyCVData);
      localStorage.removeItem('minimalist_cv_data');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-container">
      <Navbar
        onLoadSample={handleLoadSample}
        onReset={handleReset}
        onPrint={handlePrint}
      />

      <div className="main-workspace">
        <Editor data={cvData} onChange={setCvData} />
        <Preview data={cvData} />
      </div>
    </div>
  );
}

export default App;
