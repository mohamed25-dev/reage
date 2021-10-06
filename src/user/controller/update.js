const bcrypt = require('bcrypt');
const User = require('../../../models/user');

module.exports = async (req, res) => {
  const errors = await validate(req.user._id, req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const user = await User.findById(req.user._id);
  user.name = req.body.name;
  user.email = req.body.email;
  if (req.body.password) {
    user.password = req.body.password;
  }

  await user.save();

  const data = user.getData();

  res.send({ user: data });
}

const validate = async (id, user) => {
  const errors = [];
  if (!user.name) {
    errors.push('الرجاء إضافة اسم المستخدم');
  }

  if (!user.email) {
    errors.push('الرجاء إضافة  البريد الإلكتروني ');
  }

  if (user.password && user.password.length < 4) {
    errors.push('يجب أن لا يقل طول كلمة المرور عن أربعة محارف');
    return errors;
  }

  if (user.password && !user.confirmPassword) {
    errors.push('الرجاء تأكيد كلمة المرور ');
    return errors;
  }

  if (user.password && user.password !== user.confirmPassword) {
    errors.push('الرجاء التأكد من تطابق كلمتي المرور ');
    return errors;
  }

  const anotherUser = await User.findOne({
    _id: {
      $ne: id
    },
    email: user.email
  });

  if (anotherUser) {
    errors.push('هذا البريد الإلكتروني مسجل بالفعل');
  }
  
  return errors;
}