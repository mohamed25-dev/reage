const User = require('../../../models/user');

module.exports = async (req, res) => {
  const errors = await validate(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const user = await User.findOne({
    email: req.body.email
  });

  const compare = user ? await user.checkPassword(req.body.password) : false;

  if (!compare) {
    return res.status(401).json({
      errors: [
        'خطأ في كلمة المرور أو البريد الإلكتروني '
      ]
    });
  }

  const data = user.signJwt();

  res.send({ user: data });
}

const validate = async (user) => {
  const errors = [];
  if (!user.email) {
    errors.push('الرجاء إضافة  البريد الإلكتروني ');
  }

  if (!user.password) {
    errors.push('الرجاء إضافة كلمة المرور ');
  }

  return errors;
}