import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTableUrl1636206152594 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'urls',
				columns: [
					{
						name: '_id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'hash',
						type: 'varchar',
					},
					{
						name: 'originURL',
						type: 'varchar',
					},
					{
						name: 'shortURL',
						type: 'float',
					},
					{
						name: 'createdAt',
						type: 'datetime',
					},
					{
						name: 'updatedAt',
						type: 'datetime',
					},
				],
			}),
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('urls')
	}
}
