const Emp = require('../models/modelEmp')
const asyncWrapper = require('../midleware/asyncWrapper')
const { createCustomError } = require('../errors/error')

let getAllEmployee = asyncWrapper(async (req, res) => {
    const { name, age, completed, sort, fields } = req.query
    const queryObject = {}
    if (completed) {
        queryObject.completed = completed === "true" ? true : false
    }
    if (age) {
        queryObject.age = age
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i" }
    }

    let getEmp = Emp.find(queryObject)


    if (sort) {
        let res = sort.split(",").join(' ')
        getEmp = getEmp.sort(res)
    }


    if (fields) {
        let res = fields.split(",").join(' ')
        getEmp = getEmp.select(res)
    }

    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 10
    let skip = (page - 1) * limit

    getEmp = getEmp.skip(skip).limit(limit)

    let resl = await getEmp
    res.status(200).json({ nbHints: getEmp.length, data: resl })
})
// $regex: search, option: "i"
let pagination = asyncWrapper(async (req, res) => {
    // const { page, limit } = req.query
    // let emp = await Emp.find({})
    //     .limit(limit)
    //     .skip((page - 1) * limit)
    // res.send(emp)

})

let getEmployee = asyncWrapper(async (req, res, next) => {
    let user = await Emp.findOne({ _id: req.params.id })
    if (!user) {
        return next(createCustomError("user not found", 404))
    }
    res.send(user)
})

let addEmployee = asyncWrapper(async (req, res) => {
    // we can use Emp.create to create employee instead of this way
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