const app = require('./app');
const { sequelize } = require('./database/models')

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
	console.log(`Server started on port ${PORT}`)
	try{
		await sequelize.sync({force: true})
		console.log("\nDatabase synced")
	}
	catch(err){
		console.log(err)
	}
})