const express = require('express')
const router = express.Router()
const Joi = require('joi');
const Emp = require('../models/modelEmp')


router.get('/', async (req, res) => {
    let getEmp = await Emp.find()
    res.send(getEmp)

})

router.get('/:id', async (req, res) => {
    try {
        let user = await Emp.findById(req.params.id)
        if (!user) {
            return res.send("user not found ... ")
        }
        res.send(user)
    } catch (error) {
        res.send("invalid id")
    }

})

router.post('/', async (req, res) => {

    // let { error } = empValidate(req.body)
    // if (error) {
    //     return res.send(error.details[0].message)
    // }

    try {
        let emp = new Emp({
            name: req.body.name,
            salary: req.body.salary,
            age: req.body.age
        })
        await emp.save()
        res.send(emp)
    } catch (error) {
        res.send(error)
    }


})


router.put('/:id', async (req, res) => {



    let user = await Emp.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!user) {
        res.status(404).send("invalid user ...")
    }

    // user.name = req.body.name
    // user.age = req.body.age
    // user.salary = req.body.salary
    // user.save()
    res.send({ msg: "'updated successfully'", user })





})

router.delete('/:id', (req, res) => {
    let user = emp.find(emp => emp.id == req.params.id)
    if (!user) {
        return res.send("user not found ... ")
    }

    emp.splice(emp.indexOf(user), 1)
    res.send(user)

})

function empValidate(req) {
    let schema = Joi.object({
        name: Joi.string().min(3).max(40).required(),
        salary: Joi.number().required(),
        age: Joi.number().integer()
    })
    return schema.validate(req)
}



module.exports = router