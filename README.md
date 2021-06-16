# Proyect-2-Backend

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
| lastname      | String       |           | YES      | MinLength      |
| email         | String       |           | YES      | Unique         |
| password      | String       |           | YES      |                |
| birthdate     | Date         |           | YES      |                |
| city          | String       |           | NO       |                |
| description   | String       |           | NO       |                |
| socialmedia   | Array        |           | NO       |                |
| experience    | Array        |           | NO       |                |
| studies       | Array        |           | NO       |                |
| specialization| Array        | Skill     | NO       |                |

## OFFERS

| KEY         | TYPE         | REFERENCE | REQUIRED | VALIDATION     |
|-------------|--------------|-----------|----------|----------------|
| title       | String       |           | YES      | MinLength      |
| description | String       |           | YES      |                |
| company     | [ ObjectId ] | Companies | YES      |                |
| position    | String       |           | YES      |                |
| salary      | Object       |           | NO       |                |
| applicants  | Array        |           | NO       |                |
| requirements| Array        | Skill     | YES      |                |

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
| socialmedia | Array        |           | NO       |                |
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



## AUTHENTICATION ENDPOINTS ##

| METHOD | URL            | AUTH | FUNCTION             |
|--------|----------------|------|----------------------|
| POST   | '/auth/signup' | NO   | Create a new account |
| POST   | '/auth/login'  | NO   | Authenticate a user  |

## USERS ENDPOINTS ##

| METHOD | URL               | AUTH | FUNCTION                    |
|--------|-------------------|------|-----------------------------|
| GET    | '/offers'         | NO   | Get Job Offers              |
| GET    | '/courses'        | NO   | Get Courses                 |
| GET    | '/courses?'       | NO   | Get Courses filter          |
| GET    | '/offers'         | NO   | Get Job Offers filter       |
| GET    | '/offers?'        | NO   | Get Job Offers filter       |
| GET    | '/:idcompany'     | YES  | Get one Company             |
| GET    | '/:idcourse'      | YES  | Get one Course              |
| PUT    | '/users'          | YES  | Edit User profile           |
| DELETE | '/users'          | YES  | Delete current user account |

## COMPANIES ENDPOINTS ##

| METHOD | URL                       | AUTH | FUNCTION                    |
|--------|---------------------------|------|-----------------------------|
| GET    | '/companies'              | YES  | Get all Companies           |
| GET    | '/offers'                 | YES  | Get all your Offers         |
| GET    | '/courses'                | YES  | Get all your Courses        |
| GET    | '/courses?'               | YES  | Get Courses filter          |
| GET    | '/offers?'                | YES  | Get Offers filter           |
| POST   | '/offers'                 | YES  | New Offer                   |
| POST   | '/courses'                | YES  | New Course                  |
| PUT    | '/offers/:id'             | YES  | Edit Offer                  |
| PUT    | '/courses/:id'            | YES  | Edit Course                 |
| PUT    | '/companies'              | YES  | Edit Company profile        |
| DELETE | '/courses/:id'            | YES  | Delete Course               |
| DELETE | '/offers/:id'             | YES  | Delete offer                |
| DELETE | '/companies'              | YES  | Delete current company acc. |
