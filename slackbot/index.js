const SlackBot= require('slackbots');
const dogNames= require('dog-names')
const dogBreed= require('dog-breeds');
const express= require("express");
const localtunnel = require('localtunnel');
const app= express();

const axios = require('axios');

let randomDogName= dogNames.allRandom();
let randomgDogBreed= dogBreed.random();
let breedAndPic= randomgDogBreed.name + randomgDogBreed.imageURL
let groupURL= "https://slack.com/api/groups.list?token=xoxb-633436554626-721827870198-de1kV0cj8jykMdJ1J9iyZDgD&pretty=1"




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started")
})

app.get("/", function(req,res){
    res.send("welcome to my website")
})

app.get("/hello",function(req,res){
    res.send("woof woof")
})

const bot = new SlackBot({
    token: 'xoxb-633436554626-721827870198-OQ21tQUUgCqnNBYhjgy60Rwj',
    name: 'DogBot',
})

//Start Handler


    
//     axios.get(groupURL).then(res =>{
//        let groupId= "" 
//         for(let i=0; i<res.data.groups.length; i++){
//             groupId=res.data.groups[i].name
//         }
   
//   })



//Error

bot.on('error', (err) => console.log(err));

//message handler

let spreadSheetData= {
    name:"",
    major:""
}

bot.on('message', (data) => {
    if(data.type !== 'message'){
        return;
    }
    console.log(data)
    if(data.text.includes("<@UM7QBRL5U> yes")){
        bot.postMessageToChannel(
            "temporary-slack-bot",
            'Great, lets get started,'
        )
        
    }   

app.get("/hello", function(req, res){
    res.send("Hello")
})
    
    

});

