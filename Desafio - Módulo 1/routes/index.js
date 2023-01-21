import express from 'express'
import {
  moreModels,
  lessModels,
  listMoreModels,
  listLessModels,
  listModels
} from '../src/marcas.js'

export const router = express.Router();

router.get('/maisModelos', moreModels)
router.get('/menosModelos', lessModels)
router.get('/listaMaisModelos/:qtd', listMoreModels)
router.get('/listaMenosModelos/:qtd', listLessModels)
router.post('/listaModelos', listModels)