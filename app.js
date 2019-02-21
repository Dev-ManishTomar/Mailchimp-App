const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res){
	res.sendFile(__dirname + "/sign_up.html")
})

app.post("/", function(req, res){

	var firstName = req.body.fName;
	var secondName = req.body.sName;
	var email = req.body.email;


	var data={
		members:[
		{
			email_address:email,
			status:"subscribed",
			merge_fields:{
				FNAME:firstName,
				LNAME:secondName
			}
		}
	  ]
	};

	var jsonData=JSON.stringify(data);

	var options = {
		url:"https://us20.api.mailchimp.com/3.0/lists/926fc9d83a",
		method: "POST",
		headers:{
			"Authorization":"Mansih a45291e0a91117566a29b13eeb3d54e1-us20" 
		},
		body: jsonData
	};

	request(options, function(error, response, body){

		if (error) {
			console.log("error");
		}
		else{
			console.log(response.statusCode);
		}
});
});

app.listen(3000,function(){
	console.log("server is running");
});







// a45291e0a91117566a29b13eeb3d54e1-us20

// 926fc9d83a