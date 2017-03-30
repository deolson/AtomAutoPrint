'use babel';

import AtomAutoPrintView from './atom-auto-print-view';
import { CompositeDisposable } from 'atom';

export default {

  atomAutoPrintView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomAutoPrintView = new AtomAutoPrintView(state.atomAutoPrintViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomAutoPrintView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-auto-print:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomAutoPrintView.destroy();
  },

  serialize() {
    return {
      atomAutoPrintViewState: this.atomAutoPrintView.serialize()
    };
  },

  toggle() {
    console.log('AtomAutoPrint was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
