import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { reactIcon } from '@jupyterlab/ui-components';
import { OscilloscopeWidget } from './widget';

/**
 * Initialization data for the oscilloscope extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'oscilloscope-widget',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('Oscilloscope Widget Activated');

    // Crear el widget para la barra derecha
    const widget = new OscilloscopeWidget();
    widget.id = 'oscilloscope-widget'; // ID único para el widget
    widget.title.icon = reactIcon; // Icono
    widget.title.caption = 'Oscilloscope'; // Descripción

    // Añadir el widget a la barra lateral derecha
    app.shell.add(widget, 'right');

    console.log('Oscilloscope Widget added to the right sidebar.');
  }
};

export default extension;
