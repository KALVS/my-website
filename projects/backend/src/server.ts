
import { registerRoutes } from './routes';

const express = require('express')
const app = express()
const port = 3000

export async function startServer() {
    // Set Up Express

  // Module Routes
  registerRoutes(app);



  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}