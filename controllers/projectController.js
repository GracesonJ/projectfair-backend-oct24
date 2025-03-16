const projects = require("../models/projectModel");

// Add Project 
exports.addProjectController = async (req, res) => {
    console.log(`Inside Add Project Controller`);

    const { title, language, github, website, overview } = req.body
    console.log(title, language, github, website, overview);

    const projectImage = req.file.filename
    console.log(projectImage);

    const userId = req.payload
    console.log(userId);


    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json(`Project Already exists!!!`)
        } else {
            const newProject = new projects({
                title, language, github, website, overview, projectImage, userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    } catch (error) {
        res.status(401).json(`Project adding failed due to ${error}`)
    }

}

// Get Home Project
exports.getHomeProjectController = async (req, res) => {
    try {
        const allProject = await projects.find().limit(3)
        res.status(200).json(allProject)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all projects
exports.getAllProjectController = async (req, res) => {
    console.log(`Inside Get All Project Controller`);
    const searchKey = req.query.search
    console.log(searchKey);

    const query = {
        language: {
            $regex: searchKey, $options: "i"
        }
    }
    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get user project controller
exports.getUserProjectController = async (req, res) => {
    const userId = req.payload
    try {
    
        const allProject = await projects.find({userId})
        res.status(200).json(allProject)
    } catch (error) {
        res.status(401).json(error)
    }
}

