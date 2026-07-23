
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

    company :{
        type: String,
        required: true
    },
    role :
    {
        type:String,
        required:true,
      

    },

    status:{
        type:String,
        required:true,
       enum: ["Applied", "Interview", "Offer", "Rejected"],
        default: "Applied"
    },

    location:{
        type:String,
        required:true
    },
    jobType :{
       type: String,
       required:true
    },
    jobLink :{
        type :String,
        required: true
    },
    notes:{
        type:String
    },
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}
},
{
    timestamps: true
}


)

const Application =mongoose.model("Application",applicationSchema);

module.exports=Application;