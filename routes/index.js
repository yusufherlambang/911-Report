const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.home)

router.get('/reports', Controller.getReports)

router.get('/reports/add', Controller.getAddFormReport)
router.post('/reports/add', Controller.postAddFormReport)

router.get('/reports/:id', Controller.getEditFormReport)
router.post('/reports/:id/edit', Controller.postEditReport)

router.get('/reports/:id/delete', Controller.deleteReport)

module.exports = router