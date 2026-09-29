import React from 'react';
import { User, Briefcase, GraduationCap, Award, Plus, Trash2 } from 'lucide-react';

function Editor({ data, onChange }) {
    const { personal, experience, education, skills } = data;

    // 1. Personal Info Handler
    const handlePersonalChange = (e) => {
        const { name, value } = e.target;
        onChange({
            ...data,
            personal: {
                ...personal,
                [name]: value
            }
        });
    };

    // 2. Experience Handlers
    const handleAddExperience = () => {
        const newItem = {
            id: Date.now().toString(),
            role: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            description: ""
        };
        onChange({
            ...data,
            experience: [...experience, newItem]
        });
    };

    const handleUpdateExperience = (id, field, value) => {
        const updated = experience.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
        );
        onChange({ ...data, experience: updated });
    };

    const handleRemoveExperience = (id) => {
        const filtered = experience.filter((item) => item.id !== id);
        onChange({ ...data, experience: filtered });
    };

    // 3. Education Handlers
    const handleAddEducation = () => {
        const newItem = {
            id: Date.now().toString(),
            school: "",
            degree: "",
            location: "",
            startDate: "",
            endDate: "",
            description: ""
        };
        onChange({
            ...data,
            education: [...education, newItem]
        });
    };

    const handleUpdateEducation = (id, field, value) => {
        const updated = education.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
        );
        onChange({ ...data, education: updated });
    };

    const handleRemoveEducation = (id) => {
        const filtered = education.filter((item) => item.id !== id);
        onChange({ ...data, education: filtered });
    };

    // 4. Skills Handlers
    const handleAddSkill = (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== "") {
            e.preventDefault();
            const newSkill = e.target.value.trim();
            if (!skills.includes(newSkill)) {
                onChange({ ...data, skills: [...skills, newSkill] });
            }
            e.target.value = "";
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        onChange({
            ...data,
            skills: skills.filter((s) => s !== skillToRemove)
        });
    };

    return (
        <aside className="editor-panel">
            {/* --- PERSONAL INFO --- */}
            <section className="form-section">
                <h2 className="section-title">
                    <User size={16} />
                    <span>Personal Information</span>
                </h2>
                <div className="input-grid">
                    <div className="form-group input-full">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            className="form-control"
                            value={personal.fullName}
                            onChange={handlePersonalChange}
                            placeholder="e.g. Juan Dela Cruz"
                        />
                    </div>

                    <div className="form-group input-full">
                        <label>Job Title / Headline</label>
                        <input
                            type="text"
                            name="jobTitle"
                            className="form-control"
                            value={personal.jobTitle}
                            onChange={handlePersonalChange}
                            placeholder="e.g. Frontend Developer"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={personal.email}
                            onChange={handlePersonalChange}
                            placeholder="name@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            value={personal.phone}
                            onChange={handlePersonalChange}
                            placeholder="+63 900 000 0000"
                        />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            value={personal.location}
                            onChange={handlePersonalChange}
                            placeholder="City, Country"
                        />
                    </div>

                    <div className="form-group">
                        <label>Website / Portfolio</label>
                        <input
                            type="text"
                            name="website"
                            className="form-control"
                            value={personal.website}
                            onChange={handlePersonalChange}
                            placeholder="https://mywebsite.com"
                        />
                    </div>

                    <div className="form-group input-full">
                        <label>Professional Summary</label>
                        <textarea
                            name="summary"
                            className="form-control"
                            value={personal.summary}
                            onChange={handlePersonalChange}
                            placeholder="Brief overview of your experience and career goals..."
                        />
                    </div>
                </div>
            </section>

            {/* --- WORK EXPERIENCE --- */}
            <section className="form-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 className="section-title" style={{ marginBottom: 0, border: 'none' }}>
                        <Briefcase size={16} />
                        <span>Work Experience</span>
                    </h2>
                    <button className="btn btn-secondary" onClick={handleAddExperience} style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}>
                        <Plus size={13} /> Add
                    </button>
                </div>

                {experience.map((item) => (
                    <div key={item.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', background: '#fafafa' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn-danger" onClick={() => handleRemoveExperience(item.id)} title="Delete experience">
                                <Trash2 size={14} />
                            </button>
                        </div>
                        <div className="input-grid">
                            <div className="form-group">
                                <label>Job Title / Role</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={item.role}
                                    onChange={(e) => handleUpdateExperience(item.id, 'role', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Company</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={item.company}
                                    onChange={(e) => handleUpdateExperience(item.id, 'company', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Start Date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. 2022"
                                    value={item.startDate}
                                    onChange={(e) => handleUpdateExperience(item.id, 'startDate', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>End Date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. Present"
                                    value={item.endDate}
                                    onChange={(e) => handleUpdateExperience(item.id, 'endDate', e.target.value)}
                                />
                            </div>
                            <div className="form-group input-full">
                                <label>Description / Responsibilities</label>
                                <textarea
                                    className="form-control"
                                    value={item.description}
                                    onChange={(e) => handleUpdateExperience(item.id, 'description', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* --- EDUCATION --- */}
            <section className="form-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 className="section-title" style={{ marginBottom: 0, border: 'none' }}>
                        <GraduationCap size={16} />
                        <span>Education</span>
                    </h2>
                    <button className="btn btn-secondary" onClick={handleAddEducation} style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}>
                        <Plus size={13} /> Add
                    </button>
                </div>

                {education.map((item) => (
                    <div key={item.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', background: '#fafafa' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn-danger" onClick={() => handleRemoveEducation(item.id)} title="Delete education">
                                <Trash2 size={14} />
                            </button>
                        </div>
                        <div className="input-grid">
                            <div className="form-group">
                                <label>School / University</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={item.school}
                                    onChange={(e) => handleUpdateEducation(item.id, 'school', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Degree / Field</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={item.degree}
                                    onChange={(e) => handleUpdateEducation(item.id, 'degree', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Start Date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={item.startDate}
                                    onChange={(e) => handleUpdateEducation(item.id, 'startDate', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>End Date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={item.endDate}
                                    onChange={(e) => handleUpdateEducation(item.id, 'endDate', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* --- SKILLS --- */}
            <section className="form-section">
                <h2 className="section-title">
                    <Award size={16} />
                    <span>Skills (Type & Press Enter)</span>
                </h2>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type skill & press Enter (e.g. React.js)"
                        onKeyDown={handleAddSkill}
                    />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                fontSize: '0.8rem',
                                padding: '0.25rem 0.6rem',
                                background: '#e2e8f0',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleRemoveSkill(skill)}
                            title="Click to remove"
                        >
                            {skill} &times;
                        </span>
                    ))}
                </div>
            </section>
        </aside>
    );
}

export default Editor;
