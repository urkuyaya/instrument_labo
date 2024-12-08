import { ReactWidget } from '@jupyterlab/apputils';
import React, { useState, useEffect } from 'react';

/**
 * React component for the Oscilloscope.
 *
 * @returns The React component
 */
const OscilloscopeComponent = (): JSX.Element => {
    const [signal, setSignal] = useState<number[]>([]);
    const [running, setRunning] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (running) {
            interval = setInterval(() => {
                setSignal(prev => [...prev.slice(-50), Math.random() * 10]); // Simular nuevos datos
            }, 500);
        }

        return () => {
            if (interval) clearInterval(interval); // Limpia el intervalo al detenerse
        };
    }, [running]);

    return (
        <div style={{ padding: '10px', fontFamily: 'Arial' }}>
            <div
                style={{
                    background: '#000',
                    color: '#0f0',
                    padding: '10px',
                    height: '150px',
                    overflow: 'hidden',
                    fontFamily: 'monospace'
                }}
            >
                {signal.map((point, index) => (
                    <span key={index} style={{ display: 'inline-block', margin: '0 2px' }}>
                        {Math.round(point)}
                    </span>
                ))}
            </div>
            <div style={{ marginTop: '10px' }}>
                <button
                    onClick={() => setRunning(true)}
                    style={{
                        marginRight: '10px',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Run
                </button>
                <button
                    onClick={() => setRunning(false)}
                    style={{
                        padding: '10px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Stop
                </button>
            </div>
        </div>
    );
};

/**
 * Lumino Widget wrapping the OscilloscopeComponent
 */
export class OscilloscopeWidget extends ReactWidget {
    constructor() {
        super();
        this.addClass('jp-OscilloscopeWidget'); // Clase para personalización CSS
    }

    render(): JSX.Element {
        return <OscilloscopeComponent />;
    }
}
