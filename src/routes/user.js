const express = require('express')
const router = express.Router()

const UserController = require('../Controllers/UserController')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.use('/logout', UserController.logout)
router.get('/admin', UserController.showAdmin)
router.use('/insert', UserController.showform)
router.post('/insertuser', UserController.insertUser)
router.get('/delete/:iduser', UserController.deleteUser)
router.get('/updateuser/:iduser', UserController.showupdateUser)
router.post('/update/:iduser', UserController.update)
router.get('/listuser/:page', UserController.showListUser)
router.get('/client/:id', UserController.showClient)
router.use('/', UserController.index)

module.exports = router
