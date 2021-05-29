import {MigrationInterface, QueryRunner} from "typeorm";

export class fix1622306441456 implements MigrationInterface {
    name = 'fix1622306441456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."tags" DROP CONSTRAINT "FK_23e749a73e682ddeaad5c81e5eb"`);
        await queryRunner.query(`ALTER TABLE "public"."tags" DROP CONSTRAINT "UQ_23e749a73e682ddeaad5c81e5eb"`);
        await queryRunner.query(`ALTER TABLE "public"."tags" ADD CONSTRAINT "FK_23e749a73e682ddeaad5c81e5eb" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."tags" DROP CONSTRAINT "FK_23e749a73e682ddeaad5c81e5eb"`);
        await queryRunner.query(`ALTER TABLE "public"."tags" ADD CONSTRAINT "UQ_23e749a73e682ddeaad5c81e5eb" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "public"."tags" ADD CONSTRAINT "FK_23e749a73e682ddeaad5c81e5eb" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
