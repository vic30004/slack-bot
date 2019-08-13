const SlackBot = require('slackbots');
const express = require("express");
const request = require('request');
const generate = require('csv-generate')
const CSVToJson = require("csvtojson");
const JSONToCSV = require("json2csv").parse;
const fs = require("fs")
const CsvBuilder = require('csv-builder')
const bodyParser = require('body-parser');
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./client_secret.json');
// CSVToJson().fromFile("./source.csv").then(source => {
//     console.log(source);
//     source.push({
//         "sku": "4312",
//         "title": "Fortnite",
//         "hardware": "Nintendo Switch",
//         "price": "00.00"
//     })
//     const csv= JSONToCSV(source, {fields:["sku","title","hardware","price"]});
//     FileSystem.writeFileSync("./source.csv",csv);
// }); 

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let groupURL = "https://slack.com/api/groups.list?token="

const test = [
    {
        name: 'Foo Bar',

    }
]




app.post('/hello', (req, res) => {
    console.log(req.body.text)
    let text = req.body.text;
    split(text);
    const bot = new SlackBot({
        token: '',
        name: 'DogBot',
    })

    function split(str) {
        let wordsSplit = str.split(',')
        let firstCol = wordsSplit[0];
        let secondCol = wordsSplit[1];
        let thirdCol = wordsSplit[2];

        CSVToJson().fromFile("./source.csv").then(list => {
            list.push({
                "sku": firstCol,
                "title": secondCol,
                "hardware": thirdCol
            })
            const csv = JSONToCSV(list, { fields: ["sku", "title", "hardware"] });
            FileSystem.writeFileSync("./source.csv", csv)
        });
    }
    bot.on("message", (data) => {
        console.log(data)
        if (! /^\d+$/.test(text)) { // not a digit 
            res.send('U R DOIN IT WRONG. Enter a status code like 200!'); return;
        }


    })

    let data = {
        response_type: 'temporary-slack-bot', // public to the channel 
        text: 'woof woof',
    };
    res.json(data);
});

let spreadsheet = {};
app.post("/createspreadsheet", (req, res) => {
    heead(req.body.text);



    let text = req.body.text;
    //test(req.body.text)
    const bot = new SlackBot({
        token: '',
        name: 'DogBot',
    })

    function heead(str) {
        let newHead = str.split(",");
        const builder = new CsvBuilder({
            headers: newHead,

        })
        builder.createReadStream(test).pipe(fs.createWriteStream('output.csv'));
        //   builder.headers.concat(newHead)
    }

    // //function test(str){
    //     let newKeys= str.split(' ');
    //     for (let i=0; i<str.length;i++){
    //         if(newKeys[i] === undefined){
    //             break;
    //         }
    //         spreadsheet[newKeys[i]]="";
    //         generate(spreadsheet).pipe(process.stdout);
    //     }

    //    const csv= JSONToCSV(spreadsheet, {fields:[Object.keys(spreadsheet)]});


    // }
    bot.on("message", (data) => {
        console.log(data)
        if (! /^\d+$/.test(text)) { // not a digit 
            res.send('U R DOIN IT WRONG. Enter a status code like 200!'); return;
        }

    })

    let data = {
        response_type: 'temporary-slack-bot', // public to the channel 
        text: 'creating spreadsheet',
    };
    res.json(data);
})


console.log(spreadsheet)


app.post("/google", function(req,res){
    let text = req.body.text;
    const bot = new SlackBot({
        token: '',
        name: 'DogBot',
    })

    function printStudent(student){
        console.log(`Name: ${student.studentname}`)
        console.log(`Major: ${student.major}`);
         console.log(`State: ${student.homestate}`);
         console.log("=====================================")
    }
    
    async function accessSpreadsheet(){
        const doc = new GoogleSpreadsheet('spreadsheetID');
        await promisify(doc.useServiceAccountAuth)(creds);
        const info = await promisify(doc.getInfo)();
        const sheet = info.worksheets[0];
        console.log(`Ttile: ${sheet.title}, Rows: ${sheet.rowCount} `)
    
        const rows = await promisify(sheet.getRows)({
            query: 'homestate = NY'
        });
        rows.forEach(row => {
            printStudent(row)
        })
        // console.log(rows)
        let addRows = {
        
        }
        addVal(text)
      await promisify(sheet.addRow)(addRows)
    
    function addVal(str) {
        let newVal = text.split(",");
        addRows.studentname= newVal[0];
        addRows.major= newVal[1];
        addRows.homestate= newVal[2];
        addRows.classlevel= newVal[3];
       addRows.extracurricularactivity= newVal[4];
       console.log(addRows)
    }
    
    }
    
    accessSpreadsheet()

    bot.on("message", (data) => {
        console.log(data)
        if (! /^\d+$/.test(text)) { // not a digit 
            res.send('U R DOIN IT WRONG. Enter a status code like 200!'); return;
        }


    })

    let data = {
        response_type: 'temporary-slack-bot', // public to the channel 
        text: 'new guy added',
    };
    res.json(data);
});









const server = app.listen(3000, () => { console.log('Express server   listening on port %d in %s mode', server.address().port, app.settings.env); });
let clientId = "";
let clientSecret = "";

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("listening on port ")
})

app.get("/", function (req, res) {
    res.send("welcome to my website" + req.url)
})

app.post('/hello', function (req, res) {
    // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
    if (!req.query.code) {
        res.status(500);
        res.send({ "Error": "Looks like we're not getting code." });
        console.log("Looks like we're not getting code.");
    } else {
        // If it's there...

        // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
        request({
            url: 'https://slack.com/api/oauth.access', //URL to hit
            qs: { code: req.query.code, client_id: clientId, client_secret: clientSecret }, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }
});
app.post('/command', function (req, res) {
    res.send('Your ngrok tunnel is up and running!');
});


// app.get("/hello",function(req,res){
//     res.send("woof woof")
// })



//Start Handler



//     axios.get(groupURL).then(res =>{
//        let groupId= "" 
//         for(let i=0; i<res.data.groups.length; i++){
//             groupId=res.data.groups[i].name
//         }

//   })



//Error

// bot.on('error', (err) => console.log(err));

//message handler



