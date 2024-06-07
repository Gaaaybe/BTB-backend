import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class sessao extends Model {
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
    filme: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'filme',
        key: 'filmeID'
      }
    },
    horarioData: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: "1000-01-01"
    },
    horarioHora: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00:00"
    },
    sessaoID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'sessao',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sessaoID" },
        ]
      },
      {
        name: "sala",
        using: "BTREE",
        fields: [
          { name: "sala" },
        ]
      },
      {
        name: "filme",
        using: "BTREE",
        fields: [
          { name: "filme" },
        ]
      },
    ]
  });
  }
}
