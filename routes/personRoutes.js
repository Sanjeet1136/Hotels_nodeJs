const express = require('express');
const router = express.Router();
const person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');


router.post('/signup', async (req, res) => {
    try {
        const data = req.body
        const newPerson = new person(data); 
        const response = await newPerson.save();
        console.log('data saved')

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is :", token);
        res.status(200).json({response:response, token:token});    
   } catch (err) {
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
   }
});

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await person.findOne({username:username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid username or password"});
        }
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);
        res.json({token});  
   } catch (err) {
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
   }
})

router.get('/profile',jwtAuthMiddleware, async (req, res)=> {
try {
    const userData = req.user;
    console.log("User Data:", userData);

    const userId = userData.id;
    const user = await person.findById(userId);
    res.status(200).json({user});
}catch(err) { 
    console.error(err); 
    res.status(500).json({error:'Internal Server Error'});
}
})
router.get('/',jwtAuthMiddleware, async (req, res) => {
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