import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

function Preview({ data }) {
    const { personal, experience, education, skills } = data;

    return (
        <div className="preview-panel">
            <div className="cv-sheet" id="cv-to-print">
                {/* Header Section */}
                <header className="cv-header">
                    <h1 className="cv-name">{personal.fullName || "Your Full Name"}</h1>
                    <p className="cv-title">{personal.jobTitle || "Job Title / Specialization"}</p>

                    <div className="cv-contact-bar">
                        {personal.email && (
                            <span className="contact-item">
                                <Mail size={13} />
                                <span>{personal.email}</span>
                            </span>
                        )}
                        {personal.phone && (
                            <span className="contact-item">
                                <Phone size={13} />
                                <span>{personal.phone}</span>
                            </span>
                        )}
                        {personal.location && (
                            <span className="contact-item">
                                <MapPin size={13} />
                                <span>{personal.location}</span>
                            </span>
                        )}
                        {personal.website && (
                            <span className="contact-item">
                                <Globe size={13} />
                                <span>{personal.website.replace(/^https?:\/\//, '')}</span>
                            </span>
                        )}
                    </div>
                </header>

                {/* Profile / Summary */}
                {personal.summary && (
                    <section className="cv-block">
                        <h2 className="cv-section-heading">Professional Profile</h2>
                        <p className="cv-summary-text">{personal.summary}</p>
                    </section>
                )}

                {/* Experience Section */}
                {experience && experience.length > 0 && (
                    <section className="cv-block">
                        <h2 className="cv-section-heading">Work Experience</h2>
                        <div className="cv-list">
                            {experience.map((item) => (
                                <div key={item.id} className="cv-item">
                                    <div className="cv-item-header">
                                        <span className="cv-item-title">{item.role}</span>
                                        <span className="cv-item-date">{item.startDate} – {item.endDate}</span>
                                    </div>
                                    <div className="cv-item-subtitle">
                                        {item.company} {item.location && `• ${item.location}`}
                                    </div>
                                    {item.description && (
                                        <p className="cv-item-desc">{item.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education Section */}
                {education && education.length > 0 && (
                    <section className="cv-block">
                        <h2 className="cv-section-heading">Education</h2>
                        <div className="cv-list">
                            {education.map((item) => (
                                <div key={item.id} className="cv-item">
                                    <div className="cv-item-header">
                                        <span className="cv-item-title">{item.school}</span>
                                        <span className="cv-item-date">{item.startDate} – {item.endDate}</span>
                                    </div>
                                    <div className="cv-item-subtitle">
                                        {item.degree} {item.location && `• ${item.location}`}
                                    </div>
                                    {item.description && (
                                        <p className="cv-item-desc">{item.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills Section */}
                {skills && skills.length > 0 && (
                    <section className="cv-block">
                        <h2 className="cv-section-heading">Skills & Competencies</h2>
                        <div className="cv-skills-grid">
                            {skills.map((skill, index) => (
                                <span key={index} className="cv-skill-badge">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default Preview;
