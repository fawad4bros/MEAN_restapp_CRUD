const createServer = require("./utils/server");
// const express = require('express')
// const cors = require('cors')
// const mongoose = require('mongoose')
const { port } = require("./lib/config/config");
// const { port, db } = require('./lib/config/config')
// const apis = require('./apis/api')
// export const app = express()
// const { json } = require('body-parser')
// const corsOptions = {
//     origin: 'http://localhost:4200'
// }
// app.use(cors(corsOptions)) //Accepting requests from this domain
// app.use('/upload', express.static('./public/images'));
// app.use(json()) //server accept JSON data
// app.use(express.urlencoded({extended: true})) //if true: object as string/arrays
// app.use(apis)
const app = createServer();
// mongoose.connect(db, err => {
//     if(err){
//         console.error('Error Found! ' + err)
//     }else{
//         console.log('Connected to mongoDB')
//     }
// })

app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
