import fs from 'fs'
const peds = JSON.parse(fs.readFileSync('pedidos.json'));

export const hasPed = (req, res, next) => {
  const { id } = req.params
  const { pedidos } = peds

  const indexPed = pedidos.findIndex(p => p.id === Number(id))

  if (indexPed === -1) {
    res.status(404).send('Pedido não encontrado')
    return
  }
  
  next()
}