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


const getApplicationsbyquery = async (req, res) => {
    try {
        console.log("req.query =", req.query);

        const query = {
            owner: req.user.id
        };

        if (req.query.status) {
            query.status = req.query.status;
        }

        console.log("MongoDB query =", query);

        const applications = await Application.find(query);

        console.log("Found applications =", applications);

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




const getApplicationsbyid = async (req, res) => {
    try {
        const applications = await Application.findOne({
             _id: req.params.id,
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


const updateApplication = async (req, res) => {
    const {
    company,
    role,
    status,
    location,
    jobType,
    jobLink,
    notes
} = req.body;

    try {
        const updateApplication = await Application.updateOne({
             _id: req.params.id,
            owner: req.user.id
        }, {
        $set: req.body
    });

        

        return res.status(200).json({
            updateApplication
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};


const deleteApplication = async (req, res) => {
    try {
        const deleteApplication = await Application.deleteOne({
             _id: req.params.id,
            owner: req.user.id
        
    });

        

        return res.status(200).json({
           deleteApplication
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

module.exports={createApplication,getApplications,getApplicationsbyid,updateApplication,deleteApplication,getApplicationsbyquery};