const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = require('../../../config').ACCESS_TOKEN;
const User = require('../../../models/user');

module.exports = async (req, res) => {
  const errors = await validate(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 8)
  }

  const createdUser = await User.create(user);

  const data = createdUser.signJwt();

  res.send({ user: data });
}

const validate = async (user) => {
  const errors = [];
  if (!user.name) {
    errors.push('الرجاء إضافة اسم المستخدم');
  }

  if (!user.email) {
    errors.push('الرجاء إضافة  البريد الإلكتروني ');
  }

  if (!user.password) {
    errors.push('الرجاء إضافة كلمة المرور ');
  }

  if (user.password.length < 4) {
    errors.push('يجب أن لا يقل طول كلمة المرور عن أربعة محارف');
    return errors;
  }

  if (!user.confirmPassword) {
    errors.push('الرجاء تأكيد كلمة المرور ');
    return errors;
  }

  if (user.password !== user.confirmPassword) {
    errors.push('الرجاء التأكد من تطابق كلمتي المرور ');
    return errors;
  }

  const anotherUser = await User.findOne({
    email: user.email
  });

  if (anotherUser) {
    errors.push('هذا البريد الإلكتروني مسجل بالفعل');
  }
  return errors;
}