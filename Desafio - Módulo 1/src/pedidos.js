import fs from 'fs'
const peds = JSON.parse(fs.readFileSync('pedidos.json'));

export const create = (req, res) => {
  const { client, product, value } = req.body
  const { pedidos, nextId } = peds

  const newPed = {
    id: pedidos[pedidos.length - 1].id + 1,
    cliente: client,
    produto: product,
    valor: value,
    entregue: false,
    timestamp: new Date().toISOString()
  }
  pedidos.push(newPed)

  fs.writeFileSync('pedidos.json', JSON.stringify({ nextId: nextId + 1, pedidos }, null, 2))
  res.status(200).send(newPed)
}

export const update = (req, res) => {
  const { id } = req.params
  const { client, product, value, delivered } = req.body
  const { pedidos, nextId } = peds

  const newPed = {
    id: Number(id),
    cliente: client,
    produto: product,
    valor: value,
    entregue: delivered,
    timestamp: new Date().toISOString()
  }
  pedidos.splice(indexPed, 1, newPed)

  fs.writeFileSync('pedidos.json', JSON.stringify({ nextId: nextId, pedidos }, null, 2))
  res.status(200).send(newPed)
}

export const destroy = (req, res) => {
  const { id } = req.params
  const { pedidos, nextId } = peds

  const indexPed = pedidos.findIndex(p => p.id === Number(id))
  pedidos.splice(indexPed, 1)
  
  fs.writeFileSync('pedidos.json', JSON.stringify({ nextId: nextId, pedidos }, null, 2))
  res.status(200).send('Removido com sucesso')
}

export const find = (req, res) => {
  const { id } = req.params
  const { pedidos } = peds

  const data = pedidos.find(p => p.id === Number(id))
  
  res.status(200).send(data)
}

export const getClientPeds = (req, res) => {
  const { client } = req.params
  const { pedidos } = peds

  const data = pedidos
    .filter(p => p.cliente)
    .filter(p => p.cliente.toUpperCase().split(" ").join("") === client.toUpperCase().split(" ").join("") && p.entregue === true)
    .reduce((acc, ped) => acc + ped.valor, 0)
    .toString()

  res.status(200).send(data)
}

export const getProductPeds = (req, res) => {
  const { product } = req.params
  const { pedidos } = peds

  const data = pedidos
    .filter(p => p.produto)
    .filter(p => p.produto.toUpperCase().split(" ").join("") === product.toUpperCase().split(" ").join("") && p.entregue === true)
    .reduce((acc, ped) => acc + ped.valor, 0)
    .toString()

  res.status(200).send(data)
}

export const bestSellers = (req, res) => {
  const { pedidos } = peds

  const products = pedidos.map(ped => ped.produto)
  const uniqueProducts = [...new Set(products)]

  const groupByProduct = pedidos
    .filter(ped => ped.entregue === true) 
    .reduce((group, order) => {
      const { produto } = order;
      group[produto] = group[produto] ?? [];
      group[produto].push(order);
      return group;
    }, {});

  const data = uniqueProducts.map(product => {
    return {
      produto: product,
      numOfPeds: groupByProduct[product].length
    }
  })
  const bestSellers = data
    .sort((a, b) => b.numOfPeds - a.numOfPeds)
    .map(item => `${item.produto} - ${item.numOfPeds}`)

  res.status(200).send(bestSellers)
}