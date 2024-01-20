import { v4 as uuidv4 } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, beforeCreate, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Farmer from './Farmer'

export default class Tillage extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static assignUuid(tillage: Tillage) {
    if (!tillage.id) {
      tillage.id = uuidv4()
    }
  }

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Farmer, {
    pivotTable: 'tillage_farmers',
  })
  public farmers: ManyToMany<typeof Farmer>
}
