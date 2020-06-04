import { Request, Response } from "express"
import knex from "../database/connection"

class PointsController {
  async show(request: Request, response: Response) {
    const id = request.params.id

    const point = await knex('points').where('id', id).first()

    if (!point) {
      return response.status(400).json({ message: 'Point not found. '})
    }

/*
  SELECT * FROM items
    JOIN pointsItems ON items_id = pointItems.item_id
    WHERE pointItems.point_id = { id }
*/

    const items = await knex('items')
      .join('pointItems', 'items.id', '=', 'pointItems.item_id')
      .where('pointItems.point_id', id)
      .select('items.title')

    return response.json({point, items}) 
  }

  async create (request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body
  
    const trx = await knex.transaction()

    const point = {
      image: 'imageFake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }
  
    const isertedIds = await trx('points').insert(point)
  
    const point_id = isertedIds[0]
  
    const point_items = items.map((item_id: number) => {
      return {
        item_id,
        point_id
      }
    })
  
    await trx('pointItems').insert(point_items)

    await trx.commit()
  
    return response.json({ 
      id: point_id,
      ...point
     })
  }
}

export default PointsController