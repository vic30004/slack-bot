const SlackBot= require('slackbots');
const dogNames= require('dog-names')
const dogBreed= require('dog-breeds')

const axios = require('axios');

let randomDogName= dogNames.allRandom();
let randomgDogBreed= dogBreed.random();
let breedAndPic= randomgDogBreed.name + randomgDogBreed.imageURL
let groupURL= "https://slack.com/api/groups.list?token=xoxb-633436554626-721827870198-de1kV0cj8jykMdJ1J9iyZDgD&pretty=1"




const bot = new SlackBot({
    token: 'xoxb-633436554626-721827870198-de1kV0cj8jykMdJ1J9iyZDgD',
    name: 'DogBot',
})

//Start Handler

bot.on("start", ()=> {
    
//     axios.get(groupURL).then(res =>{
//        let groupId= "" 
//         for(let i=0; i<res.data.groups.length; i++){
//             groupId=res.data.groups[i].name
//         }
   
//   })

    const params={
       icon_emoji: ':dog2:' 
    }
    bot.postMessageToChannel(
        "general",
        `Woof Woof, My name is ${randomDogName} and I'm a ${breedAndPic}`,
        params
    );
});

//Error

bot.on('error', (err) => console.log(err));

//message handler

bot.on('message', (data) => {
    if(data.type !== 'message'){
        return;
    }
    console.log(data);
});

