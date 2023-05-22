import { withApiAuthRequired , getSession} from "@auth0/nextjs-auth0";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
export default withApiAuthRequired( async function handler(req, res) {

    try{
        const {user} = await getSession(req, res);

        const client = await clientPromise;
        const db = client.db("ContentAI")

        const userProfile = await db.collection("users").findOne({
        auth0Id:user.sub
        })

        const {postId} = req.body;

        await db.collection("posts").updateOne({
            userId: userProfile._id,
            _id:new ObjectId(postId)
        },{
            $set:{
                publish:1
            }
        });

        res.status(200).json({success:true})
    }catch(e){
        console.log("ERROR TRYING TO PUBLISH A POST", e)
    }
    return;


})