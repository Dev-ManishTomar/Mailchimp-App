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
			"Authorization":"Mansih 2561daf6c876e4791a96342f9eaa85c3-us20" 
		},
		body: jsonData
	};

	request(options, function(error, response, body){

		if (error || response.statusCode!=200) {

			res.sendFile(__dirname + "/failure.html")
	

		}
		else{
			
			res.sendFile(__dirname + "/success.html")



		}
});
});

app.listen(process.env.PORT || 3000,function(){
	console.log("server is running");
});







// 2561daf6c876e4791a96342f9eaa85c3-us20

// 926fc9d83a