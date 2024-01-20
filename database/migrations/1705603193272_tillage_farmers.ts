import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tillage_farmers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id', {
        primaryKey: true,
      })

      /**
       * Relationships
       */
      table.uuid('farmer_id').references('farmers.id')
      table.uuid('tillage_id').references('tillages.id')
      table.unique(['farmer_id', 'tillage_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
