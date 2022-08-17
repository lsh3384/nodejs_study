const login_check_middleware = async (req, res, next) => {
  if (req.user !== undefined) {
    next()
  } else {
    res.render('menu/login', {
      error: '로그인하세요.'
    })
  }
}

module.exports = login_check_middleware;