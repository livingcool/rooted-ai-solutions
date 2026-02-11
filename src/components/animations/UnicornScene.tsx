import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        UnicornStudio: any;
    }
}

interface UnicornSceneProps {
    projectId: string;
    className?: string;
    scale?: number;
}

const UnicornScene = ({ projectId, className, scale = 1 }: UnicornSceneProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadScript = async () => {
            if (!window.UnicornStudio) {
                const script = document.createElement('script');
                script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js";
                script.async = true;
                document.body.appendChild(script);

                script.onload = () => initScene();
            } else {
                initScene();
            }
        };

        const initScene = () => {
            if (window.UnicornStudio && containerRef.current) {
                window.UnicornStudio.init({
                    element: containerRef.current,
                    projectId: projectId,
                    scale: scale,
                    dpi: 1.5,
                    fps: 60,
                    lazyLoad: true,
                    production: true,
                    interactivity: {
                        mouse: {
                            disable: false,
                            sensitivity: 0.8
                        },
                        scroll: {
                            disable: false,
                            sensitivity: 1.2
                        }
                    }
                });
            }
        };

        loadScript();

        return () => {
            if (window.UnicornStudio && containerRef.current) {
                window.UnicornStudio.destroy(containerRef.current);
            }
        };
    }, [projectId, scale]);

    return (
        <div
            ref={containerRef}
            className={className}
            data-us-project={projectId}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none' // Allow clicks to pass through to underlying elements if needed
            }}
        >
        </div>
    );
};

export { UnicornScene };
