exports.registerError = (_, res) => {
  return res.status(500).json({ errors: [{ title: 'Error', message: 'Estamos passando por instabilidade, tente novamente mais tarde!' }] })
}
