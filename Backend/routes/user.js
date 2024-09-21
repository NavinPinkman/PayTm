const express = require("express")
const authMiddleware = require("../middleware")
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const JWT_KEY = require("../config");
const jwt = require("jsonwebtoken")



const signupBody = zod.object({
    username : zod.string(),
    firstname : zod.string(),
    lastname : zod.string(),
    password : zod.string()
})

router.post("/signup",async function(req,res){
    const correct = signupBody.safeParse(req.body)
    if(!correct.success){
        return res.status(411).json({
            message : "Invalid Input"
        })
    }

    const existingUser = await User.findOne({
        username : req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message : "User already exists"
        })
    }

    const user = await User.create({
        username : req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        password : req.body.password
    })

   

    const userId = user._id;

    const account = await Account.create({
        userId,
        balance : 1 + Math.random() * 1000
    })

    const token = jwt.sign({
        userId
    },JWT_KEY)

    return res.json({
        message : "User created Successfully",
        token : token
    })
})

const signinBody = zod.object({
    username : zod.string(),
    password : zod.string()
})
router.post("/signin",async (req,res)=>{

    const get = signinBody.safeParse(req.body)
    if(!get.success){
        return res.status(411).json({
            message : "Invalid Input"
        })
    }
    
    const findUser = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })

    if(!findUser){
        return res.json({
            message : "User doesn't exist"
        })
    }

        const tok = jwt.sign({
            userId : findUser._id
        },JWT_KEY)

    res.json({
        token: tok
    })
})
//--------------------------------------------
const updateBody = zod.object({
    password : zod.string().min(6).optional(),
    firstname : zod.string().optional(),
    lastname : zod.string().optional()
})

router.put("/",authMiddleware,async (req,res)=>{
    const isit = updateBody.safeParse(req.body)
    if(!isit.success){
        return res.status(411).json({
            message : "Invalid Input"
        })
    }
    
    await User.updateOne(
        {_id : req.userId},
        req.body
    )

    res.json({
        message : "Updated successfully"
    })
    
})


router.get('/bulk',async (req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or : [{
            firstname:{
                "$regex": filter
            }
        },{
            secondname : {
                "$regex" : filter
            }
        }]
    })

    res.json({
        users: users.map(user=>({
            username : user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            userid: user._id
        }))
    })

})


module.exports = router