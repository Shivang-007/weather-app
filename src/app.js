const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partial')


//setup handle engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
  res.render('index',{
    "title":"Weather app",
    "name":"shivang Rathod"
  })
})

app.get('/weather',(req,res) =>{
  if(!req.query.address){
    return res.send({
      error : "You must provide an address"
    })
  }
  geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
    if(error){
      return res.send({error})
    }
    forcast(latitude,longitude,(error,forcastData) => {
      if(error){
        return res.send({error})
      }
      res.send({
        forcast:forcastData,
        location, 
        address:req.query.address
      })
    })
  })
  
})

app.get('/about',(req,res) =>{
  res.render('about')
})

app.get('/help',(req,res) =>{
  res.render('help')
})

app.get('*',(req,res) =>{
  res.send('404 not found')
})
app.listen(3000,()=>{
  console.log('server start..')
})