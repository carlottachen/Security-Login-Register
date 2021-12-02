const users = [];
const bcrypt = require('bcryptjs');

module.exports = {
	login: (req, res) => {
		console.log('Logging In User')
		console.log(req.body)
    //destructure
		const { username, password } = req.body

    //go through users array
		for (let i = 0; i < users.length; i++) {
			if (users[i].username === username){
        const existingPassword = 
        bcrypt.compareSync(password, users[i].passwordHash);
        if(existingPassword) {
          let userObj = users[i];
          delete userObj.passwordHash;
			  	res.status(200).send(userObj);
          console.log('successful login');
         return;
		  	}else{
          res.status(400).send('Not a match');
          console.log('not a match');
          return;
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