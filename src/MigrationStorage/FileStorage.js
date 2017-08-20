const { resolve } = require('path');
const { readFile, writeFile, remove } = require('fs-extra');

const MigrationStorage = require('./');

class FileMigrationStorage extends MigrationStorage {
  static fileTemplate() {
    return `var migrations = [];

module.exports = migrations;`;
  }

  static migrationTemplate(name) {
    return `

migrations.push({
  id: ${ JSON.stringify(name) },
  actions: {
    up: function () {

    },
    down: function () {

    }
  }
});`;
  }

  constructor({
    path = resolve('./migrations.js'),
    fileTemplate = FileMigrationStorage.fileTemplate,
    migrationTemplate = FileMigrationStorage.migrationTemplate
  } = {}) {
    super();

    this._path = path;
    this._fileTemplate = fileTemplate;
    this._migrationTemplate = migrationTemplate;
  }

  ensure() {
    return readFile(this._path).catch(() => (
      writeFile(this._path, this._fileTemplate())
    ));
  }

  destroy() {
    return remove(this._path);
  }

  getAllMigrations() {
    return new Promise((resolve) => {
      resolve(require(this._path));
    });
  }

  addMigration(name) {
    return writeFile(this._path, this._migrationTemplate(name), {
      flags: 'a'
    });
  }
}

module.exports = FileMigrationStorage;
