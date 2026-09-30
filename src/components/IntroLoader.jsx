import React, { useEffect, useState } from 'react';

function IntroLoader({ onFinish }) {
    const [progress, setProgress] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        // Controlled, cinematic progressive loading bar (approx 2.2 - 2.5 seconds)
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }

                // Smooth gradual steps
                let step = 1;
                if (prev < 40) {
                    step = Math.floor(Math.random() * 2) + 2; // 2-3%
                } else if (prev < 80) {
                    step = Math.floor(Math.random() * 2) + 1; // 1-2%
                } else if (prev < 95) {
                    step = 1; // slow down near completion
                } else {
                    step = 1;
                }

                return Math.min(100, prev + step);
            });
        }, 40);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            const fadeTimer = setTimeout(() => {
                setIsFadingOut(true);
            }, 350);

            const removeTimer = setTimeout(() => {
                if (onFinish) onFinish();
            }, 850);

            return () => {
                clearTimeout(fadeTimer);
                clearTimeout(removeTimer);
            };
        }
    }, [progress, onFinish]);

    return (
        <div className={`intro-splash-screen ${isFadingOut ? 'fade-out' : ''}`}>
            <div className="intro-splash-content">
                <div className="intro-logo-container">
                    <div className="intro-logo-badge">
                        <img src="/MDLogo.png" alt="CV Studio Logo" className="intro-logo-img" />
                    </div>
                    <div className="intro-logo-glow" />
                </div>

                <div className="intro-brand-details">
                    <h1 className="intro-brand-title">
                        CV <span className="text-skyblue">Studio</span>
                    </h1>
                    <p className='intro-brand-tagline'>Created by: MitchDev.</p>
                </div>

                <div className="intro-progress-wrapper">
                    <div className="intro-progress-track">
                        <div
                            className="intro-progress-bar"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="intro-progress-text">{progress}%</span>
                </div>
            </div>
        </div>
    );
}

export default IntroLoader;
