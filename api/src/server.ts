import fastify from "fastify";
import { z } from "zod"; // Typa e valida variáveis
import mysql from 'mysql2/promise'

const app = fastify();
const path = "/api/v0.1"
// REGEX CPF => ([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})
// REGEX CNPJ => ([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})

// POST
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

// GET
app.get(path + '/simpleReturn', () => {
  return {
    Retorno: "Simples texto de retorno!"
  }
})

// UPDATE (app.update), DELETE (app.delete) e PUT (app.put)

app.listen({
  port: 3333,
}).then(() => {
  console.log("HTTP server running!")
})