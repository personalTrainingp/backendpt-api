const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");
const { Cliente } = require("./Usuarios");
const { detalleVenta_citas } = require("./Venta");

const Cita = db.define("tb_cita", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_cli: {
    type: DataTypes.INTEGER,
  },
  id_detallecita: {
    type: DataTypes.INTEGER,
  },
  fecha_init: {
    type: DataTypes.DATE,
  },
  fecha_final: {
    type: DataTypes.DATE,
  },
  status_cita: {
    type: DataTypes.STRING,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
Cita.sync()
  .then(() => {
    console.log("La tabla Cita ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

detalleVenta_citas.hasMany(Cita, { foreignKey: "id_detallecita" });
Cita.belongsTo(detalleVenta_citas, { foreignKey: "id_cita" });

module.exports = {
  Cita,
};
