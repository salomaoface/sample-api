import { v4 as uuidv4 } from 'uuid'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farmer from 'App/Models/Farmer'
import CreateFarmerValidator from 'App/Validators/CreateFarmerValidator'
import UpdateFarmerValidator from 'App/Validators/UpdateFarmerValidator'
import State from 'App/Models/State'
import Database from '@ioc:Adonis/Lucid/Database'
import Tillage from 'App/Models/Tillage'

export default class FarmersController {
  public async index({ request, response }: HttpContextContract) {
    const { search } = request.qs()

    let farmers: Farmer[]
    let states: State[]
    let tillages: Tillage[]

    switch (search) {
      case 'totalFarms':
        let totalSum: number = 0
        farmers = await Farmer.query().select('farm_name').count('id as total').groupBy('farm_name')

        const sumFarms = farmers.map((fr) => {
          totalSum = totalSum + +fr.$extras.total

          return {
            name: fr.farmName,
          }
        })
        return response.send({
          farms: sumFarms,
          amount: totalSum,
        })

      case 'totalArea':
        let totalAreaSum: number = 0
        farmers = await Farmer.query().select('farm_name', 'total_area')

        const sumTotalArea = farmers.map((fr) => {
          totalAreaSum = totalAreaSum + fr.totalArea

          return {
            name: fr.farmName,
            totalArea: fr.totalArea,
          }
        })
        return response.send({
          farms: sumTotalArea,
          totalAreaInHectares: totalAreaSum,
        })

      case 'byState':
        states = await State.query()
          .select('states.name as name', Database.raw('count(farmers.id) as total'))
          .leftJoin('farmers', 'states.id', 'farmers.state_id')
          .groupBy('states.id', 'states.name')

        const statesResult = states.map((st) => {
          return {
            name: st.name,
            total: st.$extras.total,
          }
        })
        return response.send(statesResult)

      case 'byTillage':
        tillages = await Tillage.query()
          .select('tillages.name as name', Database.raw('count(tillage_farmers.id) as total'))
          .leftJoin('tillage_farmers', 'tillages.id', 'tillage_farmers.tillage_id')
          .groupBy('tillages.id', 'tillages.name')

        const tillagesResult = tillages.map((til) => {
          return {
            name: til.name,
            total: til.$extras.total,
          }
        })
        return response.send(tillagesResult)

      case 'soilUsage':
        let sumArableArea: number = 0
        let sumForestArea: number = 0
        let sumAreaTotal: number = 0

        farmers = await Farmer.query().select(
          'farm_name',
          'total_area',
          'arable_area',
          'forest_area'
        )

        const soilUsageResult = farmers.map((fr) => {
          sumArableArea = sumArableArea + fr.arableArea
          sumForestArea = sumForestArea + fr.forestArea
          sumAreaTotal = sumAreaTotal + fr.totalArea

          return {
            name: fr.farmName,
            arableArea: fr.arableArea,
            forestArea: fr.forestArea,
            totalArea: fr.totalArea,
            percentArableArea: (100 * fr.arableArea) / fr.totalArea,
            percentForestArea: (100 * fr.forestArea) / fr.totalArea,
          }
        })

        return response.send({
          farms: soilUsageResult,
          totals: {
            sumArableArea,
            sumForestArea,
            sumAreaTotal,
            percentArableArea: (100 * sumArableArea) / sumAreaTotal,
            percentForestArea: (100 * sumForestArea) / sumAreaTotal,
          },
        })
      default:
        farmers = await Farmer.all()
        break
    }

    return response.json(farmers)
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const farmer = await Farmer.query()
      .preload('tillages', (query) => {
        query.pivotColumns(['id'])
      })
      .where('id', id)
      .firstOrFail()

    return response.json(farmer)
  }

  // TODO: to implement transactions
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateFarmerValidator)

    if (payload.arableArea + payload.forestArea > payload.totalArea) {
      return response.badRequest({
        erro: 'Invalid total area',
      })
    }

    const farmer = new Farmer()
    farmer.documentId = payload.documentId
    farmer.farmerName = payload.farmerName
    farmer.farmName = payload.farmName
    farmer.city = payload.city
    farmer.stateId = payload.stateId
    farmer.forestArea = payload.forestArea
    farmer.arableArea = payload.arableArea
    farmer.totalArea = payload.totalArea

    const farmerResult = await farmer.save()

    for (const tillageId of payload.tillages) {
      await farmerResult.related('tillages').attach({
        [tillageId]: {
          id: uuidv4(),
        },
      })
    }

    return response.json({
      id: farmerResult.id,
      message: 'Cadastrado registrado com sucesso.',
    })
  }

  // TODO: to implement transactions
  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const payload = await request.validate(UpdateFarmerValidator)

    if (payload.arableArea + payload.forestArea > payload.totalArea) {
      return response.badRequest({
        erro: 'Invalid total area',
      })
    }

    const farmer = await Farmer.query()
      .preload('tillages', (query) => {
        query.pivotColumns(['id'])
      })
      .where('id', id)
      .firstOrFail()

    const tillages = farmer.tillages.concat().map((til) => {
      return til.id
    })

    await farmer.related('tillages').detach(tillages)

    farmer.farmerName = payload.farmerName
    farmer.farmName = payload.farmName
    farmer.city = payload.city
    farmer.stateId = payload.stateId
    farmer.forestArea = payload.forestArea
    farmer.arableArea = payload.arableArea
    farmer.totalArea = payload.totalArea
    const famerUpdated = await farmer.save()

    for (const tillageId of payload.tillages) {
      await famerUpdated.related('tillages').attach({
        [tillageId]: {
          id: uuidv4(),
        },
      })
    }

    return response.json({
      message: 'Dados atualizados com sucesso.',
    })
  }

  // TODO: to implement transactions
  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const farmer = await Farmer.query()
      .preload('tillages', (query) => {
        query.pivotColumns(['id'])
      })
      .where('id', id)
      .firstOrFail()

    const tillages = farmer.tillages.concat().map((til) => {
      return til.id
    })

    await farmer.related('tillages').detach(tillages)
    await farmer.delete()

    return response.json({
      message: 'Cadastro deletado com sucesso.',
    })
  }
}
