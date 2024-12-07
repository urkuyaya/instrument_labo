import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { Widget } from '@lumino/widgets';

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'instrument-labo',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('Osciloscopio activado');

    const widget = new Widget();
    widget.id = 'osciloscopio';
    widget.title.label = 'Osciloscopio';
    widget.title.closable = true;
    widget.node.textContent = '¡Hola! Este es el osciloscopio';

    app.shell.add(widget, 'right');
  }
};


export default plugin;
