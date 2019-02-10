# dbAssignment2

To run this project you need to have NodeJS installed (can be downloaded from this link: https://nodejs.org/en/) 10.5.1 LTS is the prefered version. You must have a running Docker container, either locally or in a virtual mashine. You can follow the guide from the assignment in the hint sections in the buttom of the page: https://github.com/datsoftlyngby/soft2019spring-databases/blob/master/lecture_notes/02-Intro_to_MongoDB.ipynb


Git clone this project to your computer. Then, either in your terminal or IDE, run the command 'npm install' in the directory to install the missing modules required to run the project. Afterwards the API can be started by using the command 'node index.js' in the root of the project folder. If everything went well you should be greeted with a message saying we are up and running. 
By default the project expects your Docker container to run locally, so if you are running it in a virtual mashine you need to change const dockerAdress = 'localhost' in index.js to the ip of your virtual mashine.


The following API-endpoints are available:

/usercount 
/mostlinks 
/mostmentioned 
/mostactive 
/mostnegative 
/mostpositive

You can see the results by using a browser such as Chrome, FireFox and so on, or use a program such as Postman (https://www.getpostman.com) to make the GET calls.
