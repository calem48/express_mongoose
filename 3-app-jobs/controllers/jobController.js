const getAllJobs = (req, res) => {
    res.status(200).json({ msg: 'all jobs' })
}

const getJob = (req, res) => {
    res.status(200).json({ msg: 'get single job' })
}

const createJob = (req, res) => {
    res.status(200).json({ msg: 'create a job' })
}

const updateJob = (req, res) => {
    res.status(200).json({ msg: 'update  job' })
}

const deleteJob = (req, res) => {
    res.status(200).json({ msg: 'delete job' })
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }