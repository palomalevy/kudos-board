const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

module.exports = {
  async find(where) {
    // GET http://localhost:3000/api/board?type=dog
    // SELECT * FROM "Board" WHERE type='dog';
    const boardData = await prisma.board.findMany({ where: where })
    return board
  },

  async findById(id) {
    // GET http://localhost:3000/api/board/1
    // SELECT * FROM "Board" WHERE id = 1;
    const board = await prisma.board.findUnique({ where: { id } })
    return board
  },

  async create(newBoard) {
    // POST http://localhost:3000/api/board/1 { name: "Fido", type: "dog": age: 5 }
    // INSERT INTO "Board" (name, type, age) VALUES ('Fido', 'dog', 5);
    const created = await prisma.board.create({ data: newBoard })
    return created
  },

  async update(id, changes) {
    // PUT http://localhost:3000/api/board/1 { adopted: true }
    // UPDATE "Board" SET adopted = true WHERE id = 1;
    const updated = await prisma.board.update({
      data: changes,
      where: { id : id },
    })
    return updated
  },

  async delete(id) {
    // DELETE http://localhost:3000/api/board/1
    // DELETE FROM "Board" WHERE id = 1;
    const deleted = await prisma.board.delete({ where: { id }})
    return deleted
  },
}