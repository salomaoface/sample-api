import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateFarmerValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    documentId: schema.string([
      rules.regex(/^[0-9]{11}$|^[0-9]{14}$/g),
      rules.unique({ table: 'farmers', column: 'document_id' }),
      rules.isCPFCNPJ(),
    ]),
    farmerName: schema.string([rules.maxLength(100), rules.minLength(3), rules.trim()]),
    farmName: schema.string([rules.maxLength(100), rules.minLength(3), rules.trim()]),
    city: schema.string([rules.maxLength(14), rules.minLength(3)]),
    stateId: schema.string([rules.exists({ table: 'states', column: 'id' })]),
    forestArea: schema.number([rules.unsigned()]),
    arableArea: schema.number([rules.unsigned()]),
    totalArea: schema.number([rules.unsigned()]),
    tillages: schema
      .array()
      .members(schema.string([rules.exists({ table: 'tillages', column: 'id' })])),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
