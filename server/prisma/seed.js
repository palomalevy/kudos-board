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

  for (const board of boardData) {
    await prisma.board.create({ data: board })
  }

  console.log('Seeded boardData!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })