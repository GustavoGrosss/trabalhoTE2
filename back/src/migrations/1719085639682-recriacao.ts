import { MigrationInterface, QueryRunner } from "typeorm";

export class Recriacao1719085639682 implements MigrationInterface {
    name = 'Recriacao1719085639682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pratos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "preco" double precision NOT NULL, "proteina" "public"."pratos_proteina_enum" NOT NULL DEFAULT 'G', "vegano" boolean NOT NULL DEFAULT false, "avaliacao" integer NOT NULL, "restauranteId" uuid, CONSTRAINT "PK_50d2a55b1c04c528d7cc67a106f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entregadores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "data_nascimento" date NOT NULL, "genero" "public"."entregadores_genero_enum" NOT NULL DEFAULT 'I', "placa_veiculo" character varying(10) NOT NULL, "tipo_veiculo" "public"."entregadores_tipo_veiculo_enum" NOT NULL DEFAULT 'M', CONSTRAINT "PK_812545842bfa52f5dae0d9f7ac1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurantes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "avaliacao" integer NOT NULL, "endereco" character varying(100) NOT NULL, "prazo_entrega" integer NOT NULL, "tipo" "public"."restaurantes_tipo_enum" NOT NULL DEFAULT 'P', CONSTRAINT "PK_a5a8cab911b052fac23912033ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurantes_entregadores" ("restaurante_id" uuid NOT NULL, "entregador_id" uuid NOT NULL, CONSTRAINT "PK_b06aea34a3fc6a13bb60f2e67b3" PRIMARY KEY ("restaurante_id", "entregador_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9750fd4142fe70038d33379798" ON "restaurantes_entregadores" ("restaurante_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0ec5cc081bd37c43c177578454" ON "restaurantes_entregadores" ("entregador_id") `);
        await queryRunner.query(`ALTER TABLE "pratos" ADD CONSTRAINT "FK_62391ccac27abd0e42e5f8c59f4" FOREIGN KEY ("restauranteId") REFERENCES "restaurantes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurantes_entregadores" ADD CONSTRAINT "FK_9750fd4142fe70038d33379798b" FOREIGN KEY ("restaurante_id") REFERENCES "restaurantes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurantes_entregadores" ADD CONSTRAINT "FK_0ec5cc081bd37c43c1775784546" FOREIGN KEY ("entregador_id") REFERENCES "entregadores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurantes_entregadores" DROP CONSTRAINT "FK_0ec5cc081bd37c43c1775784546"`);
        await queryRunner.query(`ALTER TABLE "restaurantes_entregadores" DROP CONSTRAINT "FK_9750fd4142fe70038d33379798b"`);
        await queryRunner.query(`ALTER TABLE "pratos" DROP CONSTRAINT "FK_62391ccac27abd0e42e5f8c59f4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0ec5cc081bd37c43c177578454"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9750fd4142fe70038d33379798"`);
        await queryRunner.query(`DROP TABLE "restaurantes_entregadores"`);
        await queryRunner.query(`DROP TABLE "restaurantes"`);
        await queryRunner.query(`DROP TABLE "entregadores"`);
        await queryRunner.query(`DROP TABLE "pratos"`);
    }

}
