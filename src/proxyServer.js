import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(cors())

app.get('/api/recipe', async (req, res) => {
  try {
    const response = await axios.get('https://www.matprat.no/api/WeeklyMenuPlanner/GetRandomRecipe')
    res.json(response.data)
  } catch (error) {
    res.status(error.response?.status || 500).send(error.message)
  }
})

app.listen(5000, () => console.log('Proxy server running on port 5000'))
