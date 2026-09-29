import React from 'react';
import { FileText, Printer, RotateCcw, Sparkles } from 'lucide-react';

function Navbar({ onReset, onLoadSample, onPrint, currentColor, onColorChange, template, onTemplateChange }) {
    const colors = [
        { name: 'Slate', value: '#0f172a' },
        { name: 'Navy', value: '#1e3a8a' },
        { name: 'Emerald', value: '#065f46' },
        { name: 'Burgundy', value: '#831843' }
    ];
    return (
        <header className="app-header">
            <div className="header-top-row">
                <div className="logo">
                    <FileText size={20} />
                    <span>CV Studio</span>
                </div>

                <div className="header-actions">
                    <button className="btn btn-secondary btn-action" onClick={onLoadSample} title="Load sample data">
                        <Sparkles size={15} />
                        <span className="btn-text">Sample</span>
                    </button>

                    <button className="btn btn-secondary btn-action" onClick={onReset} title="Clear all fields">
                        <RotateCcw size={15} />
                        <span className="btn-text">Clear</span>
                    </button>

                    <button className="btn btn-primary btn-action" onClick={onPrint} title="Download or print your CV">
                        <Printer size={15} />
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
                            />
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
            </div>
        </header>
    );
}

export default Navbar;