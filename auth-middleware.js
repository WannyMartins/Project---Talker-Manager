function authUser(req, res, next) {
  const validEmailre = /\S+@\S+\.\S+/;
  if (!req.body.password) {
  return res.status(400).json({ message: 'O campo "password" é obrigatório' });
}
if (!req.body.email) {
  return res.status(400).json({ message: 'O campo "email" é obrigatório' });
}
  if (req.body.password.length <= 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  if (req.body.email !== validEmailre) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}

module.exports = authUser;