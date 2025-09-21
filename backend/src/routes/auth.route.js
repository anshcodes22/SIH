const express = require("express");
const userModel = require("../model/user.model");
const jwt = require('jsonwebtoken');


const router = express.Router();

router.use(express.json());

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const isUser = await userModel.findOne({
    username
  })

  if(isUser){
    return res.status(401).json({
      message: "User already exists"
    })
  };

  const user = await userModel.create({
    username,
    password,
  });

  const token = jwt.sign({
    id: user._id,
  }, process.env.JSON_TOKEN )

  res.cookie('token', token);

  res.status(201).json({
    message: "User created successfully",
    user
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(401).json({
      message: "Invalid username",
    });
  }
  const passwordValid = password == user.password;

  if(!passwordValid){
    return res.status(401).json({
      message: "Invalid password",
      });
      
  }
  res.status(200).json({
    message: "User logged in successfully",
    });

});

router.get('/user', async (req,res)=>{
  const {token} = req.cookies;

  if(!token){
    return res.status(401).json({
      message: "Unauthorized",
      });
  }

  try {
    
    
    const decoded = jwt.verify(token, process.env.JSON_TOKEN)
    const user = await userModel.findOne( 
      {
        _id: decoded.id

      }).select("-password -__v")
    
    res.status(200).json({
      message: "User found",
      user
    }); 
    // res.send(decoded)
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    })
  }
  })

module.exports = router;
