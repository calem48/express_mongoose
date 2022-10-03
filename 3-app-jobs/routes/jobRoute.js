
const express = require('express')
const { getAllJobs, createJob, updateJob, deleteJob, getJob } = require('../controllers/jobController')
const router = express.Router()


router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').put(updateJob).delete(deleteJob).get(getJob)

module.exports = router