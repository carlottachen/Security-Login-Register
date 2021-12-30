const users = [];
const bcrypt = require('bcryptjs');

module.exports = {
	login: (req, res) => {
		console.log('Logging In User')
		console.log(req.body)
		const { username, password } = req.body
		for (let i = 0; i < users.length; i++) {
			if (users[i].username === username) {
				const authenticated = bcrypt.compareSync(password, users[i].passwordHash)
				if(authenticated){
					let userToReturn = {...users[i]}
					delete userToReturn.passwordHash
					res.status(200).send(userToReturn)
					return
				}
			}
		}
		res.status(400).send("User not found.")
	},

	register: (req, res) => {
		console.log('Registering User')
		console.log(req.body)
		//destructure
		const { username, email, firstName, lastName, 
			password } = req.body;

		//use bcrypt to hash
		let salt = bcrypt.genSaltSync(7);
		let passwordHash = bcrypt.hashSync(password, salt);

		//so create new user object
		let newUserObj = {
			username,
			email,
			firstName,
			lastName,
			passwordHash,
		}

		//add to array
		users.push(newUserObj);
		//new object to return but don't return hash keys
		let returnUser = {...newUserObj};
		delete returnUser.passwordHash;

		res.status(200).send(returnUser);
	}
}
