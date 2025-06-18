const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

async function main() {
  const boardData = [
    { coverImage: 'dog', title: 'Inspiration', category: 'Inspiration' },
    { coverImage: 'cat', title: 'Inspiration', category: 'Inspiration' },
    { coverImage: 'fish', title: 'Inspiration', category: 'Inspiration' },
    { coverImage: 'parrot', title: 'Inspiration', category: 'Inspiration' },
    { coverImage: 'dog', title: 'Inspiration', category: 'Inspiration' },
  ]
  const cardData = [
    { title: 'Congrats', description: 'Good job', coverImage: 'idk', author: 'Me' },
    { title: 'Congrats1', description: 'Testing', coverImage: 'idk', author: 'Me1' }
  ]

  for (const board of boardData) {
    await prisma.board.create({ data: board })
  }
  for (const card of cardData) {
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