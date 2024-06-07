import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class filme extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    filmeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "none"
    },
    diretor: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "none"
    },
    estudio: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "none"
    },
    duracao: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00:00"
    },
    classInd: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    genero: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "none"
    },
    sinopse: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "none"
    }
  }, {
    sequelize,
    tableName: 'filme',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "filmeID" },
        ]
      },
      {
        name: "filmeID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "filmeID" },
        ]
      },
    ]
  });
  }
}
