import React, {useCallback, useEffect, useState} from 'react';
import {Engine} from "tsparticles-engine";
import {loadSlim} from "tsparticles-slim";
import Particles from "react-particles";
import {backgroundAnimation} from "./particles"


const ParticleBackgroundAnimation = () => {
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAnimation(true); // Show the animation after a delay
        }, 2000); // Adjust the delay as needed

        return () => clearTimeout(timer); // Clean up the timer
    }, []);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: any) => {
        // Handle loaded particles
    }, []);

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: showAnimation ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
            {showAnimation && (
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={backgroundAnimation}
                />
            )}
        </div>
    );
};

export default ParticleBackgroundAnimation;


// const ParticleBackgroundAnimation = () => {
//     const [autoPlay, setAutoPlay] = useState(false)
//     let timeout: NodeJS.Timeout;
//
//     const particlesInit = useCallback(async (engine: Engine) => {
//         await loadSlim(engine);
//     }, []);
//
//     const particlesLoaded = useCallback(async (container: any) => {
//         // await console.log(container);
//         timeout = setTimeout(() => {
//             setAutoPlay(true)
//         }, 3000)
//     }, []);
//
//     useEffect(() => {
//         return () => clearTimeout(timeout)
//     }, [])
//
//     return (
//         // <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1  }}>
//         <div
//             style={{
//                 position: 'fixed', // Fixed position to prevent it from being affected by transitions
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100%',
//                 zIndex: -1,
//                 pointerEvents: 'none', // Disable pointer events to allow interaction with elements underneath
//             }}
//         >
//
//             <Particles
//                 // style={{ border : "3px solid red"}}
//                 id="tsparticles"
//                 init={particlesInit}
//                 loaded={particlesLoaded}
//                 // options={backgroundAnimation}
//                 options={{
//                     ...backgroundAnimation
//                     , autoPlay: autoPlay
//                 }}
//             />
//         </div>
//     );
// };
//
// export default ParticleBackgroundAnimation;