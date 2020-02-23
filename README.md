# backend-order
The goal of this repository is store all backend of the order pasta backend

## how we can use that ?
1. You have to run ```npm install```
2. You have to run ```npm start```
3. This application will run on ```http://localhost:3000``` for default

# Routes
## You have to send request to ```http://localhost:3000/api/${something}/
---------------------------------------------------------------------------
### Customer Routes

#### Sign up
 - URI: ```/customers/``` 
 - Method: POST
 - Body: {
    "name":"Some name",
    "email":"Some correct email",
    "password":"type a password",
    "phone":"Type a phone number"
  }
  - All fields are required
  - Response: {
    - status: 201
    - body: {
      "message": "Created"
    }
  }

### Get All customers
- URI: ```/customers/```
- Method: GET
- Body: nothing
- Response: {
  - status 200
  - body {
    [
      {
          "id": 2,
          "name": "some some",
          "email": "some@something.com"
      },
      {
          "id": 1,
          "name": "Some some",
          "email": "something@some.com"
      },
      {
          "id": 3,
          "name": "some some",
          "email": "something@same.com"
      }
    ]
  }
}

### Get customer by email
- URI: ```/customers/find?email="put email here"```
- Method: GET
- Body: nothing
- qs: email="the email"
- Response: {
  - status 200
  - body {
    {
      "name":"Some name to update",
      "email":"Some correct email to update",
      "password":"type a password to update",
      "phone":"Type a phone number to update"
    }
  }
}

### Update customer by id
- URI: ```/customers/:id"```
- Method: PATCH
- Body: {
    "name":"rafael jordao jardim",
    "password":"12345678",
    "phone":"1999676552",
    "email": "testando@email.com"
  }
- No field is required
- qs: email="the email"
- Response: {
  - status 200
  - body {
    {
      "name":"Name updated if provided",
      "password":"password updated if provided",
      "phone":"phone number updated if provided",
      "email": "email updated if provided"
    }
  }
}

---------------------------------------------------------------------------
## Product Routes

### save
 - URI: ```/products/``` 
 - Method: POST
 - Body: {
      "name":"massa de pastel",
      "price":2.50,
      "kg":0.5,
      "stock":10
    }
  - All fields are required
  - Response: {
    - status: 201
    - body: {
      "message": "Created"
    }
  }

### Get All Products
- URI: ```/products/```
- Method: GET
- Body: nothing
- Response: {
  - status 200
  - body {
    [
      {
          "id": 2,
          "name": "massa de pastel",
          "price": 2.5,
          "kg": 0.5,
          "stock": 10
      },
      {
          "id": 3,
          "name": "massa de pizza",
          "price": 5,
          "kg": 0.5,
          "stock": 20
      }
    ]
  }
}



