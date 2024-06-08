import { Model } from 'sequelize';

export default class sala extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    salaNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    salaCapacidadeTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    salaCapacidadeAtual: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'sala',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "salaNum" },
        ]
      },
    ]
  });
  }
}
