import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Preview from './components/Preview';
import { initialCVData } from './sampleData';

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
  const [cvData, setCvData] = useState(initialCVData);

  const handleLoadSample = () => {
    setCvData(initialCVData);
  };

  const handleReset = () => {
    if (window.confirm("Sigurado ka bang gusto mong i-clear ang lahat ng inputs?")) {
      setCvData(emptyCVData);
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
        {/* Kaliwa: Form Editor Placeholder muna */}
        <section className="editor-panel">
          <p style={{ color: 'var(--text-muted)' }}>Dito ilalagay ang Form Editor natin...</p>
        </section>

        {/* Kanan: Live CV Preview */}
        <Preview data={cvData} />
      </div>
    </div>
  );
}

export default App;
