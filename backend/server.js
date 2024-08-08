import { default as express} from 'express'
import { default as fs } from 'fs'
import { default as path } from 'path'

const app = express()

const port = (process.env.PORT || 5000)
const DATA_FILE = path.join(__dirname, 'data/data.json')

app.get('/', (req, res) => {
  res.send('API server is running....')
})

app.get('/api/products', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      console.error('Reading file error', err)
      return res.status(500).json({ err: "Internal Server error"})
    }

    // Parse the JSON file
    let products 
    try {
      products = JSON.parse(data)
    }
    catch(parseError) {
      console.error('Error Parsing the JSON file:', parseError)
      return res.status(500).json({ err: 'Internal server error'})
    }

    res.setHeader('Cache-control', 'no-cache')
    res.status(200).json(products)
  })
})

app.listen(port, '127.0.0.1', () => {
  console.log(`Server running at port ${port}`)
})