import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({ success: true, message: "New food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listFood = async (req, res) => {
  try {
    const food = await foodModel.find({});
    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.json({success:false, message:'Error'})
  }
};

const deleteFood = async(req, res) =>{
    try {
        let food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, ()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:'food deleted'})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: 'Error'})
    }
}

export { addFood, listFood, deleteFood};
