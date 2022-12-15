

function validateRequest(location='body', schema) {
  return async (req, res, next) => {
    let _location;
    switch (location) {
      case 'query':
        _location = req.query;
        break;
      case 'body':
        _location = req.body;
        break;
      case 'params':
        _location = req.params;
    }
    try {
      const data = await schema.validate(_location, { stripUnknown: true });
      console.log(data)
      req.body = data;
      next();
    } catch (err) {
        console.log(err);
      res.json({success: false,message: "Validation Error"})
    }
  };
}


module.exports=validateRequest;