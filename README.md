# Readme:

## Instal
1) Install node.js (https://nodejs.org/en/download/) !!! v7.0 + required !!! 
2) Install Firebase Tools (```npm install -g firebase-tools```)
3) Log In/ Create Firebase account (https://firebase.google.com/)
4) Go to Console and Create a new project;
5) ```git clone https://github.com/rihardc/chat-project.git```
6) Login into Firebase (```firebase login```) 
7) Init Firebase (```firebase init```) and select "Database", "Functions" and "Hosting" (select with space)
8) Select a project you just created
9) For database.rules select default, do not overwrite
10) Do not owerwrite any files, just install dependencies with npm, when asked.
11) Use current directory as public directory (```.```)
12) Do not configure as a single page app (```N```) when asked.
13) Do not overwrite 404 or index.html

## Setting up the server:
14) Deploy database, hosting, functions (```firebase deploy```) (it's going to take a while);
15) Start firebase server (```firebase serve```) (if firebase returns an error, try ```firebase serve -p 5000 -o 127.0.0.1```)

## Testing
Open ```localhost:5000```, allow notifications when asked;

Open your firebase hosting URL (you can find it in terminal), something like: [project-name].firebaseapp.com/, allow notifications there.

Start chatting/receiving notifications by posting messages on both tabs;

