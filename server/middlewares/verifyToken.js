


module.exports.verifyToken = (req, res, next) => {
  const token = req.body.token;

  if (token) {
      jwt.verify(token, "verysecretkey", (err, decoded) => {
          if (err) {
              return res.json({
                  success: false,
                  message: 'Failed to authenticate token.',
              })
          } else {
              req.decoded = decoded
              next()
          }
      })
  } else {
      return res.status(404).send({
          success: false,
          message: 'No token provided.',
      })
  }
}
