'use babel';

import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'narou-ruby:ruby': () => this.ruby()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  ruby(text) {
    var editor = atom.workspace.getActiveTextEditor();
    if(editor) {
      let range = editor.getSelectedBufferRange();
      let text = editor.getBuffer().getTextInRange(range);
      if(text.length > 0) {
        editor.setTextInBufferRange(range, "｜" + text + "《》");
        let position = editor.getCursorScreenPosition();
        position.column = range.end.column + 2;
        editor.setCursorScreenPosition(position);
      }
    }
  }

};
