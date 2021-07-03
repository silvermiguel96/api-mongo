const UserModel = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    // const UserDatabase = await UserModel.find({ email: email }).exec();
    const [UserDatabase] = await UserModel.find({ email: email }).exec();

    // if (!UserDatabase.length) {
    //   response.status(404).json({ message: "no se encontro el usuario" });
    // }

    if (!UserDatabase) {
      response.status(404).json({ message: "no se encontro el usuario" });
    }

    // if (bcrypt.compareSync(password, UserDatabase[0].password)) {
    //   const token = jwt.sign(
    //     { id: UserDatabase[0]._id, email: UserDatabase[0].email },
    if (bcrypt.compareSync(password, UserDatabase.password)) {
      console.log("UserDatabase", UserDatabase);
      const token = jwt.sign(
        { id: UserDatabase._id, email: UserDatabase.email },
        required.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      console.log(UserDatabase);
      response.json({ user: UserDatabase, token: token });
    } else {
      response
        .status(404)
        .json({ message: "no se ha encontrado usuario y/o contraseña" });
    }
  },

  getUsers: async function (required, response) {
    const userId = required.body.userId;
    console.log("id del usuario que ingresa", userId);
    const UsersDatabase = await UserModel.find().exec();
    if (!UsersDatabase.length) {
      response.status(404).json({ message: "no se encontro el usuario" });
    }
    response.json(UsersDatabase);
  },
};
