'use babel';

// import AtomAutoPrintView from './atom-auto-print-view';
import { CompositeDisposable } from 'atom';
import request from 'request'

export default {

  // atomAutoPrintView: null,
  // modalPanel: null,
  subscriptions: null,

  activate() {
    // this.atomAutoPrintView = new AtomAutoPrintView(state.atomAutoPrintViewState);
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.atomAutoPrintView.getElement(),
    //   visible: false
    // });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-auto-print:fetch': () => this.fetch()
    }));
  },

  deactivate() {
    // this.modalPanel.destroy();
    this.subscriptions.dispose();
    // this.atomAutoPrintView.destroy();
  },

  // serialize() {
  //   return {
  //     atomAutoPrintViewState: this.atomAutoPrintView.serialize()
  //   };
  // },

  fetch() {
    let editor
    if(editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      this.download(selection)
    }
  },

  download(url) {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    })
  }

};
