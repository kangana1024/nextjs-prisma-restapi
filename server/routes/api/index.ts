import { PrismaClient, TodoStatus } from '@prisma/client'
import express from 'express'
const prisma = new PrismaClient()
const router = express.Router()

router.get('/', (_req, res) => res.json({ ok: true }))

router.get('/todos', async (_req, res) => {
  const todos = await prisma.todo.findMany()
  return res.json({
    todo: { ...todos },
    code: 201
  })
})

router.post('/todos', async (req, res) => {
  const { title, detail } = req.body
  const todos = await prisma.todo.create({
    data: {
      title,
      detail,
      status: TodoStatus.PENDING
    }
  })
  return res.json({
    todo: { ...todos },
    code: 200
  })
})
export default router