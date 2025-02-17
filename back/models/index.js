/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Importa los modelos del directorio y los guarda en "db"
fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {

  // Crea las asociaciones
  if (db[modelName].associate) {
    db[modelName].associate(db);
  };

  // Define opciones de consulta predeterminadas
  db[modelName].addScope('defaultScope', {
    attributes: {
      exclude: ['deletedAt']
    }
  });
  
});

db.Course.addScope('withTeachersAndCategories', {
  include: [{
    model: db.User,
    as: 'teachers',
    through: { attributes: [] } // Omite la tabla de asociación
  }, {
    model: db.Category,
    as: 'categories',
    through: { attributes: [] }
  }]
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync();

module.exports = db;
