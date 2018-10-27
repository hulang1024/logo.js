class Toolbar {
  constructor(game, editor) {
    this.editor = editor;
    var speedInput = document.getElementById('speed');
    var btnRun = document.getElementById('run');
    var btnFastRun = document.getElementById('fast-run');
    var btnPauseResume = document.getElementById('resume');
    var btnReset = document.getElementById('reset');

    this._initExamples();

    game.world.on('speedChanged', function() {
      speedInput.value = game.world.speed;
    });
    game.world.on('end', function() {
      [btnRun, btnFastRun].forEach(function(btn) {
        btn.removeAttribute('disabled');
        btn.className = '';
      });
    })

    speedInput.onchange = function() {
      game.world.speed = +this.value;
    }

    btnRun.onclick = function() {
      [btnRun, btnFastRun].forEach(function(btn) {
        btn.setAttribute('disabled', true);
        btn.className = 'disabled';
      });
      [btnPauseResume].forEach(function(btn) {
        btn.removeAttribute('disabled');
        btn.className = '';
      });

      game.setFastRunMode(false);
      game.world.speed = +speedInput.value;
      var code = editor.getValue();
      eval(code);
      game.world.resume();
    }

    btnFastRun.onclick = function() {
      [btnRun, btnFastRun].forEach(function(btn) {
        btn.setAttribute('disabled', true);
        btn.className = 'disabled';
      });
      [btnPauseResume].forEach(function(btn) {
        btn.removeAttribute('disabled');
        btn.className = '';
      });
      game.setFastRunMode(true);
      var code = editor.getValue();
      eval(code);
      game.world.resume();
    }

    btnPauseResume.onclick = function() {
      if (game.world.paused) {
        game.world.resume();
        this.innerText = '暂停';
      } else {
        game.world.pause();
        this.innerText = '继续';
      }
    }

    btnReset.onclick = function() {
      game.world.reset();
      [btnRun, btnFastRun].forEach(function(btn) {
        btn.removeAttribute('disabled');
        btn.className = '';
      });
      [btnPauseResume].forEach(function(btn) {
        btn.setAttribute('disabled', true);
        btn.className = 'disabled';
      });

      btnPauseResume.innerText = '暂停';
    }
  }

  _initExamples() {
    var toolbar = this;
    var select = document.getElementById('example-select');
    var baseUrl = 'https://raw.githubusercontent.com/hulang1024/logo.js/master/examples/';
    ['mandala', 'flower', 'flower1', 'rect'].forEach(function(name) {
      var opt = new Option();
      opt.text = name;
      opt.value = baseUrl + name + '.js';
      select.options.add(opt);
    });
    select.onchange = function() {
      var req = new XMLHttpRequest();
      req.open('GET', this.value + '?_=' + +new Date, true);
      req.addEventListener('load', function(event){
          var content = event.target.responseText;
          toolbar.editor.setValue(content);
      }, false);
      req.send(null);
    }

    select.value = select.options[0].value;
    select.onchange();
  }
}
