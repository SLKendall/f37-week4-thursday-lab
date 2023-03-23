const bcrypt = require(`bcryptjs`)

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          let passwordCheck = bcrypt.compareSync(password, users[i].passwordHash)
          
          if (passwordCheck) {
            let userReturn = {...users[i]}
            delete userReturn.passwordHash
            return res.status(200).send(userReturn)
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        const { username, password } = req.body
        const salt = brcypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)

        let user = {
          username,
          passwordHash,
        }

        users.push(user)

        let userReturn = {...users[i]}
        delete userReturn.passwordHash
        res.status(200).send(userReturn)
    }
}