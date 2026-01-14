import React, { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Track mouse movement
        const handleMouseMove = (event) => {
            mouseRef.current = {
                x: event.clientX,
                y: event.clientY
            };
        };

        // Initial setup
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);
        window.addEventListener('mousemove', handleMouseMove);

        // Particle class
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1; // Increased size
                this.baseSize = this.size;
                this.speedX = Math.random() * 1 - 0.5; // Increased speed
                this.speedY = Math.random() * 1 - 0.5; // Increased speed
                this.opacity = Math.random() * 0.5 + 0.3; // Increased opacity
            }

            update() {
                // Move particles
                this.x += this.speedX;
                this.y += this.speedY;

                // Mouse interaction
                const dx = mouseRef.current.x - this.x;
                const dy = mouseRef.current.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    this.size = this.baseSize * (1 + force);
                    this.x -= (dx / distance) * force * 2;
                    this.y -= (dy / distance) * force * 2;
                } else {
                    this.size = this.baseSize;
                }

                // Reset if out of bounds
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity})`; // Changed to primary blue
                ctx.fill();
            }
        }

        // Create particles
        const createParticles = () => {
            particles = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 5000); // Increased density
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        createParticles();

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Create trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw connecting lines
            ctx.strokeStyle = 'rgba(37, 99, 235, 0.15)'; // Changed to primary blue
            ctx.lineWidth = 0.5;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) { // Increased connection distance
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', setCanvasSize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
            style={{
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)'
            }}
        />
    );
}; 