const path = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const courseRoutes = require('./src/routes/courseRoute');
const instrukturRoutes = require('./src/routes/instrukturRoute')
const userCourseRoutes = require('./src/routes/userCourseRoute')
const materiRoutes = require('./src/routes/materiRoute')
const quizRoutes = require('./src/routes/quizRoute')
const userQuizRoutes = require('./src/routes/userQuizRoute')
const authRoutes = require('./src/routes/authRoute')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/course', courseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/instruktur', instrukturRoutes);
app.use('/api/user-course', userCourseRoutes);
app.use("/api/materi", materiRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/user-quiz", userQuizRoutes);

app.get('/', (req, res) =>
    res.json({status: 'ok', app: 'LMS API'}));
const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`)
})
