import { ReactWidget } from '@jupyterlab/apputils';
import React, { useState, useEffect } from 'react';

/**
 * React component for the Oscilloscope.
 */
const OscilloscopeComponent = (): JSX.Element => {
    const [signal, setSignal] = useState<number[]>([]);
    const [time, setTime] = useState<number[]>([]);
    const [running, setRunning] = useState<boolean>(false);
    const [frequency, setFrequency] = useState<number>(1);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (running) {
            let t = time.length > 0 ? time[time.length - 1] : 0;
            interval = setInterval(() => {
                t += 0.1; // Incrementa el tiempo
                const newSignal = Math.sin(2 * Math.PI * frequency * t); // Señal sinusoidal
                setSignal(prev => [...prev.slice(-50), newSignal]); // Últimos 50 puntos
                setTime(prev => [...prev.slice(-50), t]); // Últimos 50 tiempos
            }, 100);
        }

        return () => {
            if (interval) clearInterval(interval); // Limpia el intervalo
        };
    }, [running, frequency]);

    // Dibuja la señal en el canvas
    useEffect(() => {
        const canvas = document.getElementById('oscilloscopeCanvas') as HTMLCanvasElement;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Limpia el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Configuración del gráfico
        ctx.strokeStyle = 'rgb(75, 192, 192)';
        ctx.lineWidth = 2;
        ctx.beginPath();

        // Dibuja la señal
        for (let i = 0; i < signal.length; i++) {
            const x = (i / signal.length) * canvas.width; // Escala en X
            const y = canvas.height / 2 - signal[i] * (canvas.height / 2); // Escala en Y
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();
    }, [signal]);

    return (
        <div style={{ padding: '10px', fontFamily: 'Arial' }}>
            {/* Canvas para el gráfico */}
            <canvas
                id="oscilloscopeCanvas"
                width="500"
                height="200"
                style={{ border: '1px solid #ccc', marginBottom: '10px' }}
            ></canvas>

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
                <label style={{ color: '#000', marginRight: '10px' }}>Frecuencia (Hz):</label>
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
 * Lumino Widget wrapping the OscilloscopeComponent.
 */
export class OscilloscopeWidget extends ReactWidget {
    constructor() {
        super();
        this.addClass('jp-OscilloscopeWidget');
    }

    render(): JSX.Element {
        return <OscilloscopeComponent />;
    }
}
