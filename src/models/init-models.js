import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _filme from  "./filme.js";
import _ingresso from  "./ingresso.js";
import _poltrona from  "./poltrona.js";
import _sala from  "./sala.js";
import _sessao from  "./sessao.js";

export default function initModels(sequelize) {
  const filme = _filme.init(sequelize, DataTypes);
  const ingresso = _ingresso.init(sequelize, DataTypes);
  const poltrona = _poltrona.init(sequelize, DataTypes);
  const sala = _sala.init(sequelize, DataTypes);
  const sessao = _sessao.init(sequelize, DataTypes);

  sessao.belongsTo(filme, { as: "filme_filme", foreignKey: "filme"});
  filme.hasMany(sessao, { as: "sessaos", foreignKey: "filme"});
  ingresso.belongsTo(poltrona, { as: "poltrona_poltrona", foreignKey: "poltrona"});
  poltrona.hasMany(ingresso, { as: "ingressos", foreignKey: "poltrona"});
  poltrona.belongsTo(sala, { as: "sala_sala", foreignKey: "sala"});
  sala.hasMany(poltrona, { as: "poltronas", foreignKey: "sala"});
  sessao.belongsTo(sala, { as: "sala_sala", foreignKey: "sala"});
  sala.hasMany(sessao, { as: "sessaos", foreignKey: "sala"});
  ingresso.belongsTo(sessao, { as: "sessao_sessao", foreignKey: "sessao"});
  sessao.hasMany(ingresso, { as: "ingressos", foreignKey: "sessao"});

  return {
    filme,
    ingresso,
    poltrona,
    sala,
    sessao,
  };
}
