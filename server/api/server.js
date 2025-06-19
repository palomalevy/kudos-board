const express = require('express')
const cors = require('cors')
const Board = require('./boards-prisma')
const Card = require('./cards-prisma')
const helmet = require('helmet')

const server = express()
server.use(helmet())
server.use(express.json())
server.use(cors())

// [GET] /api/boards/:id
server.get('/api/boards/:boardID', async (req, res, next) => {
  const id = Number(req.params.boardID)
  try {
    const board = await Board.findById(id)
    if (board) {
      res.json(board)
    } else {
      next({ status: 404, message: `No board found with ID ${id}` })
    }
  } catch (err) {
    next(err)
  }
})

// [GET] /api/boards
server.get('/api/boards', async (req, res, next) => {
  const search = req.query
  try {
    const boards = await Board.find(search)
    if (boards.length) {
      res.json(boards)
    } else {
      next({ status: 404, message: 'No boards found match the search criteria' })
    }
  } catch (err) {
    next(err)
  }
})

// [POST] /api/boards
server.post('/api/boards', async (req, res, next) => {
  const newBoard = req.body
  try {
    const newBoardValid = (
      newBoard.coverImage !== undefined &&
      newBoard.title !== undefined &&
      newBoard.category !== undefined
    )
    if (newBoardValid) {
      const created = await Board.create(newBoard)
      res.status(201).json(created)
    } else {
      next({ status: 422, message: 'Please include a cover image, title, and category!' })
    }
  } catch (err) {
    next(err)
  }
})

// [PUT] /api/boards/:id
server.put('/api/boards/:boardID', async (req, res, next) => {
  const id = Number(req.params.boardID)
  const changes = req.body
  try {
    // Make sure the ID is valid
    const board = await Board.findById(id)
    // Validate that the changes include at least one valid change
    const changesValid = (
      changes.coverImage !== undefined ||
      changes.title !== undefined ||
      changes.category !== undefined
    )
    if (board && changesValid) {
      const updated = await Board.update(id, changes)
      res.json(updated)
    } else {
      next({ status: 422, message: 'Invalid ID or invalid changes!' })
    }
  } catch (err) {
    next(err)
  }
})

// [DELETE] /api/boards/:id
server.delete('/api/boards/:boardID', async (req, res, next) => {
  const id = Number(req.params.boardID)
  try {
    const board = await Board.findById(id)
    if (board) {
      const deleted = await Board.delete(id)
      res.json(deleted)
    } else {
      next({ status: 404, message: 'Board not found' })
    }
  } catch (err) {
    next(err)
  }
})

//CARD ROUTES

// [POST] /api/boards/:boardID/cards
server.post('/api/boards/:boardID/cards', async (req, res, next) => {
  const newCard = req.body
  try {
    const newCardValid = (
      newCard.gifurl !== undefined &&
      newCard.title !== undefined &&
      newCard.voteCount !== undefined &&
      newCard.description !== undefined &&
      (newCard.authorName === undefined || typeof newCard.authorName === 'string')
    )
    if (newCardValid) {
      const created = await Card.create(newCard)
      res.status(201).json(created)
    } else {
      next({ status: 422, message: 'Please include a cover image, title, and category!' })
    }
  } catch (err) {
    next(err)
  }
})

// [PUT] /api/boards/:boardID/cards/:cardID
server.put('/api/boards/:boardID/cards/:cardID', async (req, res, next) => {
  const id = Number(req.params.cardID)
  const changes = req.body
  try {
    // Make sure the ID is valid
    const card = await Card.findById(id)
    // Validate that the changes include at least one valid change
    const changesValid = (
      changes.gifurl !== undefined ||
      changes.title !== undefined ||
      changes.voteCount !== undefined ||
      changes.description !== undefined ||
      changes.authorName !== undefined
    )
    if (card && changesValid) {
      const updated = await Card.update(id, changes)
      res.json(updated)
    } else {
      next({ status: 422, message: 'Invalid ID or invalid changes!' })
    }
  } catch (err) {
    next(err)
  }
})

// [DELETE] /api/boards/:boardID/cards/:cardID
server.delete('/api/boards/:boardID/cards/:cardID', async (req, res, next) => {
  const id = Number(req.params.cardID)
  try {
    const card = await Card.findById(id)
    if (card) {
      const deleted = await Card.delete(id)
      res.json(deleted)
    } else {
      next({ status: 404, message: 'Card not found' })
    }
  } catch (err) {
    next(err)
  }
})

// [CATCH-ALL]
server.use('/*', (req, res, next) => {
  next({ status: 404, message: 'Not found' })
})

// Error handling middleware
server.use((err, req, res, next) => {
  const { message, status = 500 } = err
  console.log(message)
  res.status(status).json({ message }) // Unsafe in prod
})

module.exports = server