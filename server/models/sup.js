import mongoose from "mongoose";

//All attributes in here 
const supSchema = mongoose.Schema({
    F_name : {
        type: String,
    },
    L_name : {
        type: String,
    },
    P_name :{
        type: String,
    },
    Email : {
        type: String,
    },
    Phone : {
        type: String,
    },
    Address : {
        type: String,
    },
    
});

const supModel = mongoose.model("sup", supSchema);
export default supModel;
