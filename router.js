const express = require('express')
const app = express()
const router  = express.Router()

const router1 = router.get('/:name', function(req, res) {
	console.log('****0  ',req.params)
	res.send('hello '+req.params)
})

const router2 = router.get('/', function(req, res) {
	console.log('****1  ',req.text)
	res.send('router2 return message')
})

app.use('/users', router1)
app.use('/', router2)

app.listen(3002)
console.log('==============listen 3002==============')