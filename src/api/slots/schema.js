const yup = require("yup");




const userSubscribeSchema=yup.object().shape({
    userID: yup.string().required(),
    slotID: yup.string().required()
})


module.exports={userSubscribeSchema}