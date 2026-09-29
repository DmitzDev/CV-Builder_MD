import React from 'react';
import { FileText, Printer, RotateCcw, Sparkles } from 'lucide-react';

function Navbar({ onReset, onLoadSample, onPrint }) {
    return (
        <header className="app-header">
            <div className="logo">
                <FileText size={20} />
                <span>CV Studio</span>
            </div>

            <div className="header-actions">
                <button className="btn btn-secondary" onClick={onLoadSample} title="Load sample template data">
                    <Sparkles size={15} />
                    <span>Load Sample</span>
                </button>

                <button className="btn btn-secondary" onClick={onReset} title="Clear all fields">
                    <RotateCcw size={15} />
                    <span>Clear</span>
                </button>

                <button className="btn btn-primary" onClick={onPrint} title="Download or print your CV">
                    <Printer size={15} />
                    <span>Export PDF</span>
                </button>
            </div>
        </header>
    );
}

export default Navbar;