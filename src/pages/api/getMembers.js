
import clientPromise from "../../../lib/mongodb";
export default async function handler(req, res) {


    const client = await clientPromise;
    const db = client.db("ContentAI")

    const users = await db.collection("users").findOne().toArray();



    res.status(200).json({users});

}