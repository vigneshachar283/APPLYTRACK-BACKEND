const Application = require("./../models/Application");

const createApplication = async (req, res) => {
    try {
        const { company,role,status,location,jobType,jobLink,notes}=req.body;
        const owner =req.user.id;

        const newapp= new Application({
            company:company,
            role:role,
            status:status,
            location:location,
            jobType:jobType,
            jobLink:jobLink,
            notes:notes,
            owner: req.user.id



        })

        await newapp.save();

        res.status(201).send("Application created succesfully");

    } catch (err) {
        res.status(500).json({
            "message":"internal server error",
            error:err.message
        })

    }
};



const getApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            owner: req.user.id
        });

        return res.status(200).json({
            applications
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

module.exports={createApplication,getApplications}