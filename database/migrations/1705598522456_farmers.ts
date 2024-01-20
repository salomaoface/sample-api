import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'farmers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id', {
        primaryKey: true,
      })
      table.string('document_id', 14).unique().notNullable()
      table.string('farmer_name', 100).notNullable()
      table.string('farm_name', 100).notNullable()
      table.string('city', 40).notNullable()
      table.float('forest_area', 2).notNullable()
      table.float('arable_area', 2).notNullable()
      table.float('total_area', 2).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      /**
       * Relationships
       */
      table.uuid('state_id').references('states.id').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
