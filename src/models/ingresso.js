import { Model } from 'sequelize';

export default class ingresso extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    sessao: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'sessao',
        key: 'sessaoID'
      }
    },
    poltrona: {
      type: DataTypes.STRING(45),
      allowNull: true,
      references: {
        model: 'poltrona',
        key: 'poltronaID'
      }
    },
    tipo: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "null"
    },
    ingressoID: {
      type: DataTypes.STRING(345),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'ingresso',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ingressoID" },
        ]
      },
      {
        name: "sessao",
        using: "BTREE",
        fields: [
          { name: "sessao" },
        ]
      },
      {
        name: "poltrona",
        using: "BTREE",
        fields: [
          { name: "poltrona" },
        ]
      },
    ]
  });
  }
}
