//import { connectDb } from '@utils/database';

import { startServer } from './server';

(async () => {
  // Initialise DB Connection
  // await connectDb();
  // Start web server
  await startServer();
})();



// // Set Up Express
// const express = require('express')
// const app = express()
// const port = 3000


// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  


//   app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
//   })

