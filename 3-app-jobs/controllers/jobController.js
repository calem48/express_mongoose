const { StatusCodes } = require('http-status-codes')
const { notFound, BadRequestError } = require('../errors')
const Job = require('../models/jobModel')

const getAllJobs = async (req, res) => {
    const job = await Job.find({ createdBy: req.user._id })
    res.status(200).json({ msg: 'all jobs', job })
}

const getJob = async (req, res) => {
    const { params: { id } } = req

    const job = await Job.findOne({ _id: id })
    if (!job) {
        throw new notFound('this Job does not find it')
    }

    res.status(StatusCodes.OK).json({ msg: 'get single job', job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user._id
    const job = await Job.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ msg: 'create a job', job })
}

const updateJob = async (req, res) => {
    const { body: { company, postion }, params: { id } } = req

    if (!company || !postion) {
        throw new BadRequestError("must t provide company and postion")
    }

    const job = await Job.findByIdAndUpdate({ _id: id }, req.body, { new: true, runValidators })

    if (!job) {
        throw new notFound('can not update')
    }
    res.status(StatusCodes.OK).json({ msg: 'update  job', job })
}

const deleteJob = async (req, res) => {
    const { params: { id } } = req

    const job = await Job.findByIdAndRemove({ _id: id }, { new: true })

    if (!job) {
        throw new notFound('job you want to delete not found it')
    }
    res.status(200).json({ msg: 'deleted job', job })
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }