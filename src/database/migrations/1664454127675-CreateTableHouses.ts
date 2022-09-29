import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableHouses1664454127675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'houses',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'region',
                    type: 'varchar',
                },
                {
                    name: 'founded_in',
                    type: 'integer',
                },
                {
                    name: 'lord_id',
                    type: 'uuid',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                  name: 'houses',
                  columnNames: ['lord_id'],
                  referencedTableName: 'lords',
                  referencedColumnNames: ['id'],
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
                }
              ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('houses');
    }

}
