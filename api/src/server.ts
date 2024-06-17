import fastify from "fastify";
import { z } from "zod"; // Typa e valida variáveis
import { prismaClient } from "./database/prismaClient";
import bcrypt from "bcrypt";
import cors from '@fastify/cors'

const app = fastify();
const path = "/api/v0.1"
app.register(cors, { 
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  
})

// REGEX CPF => ([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})
// REGEX CNPJ => ([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})

app.get("/", (request, reply) => { return reply.send({message: "API Oficial do Cumida Arretada"})})

app.get(path + '/vote/:restaurantId/:userId', async (request, reply) => {
  const { restaurantId, userId } = z.object({
    restaurantId: z.string().uuid(),
    userId: z.string().uuid()
  }).parse(request.params)

  const vote = await prismaClient.review.findMany({
    where: {
      restaurant_id: restaurantId,
      user_id: userId
    }
  })

  reply.status(200).send(vote)
})

app.post(path + '/vote/:restaurantId', async (request, reply) => {
  const { restaurantId } = z.object({
    restaurantId: z.string().uuid()
  }).parse(request.params)

  const { userId, rating, waitingTime, service, temperature, ingredient, flavor, presentation, inovation } = z.object({
    userId: z.string().regex(new RegExp("([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"), "O campo CPF não é válido"),
    rating: z.number(),
    waitingTime: z.boolean(),
    service: z.boolean(),
    temperature: z.boolean(),
    ingredient: z.boolean(),
    flavor: z.boolean(),
    presentation: z.boolean(),
    inovation: z.boolean(),
  }).parse(request.body)

  const voteExist = await prismaClient.review.findMany({
    where: {
      restaurant_id: restaurantId,
      user_id: userId
    }
  })

  var output = {success: false, message: "Você já avaliou esse restaurante", vote:{} }
  if(voteExist.length <= 0) {
    const vote = await prismaClient.review.create({
      data: {
        restaurant_id: restaurantId,
        user_id: userId,
        waiting_time: waitingTime,
        rating,
        flavor,
        ingredient,
        service,
        inovation,
        presentation,
        temperature
      }
    })

    output.vote = vote
    output.message = "Avaliado com sucesso!"
    output.success = true
  }

  return reply.status(200).send(output)
})

app.post(path + '/user/login', async (request, reply) => {
  const { cpf, email } = z.object({
		cpf: z.string().regex(new RegExp("([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"), "O campo CPF não é válido"),
    email: z.string().email(),
	}).parse(request.body)

  const user = await prismaClient.user.findUnique({
    where: {
      cpf,
      email
    }
  })

  var output = {success: false, message: "Não foi encontrado nenhum usuário com as credênciais informadas", user:{} }
  if(user) {
    output.message = "Um código foi enviado para o email informado"
    output.success = true
    output.user = user
  }

  return reply.status(200).send(output)
})

app.post(path + '/restaurant/login', async (request, reply) => {
  const { cnpj, password } = z.object({
		cnpj: z.string().regex(new RegExp("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})"), "O campo CNPJ não é válido"),
    password: z.string(),
	}).parse(request.body)

// console.log(cnpj, password)

  const user = await prismaClient.restaurant.findUnique({
    where: {
      cnpj
    }
  })

  // console.log(user)

  if(!user){
    return reply.status(404).send({success: false, message: "Não foi encontrado nenhum usuário com as credênciais informadas", user:{} })
  }
  
  var output = {success: false, message: "Não foi encontrado nenhum usuário com as credênciais informadas", user:{} }
  const resultcomparacao = bcrypt.compareSync(password, user.password)
  if(resultcomparacao == true){
    output.message = "Um código foi enviado para o email informado"
    output.success = true
    output.user = user
  }else {
    output.message = "Senha Incorreta!"
  }

  return reply.status(200).send(output)
})

app.get(path + '/restaurant/:id', async (request, reply) => {
  const { id } = z.object({
    id: z.string().uuid()
  }).parse(request.params);

  const restaurant = await prismaClient.restaurant.findUnique({
    where: {
      id
    }
  })

  var output = {success: false, message: "Não foi encontrado nenhum restaurante com esse ID", restaurant:{} }
  if(restaurant) {
    output.message = "Restaurante encontrado"
    output.success = true
    output.restaurant = restaurant
  }

  return reply.status(200).send(output)
})

app.get(path + '/vote/getAll', async (request, reply) => {
  const votes = await prismaClient.review.findMany()
  return reply.status(200).send(votes)
})

app.get(path + '/votes/:id', async (request, reply) => {
  const { id } = z.object({
    id: z.string().uuid()
  }).parse(request.params);

  const votes = await prismaClient.review.findMany({
    where: {
      restaurant_id: id
    }
  })
  
  return reply.status(200).send(votes)
})

app.post(path + '/user/signup', async (request, reply) => {
  const { name, cpf, email } = z.object({
    name: z.string(),
    cpf: z.string().regex(new RegExp("([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"), "O campo CPF não é válido"),
    email: z.string().email(),
  }).parse(request.body)

  const userExist = await prismaClient.user.findUnique({
    where: {
      cpf
    }
  })

  if(!userExist){
    const user = await prismaClient.user.create({
      data: {
        password: "",
        name,
        email,
        cpf
      }
    })

    return reply.status(201).send(user)
  }else{
    return reply.status(200).send(userExist)
  }
})

app.post(path + '/restaurant/register', async (request, reply) => {
  const { cnpj, name, password } = z.object({
    cnpj: z.string().regex(new RegExp("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})"), "O campo CNPJ não é válido"),
    name: z.string(),
    password: z.string(),
  }).parse(request.body)
  
  const restaurantExist = await prismaClient.restaurant.findUnique({
    where: {
      cnpj
    }
  })

  if(!restaurantExist) {
    const hashPassword = await bcrypt.hash(password, 10);
    const restaurant = await prismaClient.restaurant.create({
      data: {
        cnpj,
        name,
        password: hashPassword,
      }
    })

    return reply.status(201).send(restaurant)
  }else{
    return reply.status(409).send(restaurantExist)
  }
})

app.listen({
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
  console.log("HTTP server running!")
})