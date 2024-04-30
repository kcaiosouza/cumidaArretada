import fastify from "fastify";
import { z } from "zod"; // Typa e valida variáveis

const app = fastify();
const path = "/api/v0.1"
// REGEX CPF => ([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})
// REGEX CNPJ => ([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})

app.listen({
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
  console.log("HTTP server running!")
})

/* app.post(path + '/user/login', async (request, reply) => {
  const { cpf } = z.object({
		cpf: z.string().regex(new RegExp("([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"), "O campo CPF não é válido"),
	}).parse(request.body)

  return reply.status(200).send()
})

app.get(path + '/vote/:restaurantId/:userId', async (request, reply) => {
  const { restaurantId, userId } = z.object({
    restaurantId: z.string(),
    userId: z.string()
  }).parse(request.params)

  reply.send()
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


  reply.status(201).send()
}) */