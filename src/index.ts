import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { reactIcon } from '@jupyterlab/ui-components';
import { OscilloscopeWidget } from './widget';

/**
 * Registro de la extensión del osciloscopio.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'oscilloscope-widget',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('Oscilloscope Widget Activado');

    // Crear y registrar el widget en la barra lateral derecha
    const widget = new OscilloscopeWidget();
    widget.id = 'oscilloscope-widget';
    widget.title.icon = reactIcon;
    widget.title.caption = 'Oscilloscope';

    app.shell.add(widget, 'right');
  }
};

export default extension;
