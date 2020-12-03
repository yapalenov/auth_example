import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

export class Model {
  constructor(fileName) {
    this.source = `${process.env.DATA_PATH}/${fileName}`;
  }

  async _readData() {
    const stringData = await readFile(this.source, 'utf8');
    return JSON.parse(stringData);
  }

  async findOne(options = {}) {
    const data = await this._readData();
    if (!data) {
      return;
    }
    return data.find((element) =>
      Object.keys(options).every((key) => options[key] === element[key])
    );
  }

  async find(options = {}) {
    const data = await this._readData();
    return data.filter((element) =>
      Object.keys(options).every((key) => options[key] === element.key)
    );
  }
}
