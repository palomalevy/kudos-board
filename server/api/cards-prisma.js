const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

module.exports = {
  async find(where) {
    const cards = await prisma.card.findMany({ where: where })
    return cards
  },

  async findById(id) {
    // SELECT * FROM "Board" WHERE id = 1;
    const card = await prisma.card.findMany({ where: { boardID: id } })
    return card
  },

  async getCards(id) {
    const cards = await prisma.card.findMany({
        where: {
            boardID : id
        }
    })
    return cards
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
   
  async updateVote(id) {
    // UPDATE "Board" SET adopted = true WHERE id = 1;
    const updatedVote = await prisma.card.update({
      data: {voteCount: {increment: 1}},
      where: { id : id },
    })
    return updatedVote
  },

  async delete(id) {
    // DELETE FROM "Board" WHERE id = 1;
    const deleted = await prisma.card.delete({ where: { id }})
    return deleted
  },
}