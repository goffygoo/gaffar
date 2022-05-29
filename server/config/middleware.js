import Users from "../model/User.js";
import Projects from "../model/Project.js";

export const adminAccess = async function (req,res,next){
    try {
        let project = await Projects.findOne({ _id: req.body.project_id });
        let user = await Users.findOne({
            email: req.body.user_email
        });
        // console.log(user);
        // console.log(project);
        if (!project || !user) {
          return res.status(404).send({
            success: false,
            message: `Invalid request`,
          });
        }
        for(let uid of project.members){
            if(uid.member.toString() === user._id.toString()){
                if(uid.admin){
                    return next();
                }else{
                    return res.status(404).send({
                        success: false,
                        message: `You dont have access`,
                      });
                }
            }
        }
        return res.status(404).send({
            success: false,
            message: `You dont have access`,
          });
      } catch (err) {
        return res.status(404).send({
          success: false,
          message: `Bhai error aara : ${err}`,
        });
      }
}

export const logger2 = function(req,res,next){
    console.log("log-2");
    return next();
}