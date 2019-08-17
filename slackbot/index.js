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

let sheetURL= "1vXkIUtBdVMpEEIyXW_6zpsR_FhEn8YviQ70-2TC0K0Q";
const bot = new SlackBot({
    token: 'xoxb-633436554626-721827870198-Tz4RW6EzlXElYBu05wlsW0po',
    name: 'DogBot',
})
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let groupURL = "https://slack.com/api/groups.list?token=xoxb-633436554626-721827870198-Tz4RW6EzlXElYBu05wlsW0po"

const test = [
    {
        name: 'Foo Bar',

    }
]

app.post('/hello', (req, res) => {// adds info to cvs
    console.log(req.body.text)
    let text = req.body.text;
    split(text);
    bot;

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
            fs.writeFileSync("./source.csv", csv)
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
app.post("/createspreadsheet", (req, res) => {//creates a csv spreadsheet
    heead(req.body.text);
    let text = req.body.text;
    //test(req.body.text)
    bot;

    function heead(str) {
        let newHead = str.split(",");
        const builder = new CsvBuilder({
            headers: newHead,

        })
        builder.createReadStream(test).pipe(fs.createWriteStream('output.csv'));
    }

   
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


app.post("/googletest", function(req,res){
    let text = req.body.text;

    async function accessSpreadsheet(){
        const doc = new GoogleSpreadsheet(sheetURL);
        await promisify(doc.useServiceAccountAuth)(creds);
        const info = await promisify(doc.getInfo)();
        const sheet = info.worksheets[0];
        console.log(`Ttile: ${sheet.title}, Rows: ${sheet.rowCount} `)
    
        const rows = await promisify(sheet.getRows)({
            query: 'homestate = NY'
        });
        
        let addRows = {
        
        }
        addVal(text)
      await promisify(sheet.addRow)(addRows)
    
    function addVal(str) {
        let newVal = str.split(",");
        addRows.studentname= newVal[0];
        addRows.major= newVal[1];
        addRows.homestate= newVal[2];
        addRows.classlevel= newVal[3];
       addRows.extracurricularactivity= newVal[4];
       console.log(addRows)
    }
    
    }
    
    accessSpreadsheet()

    let data = {
        response_type: 'temporary-slack-bot', // public to the channel 
        text: 'new guy added',
    };
    res.json(data);
});

const server = app.listen(3000, () => { console.log('Express server   listening on port %d in %s mode', server.address().port, app.settings.env); });

app.get("/", function (req, res) {
    res.send("welcome to my website" + req.url)
})

app.post("/changeSpreadsheet", function(req,res){
    let text= req.body.text;
    bot;
    
    let newSpreadsheet = (str)=>{
            sheetURL=str; 
       }
newSpreadsheet(text)
       console.log(sheetURL)
    let data = {
        response_type: 'temporary-slack-bot', // public to the channel 
        text: 'spreadsheet changed',
    };
    res.json(data);
});

let ts= ""; 
app.post("/logSheet", function(req,res){
    async function accessSpread(){
        const doc = new GoogleSpreadsheet(sheetURL);   
           debugger;
           await promisify(doc.useServiceAccountAuth)(creds);
           const info = await promisify(doc.getInfo)();
           const sheet = info.worksheets[0];
         console.log(`Ttile: ${sheet.title}, Rows: ${sheet.rowCount} `)
          
           const rows = await promisify(sheet.getRows)({
             offset: 0,
             limit: 1155,
           });
   
           rows.forEach(row => {
            ts= `Name: ${row.studentname} || Gender: ${row.gender} || Major: ${row.classlevel} || State: ${row.homestate} `;
            return ts
        })    
    }    
           let data={
            response_type: 'temporary-slack-bot',
            text: ts
           }
            
accessSpread()


res.json(data)
})