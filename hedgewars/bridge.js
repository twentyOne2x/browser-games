/* GPL-2.0. Browser IPC subset reused from apmlabs/webwars at 406e53f.
   Adapted 2026-10-11 for local hotseat in the Play frame. Engine/rules upstream. */
var HWEngine = {
  messageQueue: [], outputBuffer: [], stderrBuffer: [], events: [],
  readIPC: function(ptr, max) {
    var n = 0;
    while (n < max && this.messageQueue.length) Module.HEAPU8[ptr + n++] = this.messageQueue.shift();
    return n;
  },
  writeIPC: function(ptr, len) {
    var bytes = Module.HEAPU8.slice(ptr, ptr + len);
    this.events.push({time: performance.now(), bytes: Array.from(bytes)});
    if (this.events.length > 500) this.events.shift();
    if (len >= 2 && bytes[1] === 0x3f) this.messageQueue.unshift(3, 0x21, 0, 0);
    if (len >= 2 && bytes[1] === 0x43) this.startHotseatGame();
    if (len >= 2 && bytes[1] === 0x45) window.gameFailed(new Error(new TextDecoder().decode(bytes.slice(2,-2))));
    if (len >= 2 && (bytes[1] === 0x71 || bytes[1] === 0x51)) window.gameEnded();
  },
  sendMessage: function(msg) {
    var bytes = new TextEncoder().encode(msg);
    this.messageQueue.push(bytes.length, ...bytes);
  },
  readByte: function() { return this.messageQueue.length ? this.messageQueue.shift() : -1; },
  onStdoutByte: function(ch) { this.outputBuffer.push(ch); },
  onStderrByte: function(ch) {
    this.stderrBuffer.push(ch);
    if (ch === 10) {
      var line = new TextDecoder().decode(new Uint8Array(this.stderrBuffer)).trim();
      console.log('[HW]', line);
      var match = line.match(/PLAY_STATE (.*)/);
      if (match) { var state = JSON.parse(match[1]); this.states.push(state); if (this.states.length > 5000) this.states.shift(); }
      this.stderrBuffer = [];
    }
  },
  sendAmmoAndTeam: function(color, name, hogs) {
    this.sendMessage('eammloadt ' + '9'.repeat(60));
    for (var cmd of ['eammprob', 'eammdelay', 'eammreinf']) this.sendMessage(cmd + ' ' + '0'.repeat(60));
    this.sendMessage('eammstore');
    this.sendMessage('eaddteam x ' + color + ' ' + name);
    this.sendMessage('efort Earth');
    for (var hog of hogs) {
      this.sendMessage('eaddhh 0 100 ' + hog);
      this.sendMessage('ehat NoHat');
    }
  },
  startHotseatGame: function() {
    this.sendMessage('emap ' + document.getElementById('map').value);
    this.sendMessage('etheme Nature');
    this.sendMessage('escript Scripts/PlayObserver.lua');
    this.sendMessage('eseed {play-hedgewars-local}');
    var settings = {gmflags:0, damagepct:100, turntime:45000, sd_turns:15,
      casefreq:5, minestime:3000, minesnum:4, minedudpct:0, explosives:2,
      airmines:0, healthprob:35, hcaseamount:25, waterrise:47, healthdec:5,
      ropepct:100, getawaytime:100, worldedge:0, template_filter:0, feature_size:12, mapgen:0};
    for (var name in settings) this.sendMessage('e$' + name + ' ' + settings[name]);
    this.sendAmmoAndTeam('16733782', 'Red Team', ['Red 1', 'Red 2']);
    this.sendAmmoAndTeam('5746175', 'Blue Team', ['Blue 1', 'Blue 2']);
    this.sendMessage('TL');
    this.sendMessage('!');
  }
};
HWEngine.states = [];
Module.HWEngine = HWEngine;
Module.preRun = [function() {
  for (var file of window.gameData.files) {
    var dir = file.name.slice(0, file.name.lastIndexOf('/'));
    FS.mkdirTree(dir);
    FS.writeFile(file.name, window.gameData.bytes.subarray(file.start, file.end));
  }
  FS.mkdirTree('/Data/Scripts');
  FS.writeFile('/Data/Scripts/PlayObserver.lua', window.gameData.observer);
  FS.init(() => { var b = HWEngine.readByte(); return b === -1 ? null : b; },
    ch => HWEngine.onStdoutByte(ch), ch => HWEngine.onStderrByte(ch));
}];
Module.onRuntimeInitialized = async function() {
  window.runtimeReady();
  await window.startRequested;
  document.getElementById('menu').hidden = true;
  document.getElementById('canvas').focus();
  try { await Module._hwengine_RunEngine_internal(); window.gameEnded(); }
  catch (error) { if (error !== 'unwind') window.gameFailed(error); }
};
