function createBackground() {
    // Create tech grid
    const grid = document.createElement('div');
    grid.className = 'tech-grid';
    document.body.appendChild(grid);

    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'tech-particles';
    document.body.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        // Random movement direction and distance
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;

        // Random animation duration
        const duration = 5 + Math.random() * 10;

        // Set particle properties
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * duration}s`;

        particlesContainer.appendChild(particle);
    }
}

// Create background when the page loads
window.addEventListener('load', createBackground);

// Recreate background when window is resized
window.addEventListener('resize', () => {
    const grid = document.querySelector('.tech-grid');
    const particlesContainer = document.querySelector('.tech-particles');

    if (grid) grid.remove();
    if (particlesContainer) particlesContainer.remove();

    createBackground();
}); 