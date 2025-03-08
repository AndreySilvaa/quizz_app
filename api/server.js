import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./model/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const saltRounds = 10;
const app = express();
const port = 4000;

app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://zillasl2001:Brx1l5EEVdTwDvk8@cluster0.wle1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Conectou ao banco de dados");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.post("/register", async (req, res) => {
  const { name, password } = req.body;

  try {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if(err) {
            return err
        }else{

            const userDoc = await User.create({ name, password: hash });
            res.status(200).json({ userDoc });
        }
      });
    });

    
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post('/login', async (req, res) =>{
    const {name, password} = req.body

    const userDoc = await User.findOne({name})
    const userPassword = userDoc.password
    const privateKey = 'amora'


    try {
        let matchPassword = await bcrypt.compare(password, userPassword)

        if(matchPassword){

            jwt.sign({name: userDoc.name, id: userDoc._id}, privateKey, {}, (err, token) => {
                
                if(err) return err

                res.cookie('token', token).json('Ok')
            })

            
        }else{
            res.status(400).json("Login inválido!")
        }

    } catch (error) {
        res.json(error.message)
    }

    
})

app.listen(port, () => {
  console.log("Servidor rodando na porta: " + port);
});

//Brx1l5EEVdTwDvk8

//mongodb+srv://zillasl2001:Brx1l5EEVdTwDvk8@cluster0.wle1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
