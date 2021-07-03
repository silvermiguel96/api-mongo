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
};
