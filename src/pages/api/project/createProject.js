import { withApiAuthRequired , getSession} from "@auth0/nextjs-auth0";
import clientPromise from "../../../../lib/mongodb";
export default withApiAuthRequired( async function handler(req, res) {
   try{
    const {user} = await getSession(req, res);

    const client = await clientPromise;
    const db = client.db("ContentAI")

    const userProfile = await db.collection("users").findOne({
      auth0Id:user.sub
    })


    const {topic, descr, sdgs} = req.body;
    console.log("============",req.body);
    if(!topic || !descr){
        console.log("422 1============");
      res.status(422);
      return;
    }

    // if(topic.length > 90 || !descr.length > 90){
    //     console.log("422 2============");
    //   res.status(422);
    //   return;
    // }


      const project = await db.collection("projects").insertOne({
        description: descr.split("\n").join(""),
        topic,
        sdgs,
        userId: userProfile._id,
        created: new Date(),
        publish:0,
        view_count:0,
        image:""
      })

    

    res.status(200).json({projectId: project.insertedId})
   }catch(e){
     console.log("============",e);
   }
  })
  