import React from 'react';
import { FileText, Printer, RotateCcw, Sparkles } from 'lucide-react';

function Navbar({ onReset, onLoadSample, onPrint }) {
    return (
        <header classname="app-header">
            <div classname="logo">
                <FileText size={20} />
                <span>CV Studio</span>
            </div>

            <div classname="header-actions">
                <button classname="btn-secondary" onClick={onLoadSample} title="Load sample template data">
                    <sparkles size={15} />
                    <span>Load Sample</span>
                </button>

            </div>
        </header>
    )
}