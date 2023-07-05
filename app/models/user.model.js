module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    frist_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    mobile: {
      type: Sequelize.STRING
    },
    date_of_birth: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
};
