import React, { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-particles";

export default function ParticlesJSX() {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return <Particles
        className='particles'
        id="tsparticles"
        init={particlesInit}
        options={{
            background: { color: { value: "background: linear-gradient(to left, #311371ae 0%, #2c2c42 100%);" } },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: { enable: false, mode: "push" },
                    onHover: { enable: false, mode: "repulse" },
                    resize: true
                },
                modes: {
                    push: { quantity: 4 },
                    repulse: { distance: 120, duration: 0.4 },
                },
            },
            particles: {
                color: { value: "#ffffff", },
                links: {
                    color: "#ffffff",
                    distance: 110,
                    enable: true,
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "bounce", },
                    random: false,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: { enable: true, area: 1000 },
                    value: 130,
                },
                opacity: { value: 0.5, },
                shape: { type: "circle", },
                size: { value: { min: 1, max: 1 }, },
            },
            detectRetina: true,
        }}
    />
}