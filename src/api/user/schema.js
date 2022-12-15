const yup = require("yup");


const userLoginSchema=yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  subscriptionCheck: yup.bool().default(false),
  detailsUpload: yup.bool().default(false)
})

const userDataSchema=yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    contactNo: yup.number().required(),
    emergencyContact: yup.number().required(),
    gender: yup.string().required(),
    address: yup.string().required(),
    age: yup.string().required()
})



module.exports={userLoginSchema,userDataSchema}