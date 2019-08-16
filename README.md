# slack-bot

Table of Contents 
1. File structure
2. Project Scope
3. Purpose
4. Goals
5. Collaborators

I. File Structure
--------slackbot--------------

1)----Index.html

2)----Index.js

3)----Package-lock.json

4)----Package.json

5)\NOT INCLUDED\Client_secret.json\NOT INCLUDED\

6)------Node_modules-----

7) various depedency files... Too many to list
  -------------------------------------------------------------------------
1) Index.html <== This is the dashboard that pull data from the slack-bot

2) Index.js <== This is the "Brain" of the slack-bot, all the logic that the slack-bot uses is written here, all the api's
  are tied together in this code and the depedencies that Node.js needs to pull together are listed. Some API keys reside 
  here as well. Basically without this file nothing would work. 
  
3) Package-lock.json <== an automactically generated file that describes the extact tree that was created when package.json
   or the node is modified.
   
4) Package.json <== a json file that includes cool things like a list of depedencies need, the name of the applciation, the 
  author and even the licesnse needed 
  
5) Client_secret.json <== a json file that includes important key ID and Auth credentials needed for acess to google sheet, 
   you must creat you own json file by accessing your google drive api options. THIS IS NOT OPTIONAL
   
6) Node_Modules <== a folder full of the node modules needed for the app to run, it is still likely that you will have to npm 
  install all of the dependecies listed at the start of the index.js file for the app to run.
  
 WEB COMPONENTS \You will need to visit the Slack API to create your own app and intergrate the slash commands used in index.js\
  
II. Project scope 

The scope of this project was to work with slack's api, node.js, express, and google's sheets api to create a working slackbot.
The goal of the project was for the slack bot to be able to read and write to a specified google sheet via slack commands. We 
needed to use ngrock to host a server for this as slacks api requires https in order to utilize slack commands. We also ended up installing several dependecies including a edit-google sheets api dependency for node.js to simplify that slackbots interaction 
with google sheets. If we were to continue with project we would likely remove this depedency and rewrite code in favor of using 
just the google sheets api, as it offers more flexiablity (but is far less readable). 

III. Purpose

The purpose of this project is to test the interactions between API's in more active settting. Instead of using a static webpage, we chose to use a dynamic platform (slack) to showcase those interactions. Because both slack and gsuite are becomming basic tools of 
daily buisness life it made sense to combine them. Many companies use slack for basic communications between co-workers, superiors and inferiors, and schedulers. These companies often use google sheets to create schedules for both shifts and vacation, often limiting access to said sheet for fear of mishaps. This can create anxiety among employees that often just want to make sure they know when they are scheduled, or be sure that their vacation has been inputed correctly. Using a tool like the slack-bot app can remedy a lot of that anxiety. Employees can rest easy knowing that their request is automactically appeneded to google sheets file and can easily access a work schedule by just requesting it from the slack-bot. 

IV. Goals

The goal of this project is to create a working slack bot that can except inputs via slack commands to
A) generate cells on a predetermined google sheet
B) read cells on a predetermiend google sheet
C) use slash commands to address the user directly (not rely on post to channel)
D) utilize an html dashboard to output important information

V. Collaborators

Raciel Diaz <== wireframe

Andrew Tocchi <== readme file, early research on slackbots api

Victor Abu Akleh <== Node.js coding, express coding, slackbot logic

R.J. Tigalo <== Dashboard including CSS and JS 
