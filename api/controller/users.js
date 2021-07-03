const UserModel = require("../model/users");

module.exports = {
  addUser: async function (required, response) {
    const name = required.body.name;
    const last_name = required.body.last_name;
    const email = required.body.email;
    const password = required.body.password;

    UserModel.create(
      {
        name,
        last_name,
        email,
        password,
      },
      (err, user) => {
        if (err) {
          console.log(err);
        } else {
          response.json(user);
        }
      }
    );
  },

  login: async function (required, response) {
    const email = required.body.email;
    const password = required.body.password;

    //await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
    const UserDatabase = await UserModel.find({email: email}).exec();

    if (!UserDatabase.length) {
      response.status(404).json({message: "no se encontro el usuario"});
    }

    if (password === UserDatabase[0].password) {
      console.log(UserDatabase);
      response.json(UserDatabase);
    } else {
      response.status(404).json({message: "no se ha encontrado usuario y/o contraseña"});
    }
  }
};
