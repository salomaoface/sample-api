import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Tillage from 'App/Models/Tillage'

export default class TillageSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'name'

    await Tillage.updateOrCreateMany(uniqueKey, [
      {
        id: 'd86f9a30-3206-4995-99a8-78959b9ac439',
        name: 'Soja',
      },
      {
        id: '2d122dd0-91d8-441c-801d-acddd0431ac8',
        name: 'Milho',
      },
      {
        id: 'b3e84949-113b-4331-b821-c251fbbca021',
        name: 'Arroz',
      },
      {
        id: '7063c456-42bb-4ae0-b03d-cedcc2dda89e',
        name: 'Cafe',
      },
      {
        id: '68aa3eb4-9b35-4485-8af6-94b90a3e208a',
        name: 'Banana',
      },
    ])
  }
}
