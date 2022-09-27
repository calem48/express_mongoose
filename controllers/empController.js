const Emp = require('../models/modelEmp')
const asyncWrapper = require('../midleware/asyncWrapper')

let getAllEmployee = asyncWrapper(async (req, res) => {
    let getEmp = await Emp.find({})
    res.send(getEmp)
    // console.log(req);
})

let pagination = asyncWrapper(async (req, res) => {
    const { page, limit } = req.query
    let emp = await Emp.find({})
        .limit(limit)
        .skip((page - 1) * limit)
    res.send(emp)

})

let getEmployee = asyncWrapper(async (req, res) => {
    let user = await Emp.findById(req.params.id)
    if (!user) {
        return res.send("user not found ... ")
    }
    res.send(user)
})

let addEmployee = asyncWrapper(async (req, res) => {

    let emp = new Emp({
        name: req.body.name,
        salary: req.body.salary,
        age: req.body.age
    })
    await emp.save()
    res.send(emp)

})

let updateEmployee = asyncWrapper(async (req, res) => {
    let user = await Emp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true/*, overwrite: true*/ })
    if (!user) {
        res.status(404).send("invalid user ...")
    }

    // user.name = req.body.name
    // user.age = req.body.age
    // user.salary = req.body.salary
    // user.save()
    res.status(200).json({ msg: "'updated successfully'", user })
})

let deleteEmployee = asyncWrapper(async (req, res) => {

    let user = await Emp.findByIdAndRemove(req.params.id)
    if (!user) {
        return res.send("user not found ... ")
    }
    res.send({ user, msg: "deleted seccessfully" })

})

module.exports = { getAllEmployee, pagination, getEmployee, addEmployee, updateEmployee, deleteEmployee }