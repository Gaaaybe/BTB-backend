import { Model } from 'sequelize';
export default class poltrona extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    sala: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sala',
        key: 'salaNum'
      }
    },
    poltronaNum: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    poltronaID: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    poltronaEstado:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }

  }, {
    sequelize,
    tableName: 'poltrona',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "poltronaID" },
        ]
      },
      {
        name: "sala",
        using: "BTREE",
        fields: [
          { name: "sala" },
        ]
      },
    ]
  });
  }
}
