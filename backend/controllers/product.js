import product from "../models/product.js";

const products=async(req,resp)=>{
    try{
        const allproduct=await product.find({});
      
            if(!allproduct){
                return resp.json({messgae:"not found anything"})
            }
            resp.json(allproduct);
        
    }catch(err){
        resp.status(500).json({message:"Server Error"})
    }
}
const getproduct=async(req,resp)=>{
    try{
        
        const Product=await product.findOne({_id:req.params.id});
          console.log(Product)
            if(!Product){
                return resp.json({messgae:"not found anything"})
            }
            resp.json(Product);
        
    }catch(err){
        resp.status(500).json({message:"Server Error"})
    }
}
const createproduct=async(req,resp)=>{
    try{
        const {name,description,price,category} = req.body;
        if(!name || !description || !price || !category){
            return resp.status(400).json({message:"All fields are required"});
        }
        

        const existingProduct=await product.findOne({name});
      
        if(existingProduct){
            return resp.status(400).json({message:"Product already exists"});
        }
        
        if(req.file){
            // Handle file upload logic here
            var image=req.file.path;

        }
        const newProduct = new product({name,description,price,category,image});
         console.log(req.file);
        await newProduct.save();
         console.log(req.file);
        resp.status(200).json(newProduct);
    } catch (err) {
        resp.status(500).json({message:"Server Error"});
    }
}


const updateproduct=async(req,resp)=>{
    try{
        const {name,description,price,category} = req.body;
        if(!name || !description || !price || !category){
            return resp.status(400).json({message:"All fields are required"});
        }
     
    //    const prod=await product.findById(req.params.id);
         
        if(req.file){
            // Handle file upload logic here
            var image=req.file.path;

        }    
 await product.findByIdAndUpdate(req.params.id,{name,description,price,category,image});
    
        resp.status(200).json({message:"product updated"});
    } catch (err) {
        resp.status(500).json({message:"Server Error"});
    }
}
const deleteproduct=async(req,resp)=>{
    try{
        const p=await product.findByIdAndDelete(req.params.id)
        return resp.status(200).json(p);

    }
    catch (err) {
        resp.status(500).json({message:"Server Error"});
    }
}

export{products,getproduct,createproduct,updateproduct,deleteproduct};
