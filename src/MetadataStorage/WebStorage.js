const MetadataStorage = require('./');

class WebMetadataStorage extends MetadataStorage {
  constructor(options = {}) {
    super();

    const {
      keyName = '__migrace_metadata__'
    } = options;

    this._keyName = keyName;
  }

  ensure() {
    this.write('');
  }

  destroy() {
    localStorage.removeItem(this._keyName);
  }

  read() {
    return localStorage.getItem(this._keyName);
  }

  write(json) {
    localStorage.setItem(this._keyName, json);
  }
}

module.exports = WebMetadataStorage;
