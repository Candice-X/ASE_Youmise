const cognito = {
  signup: jest.fn(params, cb => {
    cb(new Error('test Error'), null)
  })
}
