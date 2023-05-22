
import clientPromise from "../../../lib/mongodb";

export default  async function handler(req, res) {

    const client = await clientPromise;
    const db = client.db("ContentAI")

    const {lastPostDate, getNewerPosts} = req.body;

    const posts = await db.collection("posts").find({
        publish: 1,
        created:{[getNewerPosts? "$gt":"$lt"]: new Date(lastPostDate)}
    }).limit(getNewerPosts? 0: 5).sort({
        created:-1
    }).toArray();

    res.status(200).json({posts});

}