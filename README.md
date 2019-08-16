# slack-bot

Table of Contents 
1. File structure
2. Project Scope
3. Purpose
4. Goals
5. collaborators

I. File Structure

--------slackbot--------------

1)----Index.html

2)----Index.js

3)----Package-lock.json

4)----Package.json

5)<NOT INCLUDED>Client_secret.json<NOT INCLUDED>
  
6)------Node_modules-----

<various depedency files... Too many to list>
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
 WEB COMPONENTS <You will need to visit the Slack API to create your own app and intergrate the slash commands used in index.js>
  
  II. 
