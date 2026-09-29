import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

function Preview({ data, themeColor = '#0f172a', template = 'single', font = 'sans' }) {
    const { personal, experience, education, skills } = data;

    const renderHeader = () => (
        <header className="cv-header" style={{ borderColor: themeColor }}>
            <h1 className="cv-name" style={{ color: themeColor }}>{personal.fullName || "Your Full Name"}</h1>
            <p className="cv-title">{personal.jobTitle || "Job Title / Specialization"}</p>

            {template === 'single' && (
                <div className="cv-contact-bar">
                    {personal.email && (
                        <span className="contact-item"><Mail size={13} /><span>{personal.email}</span></span>
                    )}
                    {personal.phone && (
                        <span className="contact-item"><Phone size={13} /><span>{personal.phone}</span></span>
                    )}
                    {personal.location && (
                        <span className="contact-item"><MapPin size={13} /><span>{personal.location}</span></span>
                    )}
                    {personal.website && (
                        <span className="contact-item"><Globe size={13} /><span>{personal.website.replace(/^https?:\/\//, '')}</span></span>
                    )}
                </div>
            )}
        </header>
    );

    const renderProfile = () => personal.summary && (
        <section className="cv-block">
            <h2 className="cv-section-heading" style={{ color: themeColor, borderColor: `${themeColor}25` }}>
                Professional Profile
            </h2>
            <p className="cv-summary-text">{personal.summary}</p>
        </section>
    );

    const renderExperience = () => experience && experience.length > 0 && (
        <section className="cv-block">
            <h2 className="cv-section-heading" style={{ color: themeColor, borderColor: `${themeColor}25` }}>
                Work Experience
            </h2>
            <div className="cv-list">
                {experience.map((item) => (
                    <div key={item.id} className="cv-item">
                        <div className="cv-item-header">
                            <span className="cv-item-title">{item.role}</span>
                            <span className="cv-item-date">{item.startDate} – {item.endDate}</span>
                        </div>
                        <div className="cv-item-subtitle">{item.company} {item.location && `• ${item.location}`}</div>
                        {item.description && <p className="cv-item-desc">{item.description}</p>}
                    </div>
                ))}
            </div>
        </section>
    );

    const renderEducation = () => education && education.length > 0 && (
        <section className="cv-block">
            <h2 className="cv-section-heading" style={{ color: themeColor, borderColor: `${themeColor}25` }}>
                Education
            </h2>
            <div className="cv-list">
                {education.map((item) => (
                    <div key={item.id} className="cv-item">
                        <div className="cv-item-header">
                            <span className="cv-item-title">{item.school}</span>
                            <span className="cv-item-date">{item.startDate} – {item.endDate}</span>
                        </div>
                        <div className="cv-item-subtitle">{item.degree} {item.location && `• ${item.location}`}</div>
                        {item.description && <p className="cv-item-desc">{item.description}</p>}
                    </div>
                ))}
            </div>
        </section>
    );

    const renderSkills = () => skills && skills.length > 0 && (
        <section className="cv-block">
            <h2 className="cv-section-heading" style={{ color: themeColor, borderColor: `${themeColor}25` }}>
                Skills & Competencies
            </h2>
            <div className="cv-skills-grid">
                {skills.map((skill, index) => (
                    <span key={index} className="cv-skill-badge">{skill}</span>
                ))}
            </div>
        </section>
    );

    return (
        <div className="preview-panel">
            <div
                className="cv-sheet"
                id="cv-to-print"
                style={{
                    fontFamily: font === 'serif' ? "'Merriweather', Georgia, serif" : "var(--font-family)"
                }}
            >
                {renderHeader()}

                {template === 'single' ? (
                    <>
                        {renderProfile()}
                        {renderExperience()}
                        {renderEducation()}
                        {renderSkills()}
                    </>
                ) : (
                    <div className="cv-two-column-body">
                        <aside className="cv-sidebar">
                            <section className="cv-block">
                                <h2 className="cv-section-heading" style={{ color: themeColor, borderColor: `${themeColor}25` }}>Contact</h2>
                                {personal.email && <div className="contact-item"><Mail size={13} /><span>{personal.email}</span></div>}
                                {personal.phone && <div className="contact-item"><Phone size={13} /><span>{personal.phone}</span></div>}
                                {personal.location && <div className="contact-item"><MapPin size={13} /><span>{personal.location}</span></div>}
                                {personal.website && <div className="contact-item"><Globe size={13} /><span>{personal.website.replace(/^https?:\/\//, '')}</span></div>}
                            </section>
                            {renderEducation()}
                            {renderSkills()}
                        </aside>

                        <main className="cv-main-column">
                            {renderProfile()}
                            {renderExperience()}
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Preview;
