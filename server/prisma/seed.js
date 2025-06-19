const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

async function main() {
  const boards = [
    { coverImage: 'dog', title: 'Inspiration', category: 'Inspiration' },
    { coverImage: 'cat', title: 'Inspiration', category: 'Inspiration' },
    { coverImage: 'fish', title: 'Inspiration', category: 'Inspiration' },
    { coverImage: 'parrot', title: 'Inspiration', category: 'Inspiration' },
    { coverImage: 'dog', title: 'Inspiration', category: 'Inspiration' },
  ]
  const cards = [
    { title: 'Congrats', boardID: 1, description: 'Good job', gifurl: 'url goes here;', voteCount: 1, author: 'Me' },
    { title: 'Congrats1', boardID: 2, description: 'Testing', gifurl: 'url goes here;', voteCount: 2, author: 'Me1' }
  ]

  for (const board of boards) {
    await prisma.board.create({ data: board })
  }
  for (const card of cards) {
    await prisma.card.create({ data: card })
  }

  console.log('Seeded board and card data :)')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })