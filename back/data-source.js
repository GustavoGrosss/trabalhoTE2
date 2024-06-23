"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const restaurante_entity_1 = require("./src/restaurante/restaurante.entity");
const prato_entity_1 = require("./src/prato/prato.entity");
const entregador_entity_1 = require("./src/entregador/entregador.entity");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.dataSourceOptions = {
    type: 'postgres',
    database: 'database',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    entities: [restaurante_entity_1.RestauranteEntity, prato_entity_1.PratoEntity, entregador_entity_1.EntregadorEntity],
    migrations: ['src/migrations/*{.ts,.js}'],
    synchronize: true,
};
exports.default = new typeorm_1.DataSource(exports.dataSourceOptions);
//# sourceMappingURL=data-source.js.map