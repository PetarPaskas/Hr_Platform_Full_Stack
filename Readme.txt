<AppImages folder>

This is the folder where app images(swagger, react ui) is stored

<FrontendReact folder>

This is where react ui frontend is stored. 
Before running, don't forget to install node_modules
from package.json with a command:

>npm install

You can start react development server with
a command

>npm run start

which runs package.json "start" npm script.

By default React frontend ui makes http requests on 
"localhost:44394" port. 
If you set your backend to run on another port, you 
go to: 

| ./src/config.json |

and edit "candidatesUrl" and "skillsUrl" to match your port.

<WebApplication1 Folder>

Here you start the backend service for Hr platform web app.
Since it uses code first migrations to Sql Server database
with entity framework, make sure to input:

NuGet> update-database

to bring your database up to date or create the database if
not previously created.

Also CORS is fully enabled. 
You can make any http request to the api.
I've run backend on the 'IIS Express' option in Visual Studio
which starts the backend on port 44394.
Othervise app url is on http://localhost:55316