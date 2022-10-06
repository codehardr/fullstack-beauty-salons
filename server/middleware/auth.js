export const auth = (req, res, next) => {
  if (req.session.loggedIn) return next()
  res.status(401).send('Session has expired')
}
export const adminAuth = (req, res, next) => {
  if (req.session.loggedIn && req.session.user.role === 1) return next()
  res.status(401).send('Session has expired')
}
