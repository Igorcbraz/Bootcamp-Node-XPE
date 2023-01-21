import fs from 'fs'
let cars = JSON.parse(fs.readFileSync('car-list.json'));

export const moreModels = (req, res) => {
  const maxModelsLength = Math.max(...cars.map(car => car.models.length))
  const modelWithMoreBrands = cars 
    .filter(car => car.models.length === maxModelsLength)
    .map(car => car.brand)
  
  const response = modelWithMoreBrands.length === 1 ? modelWithMoreBrands[0] : modelWithMoreBrands // Return a string if have one register or an array if more than one
  res.status(200).send(response)
}

export const lessModels = (req, res) => {
  const minModelsLength = Math.min(...cars.map(car => car.models.length))
  const modelWithLessBrands = cars 
    .filter(car => car.models.length === minModelsLength)
    .map(car => car.brand)
  
  const response = modelWithLessBrands.length === 1 ? modelWithLessBrands[0] : modelWithLessBrands // Return a string if have one register or an array if more than one
  res.status(200).send(response)
}

export const listMoreModels = (req, res) => {
  const { qtd } = req.params

  const countedModels = cars.map(car => {
    return {
      brand: car.brand,
      numOfModels: car.models.length
    }
  });

  const formattedList = countedModels
    .sort((a, b) => a.brand.localeCompare(b.brand)) // alphabetical order
    .sort((a, b) => b.numOfModels - a.numOfModels) //Num Models descending order
    .slice(0, qtd)
    .map(car =>{ return `${car.brand} - ${car.numOfModels}`})

  res.status(200).send(formattedList)
}

export const listLessModels = (req, res) => {
  const { qtd } = req.params

  const countedModels = cars.map(car => {
    return {
      brand: car.brand,
      numOfModels: car.models.length
    }
  });

  const formattedList = countedModels
    .sort((a, b) => a.brand.localeCompare(b.brand)) // alphabetical order
    .sort((a, b) => a.numOfModels - b.numOfModels) // Num Models ascending order
    .slice(0, qtd)
    .map(car =>{ return `${car.brand} - ${car.numOfModels}`})

  res.status(200).send(formattedList)
}

export const listModels = (req, res) => {
  const { nomeMarca } = req.body

  const brandModels = cars
    .filter(car => car.brand.toUpperCase() === nomeMarca.toUpperCase())
    .map(car => car.models)
    .flat()

  res.status(200).send(brandModels)
}
