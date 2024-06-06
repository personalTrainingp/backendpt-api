const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");
const { Proveedor } = require("./Proveedor");

const ParametroGastos = db.define("tb_parametros_gastos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  grupo: {
    type: DataTypes.STRING(35),
  },
  id_tipoGasto: {
    type: DataTypes.INTEGER,
  },
  nombre_gasto: {
    type: DataTypes.STRING(380),
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
const Gastos = db.define("tb_egresos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_gasto: {
    type: DataTypes.INTEGER,
  },
  grupo: {
    type: DataTypes.STRING(120),
  },
  moneda: {
    type: DataTypes.STRING(10),
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
  },
  id_tipo_comprobante: {
    type: DataTypes.INTEGER,
  },
  n_comprabante: {
    type: DataTypes.STRING(150),
  },
  impuesto_igv: {
    type: DataTypes.BOOLEAN,
  },
  impuesto_renta: {
    type: DataTypes.BOOLEAN,
  },
  fec_registro: {
    type: DataTypes.DATEONLY,
  },
  fec_pago: {
    type: DataTypes.DATEONLY,
  },
  id_forma_pago: {
    type: DataTypes.INTEGER,
  },
  id_banco_pago: {
    type: DataTypes.INTEGER,
  },
  n_operacion: {
    type: DataTypes.STRING(100),
  },
  id_rubro: {
    type: DataTypes.INTEGER,
  },
  descripcion: {
    type: DataTypes.STRING(360),
  },
  id_prov: {
    type: DataTypes.INTEGER,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Gastos.hasOne(ParametroGastos, {
  foreignKey: "id",
  sourceKey: "id_gasto",
});
ParametroGastos.belongsTo(Gastos, {
  foreignKey: "id_gasto",
  sourceKey: "id",
});

Gastos.hasOne(Proveedor, {
  foreignKey: "id",
  sourceKey: "id_prov",
});
Proveedor.belongsTo(Gastos, {
  foreignKey: "id_prov",
  sourceKey: "id",
});

// Controlador para actualizar la longitud del campo
const actualizarLongitudDelCampo = async () => {
  try {
    // Altera la estructura de la tabla para cambiar la longitud del campo
    await db.query(
      "ALTER TABLE tb_GastosFijos ALTER COLUMN sigla_gf nvarchar(20);"
    );

    console.log("Se ha actualizado la longitud del campo correctamente.");
  } catch (error) {
    console.error("Error al actualizar la longitud del campo:", error);
  } finally {
    // Cierra la conexión a la base de datos
    await db.close();
  }
};

ParametroGastos.sync()
  .then(() => {
    console.log("La tabla ParametroGastos ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
Gastos.sync()
  .then(() => {
    console.log("La tabla Gastos ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

// Llama a la función para actualizar la longitud del campo
// actualizarLongitudDelCampo();

module.exports = {
  ParametroGastos,
  Gastos,
};
