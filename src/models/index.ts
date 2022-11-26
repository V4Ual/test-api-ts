'use strict';

import fs from'fs';
import path from 'path'
import {Sequelize,DataTypes} from 'sequelize'
import nodeProcess from 'process'
const basename:string = path.basename(__filename);
const process:NodeJS.Process | any = nodeProcess
const env:string = process.env.NODE_ENV || 'development';
const config:any = require(__dirname + '/../config/config.js')[env];
const db:any = {};

let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default  db;
