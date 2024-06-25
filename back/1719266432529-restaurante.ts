import { MigrationInterface, QueryRunner } from "typeorm";

export class Restaurante1719266432529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO restaurantes (id, nome, avaliacao, endereco, prazo_entrega, tipo) VALUES
            ('1a2b3c4d-5678-90ab-cdef-1234567890ab', 'Restaurante A', 4, 'Rua das Flores, 123', 30, 'P')`);
        await queryRunner.query(
            `INSERT INTO restaurantes (id, nome, avaliacao, endereco, prazo_entrega, tipo)
             VALUES
                 ('2b3c4d5e-6789-01ab-cdef-234567890abc', 'Restaurante B', 5, 'Avenida Central, 456', 45, 'B')`);
        await queryRunner.query(
            `INSERT INTO restaurantes (id, nome, avaliacao, endereco, prazo_entrega, tipo)
             VALUES
                 ('3c4d5e6f-7890-12ab-cdef-34567890abcd', 'Restaurante C', 3, 'Praça das Árvores, 789', 25, 'D')`);

        //pratos

        await queryRunner.query(
            `INSERT INTO pratos (id, nome, preco, proteina, vegano, avaliacao, restaurante_id)
             VALUES
                 ('4d5e6f7g-8901-23ab-cdef-4567890abcde', 'Prato A1', 29.90, 'G', false, 4, '1a2b3c4d-5678-90ab-cdef-1234567890ab');
            `);
        await queryRunner.query(
            `INSERT INTO pratos (id, nome, preco, proteina, vegano, avaliacao, restaurante_id)
             VALUES
                 ('5e6f7g8h-9012-34ab-cdef-567890abcdef', 'Prato B1', 34.50, 'S', false, 5, '2b3c4d5e-6789-01ab-cdef-234567890abc')`);
        await queryRunner.query(
            `INSERT INTO pratos (id, nome, preco, proteina, vegano, avaliacao, restaurante_id)
             VALUES
                 ('6f7g8h9i-0123-45ab-cdef-67890abcdef0', 'Prato C1', 22.00, 'M', true, 3, '3c4d5e6f-7890-12ab-cdef-34567890abcd')`);

        //entregadores

        await queryRunner.query(
            `INSERT INTO entregadores (id, nome, data_nascimento, genero, placa_veiculo, tipo_veiculo)
             VALUES
                 ('7g8h9i0j-1234-56ab-cdef-78901abcdef1', 'Entregador A', '1990-05-15', 'MASCULINO', 'ABC-1234', 'MOTO')`);
        await queryRunner.query(
            `INSERT INTO entregadores (id, nome, data_nascimento, genero, placa_veiculo, tipo_veiculo)
             VALUES
                 ('8h9i0j1k-2345-67ab-cdef-89012abcdef2', 'Entregador B', '1985-08-22', 'FEMININO', 'DEF-5678', 'CARRO');`);
        await queryRunner.query(
            `INSERT INTO entregadores (id, nome, data_nascimento, genero, placa_veiculo, tipo_veiculo)
             VALUES
                 ('9i0j1k2l-3456-78ab-cdef-90123abcdef3', 'Entregador C', '1992-11-30', 'INDEFINIDO', 'GHI-9012', 'OUTRO')`);

        //relação

        await queryRunner.query(
            `INSERT INTO restaurantes_entregadores (restaurante_id, entregador_id)
             VALUES
                 ('1a2b3c4d-5678-90ab-cdef-1234567890ab', '7g8h9i0j-1234-56ab-cdef-78901abcdef1')`);
        await queryRunner.query(
            `INSERT INTO restaurantes_entregadores (restaurante_id, entregador_id)
             VALUES
                 ('2b3c4d5e-6789-01ab-cdef-234567890abc', '8h9i0j1k-2345-67ab-cdef-89012abcdef2');`);
        await queryRunner.query(
            `INSERT INTO restaurantes_entregadores (restaurante_id, entregador_id)
             VALUES
                 ('3c4d5e6f-7890-12ab-cdef-34567890abcd', '9i0j1k2l-3456-78ab-cdef-90123abcdef3')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
