/**
 * CONFIGURATION SECTION
 */
const CONFIG = {
    herName: "NAME",
    birthdayLink: "https://youtube.com",
    birthdayMessage: `Hey NAME,

ALL YPUR MESSAGES YOU WANT TO SAY!!`
};

document.addEventListener('DOMContentLoaded', () => {
    // Populate dynamic text
    const displayNameEl = document.getElementById('display-name');
    const displayMsgEl = document.getElementById('display-message');
    const magicBtnEl = document.getElementById('magic-button');

    if (displayNameEl) displayNameEl.textContent = `Happiest Birthday, ${CONFIG.herName}!`;
    if (displayMsgEl) displayMsgEl.textContent = CONFIG.birthdayMessage;
    if (magicBtnEl) magicBtnEl.href = CONFIG.birthdayLink;

    createParticles();
    initMagneticButton();
    initScrollReveal();
});

// 1. Floating Particles Background (Smooth negative delay distribution)
function createParticles() {
    const container = document.getElementById('particle-container');
    if (!container) return;

    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = (Math.random() * 5 + 3).toFixed(1) + 'px';
        particle.style.width = size;
        particle.style.height = size;
        particle.style.left = Math.random() * 100 + '%';

        const duration = Math.random() * 12 + 10;
        particle.style.animationDuration = duration + 's';
        // Negative delay distributes particles across the screen instantly
        particle.style.animationDelay = `-${(Math.random() * duration).toFixed(1)}s`;
        particle.style.opacity = (Math.random() * 0.6 + 0.2).toFixed(2);

        container.appendChild(particle);
    }
}

// 2. Magnetic Button Effect (Smooth real-time tracking without jitter)
function initMagneticButton() {
    const btn = document.getElementById('magic-button');
    if (!btn) return;

    const wrapper = btn.parentElement;

    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const moveX = (e.clientX - centerX) * 0.35;
        const moveY = (e.clientY - centerY) * 0.35;

        // Instant tracking without CSS transition fighting the cursor
        btn.style.transition = 'transform 0.08s ease-out';
        btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.04)`;
    });

    wrapper.addEventListener('mouseleave', () => {
        // Smooth snap back, then clear inline style so CSS :hover functions normally
        btn.style.transition = 'transform 0.3s ease';
        btn.style.transform = '';
    });
}

// 3. Scroll Reveal Animation
function initScrollReveal() {
    const section = document.getElementById('message-section');
    if (!section) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target); // Clean up observer after reveal
            }
        });
    }, { threshold: 0.15 });

    observer.observe(section);
}