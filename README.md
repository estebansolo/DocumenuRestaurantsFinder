# Restaurants Finder

This project could not be delivered with the implementation through the docker-compose due to problems in the execution of the database, so the installation and execution of the api must be done manually.

The mongo database runs on port ***27017***, it will create a database called `myapp` (used for testing).

## Installation

`yarn install` or `npm install`

## Run Project

`yarn start` or `npm start`

## Endpoints

### Signup

**POST** `/auth/signup`

**body:**

```
{
    "username": "",
    "email": "",
    "password": ""
}
```

**Response**

```
{
    "newUser": {
        "_id": "",
        "createdAt": "",
        "email": "",
        "username": ""
    },
    "token": ""
}
```

### Signin

**POST** `/auth/signin`

**body:**

```
{
    "email": "",
    "password": ""
}
```

**Response**

```
{
    "user": {
        "_id": "",
        "createdAt": "",
        "email": "",
        "username": ""
    },
    "token": ""
}
```

### Logout

**POST** `/auth/logout`

**Response**

**status:** 200

### Restaurants

To search for restaurants I used a free api called [documenu](https://documenu.com/) which obtains by geographical position (lat and lon) and the distance in miles from this point the nearby restaurants.

Test Location:
- `lat`: 40.68919
- `lon`: -73.992378

**GET** `/api/places`

**body:**

| Field | Type | Required | Default |
|----|----|----|----|
| lat | float | true | |
| lon | float | true | |
| distance | int | false | 10 |
| page | int | false | 1 |

**Response**

```
{
    "totalResults": 0,
    "page": 1,
    "total_pages": 0,
    "more_pages": false,
    "data": [],
    "numResults": 0
}
```

### Transactions

The implementation of the transaction history was not completed because I did not have a comprehensive knowledge of what information to return for this case, yet the folder structure and an empty answer of what could be a successful request remained.

**GET** `/api/transactions`

**body:**

| Field | Type | Required | Default |
|----|----|----|----|
| page | int | false | 1|
| limit | int | false | 100 |

**Response**

```
{
    "data": [],
    "page": 1,
    "limit": 100
}
```

The `/api` endpoints require authorization (jwt) to be correctly called.