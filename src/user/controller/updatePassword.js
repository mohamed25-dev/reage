const User = require('../../../models/user');

module.exports = async (req, res) => {
  const errors = await validate(req.user._id, req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const user = await User.findById(req.user._id);
  user.password = req.body.newPassword;

  await user.save();

  const data = user.getData();

  res.send({ user: data });
}

const validate = async (id, user) => {
  const errors = [];
  if (!user.password) {
    errors.push('الرجاء إضافة كلمة المرور الحالية ');
  }

  if (!user.newPassword) {
    errors.push('الرجاء إضافة كلمة المرور الجديدة ');
  }

  const userData = await User.findById(id);
  const isMatch = userData.checkPassword(user.password);

  if (!isMatch) {
    errors.push('الرجاء التأكد من صحة كلمة المرور');
    return errors;
  }

  if (user.password && user.password.length < 4) {
    errors.push('يجب أن لا يقل طول كلمة المرور عن أربعة محارف');
    return errors;
  }

  if (user.newPassword && user.newPassword.length < 4) {
    errors.push('يجب أن لا يقل طول كلمة المرور عن أربعة محارف');
    return errors;
  }
  
  return errors;
}