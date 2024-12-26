import userModel from"../models/userModel.js";
import { hashPassword } from "./../helpers/authHelper.js";

export const registerController  = async(req,res) => { 
    try{
       const {name,email,password,phone,address} = req.body
       //validations
       if (!name){
           return res.send({error:'name is Required'})
       }
       if (!email){
        return res.send({error:'Email- is Required'})
       }
       if (!password){
        return res.send({error:'Password is Required'})
       }
       if (!Phone){
        return res.send({error:'phone no is Required'})
       }
       if (!Address){
        return res.send({error:'Address is Required'})
       }
       //check user
       const  existingUser = await userModel.findone({email})
       //Existing user
       if(existingUser){
           return res.status(200).send({
              success:true,
              message:'Already Register please login'
           })
       }
       //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({
           name,
          email,
          phone,
          address,
         password:hashedPassword,
        }).save()

        res.status(201).send({
            success:true,
            message:'User Registeration Successfully ',
            user,

        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Errro in registeration',
            error
        })
    }

 };