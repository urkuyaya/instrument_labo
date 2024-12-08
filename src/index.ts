import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { Widget } from '@lumino/widgets';

import { OscilloscopeWidget } from './widget';

/**
 * Initialization data for the oscilloscope extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'oscilloscope-widget',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('Oscilloscope Widget Extension is activated!'); // Diagnóstico

    // Crear el widget React para el osciloscopio
    const content = new OscilloscopeWidget();
    const widget = new Widget();
    widget.node.appendChild(content.node);
    widget.id = 'oscilloscope-panel';
    widget.title.label = 'Oscilloscope';
    widget.title.closable = true;

    // Agregar el widget a la barra lateral derecha
    app.shell.add(widget, 'right');
  }
};

export default extension;
