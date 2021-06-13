# Proyect-2-Backend

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
| specialitation| Array        | Skill     | NO       |                |

## Job Offer

| KEY         | TYPE         | REFERENCE | REQUIRED | VALIDATION     |
|-------------|--------------|-----------|----------|----------------|
| title       | String       |           | YES      | MinLength      |
| description | String       |           | YES      |                |
| company     | [ ObjectId ] | Companies | YES      |                |
| position    | String       |           | YES      |                |
| salary      | Object       |           | NO       |                |
| applicants  | Array        |           | NO       |                |
| requirements| Array        | Skill     | YES      |                |

## Companies

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

## Courses

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

## Skill
| KEY         | TYPE         | REFERENCE | REQUIRED | VALIDATION     |
|-------------|--------------|-----------|----------|----------------|
| name        | String       |           | YES      | MinLenght      |
| count       | Number       |           | YES      | MinLenght      |

## AUTHENTICATION ENDPOINTS

| METHOD | URL            | AUTH | FUNCTION             |
|--------|----------------|------|----------------------|
| POST   | '/auth/signup' | NO   | Create a new account |
| POST   | '/auth/login'  | NO   | Authenticate a user  |

## USERS ENDPOINTS

| METHOD | URL               | AUTH | FUNCTION                    |
|--------|-------------------|------|-----------------------------|
| GET    | '/user/offers'.   | NO   | Get Job Offers              |
| GET    | '/user/courses'.  | NO   | Get Courses                 |
| GET    | '/user/courses?'. | NO   | Get Courses filter          |
| GET    | '/user/offer?'.   | NO   | Get Job Offers filter       |
| GET    |'/user/:idCompany' | YES  | Get one Companies           |
| GET    |'/user/:idCourse'  | YES  | Get one Course              |
| PUT    | '/user/myAccount' | YES  | Edit user profile           |
| DELETE | '/user/myAcount'  | YES  | Delete user account         |

## COMPANIES ENDPOINTS

| METHOD | URL                      | AUTH | FUNCTION                    |
|--------|-----------------------   |------|-----------------------------|
| GET    | '/company/'              | YES  | Get all Users               |
| GET    | '/companie/offers'       | YES  | Get all your Offers         |
| GET    | '/companie/courses'      | YES  | Get all your Courses        |
| GET    | '/companie/courses?'     | YES  | Get Courses filter          |
| GET    | '/companie/offer?'       | YES  | Get Offers  filter          |
| POST   | '/companie/offer'        | YES  | New Offer                   |
| POST   | '/companie/course'       | YES  | New Course                  |
| PUT    | '/companie/offer/:id'    | YES  | Edit Offer                  |
| PUT    | '/companie/course/:id'   | YES  | Edit Courses                |
| PUT    | '/companie/myAccount'    | YES  | Edit Company profile        |
| DELETE | '/companie/:idCourse'    | YES  | Delete Course account       |
| DELETE | '/companie/offer/:id'    | YES  | Delete offer account        |
| DELETE | '/companie/myAcount'     | YES  | Delete user account         |
