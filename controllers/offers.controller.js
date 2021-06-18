const jobModel = require('../models/offers.model')

exports.suscribeOfferUser = async (req, res) => {
  try {
    const { id, rol } = req.token
    if (rol === 'user') {
      const job = await jobModel.findById(req.params.offerId)
      if (!job.applicants.includes(id)) {
        job.applicants.push(id)
        job.save()
        res.json(job)
      } else {
        res.status(409).json({ Msg: 'Already registered' })
      }
    } else res.status(409).json({ Msg: 'Only users can be registered' })
  } catch (error) {
    res.status(400).json({ Msg: 'Error while register user' })
  }
}

exports.unsuscribeOfferUser = async (req, res) => {
  try {
    const { id, rol } = req.token
    if (rol === 'user') {
      const job = await jobModel.findById(req.params.offerId)
      const user = job.applicants.indexOf(id)
      if (user !== -1) {
        job.applicants.splice(user, 1)
        job.save()
        res.json(job)
      } else {
        res.status(409).json({ Msg: 'You are not register in this job' })
      }
    } else res.status(409).json({ Msg: 'Only users can be registered' })
  } catch (error) {
    res.status(400).json({ Msg: 'Unsuscribe user is NOT possible' })
  }
}
