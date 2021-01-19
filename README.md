# Project Time Tracker

![language](https://img.shields.io/badge/Language-JavaScript-yellow)
![server](https://img.shields.io/badge/Backend-Node/Express-green)
![database](https://img.shields.io/badge/Database-MongoDB-red)
![auth](https://img.shields.io/badge/Auth-PassportJS-green)


## Description

This is a simple project that allows a User to login/register to the application and then be able to track the time spent per Session working on a particular project from the database. User and Project data are associated to each Session as well as any notes the User wanted to provide when ending the session. Time spent per Session, User and Project associated with Session will be displayed in a Session Table.

[Project Time Tracker](https://#)

&nbsp;

## Usage

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

## Installation

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

&nbsp;

## Deployment

Deployment with Docker and AWS coming

&nbsp; 

## Built With

* [JavaScript]() - Development Language
* [Node](www.nodejs.org) - Backend Sever
* [Express]() - Web framework
* [Handlebars]() - Template View Engine
* [BootstrapCSS]() - CSS Framework
* [MongoDB]() - Database Storage
* [Mongoose]() - Database ORM
* [Passport]() - User Authentication using PassportJS

&nbsp;

## Versioning

Version 1.0

&nbsp;

## Authors

* **Erik Hoversten** - *Backend API and Database Development* - GitHub: [ehoversten](https://github.com/ehoversten)
* **Dan Rosenbaum** - *Frontend and Styling* - GitHub: [drosenbaum5](https://github.com/drosenbaum5)

See also the list of [contributors](https://github.com/ehoversten/Client_time_tracker/graphs/contributors) who participated in this project.

&nbsp;

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details