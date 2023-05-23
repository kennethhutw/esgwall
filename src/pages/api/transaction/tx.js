
import clientPromise from "../../lib/mongodb";
export default async function handler(
  req,
  res
) {

    try{
        const client = await clientPromise;
        const db = client.db("esgWall");
        const { txId, cardId,
             email,status,
             updateDate ,merchantId , 
             merchantWalletId, amount, currency  } = req.body;

        const card = await db.collection("tx").insertOne({
                        cardId,
                        txId,
                        email,
                        network,
                        status,
                        merchantId,
                        merchantWalletId,
                        updateDate,
                    amount,
                    currency

                    })
        res.status(200).json({cardId: card.insertedId})
    }catch(e){
        console.log("============",e);
        res.status(500).json({message: "failed"});
    }
}
