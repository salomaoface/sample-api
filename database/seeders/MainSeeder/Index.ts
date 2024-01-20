import Application from '@ioc:Adonis/Core/Application'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    if (!Application.inDev) {
      return
    }

    await new Seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../State'))
    await this.runSeeder(await import('../Tillage'))
    await this.runSeeder(await import('../Farmer'))
    await this.runSeeder(await import('../TillageFarmer'))
  }
}
