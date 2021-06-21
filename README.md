# Task Manager
Full stack web project with Node REST api as back-end and React as front-end. Just a simple web application where employers can assign tasks to their employees.

## What is it?
The project itself is a task manager with **two main roles:** *Employer and Employee*. Also, there is the Admin role, but it's more about general things, such as: creating new users, new relationships between an employee and an employer, changing users password, etc.

### What is the Task?
The Task is just a simple object that **have task text, four states:** *To do, in progress, done, finished*, **and two dates:** *Creating and updating date*. When anyone changes the state, the Updating Date renews automatically. Also, tasks' list might be filtered by State or sorted by *Date or Alphabetical order*.   

### Who is the Employer?
The Employer can see all employees which they have and **all user's tasks which employees have** *(even if the task was made by another employer)*. Moreover, the Employer can change state only for tasks that was made by themselves. Employer can set any task state.

### Who is the Employee?
The Employee can see all the tasks assigned to them and **change tasks' state only between** *in progress* and *done*.

### Who is the Admin?
The Admin **can see all users and data** that they have, *but the data (e.g. task) can't be changed by admin*. **Admin can create only general things**: *New Relationships and Users*. Also, admin can change users passwords.

## What does this project use?
This project uses:
* RESTful API builded in Node JS with Express.
* MongoDB as a database for all data.
* React front end web application. 

## How to run?
*You must have Node Package Manager and MangoDB.* 
The project **requires** some setup before use. 
1. You need to **create .env file inside backend folder.**
  * You need to set up these variables inside .env file:
    * Server - *PORT*
    * Link to your mongo db - *DB_CONNECT*
    * Jwt secret key - *JWT_SECRET*
    * And origin of your client for CORS - *CLIENT_ORIGIN* (This is a temporary cludge. I'm trying to fix it ASAP).
2. You need to set your backend *API_URL* in **Frontend/src/config.json**
3. You need to create admin account:
  * There is no easy way to create the initial Admin account. You should go to **Backend/routes/admin.js** file, find **'/createUser' POST** router, remove *verifytoken* and *isAdmin* middleware and send post request to create new Admin account, for example via Postman app. *(Don't forget to return these middlewares after creating the account)*.
4. When the admin account is created, you can use this account inside React web app to create new users and relationships.
