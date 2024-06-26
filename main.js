console.log('hola mundo con node JS')

    // forma antigua para llamar libreria
    // const express= requiere ('express')

    //forma actual con ECMAScrips 6 Llamar Librerias
import express from 'express'
import bodyParser from 'body-parser'
import client from './db.js'
import { ObjectId } from 'mongodb'

    const app = express()
    const port = 3000

    app.use(bodyParser.json())
    
//---------- Endpoint ----------
// con 'get le indicamos que nuestra API acepta
// el metodo GET.
// El primer parametro establece el path (ruta) del
// codigo que queremos ejecutar
// El segundo parametro establece el codigo a ejecutar
// en forma de callback
// - el callback recibe 2 parametros:
// - req: request o la peticion
// - res: response o la respuesta


app.get('/api/v1/usuarios', async (req, res) => {

    //1. conectarnos a la base de datos
    await client.connect()
    
    //2. seleccionar la base de datos que vamos a utilizar
    const dbSampleMflix = client.db('sample-mflix')
    //const db = client.db('sample_mflix')

    //3. seleccionar la coleccion
    const usersCollection = dbSampleMflix.collection('users')

    //4. hacer la consulta -> query
   const userlist = await usersCollection.find({}).toArray()
    //console.log(userlist)

    //5. cerrar la coneccion a la db
    await client.close()

    
    // const respuesta ={
    //mensaje: "hola"
    // }
    // res.json(respueta)

    res.json({
        mensaje: 'lista de usuarios',
        data: userlist
    })
})

app.get('/api/v1/usuarios/:id', async (req, res)=> {

    console.log(req.params)
    let id = req.params.id

     //1. conectarnos a la base de datos
     await client.connect()
    
     //2. seleccionar la base de datos que vamos a utilizar
     const dbSampleMflix = client.db('sample-mflix')
     //const db = client.db('sample_mflix')
 
     //3. seleccionar la coleccion
     const usersCollection = dbSampleMflix.collection('users')

     id = new ObjectId(id)

     //4. consulta

     const user = await usersCollection.findOne({
        _id: id
     })

     //5. cerrar la coneccion
     await client.close()

    res.json({
        mensaje: `usuario obtenido con el id: ${id}`,
        data: user
    })

})

//post: crear datos
app.post('/api/v1/usuarios', async (req, res) =>{

    console.log(req.body)
    const userData = req.body

     //1. conectarnos a la base de datos
     await client.connect()
    
     //2. seleccionar la base de datos que vamos a utilizar
     const dbSampleMflix = client.db('sample-mflix')
     //const db = client.db('sample_mflix')
 
     //3. seleccionar la coleccion
     const usersCollection = dbSampleMflix.collection('users')

     //4. almacenar un usuario
     await userCollection.insertOne({
        nombre: userData.nombre,
        apellido: userData.apellido,
        email: userData.desingdayroflorezoutlook.com,
        edad: userData.edad
     })

    //5. cerrar la coneccion a la db
    await client.close()

    res.json({
        mensaje: 'usuario guardado'
    })
})

// put: actualizar todos los datos de un elemento
app.put('/api/v1/usuarios/:id', async (req, res)=> {

    let id = req.params.id
    const userData = req.body

     //1. conectarnos a la base de datos
     await client.connect()
    
     //2. seleccionar la base de datos que vamos a utilizar
     const dbSampleMflix = client.db('sample-mflix')
     //const db = client.db('sample_mflix')
 
     //3. seleccionar la coleccion
     const usersCollection = dbSampleMflix.collection('users')
     
     id = new ObjectId(id)
     //4.realizar consulta a la DB
     await usersCollection.updateOne(
        {_id: id},
        {
            $set:{
                name: userData.name
            }
        }
     )
     //5.cerrar la conexion
     await client.close()

    res.json({
        mensaje:`usuario con id ${id} actualizado`
    })
    
})

// patch: actualiza algunos campos
// de nuestro elemento
app.patch('/api/v1/usuarios/:cedula', (req, res) => {

    const cedula = req.params.cedula

    res.json({
        mensaje:`edad del usuario con cedula ${id} actualizado`
    })
})

app.delete('/api/v1/usuarios/:id', async (req, res) => {

    let id = req.params.id

     //1. conectarnos a la base de datos
     await client.connect()
    
     //2. seleccionar la base de datos que vamos a utilizar
     const dbSampleMflix = client.db('sample-mflix')
     //const db = client.db('sample_mflix')
 
     //3. seleccionar la coleccion
     const usersCollection = dbSampleMflix.collection('users')

     id = new ObjectId(id)
     //4. realizar la consulta
     await userCollection.deleteOne({
        _id: id
     })

     await client.close()

    res.json({
        mensaje:`usario con id ${id} eliminado`
    })
})
 
//Le indicamos e nuestra API que empiece a escuchar peticiones
// en el puerto 3000 y cuando se encienda nos muestra el mensaje
// que hay en el console.log
app.listen(port, () => {
    console.log(`la API esta escuchando en el puerto ${port}`)
})
