import { PrismaClient, TodoStatus } from '@prisma/client'
import express from 'express'
const prisma = new PrismaClient()
const router = express.Router()

router.get('/', (_req, res) => res.json({ ok: true }))

router.get('/todos', async (_req, res) => {
  const todos = await prisma.todo.findMany({
    orderBy: {
      id: "desc"
    },
    where: {
      NOT: {
        status: TodoStatus.DELETE
      }
    }
  })
  return res.json({
    todo: [...todos],
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

router.post('/todos/changestatus/:id', async (req, res) => {
  const { status } = req.body
  const { id } = req.params
  const todo = await prisma.todo.update({
    data: {
      status
    },
    where: {
      id: parseInt(id)
    }
  })
  return res.json({
    todo: { ...todo },
    code: 200
  })
})
export default router