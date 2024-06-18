const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menuItem');


router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newMenu = new MenuItem(data); 
        const response = await newMenu.save();
        console.log('data saved')
        res.status(200).json(response);    
   } catch (err) {
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
   }
});

router.get('/', async (req, res) => {
    try {
       const data = await MenuItem.find();   
       console.log('data fetched')
        res.status(200).json(data); 
   } catch (err) {
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
   }
})

router.get('/:taste', async(req, res)=>{
    try{
        const taste = req.params.taste;
        if (taste== 'sweet'|| taste == 'spicy'|| taste == 'sour'|| taste== 'crunchy'){
            const response = await MenuItem.find({taste:taste});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid Work Type'});
        }
    }catch(err){
        console.log(err);
    res.status(500).json({error:'Internal Server Error'});
    }
})

router.put('/:id',async (req, res)=>{
    try{
        const menuId = req.params.id;
        const updatedMenuData = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData,{
            new: true,
            runValidators: true,
        })
        if(!response){
            return res.status(404).json({error:"Item not found"});
        }
        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
    res.status(500).json({error:'Internal Server Error'});
    }
})  

router.delete('/:id',async (req, res)=>{
    try{
        const menuId = req.params.id;
        const deleteMenu = req.body;
        const response = await person.findByIdAndDelete(menuId, deleteMenu,{
            new: true,
            runValidators: true,
        })
        if(!response){
            return res.status(404).json({error:"Item not found"});
        }
        console.log('data deleted');
        res.status(200).json({message:'Menu deleted successfully'});
    }catch(err){
        console.log(err);
    res.status(500).json({error:'Internal Server Error'});
    }
})  

module.exports = router;