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
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let sortOption = { createdAt: -1 };

        if (req.query.sort === "oldest") {
            sortOption = { createdAt: 1 };
        }

        const query = {
            owner: req.user.id
        };

        if (req.query.status) {
            query.status = req.query.status;
        }

        if (req.query.company) {
            query.company = req.query.company;
        }

        if (req.query.search) {
            query.$or = [
                {
                    company: {
                        $regex: req.query.search,
                        $options: "i"
                    }
                },
                {
                    role: {
                        $regex: req.query.search,
                        $options: "i"
                    }
                }
            ];
        }

        const total = await Application.countDocuments(query);
        const totalPages = Math.ceil(total / limit);

        const applications = await Application.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            applications,
            pagination: {
                total,
                page,
                limit,
                totalPages
            }
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

module.exports={createApplication,getApplications,getApplicationsbyid,updateApplication,deleteApplication};