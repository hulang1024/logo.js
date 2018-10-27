class Editor {
  constructor() {
    var textareaCode = document.getElementById('code');
    var codemirror = CodeMirror.fromTextArea(textareaCode, {
      lineNumbers: true
    });
    this.codemirror = codemirror;
    codemirror.setSize(500, 534);
    return codemirror;
  }

  loadFile(files) {
    if(!files.length)
        return;
    var file = files[0];
    var reader = new FileReader();
    var editor = this;
    reader.onload = function() {
        editor.setValue(this.result);
    };
    reader.readAsText(file);
  }
}
