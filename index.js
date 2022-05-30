// sequelize model:generate --name Report --attributes firstName:string,lastName:string,age:integer,email:string,nik:string,event:string,description:text,photo:string,doe:date
// sequelize migration:generate
// sequelize db:seed --seed 20220318063831-seeders-Games

const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})