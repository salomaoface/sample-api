import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import State from 'App/Models/State'

export default class SateSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'name'

    await State.updateOrCreateMany(uniqueKey, [
      {
        id: '9dd6d59d-2832-4d13-b167-b1e5574a15b1',
        name: 'CE',
      },
      {
        id: '478296b7-7b12-4c84-a41f-5dbe7e1b247c',
        name: 'MG',
      },
      {
        id: '51e53778-5303-43ce-9b7c-3b9d0a3b60e3',
        name: 'MT',
      },
      {
        id: 'a776bb76-dd38-4f3b-a739-48de3c37a7a7',
        name: 'MS',
      },
      {
        id: '51ac922f-34ee-42e9-b01d-c7309e38ceda',
        name: 'SP',
      },
      {
        id: '949aa6f0-5116-4edc-8f35-8e82ac12f29b',
        name: 'RS',
      },
      {
        id: '8893599d-c91d-487d-ab8f-def0bda0f9a1',
        name: 'PR',
      },
      {
        id: '2016b9e8-3f65-494e-83d6-963f171eb4b4',
        name: 'SC',
      },
    ])
  }
}
