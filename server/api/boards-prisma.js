const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

module.exports = {
  async find(where) {
    const boards = await prisma.board.findMany({ 
        where: where,
        relationLoadStrategy: 'join', // or 'query'
        include: {
            cards: true,
        },
     })
    return boards
  },

  async findById(id) {
    // SELECT * FROM "Board" WHERE id = 1;
    const board = await prisma.board.findUnique({ where: { id } })
    return board
  },

  async create(newBoard) {
    const created = await prisma.board.create({ data: newBoard })
    return created
  },

  async update(id, changes) {
    // UPDATE "Board" SET adopted = true WHERE id = 1;
    const updated = await prisma.board.update({
      data: changes,
      where: { id : id },
    })
    return updated
  },

  async delete(id) {
    // DELETE FROM "Board" WHERE id = 1;
    await prisma.board.update({
      where: {id},
      data: {
        cards: {
          deleteMany: {},
        },
      },
      include: {
        cards: true,
      }
    })
    const deleted = await prisma.board.delete({ where: { id }})
    return deleted
  },
}