import User from "../../models/usermodel"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/config";
const Joi = require("joi");

export const createUser = async (req, res, next) => {
    //joi validation
  
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        mobile: Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/)
          .required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in"] },
      }),
      city:Joi.string().required(),
      password: Joi.string().min(6).required(),

    });
  
    const error = schema.validate(req.body);
  
    if (error.error) {
      return res.status(200).json({ msg: error.error.details[0].message });
    }
  
    // check email exist
  
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist){  
      res.status(200).json({ msg: "email exist" });}
    else{
      // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    //   create a new user
  
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      address: req.body.address,
      city:req.body.city,
      password: hashedPassword,
    });
  
    try {
      const savedUser = await user.save();
      const userIs = await User.findOne({ email: user.email });
    if(userIs){
      res.status(201).json({ user: user._id, msg: "account created" });
    }

    } catch (err) {
      res.status(400).json({ err: "cath" });
      next(err);
    }
    }
    
  };
  
  // get user
  
  export const getUsers = async (req, res, next) => {
    try {
      if (req.body._id) {
        let doc = await User.findOne({ _id: req.body._id }).select(
          "name email "
        );
        res.status(200).json({ status: true, doc: doc });
        // if (user) {
        //   doc = await User.findOne(req.body).select("name email");
        //   res.status(200).json({ status: true, doc: doc });
        // }
        // .select("name email");
      } else {
        res.status(400).json({ status: false });
      }
    } catch (err) {
      next(err);
    }
  };

  export const getAllUsers = async (req, res, next) => {
    try {
      let doc = await User.find(req.body)
        .select("name email  mobile ")
        // .populate({
        //   path: "model",
        //   select: [, "feild", "field"],
        // }); 
        //for sort populate; //for sort populate
      res.status(200).json({ status: true, doc: doc });
    } catch (err) {
      next(err);
    }
  };

  // login user

export const login = async (req, res, next) => {
    // validate the data before we a user using joi
  
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in"] },
      }),
      password: Joi.string().min(6).required(),
    });
  
    const error = schema.validate(req.body);
  
    if (error.error) {
      return res
        .status(200)
        .json({ status: false, msg: error.error.details[0].message });
    }
  
    // check id mail exists
  
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(200)
        .send({ status: false, msg: "invalid email or password" });
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res
        .status(200)
        .send({ status: false, msg: "invalid email or password" });
  
    // create and assign a token
  
    const token = jwt.sign({ _Id: user._id }, config[config.ENV].PRIVATEKEY, {
      expiresIn: "1800s",
    });
    res
      .header("auth-token", token)
      .send({ token: token, id: user._id, status: true });
  };