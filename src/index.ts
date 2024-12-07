// Importaciones necesarias
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILayoutRestorer,
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';

/**
 * Initialization data for the extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'instrument_labo', // Identificador único para la extensión
  autoStart: true, // Arranca automáticamente con JupyterLab
  requires: [ICommandPalette, ILayoutRestorer], // Depende de estos servicios
  activate: (
    app: JupyterFrontEnd, // Aplicación principal de JupyterLab
    palette: ICommandPalette, // Paleta de comandos
    restorer: ILayoutRestorer // Servicio para restaurar el estado del widget
  ) => {
    console.log('Instrument Labo Extension is activated!');

    // Crear el widget principal
    const content = new Widget();
    content.node.textContent = 'Hello! I am a reactive button.';
    const widget = new Widget();
    widget.id = 'reactive-button-widget'; // ID único del widget
    widget.title.label = 'Osciloscopio'; // Título del widget
    widget.title.closable = true; // Permitir que sea cerrable
    widget.node.appendChild(content.node); // Agregar contenido al widget

    // Crear el botón reactivo
    const button = document.createElement('button');
    button.textContent = 'Click Me'; // Texto del botón
    button.onclick = () => {
      alert('Botón reactivo presionado!'); // Acción al presionar el botón
    };
    button.className = 'jp-Button'; // Usa los estilos de botón de JupyterLab
    widget.node.appendChild(button);

    // Agregar el widget a la barra lateral derecha
    app.shell.add(widget, 'right');

    // Restaurar el widget al reiniciar JupyterLab
    restorer.add(widget, 'instrument_labo');

    // Comando para abrir el widget desde la paleta de comandos
    const command = 'instrument_labo:open';
    app.commands.addCommand(command, {
      label: 'Open Oscilloscope', // Nombre del comando en la paleta
      execute: () => {
        app.shell.activateById(widget.id); // Activa el widget al ejecutar el comando
      },
    });
    palette.addItem({ command, category: 'Custom Extensions' });
  },
};

export default extension;
