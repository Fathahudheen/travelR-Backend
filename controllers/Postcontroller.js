const Post = require('../models/Postmodel'); 
const createPost = async(req,res)=>{
 
try{

const post  = new Post({
    title:req.body.title,
    date:req.body.date,
    image:req.file.filename
});

const postData = await post.save(); 
res.status(200).send({success:true,msg:'Posted data',data:postData});


} catch(error){
    res.status(400).send({success:false,msg:error.message});
}

}

module.exports = {
    createPost
}