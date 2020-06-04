import express from 'express'
import path from 'path'
import routes from './routes'

const app = express()

app.use(express.json()) // plugin para fazer com que o express entenda json
app.use(routes)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))


app.listen(3333, () => console.log('Sever online at door 3333'))


  // Tipos de requisições do servidor: 
  
  // GET: Buscar uma ou mais informações do back-end
  // POST: Criar uma nova info no back-end
  // PUT: Atualizar uma info existente no back-end
  // DELETE: Remover uma info do back-end

  // Request Param: Parametros que vem na propria rota que identifica um recurso
  // Query Param: Parametros que vem na propria rota geralmente opicionais para filtros paginacao
  // Request Body: Params para criacao e atualizacao de informacoes

  // const users = [
  //   'Filipe',
  //   'Cleiton',
  //   'Robson',
  //   'Ana'
  // ]

// app.get('/users', (request, response) => {
//   const search = String(request.query.search)

//   const filtredUsers = search 
//   ? users.filter(user => user.includes(search)) 
//   : users

//   return response.json(filtredUsers)
// })

// app.get('/users/:id', (request, response) => {
//   const id = Number(request.params.id)

//   const user = users[id]

//   return response.json(user)
// })

// app.post('/users', (request, response) => {
//   const data = request.body // funciona por causa da linha 5
  
//   const user = { 
//     name: data.name,
//     email: data.email
//   }

//   return response.json(user)
// })

