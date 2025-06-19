const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

module.exports = {
  async find(where) {
    const cards = await prisma.board.findMany({ where: where })
    return cards
  },

  async findById(id) {
    // SELECT * FROM "Board" WHERE id = 1;
    const card = await prisma.card.findUnique({ where: { id } })
    return card
  },

  async create(newBoard) {
    const created = await prisma.card.create({ data: newBoard })
    return created
  },

  async update(id, changes) {
    // UPDATE "Board" SET adopted = true WHERE id = 1;
    const updated = await prisma.card.update({
      data: changes,
      where: { id : id },
    })
    return updated
  },

  async delete(id) {
    // DELETE FROM "Board" WHERE id = 1;
    const deleted = await prisma.card.delete({ where: { id }})
    return deleted
  },
}