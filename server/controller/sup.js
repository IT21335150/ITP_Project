import supModel from "../models/sup.js"

class supController{
    static getAllSup = async (req, res) => {
        try {
            //try & catch error execution
            const allSup = await supModel.find({});
            if(allSup){
                return res.status(200).json(allSup);
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    };

    static createSup = async (req, res) => {
        const {F_name,L_name,P_name,Email,Phone,Address} = req.body;
        try {
            if(F_name && L_name && P_name && Email && Phone && Address){
                const newSup = supModel({
                    F_name,
                    L_name,
                    P_name,
                    Email,
                    Phone,
                    Address,
                });

                const saved_sup = await newSup.save();
                if(saved_sup){
                    return res.status(201).json(saved_sup);
                }
                else{
                    return res.status(400).json({message: "wrong"});
                }
            }
            else{
                return res.status(400).json({message: "all feilds are required"});
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    };

    static getSingleSup = async (req, res) => {
        const {id} = req.params;
        try {
            if(id){
                const getSingleData = await supModel.findById(id);
                return res.status(200).json(getSingleData);
            }
            else{
                return res.status(400).json({message: "id not found"});
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    };

    static updateSup = async (req, res) => {
        const {id} = req.params;
        try {
            if(id){
                const getUpdatedData = await supModel.findByIdAndUpdate(id, req.body);
                return res.status(200).json(getUpdatedData);
            }
            else{
                return res.status(400).json({message: "id not found"});
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    };

    static deleteSup = async (req, res) => {
        const {id} = req.params;
        try {
            if(id){
                const getDeleteData = await supModel.findByIdAndDelete(id);
                return res.status(200).json(getDeleteData);
            }
            else{
                return res.status(400).json({message: "id not found"});
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    }; 
    static getsearchsupplier=async(req,res)=>{
        const { query } = req;
        const { F_name } = query;
        
        try {
            let searchResults = [];
        
            if (F_name) {
              // If both name and distributor ID are present in the query parameters
              searchResults = await supModel.find({
                $or: [
                  { F_name: { $regex: new RegExp(F_name, 'i') } },
                  
                ]
              });
            } else if (F_name) {
              // If only name is present in the query parameters
              searchResults = await supModel.find({
                F_name: { $regex: new RegExp(F_name, 'i') }
              });
            }
            
        
            return res.status(200).json(searchResults);
          } catch (error) {
            return res.status(400).json(error);
          }
    };
}

export default supController;