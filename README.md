# Proyect-2-Backend
## Description
Second project Reboot Academy --> \\ Canaryjob API \\ <--

This is an API allow the management of search job offers, courses and workers.
Idea of this project is to promote work in the Canary Islands, since it is difficult to find a job 

## Technologies
JS,
Node,
MongoDB,
Express


## How Install
Run npm install in your console and wait a few seconds.

# DATA MODELS

## ADMINS

| KEY           | TYPE         | REFERENCE | REQUIRED | VALIDATION     |
|------------   |--------------|-----------|----------|----------------|
| username      | String       |           | YES      |                |
| password      | String       |           | YES      |                |
| pass_admin    | String       |           | YES      |                |
| admin         | Boolean      |           | NO       |                |

## USERS

| KEY           | TYPE         | REFERENCE | REQUIRED | VALIDATION     |
|------------   |--------------|-----------|----------|----------------|
| name          | String       |           | YES      | MinLength      |
| lastName      | String       |           | YES      | MinLength      |
| email         | String       |           | YES      | Unique         |
| password      | String       |           | YES      |                |
| birthDate     | Date         |           | YES      |                |
| city          | String       |           | NO       |                |
| description   | String       |           | NO       |                |
| socialMedia   | Array        |           | NO       |                |
| experience    | Array        |           | NO       |                |
| studies       | Array        |           | NO       |                |

## OFFERS

| KEY         | TYPE         | REFERENCE | REQUIRED | VALIDATION     |
|-------------|--------------|-----------|----------|----------------|
| title       | String       |           | YES      | MinLength      |
| description | String       |           | YES      |                |
| company     | [ ObjectId ] | Companies | YES      |                |
| position    | String       |           | YES      |                |
| salary      | Object       |           | NO       |                |
| applicants  | Array        |           | NO       |                |

## COMPANIES

| KEY         | TYPE         | REFERENCE | REQUIRED | VALIDATION     |
|-------------|--------------|-----------|----------|----------------|
| name        | String       |           | YES      | MinLenght      |
| email       | String       |           | YES      | Unique         |
| password    | String       |           | YES      | MinLenght      |
| description | String       |           | NO       |                |
| island      | String       |           | YES      |                |
| address     | String       |           | NO       |                |
| sector      | Array        |           | YES      |                |
| socialMedia | Array        |           | NO       |                |
| offers      | Array        |           | NO       |                |

## COURSES

| KEY         | TYPE         | REFERENCE | REQUIRED | VALIDATION     |
|-------------|--------------|-----------|----------|----------------|
| title       | String       |           | YES      | MinLenght      |
| description | String       |           | YES      |                |
| company     | [ ObjectId ] | Companies | YES      |                |
| type        | String       |           | YES      |                |
| area        | Array        | Skill     | YES      |                |
| duration    | String       |           | YES      | REGEXP         |
| certifited  | Boolean      |           | YES      |                |
| price       | Number       |           | YES      |                |
| registered  | Array        | Users     | NO       |                |

## SKILLS

| KEY         | TYPE         | REFERENCE | REQUIRED | VALIDATION     |
|-------------|--------------|-----------|----------|----------------|
| name        | String       |           | YES      | MinLenght      |
| count       | Number       |           | YES      | MinLenght      |


----------------------------------------------------------------------

## ADMINS ENDPOINTS ##

| METHOD | URL                                  | AUTH | FUNCTION                     |
|--------|--------------------------------------|------|------------------------------| 
| GET    | '/admin/users'                       | YES  | Get all Users                | 
| GET    | '/admin/companies'                   | YES  | Get all Companies            | 
| GET    | '/admin/offers'                      | YES  | Get all your Offers          |
| GET    | '/admin/courses'                     | YES  | Get all your Courses         |
| POST   | '/admin                              | YES  | New Admin                    |
| POST   | '/admin/users'                       | YES  | New user                     |
| POST   | '/admin/companies'                   | YES  | New Company                  |
| POST   | '/admin/offers'                      | YES  | New Offer                    |
| POST   | '/admin/courses'                     | YES  | New Course                   |
| PUT    | '/admin/users/:userId'               | YES  | Edit User                    |
| PUT    | '/admin/companies/:companyId'        | YES  | Edit Company                 |
| PUT    | '/admin/offers/:offerId'             | YES  | Edit Offer                   |
| PUT    | '/admin/offers/:offerId/suscribe'    | YES  | Suscribe an user in Offer    |
| PUT    | '/admin/offers/:offerId/unsuscribe'  | YES  | Unsuscribe an user in Offer  |
| PUT    | '/admin/courses/:courseId'           | YES  | Edit Course                  |
| PUT    | '/admin/courses/:courseId/suscribe'  | YES  | Suscribe an user in Course   |
| PUT    | '/admin/courses/:courseId/unsuscribe'| YES  | Unsuscribe an user in Course |
| DELETE | '/admin/users/:userId'               | YES  | Delete User                  |
| DELETE | '/admin/offers/:offerId'             | YES  | Delete offer                 |
| DELETE | '/admin/courses/:courseId'           | YES  | Delete Course                |
| DELETE | '/admin/companies/companyId'         | YES  | Delete current company acc.  |

## AUTHENTICATION ENDPOINTS ##

| METHOD | URL            | AUTH | FUNCTION                             |
|--------|----------------|------|--------------------------------------|
| POST   | '/auth/signup' | NO   | Create a new account User/Company    |
| POST   | '/auth/login'  | NO   | Authenticate a User/Company          |

## USERS ENDPOINTS ##

| METHOD | URL                                 | AUTH | FUNCTION                           |
|--------|-------------------------------------|------|------------------------------------|
| GET    | '/offers'                           | NO   | Get Job Offers                     |
| GET    | '/offers?'                          | NO   | Get Job Offers filter              |
| GET    | '/companies                         | NO   | Get Companies                      |
| GET    | '/companies?                        | NO   | Get a Companie filter              |
| GET    | '/courses'                          | NO   | Get Courses                        |
| GET    | '/courses?'                         | NO   | Get a Course filter                |
| PUT    | '/users'                            | YES  | Edit User profile                  |
| PUT    | '/courses/:courseId/suscribe'       | YES  | Suscribe logged user in a course   |
| PUT    | '/courses/:courseId/unsuscribe'     | YES  | Unsuscribe logged user in a course |
| PUT    | '/offers/:offerId/suscribe'         | YES  | Suscribe logged user in a offer    |
| PUT    | '/offers/:offerId/unsuscribe'       | YES  | Unsuscribe logged user in a offer  |
| DELETE | '/users'                            | YES  | Delete current user account        |

## COMPANIES ENDPOINTS ##

| METHOD | URL                       | AUTH | FUNCTION                    |
|--------|---------------------------|------|-----------------------------|
| GET    | '/companies'              | YES  | Get your Company profile    |
| GET    | '/offers'                 | YES  | Get all your Offers         |
| GET    | '/courses'                | YES  | Get all your Courses        |
| POST   | '/offers'                 | YES  | New Offer                   |
| POST   | '/courses'                | YES  | New Course                  |
| PUT    | '/offers/:offerId'        | YES  | Edit Offer                  |
| PUT    | '/courses/:courseId'      | YES  | Edit Course                 |
| PUT    | '/companies'              | YES  | Edit Company profile        |
| DELETE | '/courses/:courseId'      | YES  | Delete Course               |
| DELETE | '/offers/:offerId'        | YES  | Delete offer                |
| DELETE | '/companies'              | YES  | Delete current company acc. |
