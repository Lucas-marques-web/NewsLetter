
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { post } = require('request');


const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {

    res.sendFile(__dirname + '/failure.html')

})

app.post('/', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    console.log(name,email);


    // an example of object
    const data ={
        members:[
            {
                email_adress:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: name
                }
            }
        ]
    }
    // transform the object to json 
    const jsonData = JSON.stringify(data);


    const url ="https://us14.api.mailchimp.com/3.0/lists/57afe96172";
    const options ={
        method:post,
        auth:"lucas:7070fe972d9795c71c42236c7f3447ef-us14"
    };
   const request= https.request(url, options ,function(response){
        response.on('data',function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

// api key
// 7070fe972d9795c71c42236c7f3447ef-us14

app.post('/failure',function(req,res){
res.redirect('/');
})








app.listen(3000, function () {
    console.log('server running on port 3000');
})