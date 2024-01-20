import { v4 as uuidv4 } from 'uuid'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Farmer from 'App/Models/Farmer'
import Tillage from 'App/Models/Tillage'

export default class extends BaseSeeder {
  public async run() {
    const soja = await Tillage.findOrFail('d86f9a30-3206-4995-99a8-78959b9ac439')
    const milho = await Tillage.findOrFail('2d122dd0-91d8-441c-801d-acddd0431ac8')
    const arroz = await Tillage.findOrFail('b3e84949-113b-4331-b821-c251fbbca021')
    const cafe = await Tillage.findOrFail('7063c456-42bb-4ae0-b03d-cedcc2dda89e')
    const banana = await Tillage.findOrFail('68aa3eb4-9b35-4485-8af6-94b90a3e208a')

    const farmer01 = await Farmer.findOrFail('e30f34e9-11fe-4a5a-86d9-b358d6d736f4')
    const farmer02 = await Farmer.findOrFail('1bae70d3-449e-465c-ab87-d41ce658e776')
    const farmer03 = await Farmer.findOrFail('8ff70e2d-f227-4f44-8ee6-188f85dc8aa5')
    const farmer04 = await Farmer.findOrFail('9090b781-952a-48cd-a3aa-808432d2d1f1')
    const farmer05 = await Farmer.findOrFail('a849e4ac-ccb0-4c7f-aac2-483afb28f69d')
    const farmer06 = await Farmer.findOrFail('d41188a8-b9e3-4c46-864b-da6e5085a3ad')
    const farmer07 = await Farmer.findOrFail('090652b9-0ad5-4d3b-a015-caf23e02b8db')
    const farmer08 = await Farmer.findOrFail('59c02c84-7e37-458b-bd18-6d19fa5d71db')
    const farmer09 = await Farmer.findOrFail('05020f23-114a-48df-a4f1-ded0f5ae2447')
    const farmer10 = await Farmer.findOrFail('deeec87c-a62d-4f5e-9291-6b0eacf70c2e')
    const farmer11 = await Farmer.findOrFail('1ae4b5ae-ce6f-4918-8025-ec5c8f46e127')
    const farmer12 = await Farmer.findOrFail('5d98d3aa-0421-43b1-8fab-9e20c46f1258')
    const farmer13 = await Farmer.findOrFail('00110cc3-d229-4467-9be6-aedba3b9cb7d')
    const farmer14 = await Farmer.findOrFail('f02cfae2-8150-41ff-9569-5a6d49a53499')
    const farmer15 = await Farmer.findOrFail('bea4b77d-db16-4883-924c-5393a32066ac')
    const farmer16 = await Farmer.findOrFail('fa499da0-3782-42c7-9abb-55a75362319a')
    const farmer17 = await Farmer.findOrFail('d14ca88a-49b5-4a95-8d8d-5828f03f4179')
    const farmer18 = await Farmer.findOrFail('b9c88bec-c8bd-4691-8e52-21eeb95a6848')
    const farmer19 = await Farmer.findOrFail('16f2b82f-2865-4985-a933-626ad5ece1cb')
    const farmer20 = await Farmer.findOrFail('3f7be5fd-5de1-4efc-ae11-16a040866ee8')
    const farmer21 = await Farmer.findOrFail('0da9b432-ae84-4fb0-8b7e-e9f7eb5e5adf')
    const farmer22 = await Farmer.findOrFail('d198a4ed-82bd-47e8-b13c-2f55160530d8')
    const farmer23 = await Farmer.findOrFail('c7531ecc-5994-4442-8be6-78a133664dc0')
    const farmer24 = await Farmer.findOrFail('8bdef936-02fd-4669-95ec-df21e4bd37fa')

    await soja.related('farmers').attach({
      [farmer04.id]: {
        id: uuidv4(),
      },
    })
    await soja.related('farmers').attach({
      [farmer05.id]: {
        id: uuidv4(),
      },
    })
    await soja.related('farmers').attach({
      [farmer06.id]: {
        id: uuidv4(),
      },
    })
    await soja.related('farmers').attach({
      [farmer08.id]: {
        id: uuidv4(),
      },
    })
    await soja.related('farmers').attach({
      [farmer09.id]: {
        id: uuidv4(),
      },
    })
    await soja.related('farmers').attach({
      [farmer17.id]: {
        id: uuidv4(),
      },
    })
    await soja.related('farmers').attach({
      [farmer21.id]: {
        id: uuidv4(),
      },
    })

    await milho.related('farmers').attach({
      [farmer01.id]: {
        id: uuidv4(),
      },
    })
    await milho.related('farmers').attach({
      [farmer02.id]: {
        id: uuidv4(),
      },
    })
    await milho.related('farmers').attach({
      [farmer06.id]: {
        id: uuidv4(),
      },
    })
    await milho.related('farmers').attach({
      [farmer10.id]: {
        id: uuidv4(),
      },
    })
    await milho.related('farmers').attach({
      [farmer15.id]: {
        id: uuidv4(),
      },
    })
    await milho.related('farmers').attach({
      [farmer23.id]: {
        id: uuidv4(),
      },
    })
    await milho.related('farmers').attach({
      [farmer22.id]: {
        id: uuidv4(),
      },
    })

    //-//

    await arroz.related('farmers').attach({
      [farmer11.id]: {
        id: uuidv4(),
      },
    })
    await arroz.related('farmers').attach({
      [farmer19.id]: {
        id: uuidv4(),
      },
    })
    await arroz.related('farmers').attach({
      [farmer20.id]: {
        id: uuidv4(),
      },
    })
    await arroz.related('farmers').attach({
      [farmer10.id]: {
        id: uuidv4(),
      },
    })
    await arroz.related('farmers').attach({
      [farmer15.id]: {
        id: uuidv4(),
      },
    })
    await arroz.related('farmers').attach({
      [farmer16.id]: {
        id: uuidv4(),
      },
    })
    await arroz.related('farmers').attach({
      [farmer22.id]: {
        id: uuidv4(),
      },
    })

    //-//

    await cafe.related('farmers').attach({
      [farmer03.id]: {
        id: uuidv4(),
      },
    })
    await cafe.related('farmers').attach({
      [farmer07.id]: {
        id: uuidv4(),
      },
    })
    await cafe.related('farmers').attach({
      [farmer18.id]: {
        id: uuidv4(),
      },
    })
    await cafe.related('farmers').attach({
      [farmer10.id]: {
        id: uuidv4(),
      },
    })
    await cafe.related('farmers').attach({
      [farmer15.id]: {
        id: uuidv4(),
      },
    })
    await cafe.related('farmers').attach({
      [farmer16.id]: {
        id: uuidv4(),
      },
    })
    await cafe.related('farmers').attach({
      [farmer22.id]: {
        id: uuidv4(),
      },
    })

    //-//

    await banana.related('farmers').attach({
      [farmer12.id]: {
        id: uuidv4(),
      },
    })
    await banana.related('farmers').attach({
      [farmer13.id]: {
        id: uuidv4(),
      },
    })
    await banana.related('farmers').attach({
      [farmer14.id]: {
        id: uuidv4(),
      },
    })
    await banana.related('farmers').attach({
      [farmer23.id]: {
        id: uuidv4(),
      },
    })
    await banana.related('farmers').attach({
      [farmer05.id]: {
        id: uuidv4(),
      },
    })
    await banana.related('farmers').attach({
      [farmer16.id]: {
        id: uuidv4(),
      },
    })
    await banana.related('farmers').attach({
      [farmer24.id]: {
        id: uuidv4(),
      },
    })
  }
}
