import React, {useCallback} from 'react';
import {Engine} from "tsparticles-engine";
import {loadSlim} from "tsparticles-slim";
import Particles from "react-particles";
import {backgroundAnimation} from "./particles"

const ParticleBackgroundAnimation = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: any) => {
        await console.log(container);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={backgroundAnimation}
            />
        </div>
    );
};

export default ParticleBackgroundAnimation;