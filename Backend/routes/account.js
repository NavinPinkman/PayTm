const express = require("express") 
const mongoose = require("mongoose")

const router = express.Router()
const authMiddleware = require("../middleware")
const { User, Account } = require("../db")

router.get('/balance',authMiddleware,async(req,res)=>{
    const account = await Account.findOne({
        userId : req.userId
    })

    return res.json({
        balance : account.balance
    })
})

router.post('/transfer',authMiddleware,async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {to,amount} = req.body;
    const account = await Account.findOne({
        userId : req.userId
    }).session(session)
    if(!account || account.balance < amount){
        await session.abortTransaction()
        return res.status(400).json({
            message : "Insufficient Balance"
        })
    }

    const toaccount = await Account.findOne({userId : to}).session(session)

    if(!toaccount){
        await session.abortTransaction();
        return res.json({
            message : "Invalid Account"
        })
    }

    await Account.updateOne({userId : req.userId},{$inc:{balance: -amount}}).session(session)
    await Account.updateOne({userId : to},{$inc:{balance: +amount}}).session(session)

    await session.commitTransaction()
    await session.endSession()

    res.json({
        message : "Transaction Completed"
    })
})


module.exports = router