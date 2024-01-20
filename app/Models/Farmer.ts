import { v4 as uuidv4 } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, beforeCreate, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Tillage from './Tillage'

export default class Farmer extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static assignUuid(farmer: Farmer) {
    if (!farmer.id) {
      farmer.id = uuidv4()
    }
  }

  @column({
    columnName: 'document_id',
  })
  public documentId: string

  @column({
    columnName: 'farmer_name',
  })
  public farmerName: string

  @column({
    columnName: 'farm_name',
  })
  public farmName: string

  @column()
  public city: string

  @column({
    columnName: 'state_id',
  })
  public stateId: string

  @column({
    columnName: 'forest_area',
  })
  public forestArea: number

  @column({
    columnName: 'arable_area',
  })
  public arableArea: number

  @column({
    columnName: 'total_area',
  })
  public totalArea: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Tillage, {
    pivotTable: 'tillage_farmers',
  })
  public tillages: ManyToMany<typeof Tillage>
}
