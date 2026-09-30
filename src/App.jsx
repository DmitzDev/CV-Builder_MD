import React, { useState, useEffect } from 'react';
import { PenTool, Eye } from 'lucide-react';
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
  skills: [],
  projects: []
};

function App() {
  const [template, setTemplate] = useState(() => {
    return localStorage.getItem('minimalist_cv_layout') || 'single';
  });

  useEffect(() => {
    localStorage.setItem('minimalist_cv_layout', template);
  }, [template]);

  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem('minimalist_cv_theme') || '#0f172a';
  });

  useEffect(() => {
    localStorage.setItem('minimalist_cv_theme', themeColor);
  }, [themeColor]);

  // Typography font state: 'sans' or 'serif'
  const [font, setFont] = useState(() => {
    return localStorage.getItem('minimalist_cv_font') || 'sans';
  });

  useEffect(() => {
    localStorage.setItem('minimalist_cv_font', font);
  }, [font]);

  const [cvData, setCvData] = useState(() => {
    const saved = localStorage.getItem('minimalist_cv_data');
    return saved ? JSON.parse(saved) : initialCVData;
  });

  useEffect(() => {
    localStorage.setItem('minimalist_cv_data', JSON.stringify(cvData));
  }, [cvData]);

  // Mobile View Switcher: 'edit' or 'preview'
  const [mobileTab, setMobileTab] = useState('edit');

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

  // Export CV Data as a downloadable JSON file
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cv_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import CV Data from a JSON file
  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && typeof parsed === 'object') {
            setCvData({
              personal: { ...emptyCVData.personal, ...(parsed.personal || {}) },
              experience: Array.isArray(parsed.experience) ? parsed.experience : [],
              education: Array.isArray(parsed.education) ? parsed.education : [],
              skills: Array.isArray(parsed.skills) ? parsed.skills : [],
              projects: Array.isArray(parsed.projects) ? parsed.projects : []
            });
            alert("Matagumpay na na-import ang iyong CV data!");
          }
        } catch (err) {
          alert("Hindi wastong JSON file. Pakisuri ulit ang file.");
        }
      };
      // Reset input value para pwede ulit i-upload ang same file kung kailangan
      e.target.value = "";
    }
  };

  return (
    <div className="app-container">
      <Navbar
        onLoadSample={handleLoadSample}
        onReset={handleReset}
        onPrint={handlePrint}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        currentColor={themeColor}
        onColorChange={setThemeColor}
        template={template}
        onTemplateChange={setTemplate}
        font={font}
        onFontChange={setFont}
      />

      <div className={`main-workspace show-${mobileTab}`}>
        <Editor data={cvData} onChange={setCvData} />
        <Preview data={cvData} themeColor={themeColor} template={template} font={font} />
      </div>

      {/* Mobile Bottom Tab Switcher */}
      <div className="mobile-tab-bar">
        <button
          className={`mobile-tab-btn ${mobileTab === 'edit' ? 'active' : ''}`}
          onClick={() => setMobileTab('edit')}
        >
          <PenTool size={15} />
          <span>Edit Form</span>
        </button>
        <button
          className={`mobile-tab-btn ${mobileTab === 'preview' ? 'active' : ''}`}
          onClick={() => setMobileTab('preview')}
        >
          <Eye size={15} />
          <span>View CV</span>
        </button>
      </div>
    </div>
  );
}

export default App;
