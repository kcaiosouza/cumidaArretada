// José Gomes 
import fastify from "fastify";
import { z } from "zod"; // Typa e valida variáveis

const app = fastify();

// POST
app.post('/api/v0.1/simpleGetInfoFromBody', (request) => {
  const {string1, number1, url1} = z.object({
		string1: z.string(),
		number1: z.number(),
		url1: z.string().url(),
	}).parse(request.body)

  return {
    String: string1,
    Number: number1,
		Url: url1
  }
})

// GET
app.get('/api/v0.1/simpleReturn', () => {
  return {
    Retorno: "Se chegou aqui segura papai!"
  }
})

// UPDATE (app.update), DELETE (app.delete) e PUT (app.put)

app.listen({
  port: 3333,
}).then(() => {
  console.log("HTTP server running on port:3333")
})