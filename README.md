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

| METHOD | URL                       | AUTH | FUNCTION                    |
|--------|---------------------------|------|-----------------------------|
| GET    | '/admin/companies'              | YES  | Get all Companies           |
| GET    | '/admin/offers'                 | YES  | Get all your Offers         |
| GET    | '/admin/courses'                | YES  | Get all your Courses        |
| GET    | '/admin/courses?'               | YES  | Get Courses filter          |
| GET    | '/admin/offers?'                | YES  | Get Offers filter           |
| POST   | '/admin/offers'                 | YES  | New Offer                   |
| POST   | '/admin/courses'                | YES  | New Course                  |
| PUT    | '/admin/offers/:offerId'        | YES  | Edit Offer                  |
| PUT    | '/admin/courses/:courseId'      | YES  | Edit Course                 |
| PUT    | '/admin/companies'              | YES  | Edit Company profile        |
| DELETE | '/admin/courses/:courseId'      | YES  | Delete Course               |
| DELETE | '/admin/offers/:courseId'       | YES  | Delete offer                |
| DELETE | '/admin/companies'              | YES  | Delete current company acc. |

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
| GET    | '/:companyId'     | YES  | Get one Company             |
| GET    | '/:courseId'      | YES  | Get one Course              |
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
| PUT    | '/offers/:offerId'        | YES  | Edit Offer                  |
| PUT    | '/courses/:courseId'      | YES  | Edit Course                 |
| PUT    | '/companies'              | YES  | Edit Company profile        |
| DELETE | '/courses/:courseId'      | YES  | Delete Course               |
| DELETE | '/offers/:courseId'       | YES  | Delete offer                |
| DELETE | '/companies'              | YES  | Delete current company acc. |
