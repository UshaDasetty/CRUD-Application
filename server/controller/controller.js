const UserModel = require('../model/model')

// create and save a new user 
exports.create = (req,res) => {

    // validate request
    if(!req.body){
        res.status(400).send({message:"content cannot be empty!!!"});
        return;
    }

    // new User
    const UserObj = UserModel({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save user in the database
    UserObj
    .save(UserObj)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a create operation"
        });
    });
}


//retrieve and return all users & retrieve and return single user 
exports.Return = (req,res) => {
    
        // retrive and return single user
    if(req.query.id){
        const id = req.query.id;

        UserModel.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message:`Not found user with id ${id}`}); 
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message:`Error retrieving user with id ${id}`})
        })

        // retrive and return all users
    }else{
        UserModel.find()
        .then(UserObj => {
            res.send(UserObj)
        })
        .catch(err => {
            res.status(500).send({message:err.message || "Error occured while retrieving user informatio"});
        })
    }
    
}


//Update a new identified user by user id
exports.update = (req,res) => {
    if(!req.body){
        res.status(400).send({message:"Data to update cannot be empty!!!"});
        return;
    }

    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
    .then(data => {
        if(!data){
            res.status(400).send({message:`Cannot Update user with ${id}. Maybe User not found`});  
        }else{
            res.send(data);
        }
    })
    .catch(err => {
        res.status(400).send({message:"Error Update user information"});
    })
}


//Delete a user with specified user id in the request
exports.delete = (req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(400).send({message:`Cannot delete user with ${id}. Maybe id is wrong`});  
        }else{
            res.send({message:`User with id ${id} was deleted successfully`});
        }
    })
    .catch(err => {
        res.status(400).send({message:`Cannot delete user with id ${id}`});
    })
}