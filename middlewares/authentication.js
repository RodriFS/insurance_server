// checks if there is a session and a cookie
// if both exists, let the user continue
// else, notify the user
const session = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    return next();
  } else {
    res.clearCookie('user_sid');
    res.status(401);
    res.set('Content-Type', 'text/html');
    res.send(
      '<h1>User is not authorized</h1>' +
        '<p>To log in, send a JSON to the /login endpoint</p>' +
        '<p>with the following keys: name, password.</p>' +
        '<p>To register, send a JSON to the /register endpoint</p>' +
        '<p>with the following keys: name, email, password</p>'
    );
  }
};

// if the user's role is admin, let the user continue
// else, notify the user
const admin = (req, res, next) => {
  if (req.session.user.role === 'admin') {
    return next();
  } else {
    res.status(401);
    res.set('Content-Type', 'text/html');
    res.send(
      '<h1>User is not authorized</h1>' +
        '<p>You need administrator privileges to see this information</p>'
    );
  }
};

module.exports = { session, admin };
