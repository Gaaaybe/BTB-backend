import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';
import config from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  });

for (const file of modelFiles) {
  const modelFilePath = path.join(__dirname, file);
  const modelFileUrl = pathToFileURL(modelFilePath).href;
  const { default: modelImport } = await import(modelFileUrl);
  
  if (typeof modelImport.init === 'function') {
    const model = modelImport.init(sequelize, DataTypes);
    db[model.name] = model;
  } else {
    console.error(`Model ${file} does not export an init function`);
  }
}

for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
