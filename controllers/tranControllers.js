const { default: mongoose } = require('mongoose')
const Tran = require('../models/tran')


//GET all Transactions
const getTrans = async(req,res)=>{
    const user_id = req.user._id
    const trans = await Tran.find({user_id}).sort({createdAt: -1})
    res.status(200).json(trans)
}
//GET single Transaction
const getTran = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:'tran id not valid'})
    }

    const tran = await Tran.findById(id)

    if(!tran){
        return res.status(404).json({error:'no such workout'})
    }
    res.status(200).json(tran)
}

//POST new transaction
const createTran = async (req,res)=>{
    console.log(req.body)
    const {desc , amount , category, isHighlighted, isIncome} = req.body

    let emptyFields = []

    if(!desc){
        emptyFields.push('desc')
    }
    if(!amount){
        emptyFields.push('amount')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error:'Please fill fields',emptyFields})
    }

    try{
        const user_id = req.user._id
        const tran = await Tran.create({
            desc,
            amount,
            category,
            isHighlighted,
            isIncome,
            user_id
        })
        res.status(200).json(tran)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//DELETE a transaction
const deleteTran = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:'tran id not valid'})
    }
    const tran = await Tran.findOneAndDelete({_id:id})

    if(!tran){
        return res.status(400).json({error:'no such transaction'})
    }
    res.status(200).json(tran)
}
//PATCH a transaction
const updateTran = async(req,res) => {
    const {id} = req.params
    console.log('req body: ',req.body)

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:'tran id not valid'})
    }
    const tran = await Tran.findOneAndUpdate({_id:id},{
        ...req.body
    })
    console.log('const tran : ',tran)

    if(!tran){
        return res.status(400).json({error:'no such transaction'})
    }
    res.status(200).json(tran)
}

module.exports = {createTran, getTrans, getTran, deleteTran, updateTran}