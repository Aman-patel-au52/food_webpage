const bcrypt = require("bcrypt");

const hashPassword = (myPlaintextPassword, saltRounds = 10) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(myPlaintextPassword.toString(), salt);
  return hash;
};

const comparePassword = (myPlaintextPassword, hash) => {
  const result = bcrypt.compareSync(myPlaintextPassword.toString(), hash);
  return result;
};

module.exports = { hashPassword, comparePassword };
