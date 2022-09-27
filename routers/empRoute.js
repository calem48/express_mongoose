const express = require('express');
const router = express.Router()
const Joi = require('joi');

// const { authenticateUser, authorazationUser } = require('../midleware/auth')
const {
    getAllEmployee, pagination, getEmployee, addEmployee, updateEmployee, deleteEmployee
} = require('../controllers/empController')


router.get('/', getAllEmployee)
router.get('/pages', pagination)
router.get('/:id', getEmployee)
router.post('/', addEmployee)
router.put('/:id', updateEmployee)
router.patch('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

// router.route('/pages').get(pagination)
// router.route('/').get(getAllEmployee).post(addEmployee)
// router.route('/:id').get(getEmployee).put(updateEmployee).delete(deleteEmployee)



// function empValidate(req) {
//     let schema = Joi.object({
//         name: Joi.string().min(3).max(40).required(),
//         salary: Joi.number().required(),
//         age: Joi.number().integer()
//     })
//     return schema.validate(req)
// }



module.exports = router