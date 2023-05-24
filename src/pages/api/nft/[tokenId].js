
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
export default async function handler(
  req,
  res
) {

    const client = await clientPromise;
    const db = client.db("ContentAI")
    console.log("req.query.tokenId =======",req.query.tokenId);
    const metadata = await db.collection("metadata").findOne({
      tokenId:req.query.tokenId
    })
    console.log("metadata =======",metadata.projectId.toString());
    const project = await db.collection("projects").findOne({
        _id:metadata.projectId
      })

    // switch(goal) {
    //     case "ru":
    //         break;
    // }
    // let attributes = [];
    // props.sdgs.split(',').map((goal, i)=>(
        
        
    //     ))

    let attributes = [];
    project.sdgs.split(',').forEach((goal, i)=>{

       if(goal == "17"){
        attributes.push({
            "trait_type": "17",
            "value": "17 PARTNERSHIPS FOR THE GOALS"
          })
       }

       if(goal == "16"){
        attributes.push({
            "trait_type": "16",
            "value": "16 PEACE, JUSTICE AND STRONG INTITUIONS"
          })
       }

       if(goal == "15"){
        attributes.push( {
            "trait_type": "15",
            "value": "15 LIFE ON LAND"
          })
       }

       if(goal == "14"){
        attributes.push( {
            "trait_type": "14",
            "value": "14. LIFE BELOW WATER"
          })
       }

       if(goal == "13"){
        attributes.push( {
            "trait_type": "13",
            "value": "13. CLIMATE ACTION"
          })
       }

       if(goal == "12"){
        attributes.push({
            "trait_type": "12",
            "value": "12. RESPONSEIBLE CONSUMPTION AND PRODUCTION"
          })
       }
       
       if(goal == "11"){
        attributes.push({
            "trait_type": "11",
            "value": "11.  SUSTAINABLE CITIES AND COMMUNITIES"
          })
       }

       if(goal == "10"){
        attributes.push({
            "trait_type": "10",
            "value": "10. REDUCED INEQUALITIES"
          })
       }

       if(goal == "09"){
        attributes.push({
            "trait_type": "09",
            "value": "9. INDUSTRY, INNOVATION AND INFRASTRUCTURE"
          })
       }

       if(goal == "08"){
        attributes.push({
            "trait_type": "08",
            "value": "8. DECENT WORK AND ECONOMIC GROWTH",
          })
       }

       if(goal == "07"){
        attributes.push( {
            "trait_type": "07",
            "value": "7. AFFORDABLE AND CLEAN ENERGY"
          })
       }

       if(goal == "06"){
        attributes.push( {
            "trait_type": "06",
            "value": "6. CLEAN WATER AND SANITATION"
          })
       }

       if(goal == "05"){
        attributes.push( {
            "trait_type": "05",
            "value": "5.  GENER EQUAITY"
          })
       }

       if(goal == "04"){
        attributes.push({
            "trait_type": "04",
            "value": "4. QUALITY EDUCATION"
          })
       }
       
       if(goal == "03"){
        attributes.push({
            "trait_type": "03",
            "value": "3. GOOD HEALTH AND WELL-BEING"
          })
       }

       if(goal == "02"){
        attributes.push({
            "trait_type": "02",
            "value": "2. ZERO HUNGER"
          })
       }
       if(goal == "01"){
        attributes.push({
            "trait_type": "01",
            "value": "1. NO POVERTY"
          })
       }

})
    const imageName = project.image.substring(5,project.image.length);

    try{
        res.status(200).json({
            "attributes": attributes,
            "description": project.description,
            "image": "https://esgwall.vercel.app/project/"+imageName,
            "name":  project.topic
          })
    }catch(e){
        console.log("============",e);
        res.status(500).json({message: "failed"});
    }
}
