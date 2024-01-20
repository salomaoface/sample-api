import { v4 as uuidv4 } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeCreate, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Farmer from './Farmer'

export default class State extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static assignUuid(state: State) {
    if (!state.id) {
      state.id = uuidv4()
    }
  }

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Farmer)
  public farmers: HasMany<typeof Farmer>
}
