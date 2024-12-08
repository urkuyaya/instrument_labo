import { ReactWidget } from '@jupyterlab/apputils';
import React from 'react';

const OscilloscopeComponent: React.FC = () => {
    return (
        <div>
            <h1>Oscilloscope</h1>
            <p>This is the Oscilloscope UI.</p>
        </div>
    );
};

export class OscilloscopeWidget extends ReactWidget {
    constructor() {
        super();
        this.addClass('jp-OscilloscopeWidget');
    }

    render(): JSX.Element {
        return <OscilloscopeComponent />;
    }
}
