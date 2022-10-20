## Description

Get Job is website for freelancers and clients that meets the needs of everyone in finding work and providing work

## Installation

```bash
$ npm install
```
## Prepearing

```bash
$ cp .env.example .env
```
Do not forget to setup configuration files (.env)

Enviromnet variables:
  MYSQL_HOST - application hostname
  MYSQL_USERNAME - name to access to database
  MYSQL_PASSWORD - password to access to database
  MYSQL_DATABASE - name of database
  MYSQL_PORT - port to access in database
  JWT_SECRET - secret key to authorization
  GOOGLE_CLIENT_ID - id for google client
  GOOGLE_SECRET - secret key to google authorization
  JWT_EXPIRE_TIME - time for while authorization token will be Ok
  SENDGRID_API_KEY - key to application for send message
  RESET_PASSWORD_URL - constant for reset password
  CALLBACK_URL - url for redirect
  CLEARDB_DATABASE_URL - url for clear database
  GOOGLE_AUTH - url for google auth
  PORT - default port
  

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## REST API Documentation

Link for documentation https://devs-heads.herokuapp.com/api/docs

Link for downloading documentation https://devs-heads.herokuapp.com/api/docs-json


## Database

Entities:

  user
    id - integer, primary key of entity
    email - varchar, user email
    password - varchar, user password
    googleId - varchar, user googleId for google auth
    role - enum, role for freelancer or client
    firstName - varchar, user first name
    lastName - varchar, user last name
    phone - varchar, user phone
    userId - integer, id to relations with profile entity
    
  profile
    id - integer, primary key of entity
    position - varchar, user position
    price - integer, price for work
    englishLevel - enum, ('Pre_intermediate','Intermediate','Upper_intermediate')
    description - varchar, description of work
    categoryId - integer, id to relations with category entity
    userId - integer, id to relations with user entity
    photo - longtext, photo of profile

  education
    id - integer, primary key of entity
    description - varchar, description of education
    startDate - datetime, time of start education
    endDate - datetime, time of end education
    profileId - integer, id to relations with profile entity

  experience
    id - integer, primary key of entity
    description - varchar, description of experience
    startDate - datetime, time of start experience
    endDate - datetime, time of end experience
    profileId - integer, id to relations with profile entity

  favourite
     id - integer, primary key of entity
     saved - tinyint, true or false
     clientId - integer, id of client
     freelancerId - integer, id to relations with profile entity
  
  category
    id - integer, primary key of entity
    name - varchar, name of category

  clientSettings
    id - integer, primary key of entity
    name - varchar, name of client
    country - varchar, client country
    website - varchar, website of client
    industry - varchar, client industry
    quantity - varchar, client quantity
    description - varchar, client description
    userId - integer, id to relations with user entity

  forgot_password
    id - integer, primary key of entity
    link - varchar, link for restore password
    userId - integer, id to relations with user entity
  
  invite_talent
    id - integer, primary key of entity
    message - varchar, message for invite talent
    clientId - integer, id of client
    freelancerId -integer, id of freelancer
    profileId - integer, id to relations with profile entity
    jobPostId - integer, id of job post
    jobTitle - varchar, title of the job

  job_post
    id - integer, primary key of entity
    jobTitle - varchar, title of job post
    fromHourRate - integer, time from start job
    toHourRate - integer, time to end job
    jobDuration - varchar, duration of the job
    jobDescription - varchar, decriptiob of the job
    userId - integer, id to relations with user entity
    dateTime - timestamp, time when job posted
    jobCategoryId - integer, id to relations with category entity

  offer
    id - integer, primary key of entity
    price - integer, price of offer
    status - tinyint, true or false
    name - varchar, name of offer
    startDate - datetime, start time
    endDate - datetime, end time 
    freelancerId - integer, id of freelancer
    jobPostId -  - integer, id of job post

  proposal
    id - integer, primary key of entity
    jobPost - integer, id of job post
    userId - integer, id of user
    price - integer, price of proposal
    message -varchar, message of proposal
    clientId  - integer, id of client

  skills
    id - integer, primary key of entity
    name - varchar, name of the skill