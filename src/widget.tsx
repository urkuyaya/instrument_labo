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
    const [frequency, setFrequency] = useState<number>(1); // Frecuencia de la señal

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (running) {
            let time = 0; // Tiempo inicial
            interval = setInterval(() => {
                time += 0.1; // Incrementa el tiempo en cada paso
                const newSignal = Math.sin(2 * Math.PI * frequency * time); // Señal sinusoidal
                setSignal(prev => [...prev.slice(-50), newSignal]); // Mantén los últimos 50 valores
            }, 100); // Intervalo de actualización: 100 ms
        }

        return () => {
            if (interval) clearInterval(interval); // Limpia el intervalo al detenerse
        };
    }, [running, frequency]); // Reactualiza si cambia el estado o la frecuencia

    return (
        <div style={{ padding: '10px', fontFamily: 'Arial' }}>
            {/* Contenedor de la señal */}
            <div
                style={{
                    background: '#000',
                    color: '#0f0',
                    padding: '10px',
                    height: '150px',
                    overflowY: 'scroll',
                    fontFamily: 'monospace'
                }}
            >
                {signal.map((point, index) => (
                    <span
                        key={index}
                        style={{
                            display: 'inline-block',
                            margin: '0 2px',
                            color: `rgb(0, ${Math.min(255, Math.abs(point * 255))}, 0)`
                        }}
                    >
                        {point.toFixed(2)} {/* Redondea a dos decimales */}
                    </span>
                ))}
            </div>

            {/* Controles */}
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

            {/* Control de frecuencia */}
            <div style={{ marginTop: '10px' }}>
                <label style={{ color: '#fff', marginRight: '10px' }}>Frequency (Hz):</label>
                <input
                    type="number"
                    value={frequency}
                    onChange={e => setFrequency(parseFloat(e.target.value))}
                    style={{
                        padding: '5px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '50px'
                    }}
                />
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
