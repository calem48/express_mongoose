const express = require('express')
const mongoose = require('mongoose');
const app = express()
const Emp = require('./routers/empRoute')


app.use(express.json())
app.use("/api/employees", Emp)

mongoose.connect('mongodb://localhost:27017/myapp')
    .then(() => {
        console.log("db connected successfully");
    })
    .catch((e) => {
        console.log(e);
    })



const port = process.env.port || 3000
app.listen(port, () => console.log('server connected on port  ' + port))


////
// const express = require('express');
// const app = express()
// const mongoose = require('mongoose');
// const { Schema } = mongoose;



// mongoose.connect('mongodb://localhost:27017/myapp')
//     .then(() => {
//         console.log("db connected successfully");
//     })
//     .catch((e) => {
//         console.log(e);
//     })


// const schema = new Schema({
//     name: { type: String, required: [true, "must put name"], trim: true },
//     age: { type: Number, require: true, min: [30, "too small"], max: [40, "too large age.."] },
//     salary: { type: Number },
//     isApprove: Boolean,
//     dep: {
//         type: Array,
//         validate: {
//             validator: function (p) {
//                 return p.length > 0
//             },
//             message: "you must put a value"
//         }
//     },

//     date: { type: Date, default: Date.now() }
// })

// const Emp = mongoose.model('employee', schema)


// async function createEmployee() {
//     let employee = new Emp({
//         name: "    kayou           lol   ",
//         age: 39,
//         salary: 50000,
//         dep: ['earth', 'moon'],
//         isApprove: true,

//     })
//     try {
//         let res = await employee.save()
//         console.log(res);

//     } catch (error) {
//         console.log(error.message);
//     }
// }

// createEmployee()


// async function getEmployee() {
//     let emp = await Emp.find({})
//         .select({ name: 1, age: 1 })
//         .limit(1)
//     console.log(emp);
// }

// // getEmployee()

// async function updateEmployee(id) {
//     let emp = await Emp.findById(id)
//     emp.age = 80
//     await emp.save()

// }

// // updateEmployee('632ade785335191238fafdd0')

// //update using an other way
// async function updateEmployee(id) {
//     // let emp = await Emp.update({ _id: id }, { $set: { name: "misso" } })
//     // let emp = await Emp.updateOne({ _id: id, name: 'ssssssssalah', age: 200 })

//     let emp = await Emp.findByIdAndUpdate(id, { name: "missssso", salary: 1457757 }, { new: true })
//     console.log(emp);

// }

// // updateEmployee("632ade785335191238fafdd0")

// async function deleteEmployee(id) {

//     let emp = await Emp.findOneAndDelete({ _id: id })
//     console.log(emp);

// }

// // deleteEmployee("632ae5290c0d176a242e70a4")