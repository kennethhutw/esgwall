import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "../../lib/mongodb";

export const getAppProps = async(ctx)=>{
    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = client.db("ContentAI")
if(!userSession){
    const posts =await db.collection('posts').find({
        publish:1
    }).limit(5).sort({created:-1}).toArray();

    return {
        availableTokens : 0,
        posts: posts.map(({created, _id, userId , ...rest})=>({
            _id:_id.toString(),
            created: created.toString(),
            ...rest
        })),
        postId: ctx.params?.postId || null
    }
} else{
    const user = await db.collection("users").findOne({
        auth0Id:userSession?.user.sub
    });

    if(!user){

         await db.collection("users").insertOne({
            auth0Id:userSession.user.sub,
            availableTokens:5
        })
        return {
            availableTokens:5,
            posts:[]
        }
    }

    const posts =await db.collection('posts').find({
        userId:user._id
    }).limit(5).sort({created:-1}).toArray();

    return {
        availableTokens : user.availableTokens,
        posts: posts.map(({created, _id, userId , ...rest})=>({
            _id:_id.toString(),
            created: created.toString(),
            ...rest
        })),
        postId: ctx.params?.postId || null
    }
}

}