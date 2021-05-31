import {MigrationInterface, QueryRunner} from "typeorm";

export class init1622485860196 implements MigrationInterface {
    name = 'init1622485860196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."users" ("deleted" text NOT NULL DEFAULT 'NOT_DELETED', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nickname" character varying(30) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "UQ_83603663b7d66e3d279aecc9577" UNIQUE ("nickname"), CONSTRAINT "UQ_12ffa5c867f6bb71e2690a526ce" UNIQUE ("email"), CONSTRAINT "PK_a6cc71bedf15a41a5f5ee8aea97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "user_nickname_unique_index" ON "public"."users" ("nickname") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "user_email_unique_index" ON "public"."users" ("email") `);
        await queryRunner.query(`CREATE TABLE "public"."tags" ("deleted" text NOT NULL DEFAULT 'NOT_DELETED', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, "sortOrder" integer NOT NULL, "userId" uuid, CONSTRAINT "UQ_3ae07146bb7ce37c933f3e5273a" UNIQUE ("name"), CONSTRAINT "PK_29133ba9c1abdc213d89e0e1d64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "name_unique_index" ON "public"."tags" ("name") `);
        await queryRunner.query(`CREATE TABLE "public"."users_tags" ("tagsId" integer NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_2b30f108591b13ab3120436f747" PRIMARY KEY ("tagsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_016265eadd83f296ef21ce5fe5" ON "public"."users_tags" ("tagsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_add1bba52d372f8f370d656928" ON "public"."users_tags" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "public"."tags" ADD CONSTRAINT "FK_23e749a73e682ddeaad5c81e5eb" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."users_tags" ADD CONSTRAINT "FK_016265eadd83f296ef21ce5fe5e" FOREIGN KEY ("tagsId") REFERENCES "public"."tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."users_tags" ADD CONSTRAINT "FK_add1bba52d372f8f370d6569288" FOREIGN KEY ("usersId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users_tags" DROP CONSTRAINT "FK_add1bba52d372f8f370d6569288"`);
        await queryRunner.query(`ALTER TABLE "public"."users_tags" DROP CONSTRAINT "FK_016265eadd83f296ef21ce5fe5e"`);
        await queryRunner.query(`ALTER TABLE "public"."tags" DROP CONSTRAINT "FK_23e749a73e682ddeaad5c81e5eb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_add1bba52d372f8f370d656928"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_016265eadd83f296ef21ce5fe5"`);
        await queryRunner.query(`DROP TABLE "public"."users_tags"`);
        await queryRunner.query(`DROP INDEX "public"."name_unique_index"`);
        await queryRunner.query(`DROP TABLE "public"."tags"`);
        await queryRunner.query(`DROP INDEX "public"."user_email_unique_index"`);
        await queryRunner.query(`DROP INDEX "public"."user_nickname_unique_index"`);
        await queryRunner.query(`DROP TABLE "public"."users"`);
    }

}
