import fastify from "fastify";
import { z } from "zod"; // Typa e valida variáveis
import mysql from 'mysql2/promise';
import {v4 as uuidv4} from 'uuid';

const app = fastify();
const path = "/api/v0.1"
// REGEX CPF => ([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})
// REGEX CNPJ => ([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})

app.post(path + '/user/login', async (request) => {
  const {cpf} = z.object({
		cpf: z.string().regex(new RegExp("([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"), "O campo CPF não é válido"),
	}).parse(request.body)

  const db = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "cumidaarretada"
  })
  db.connect()

  const queryUsers = "SELECT * FROM users WHERE cpf = ?"
  const valuesUsers = [cpf]
  const result:any = await db.query(queryUsers, valuesUsers)

  var output:any = {}

  if(result[0][0]){
    if(result[0][0].password){
      // Autorizar a pessoa para colocar a senha
      output["message"] = "Autorizado para efetuar login"
      output["result"] = result[0][0]
    }else{
      // Finalizar o cadastro da pessoa colocando a senha
      output["message"] = "Por favor, finalize seu cadastro"
    }
  }

  db.end()
  return output
})

app.get(path + '/simpleReturn', () => {
  return {
    Retorno: "Simples texto de retorno!"
  }
})

app.get(path + '/vote/:restaurantId/:userId', async (request, reply) => {
  const { restaurantId, userId } = z.object({
    restaurantId: z.string(),
    userId: z.string()
  }).parse(request.params)

  const db = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "cumidaarretada"
  })
  db.connect()

  const queryAlreadyVote = "SELECT * FROM votes WHERE user_id = ? and restaurant_id = ?"
  const valuesAlreadyVote = [userId, restaurantId]
  const result:any = await db.query(queryAlreadyVote, valuesAlreadyVote)

  // Codes:  1 --> Já votou // 2 --> Não votou;
  reply.send({
    code: result[0].length > 0 ? 1 : 2,
    status: result[0].length > 0 ? "Você já avaliou esse restaurante!" : "Você ainda não avaliou esse restaurante!",
    rate: result[0]
  })
})

app.post(path + '/vote/:restaurantId', async (request, reply) => {
  const { restaurantId } = z.object({
    restaurantId: z.string()
  }).parse(request.params)

  const { userId, rating, waitingTime, service, temperature, ingredient, flavor, presentation, inovation } = z.object({
    userId: z.string().uuid(),
    rating: z.number(),
    waitingTime: z.boolean(),
    service: z.boolean(),
    temperature: z.boolean(),
    ingredient: z.boolean(),
    flavor: z.boolean(),
    presentation: z.boolean(),
    inovation: z.boolean(),
  }).parse(request.body)

  const rateId = uuidv4()

  const db = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "cumidaarretada"
  })
  db.connect()

  const queryCreateVote = "INSERT INTO votes(user_id, restaurant_id, rating, waiting_time, service, temperature, ingredient, flavor, presentation, inovation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  const valuesCreateVote = [userId, restaurantId, rating, waitingTime, service, temperature, ingredient, flavor, presentation, inovation];
  
  var success = false;

  try{
    await db.query(queryCreateVote, valuesCreateVote)
    success = true;
  } catch(e) {
    console.log(e)
  }

  reply.send({
    success,
    id: rateId,
    restaurantId,
    userId
  })
})

app.listen({
  port: 3333,
}).then(() => {
  console.log("HTTP server running!")
})