const axios = require('axios');


exports.homeRouter = (req, res) => {
    //make a get request to /api/users
    axios.get('http://localhost:5454/api/users')
    .then(function (response) {
        console.log(response)
        res.render('index', {Users:response.data});
    })
    .catch(err => {
        res.send(err);
    })
    
}

exports.add_user = (req, res) => {
    res.render('add_user');
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:5454/api/users',{params:{id:req.query.id}})
    .then(function (userdata) {
        res.render('update_user', {UserObj: userdata.data});
    })
    .catch(function (err) {
        res.send(err)
    })
    
}