window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function LocalStorageManager() {
  this.bestScoreKey     = "bestScore";
  this.gameStateKey     = "gameState";

}

// Every browser storage access may fail, including after a successful call.
// Only the best score persists. The current game stays in memory.
LocalStorageManager.prototype.getBestScore = function () {
  var score = Number(window.fakeStorage.getItem(this.bestScoreKey)) || 0;
  try {
    var saved = Number(window.localStorage.getItem(this.bestScoreKey));
    if (isFinite(saved) && saved > score) score = saved;
  } catch (error) {}
  window.fakeStorage.setItem(this.bestScoreKey, score);
  return score;
};

LocalStorageManager.prototype.setBestScore = function (score) {
  window.fakeStorage.setItem(this.bestScoreKey, score);
  try {
    window.localStorage.setItem(this.bestScoreKey, String(score));
  } catch (error) {}
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function () {
  var stateJSON = window.fakeStorage.getItem(this.gameStateKey);
  return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  window.fakeStorage.setItem(this.gameStateKey, JSON.stringify(gameState));
};

LocalStorageManager.prototype.clearGameState = function () {
  window.fakeStorage.removeItem(this.gameStateKey);
};
