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

Enviromnet variables:<br>
  MYSQL_HOST - application hostname<br>
  MYSQL_USERNAME - name to access to database<br>
  MYSQL_PASSWORD - password to access to database<br>
  MYSQL_DATABASE - name of database<br>
  MYSQL_PORT - port to access in database<br>
  JWT_SECRET - secret key to authorization<br>
  GOOGLE_CLIENT_ID - id for google client<br>
  GOOGLE_SECRET - secret key to google authorization<br>
  JWT_EXPIRE_TIME - time for while authorization token will be Ok<br>
  SENDGRID_API_KEY - key to application for send message<br>
  RESET_PASSWORD_URL - constant for reset password<br>
  CALLBACK_URL - url for redirect<br>
  CLEARDB_DATABASE_URL - url for clear database<br>
  GOOGLE_AUTH - url for google auth<br>
  PORT - default port<br>
  

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

  user<br>
    id - integer, primary key of entity<br>
    email - varchar, user email<br>
    password - varchar, user password<br>
    googleId - varchar, user googleId for google auth<br>
    role - enum, role for freelancer or client<br>
    firstName - varchar, user first name<br>
    lastName - varchar, user last name<br>
    phone - varchar, user phone<br>
    userId - integer, id to relations with profile entity<br>
    
  profile<br>
    id - integer, primary key of entity<br>
    position - varchar, user position<br>
    price - integer, price for work<br>
    englishLevel - enum, ('Pre_intermediate','Intermediate','Upper_intermediate')<br>
    description - varchar, description of work<br>
    categoryId - integer, id to relations with category entity<br>
    userId - integer, id to relations with user entity<br>
    photo - longtext, photo of profile<br>

  education
    id - integer, primary key of entity<br>
    description - varchar, description of education<br>
    startDate - datetime, time of start education<br>
    endDate - datetime, time of end education<br>
    profileId - integer, id to relations with profile entity<br>

  experience
    id - integer, primary key of entity<br>
    description - varchar, description of experience<br>
    startDate - datetime, time of start experience<br>
    endDate - datetime, time of end experience<br>
    profileId - integer, id to relations with profile entity<br>

  favourite
     id - integer, primary key of entity<br>
     saved - tinyint, true or false<br>
     clientId - integer, id of client<br>
     freelancerId - integer, id to relations with profile entity<br>
  
  category
    id - integer, primary key of entity<br>
    name - varchar, name of category<br>

  clientSettings
    id - integer, primary key of entity<br>
    name - varchar, name of client<br>
    country - varchar, client country<br>
    website - varchar, website of client<br>
    industry - varchar, client industry<br>
    quantity - varchar, client quantity<br>
    description - varchar, client description<br>
    userId - integer, id to relations with user entity<br>

  forgot_password
    id - integer, primary key of entity<br>
    link - varchar, link for restore password<br>
    userId - integer, id to relations with user entity<br>
  
  invite_talent
    id - integer, primary key of entity<br>
    message - varchar, message for invite talent<br>
    clientId - integer, id of client<br>
    freelancerId -integer, id of freelancer<br>
    profileId - integer, id to relations with profile entity<br>
    jobPostId - integer, id of job post<br>
    jobTitle - varchar, title of the job<br>

  job_post
    id - integer, primary key of entity<br>
    jobTitle - varchar, title of job post<br>
    fromHourRate - integer, time from start job<br>
    toHourRate - integer, time to end job<br>
    jobDuration - varchar, duration of the job<br>
    jobDescription - varchar, decriptiob of the job<br>
    userId - integer, id to relations with user entity<br>
    dateTime - timestamp, time when job posted<br>
    jobCategoryId - integer, id to relations with category entity<br>

  offer
    id - integer, primary key of entity<br>
    price - integer, price of offer<br>
    status - tinyint, true or false<br>
    name - varchar, name of offer<br>
    startDate - datetime, start time<br>
    endDate - datetime, end time<br>
    freelancerId - integer, id of freelancer<br>
    jobPostId -  - integer, id of job post<br>

  proposal
    id - integer, primary key of entity<br>
    jobPost - integer, id of job post<br>
    userId - integer, id of user<br>
    price - integer, price of proposal<br>
    message -varchar, message of proposal<br>
    clientId  - integer, id of client<br>

  skills
    id - integer, primary key of entity<br>
    name - varchar, name of the skill<br>
