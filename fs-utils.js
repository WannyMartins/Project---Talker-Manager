const fs = require('fs/promises');

function getTalkers() {
  return fs.readFile('./talker.json', 'utf-8')
  .then((fileContent) => JSON.parse(fileContent));
}

function setTalkers(newTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalker));
}

function setUser(newUser) {
  return fs.writeFile('./users.json', JSON.stringify(newUser));
}

function getUser() {
  return fs.readFile('./users.json', 'utf-8')
  .then((fileContent) => JSON.parse(fileContent));
}

function randomToken() {
  let token = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i += 1) {
    token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return token;
}

module.exports = { getTalkers, setTalkers, setUser, getUser, randomToken };