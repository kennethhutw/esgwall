
import clientPromise from "../../../lib/mongodb";
import { getSession} from "@auth0/nextjs-auth0";
import { setCookie, getCookie  } from 'cookies-next';
import { ObjectId } from "mongodb";
export default  async function handler(req, res) {
   try
   {
        const userSession  = await getSession(req, res);
        //const cookies = new Cookies(req, res);

        const client = await clientPromise;
        const db = client.db("ContentAI");

        const {postId} = req.body;

        // Get the cookie value
        const cookieValue = getCookie('visitedArticles', { req, res }) || '';

        if(cookieValue!=""){

        const visitedArticles = cookieValue.split(',');

        // Check if the user has visited the article before
        const hasVisited = visitedArticles.includes(postId);

                if(!hasVisited){
            
                    // Add the article ID to the visited articles array
                    visitedArticles.push(postId);

                    // Write the new cookie
                    setCookie('visitedArticles', visitedArticles.join(','), {
                    req, res ,
                        maxAge: 60 * 60 * 24, // 1 day

                        });

                        const posts = await db.collection("posts").updateOne({
                            _id:new ObjectId(postId)
                        }, {$inc: {view_count: 1}}, {upsert: true});

                        if(userSession?.user){
                            await db.collection("views").insertOne({
                                postId,
                                userId:userSession?.user.sub,
                                created: new Date(),
                            })
                        }
                } else if(userSession?.user){

            
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // 将时间设置为今天 00:00:00
                    const tomorrow = new Date(today);
                    tomorrow.setDate(today.getDate() + 1); // 将时间设置为明天 00:00:00

                    const result = await db.collection('views').aggregate([
                        {
                        $match: {
                            postId: postId,
                            userId: userSession?.user.sub,
                            created: {
                            $gte: today,
                            $lt: tomorrow,
                            },
                        },
                        },
                        {
                        $limit: 1,
                        },
                    ]).toArray();

                        if (result.length > 0) {
                            // 存在今天的记录
                            console.log("存在今天的记录 =========");
                        } else {
                            // 不存在今天的记录
                            await db.collection("views").insertOne({
                                postId,
                                userId:userSession?.user.sub,
                                created: new Date(),
                            })
                        }

                    }
            } else{
            
            let visitedArticles=postId+",";
            
                // Write the new cookie
                setCookie('visitedArticles',visitedArticles, {
                        req, res ,
                    maxAge: 60 * 60 * 24, // 1 day
                    });
                    const cookieValue2 = getCookie('visitedArticles', { req, res }) || '';

                    const posts = await db.collection("posts").updateOne({
                        _id:new ObjectId(postId)
                    }, {$inc: {view_count: 1}}, {upsert: true});

                    if(userSession?.user){
                        await db.collection("views").insertOne({
                            postId,
                            userId:userSession?.user.sub,
                            created: new Date(),
                        })
                    }
            }
       
        res.status(200).json({success:true})
    } catch(e){
        console.log("addview failed", e);
        res.status(402);
    }

}