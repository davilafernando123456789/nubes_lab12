const express = require('express');
const router = express.Router();
const path = require('path');
const methodOverride = require('method-override');

const app = express();
app.use(methodOverride('_method'));


router.use (function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/',function(req,res){
  res.sendFile(path.resolve('views/index.html'));
});

module.exports = router;
