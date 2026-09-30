import React, { useRef } from 'react';
import { FileText, Printer, RotateCcw, FileCheck, Check, Download, Upload } from 'lucide-react';

function Navbar({
    onReset,
    onLoadSample,
    onPrint,
    onExportJSON,
    onImportJSON,
    currentColor,
    onColorChange,
    template,
    onTemplateChange,
    font,
    onFontChange
}) {
    const fileInputRef = useRef(null);

    const colors = [
        { name: 'Slate', value: '#0f172a' },
        { name: 'Navy', value: '#1e3a8a' },
        { name: 'Emerald', value: '#065f46' },
        { name: 'Burgundy', value: '#831843' }
    ];

    const handleTriggerImport = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <header className="app-header">
            <div className="header-top-row">
                <div className="logo">
                    <img src="/MDLogo.png" alt="CV Studio Logo" className="logo-icon" />
                    <span>CV Studio</span>
                </div>

                <div className="header-actions">
                    {/* Hidden file input for JSON import */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={onImportJSON}
                        accept=".json"
                        style={{ display: 'none' }}
                    />

                    <button className="btn btn-secondary btn-action" onClick={handleTriggerImport} title="Import CV data from JSON">
                        <Upload size={14} />
                        <span className="btn-text">Import</span>
                    </button>

                    <button className="btn btn-secondary btn-action" onClick={onExportJSON} title="Backup CV data as JSON">
                        <Download size={14} />
                        <span className="btn-text">Backup</span>
                    </button>

                    <button className="btn btn-secondary btn-action" onClick={onLoadSample} title="Load sample data">
                        <FileCheck size={14} />
                        <span className="btn-text">Sample</span>
                    </button>

                    <button className="btn btn-secondary btn-action" onClick={onReset} title="Clear all fields">
                        <RotateCcw size={14} />
                        <span className="btn-text">Clear</span>
                    </button>

                    <button className="btn btn-primary btn-action" onClick={onPrint} title="Download or print your CV">
                        <Printer size={14} />
                        <span className="btn-text">PDF</span>
                    </button>
                </div>
            </div>

            <div className="navbar-controls">
                {/* Accent Color Selection */}
                <div className="control-group">
                    <span className="control-label">Accent:</span>
                    <div className="color-dots">
                        {colors.map((c) => (
                            <button
                                key={c.value}
                                onClick={() => onColorChange(c.value)}
                                title={c.name}
                                className={`color-dot ${currentColor === c.value ? 'active' : ''}`}
                                style={{ backgroundColor: c.value }}
                            >
                                {currentColor === c.value && (
                                    <Check size={11} strokeWidth={3.5} color="#ffffff" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Template Layout Selection */}
                <div className="control-group layout-group">
                    <span className="control-label">Layout:</span>
                    <div className="layout-btn-group">
                        <button
                            className={`btn ${template === 'single' ? 'btn-primary' : 'btn-secondary'} btn-xs`}
                            onClick={() => onTemplateChange('single')}
                        >
                            Single
                        </button>
                        <button
                            className={`btn ${template === 'two-column' ? 'btn-primary' : 'btn-secondary'} btn-xs`}
                            onClick={() => onTemplateChange('two-column')}
                        >
                            2-Col
                        </button>
                    </div>
                </div>

                {/* Font Style Selection */}
                <div className="control-group">
                    <span className="control-label">Font:</span>
                    <select
                        value={font}
                        onChange={(e) => onFontChange(e.target.value)}
                        className="font-select"
                    >
                        <option value="sans">Sans</option>
                        <option value="serif">Serif</option>
                    </select>
                </div>
            </div>
        </header>
    );
}

export default Navbar;