const express = require('express');
const router = express.Router();
const person = require('./../models/person');


router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newPerson = new person(data); 
        const response = await newPerson.save();
        console.log('data saved')
        res.status(200).json(response);    
   } catch (err) {
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
   }
});

router.get('/', async (req, res) => {
    try {
       const data = await person.find();   
       console.log('data fetched')
        res.status(200).json(data); 
   } catch (err) {
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
   }
})

router.get('/:workType', async(req, res)=>{
    try{
        const workType = req.params.workType;
        if (workType== 'Chef'|| workType == 'Waiter'|| workType == 'Manager'){
            const response = await person.find({work:workType});
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
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true,
            runValidators: true,
        })
        if(!response){
            return res.status(404).json({error:"Person not found"});
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
        const personId = req.params.id;
        const deletePerson = req.body;
        const response = await person.findByIdAndDelete(personId, deletePerson,{
            new: true,
            runValidators: true,
        })
        if(!response){
            return res.status(404).json({error:"Person not found"});
        }
        console.log('data deleted');
        res.status(200).json({message:'Person deleted successfully'});
    }catch(err){
        console.log(err);
    res.status(500).json({error:'Internal Server Error'});
    }
})  

module.exports = router;