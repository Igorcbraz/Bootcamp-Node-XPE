import express from 'express'
import {
  create,
  update,
  destroy,
  find,
  getClientPeds,
  getProductPeds,
  bestSellers
} from '../src/pedidos.js'

import {
  hasPed
} from '../src/middlewares/checkHasPed.js'

export const router = express.Router();

router.post('/', create)
router.patch('/:id', hasPed, update)
router.delete('/:id', hasPed, destroy)
router.get('/find/:id', hasPed, find)
router.get('/totalClientPed/:client', getClientPeds)
router.get('/totalProductPed/:product', getProductPeds)
router.get('/bestSellers', bestSellers)