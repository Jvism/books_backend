import 'dotenv/config'
import express from 'express'
import cors from 'cors'

// Middlewares
import { errorHandler } from './middleware/error'

// Routes
import UserRoutes from './modules/User/routes'
import AuthRoutes from './modules/Authentication/routes'
import BookRoutes from './modules/Book/routes'
import AuthorRoutes from './modules/Author/routes'
import CategoryRoutes from './modules/Category/routes'

const PORT = process.env.PORT || 8000
const app = express()

app.disable('x-powered-by') // disable powered by express
app.use(express.json())
app.use(cors())

app.use('/auth', AuthRoutes)
app.use('/user', UserRoutes)
app.use('/book', BookRoutes)
app.use('/author', AuthorRoutes)
app.use('/category', CategoryRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
