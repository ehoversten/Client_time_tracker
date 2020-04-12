# Project Time Tracker

## Overview 
This is a simple project that allows a User to login/register to the application and then be able to track the time spent per Session working on a particular project from the database. User and Project data are associated to each Session as well as any notes the User wanted to provide when ending the session. Time spent per Session, User and Project associated with Session will be displayed in a Session Table.

### Functionality

A User Can: 
* Register
* Login
* Is Authorized to View protected routes
    * Clients
    * Projects
    * Sessions

A Project Can: 
* Be Created 
* Be Deleted
* Be associated to a specified Client
* Be associated to a Team (specified Users)

A Client Can:
- Be Created
- Be Deleted
* Be associated to a list of Projects

A Session Can:
- Be Created
- Be Deleted
* Keep track of Date of session
* Keep track of Duration of session
* Keep track of User_id of session
* Keep track of Project_id of session

&nbsp;


# 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Start by cloning the project Repo

```bash
$> git clone https://github.com/ehoversten/Client_time_tracker.git
```

Install project dependencies

```javascript
$> cd Client_time_tracker

$> npm install
// OR using YARN
$> yarn install
```

Run the application locally 
```javascript
$> npm run start
```
#

 
## Deployment

Deployment with Docker and AWS coming

&nbsp; 

## Built With

* [JavaScript]() - Development Language
* [Node](www.nodejs.org) - Backend Sever
* [Express]() - Web framework
* [Handlebars]() - Templating Engine
* [MaterializeCSS]() - CSS Framework
* [MongoDB]() - Database Storage
* [Mongoose]() - Database ORM
* [Passport]() - User Authentication using PassportJS


## Versioning

Version 1.0

## Authors

* **Erik Hoversten** - *Initial work* - GitHub: [ehoversten](https://github.com/ehoversten)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details