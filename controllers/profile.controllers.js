const ProfileModel = require('../models/profiles.models')
const ValidateProfile = require("../validation/Profile")
const AddProfile = async (req ,res)=>{
    const {errors, isValid} = ValidateProfile(req.body)
    try {
        if(!isValid){
          res.status(404).json(errors)
        }else{
            ProfileModel.findOne({user: req.user.id})
        .then(async (profile)=>{
            if(!profile){
                req.body.user = req.user.id
                await ProfileModel.create(req.body)
                res.status(200).json({message: "success"})
            }else{
               await  ProfileModel.findOneAndUpdate(
                    {_id: profile._id},
                    req.body,
                    {new: true}
                ).then(result=>{
                    res.status(200).json(result)
                })
            }
        })
        }
    } catch (error) {
         res.status(404).json(error.message)
    }
}

const FindAllProfiles = async (req ,res)=>{
    try {
       const data =  await ProfileModel.find().populate('user', ["name", "email", "role"])
       res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error.message)
    }
}

const FindSingleProfile = async (req ,res)=>{
    try {
        const data =  await ProfileModel.findOne({user: req.user.id}).populate('user', ["name", "email", "role"])
        res.status(200).json(data)
 
     } catch (error) {
         res.status(404).json(error.message)
     }
}

const DeleteProfile = async (req ,res)=>{
    try {
        const data =  await ProfileModel.findOneAndRemove({_id: req.params.id})
        res.status(200).json({message: "deleted"})
 
     } catch (error) {
         res.status(404).json(error.message)
     }
}
const UpdateProfile = async (req, res) => {
    try {
      const { errors, isValid } = ValidateProfile(req.body);
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        const profile = await ProfileModel.findOne({ user: req.user.id });
        if (!profile) {
          res.status(404).json({ message: "Profile not found" });
        } else {
          const updatedProfile = await ProfileModel.findOneAndUpdate(
            { user: req.user.id },
            req.body,
            { new: true }
          );
          res.status(200).json(updatedProfile);
        }
      }
    } catch (error) {
      res.status(404).json(error.message);
    }
  }
  const FindSingleProfileById = async (req, res) => {
    try {
      const profile = await ProfileModel.findById(req.params.id).populate('user', ['name', 'email', 'role']);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports = {
    AddProfile,
    FindAllProfiles,
    FindSingleProfile,
    DeleteProfile,
    UpdateProfile,
    FindSingleProfileById
}