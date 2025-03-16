// import express
const express = require('express')

const userController = require('./controllers/userController')
const projectController = require('./controllers/projectController')
const jwtMiddleware = require('./middleware/jwtMiddleware')
const multerCongfig = require('./middleware/multerMiddleware')

// instance router
const router = new express.Router()


// Register
router.post('/register', userController.register)

// Login
router.post('/login', userController.login)

// add-project
router.post('/add-project', jwtMiddleware, multerCongfig.single("projectImage"), projectController.addProjectController )

// get home Projects
router.get('/home-project', projectController.getHomeProjectController)

// get all projects
router.get('/all-projects',jwtMiddleware, projectController.getAllProjectController)

// get user projects
router.get('/user-projects',jwtMiddleware, projectController.getUserProjectController)

// Export
module.exports = router 