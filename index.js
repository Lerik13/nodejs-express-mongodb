const express = require('express')
const mongoose = require('mongoose') // Mongo DB
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000
//Create application
const app = express()
const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs'
})
//Engine for rendering pages
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views') // Set folder 'views' for engine

// for reading body in POST query
app.use(express.urlencoded({ extended: true }))
// for including css links
app.use(express.static(path.join(__dirname, 'public')))
// to add new middleware
app.use(todoRoutes)

async function  start() {
	try {
		// Подключение к БД
		await mongoose.connect('mongodb+srv://lera:qazqwe981908@cluster0.hseio.mongodb.net/todos',
		{
			useNewUrlParser: true,
			useFindAndModify: false
		})
		// Запускаем сервер
		app.listen(PORT, () => {
			console.log('Server has been started...');
		})
	} catch(e) {
		console.log(e);
	}
}

start()

