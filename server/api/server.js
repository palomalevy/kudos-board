const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

const boards = prisma.board.findMany()