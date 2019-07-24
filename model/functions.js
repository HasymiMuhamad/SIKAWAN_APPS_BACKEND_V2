const bcrypt = require('bcrypt'),
  generator = require ('generate-password');

exports.titleCase = str => {
  return str.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
};

exports.generatorPassword = pass => {
  console.log(pass)
  var newPassword = generator.generate({
    length: 6,
    numbers: true
  })
  return newPassword
  console.log(newPassword)
}


exports.bcrypt = password => {
  console.log(password);
  var hashed = bcrypt.hashSync(password,10);
  console.log(hashed);
  return hashed;
};
