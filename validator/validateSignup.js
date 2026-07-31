let yup = require('yup')
let yupPassword = require('yup-password');
yupPassword(yup)

let userValidationSchema = yup.object({
name:yup.string().required(),
email:yup.string().email().required(),
password:yup.string().minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1)
.min(6).required()
})

module.exports = {userValidationSchema}