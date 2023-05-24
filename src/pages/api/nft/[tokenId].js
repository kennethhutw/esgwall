
import clientPromise from "../../../../lib/mongodb";
export default async function handler(
  req,
  res
) {

    try{
        res.status(200).json({
            "attributes": [
           
              {
                "trait_type": "17",
                "value": "17 PARTNERSHIPS FOR THE GOALS"
              },
              {
                "trait_type": "15",
                "value": "15 LIFE ON LAND"
              },
              {
                "trait_type": "14",
                "value": "14. LIFE BELOW WATER"
              },
              {
                "trait_type": "13",
                "value": "13. CLIMATE ACTION"
              },
              {
                "trait_type": "11",
                "value": "11.  SUSTAINABLE CITIES AND COMMUNITIES"
              }
            ],
            "description": "We will create a green, liveable and sustainable home for Singaporeans.",
            "image": "https://esgwall.vercel.app/project/framework_cityinnature.jpg",
            "name": "City in Nature"
          })
    }catch(e){
        console.log("============",e);
        res.status(500).json({message: "failed"});
    }
}
