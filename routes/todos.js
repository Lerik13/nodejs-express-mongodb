// Router - for decomposition of logic along all app
const {Router} = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async(req, res) => {
	const todos = await Todo.find({})

	console.log('!!!');
	console.log(todos);

	res.render('index', {
		title: 'Todos list',
		isIndex: true,
		todos
	}) // from folder 'views'
})

router.get('/create', (req, res) => {
	//console.log('GET create')
	res.render('create', {
		title: 'Create todo',
		isCreate: true
	})
})

router.post('/create', async (req, res) => {
	//console.log('POST create')
	const todo = new Todo({
		title: req.body.title
	})

	await todo.save()
	res.redirect('/')
})

module.exports = router
