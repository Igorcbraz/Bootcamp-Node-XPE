import express from 'express'
import { router } from './routes/index.js'

const app = express()
const PORT =  3030

app.use(express.json())
app.use('/marcas', router)

app.listen(PORT, () => { console.log(`Server is running on port ${PORT} 🚀`) })