let getAllEmployee = async (req, res) => {
    let getEmp = await Emp.find()
    res.send(getEmp)
    // console.log(req);
}

let pagination = async (req, res) => {
    const { page, limit } = req.query
    let emp = await Emp.find({})
        .limit(limit)
        .skip((page - 1) * limit)
    res.send(emp)

}

let getEmployee = async (req, res) => {
    try {
        let user = await Emp.findById(req.params.id)
        if (!user) {
            return res.send("user not found ... ")
        }
        res.send(user)

    } catch (error) {
        res.send("invalid id")
    }

}

let addEmployee = async (req, res) => {

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
}

let updateEmployee = async (req, res) => {



    let user = await Emp.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!user) {
        res.status(404).send("invalid user ...")
    }

    // user.name = req.body.name
    // user.age = req.body.age
    // user.salary = req.body.salary
    // user.save()
    res.send({ msg: "'updated successfully'", user })
}

let deleteEmployee = async (req, res) => {
    try {
        let user = await Emp.findByIdAndRemove(req.params.id)
        if (!user) {
            return res.send("user not found ... ")
        }
        res.send({ user, msg: "deleted seccessfully" })
    } catch (error) {
        res.send("invalid id")
    }

}

module.exports = { getAllEmployee, pagination, getEmployee, addEmployee, updateEmployee, deleteEmployee }