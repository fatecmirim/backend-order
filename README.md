# backend-order
The goal of this repository is store all backend of the order pasta backend

## how we can use that ?
1. You have to run ```npm install```
2. You have to run ```npm start```
3. This application will run on ```http://localhost:3000``` for default

Pay attention: After login All calling will need the token
header: {
  Authorization: Bearer yourToken
}
### Routes
#### You have to send request to ```http://localhost:3000/api/${something}/
---------------------------------------------------------------------------
## Customer Routes

#### Sign up
```javascript
 - URI: /customers/ 
 - Method: POST
 - Body: {
    "name":"Some name",
    "email":"Some correct email",
    "password":"type a password",
    "phone":"Type a phone number"
  }```
  - All fields are required
  - Response: {
    - status: 201
    - body: {
      "message": "Created"
    }
  }
```
#### Get All customers
```javascript
- URI: /customers/
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
```
#### Get customer by email
```javascript
- URI: /customers/find?email="put email here"
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
```
#### Update customer by id
```javascript
- URI: /customers/:id
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
```
---------------------------------------------------------------------------
## Product Routes

#### save
```javascript
 - URI: /products/
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
```
#### Get All Products
```javascript
- URI: /products/
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
```
#### Get Product by id
```javascript
- URI: /products/:id
- Method: GET
- Body: nothing
- Response: {
  - status 200
  - body {
    {
      "id": 2,
      "name": "massa de pastel",
      "price": 2.5,
      "kg": 0.5,
      "stock": 10
    }
  }
}
```
#### Get Product by name ilike 
```javascript
- URI: /products/name/?productName=part of product name
- Method: GET
- Body: nothing
- Response: {
  - status 200
  - body {
    {
      "id": 2,
      "name": "massa de pastel",
      "price": 2.5,
      "kg": 0.5,
      "stock": 10
    }
  }
}
```
#### Update Product by id 
```javascript
- URI: /products/name/:id
- Method: PATCH
- Body: {
    {
      "id": 2,
      "name": "massa de pastel",
      "price": 2.5,
      "kg": 0.5,
      "stock": 10
    }
  }
- Response: {
  - status 200
  - body {
    {
      "id": 2,
      "name": "massa de pastel",
      "price": 2.5,
      "kg": 0.5,
      "stock": 10
    }
  }
}
```
---------------------------------------------------------------------------
## Order Routes

#### save
  ```javascript
 - URI: /orders/
 - Method: POST
 - Body: {
    "customerId": 1,
    "items": [
      {
        "productId": 2,
        "quantity": 10
      },
      {
        "productId": 3,
        "quantity": 10
      }
    ]
  }
  - All fields are required
  - Response: {
    "products": [
        {
            "name": "massa de cannoli",
            "price": 2.5,
            "quantity": 10,
            "subTotal": 25
        },
        {
            "name": "massa de pizza",
            "price": 5,
            "quantity": 10,
            "subTotal": 50
        }
    ],
    "orderNumber": 55,
    "total": 75
  }
  ```

  #### Retrieve orders by customer id
  ```javascript
 - URI: /orders/?customerId=1
 - Method: GET
 - Body: no content
  - Response: [
    {
        "products": [
            {
                "name": "massa de cannoli",
                "price": 2.5,
                "quantity": 1,
                "subTotal": 2.5
            },
            {
                "name": "massa de pizza",
                "price": 5,
                "quantity": 1,
                "subTotal": 5
            }
        ],
        "orderNumber": 56,
        "total": 7.5
    },
    {
        "products": [
            {
                "name": "massa de cannoli",
                "price": 2.5,
                "quantity": 1,
                "subTotal": 2.5
            },
            {
                "name": "massa de pizza",
                "price": 5,
                "quantity": 1,
                "subTotal": 5
            }
        ],
        "orderNumber": 57,
        "total": 7.5
    },
    {
        "products": [
            {
                "name": "massa de pizza",
                "price": 5,
                "quantity": 10,
                "subTotal": 50
            },
            {
                "name": "massa de cannoli",
                "price": 2.5,
                "quantity": 10,
                "subTotal": 25
            }
        ],
        "orderNumber": 55,
        "total": 75
    }
]
  ```

  #### Retrieve all orders to adm
  ```javascript
 - Just adm user will can retrieve all orders
 - URI: /orders/all
 - Method: GET
 - Body: no content
  - Response: [
  {
    "orderResponse": {
      "products": [
        {
          "name": "massa de cannoli",
          "price": 2.5,
          "quantity": 1,
          "subTotal": 2.5
        },
        {
          "name": "massa de pizza",
          "price": 5,
          "quantity": 1,
          "subTotal": 5
        }
      ],
      "date": "1/2/2020 at 9:55",
      "orderNumber": 56,
      "total": 7.5
    },
    "customerName": "rafael jordao jardim",
    "customerPhone": "1999676552"
  },
  {
    "orderResponse": {
      "products": [
        {
          "name": "massa de cannoli",
          "price": 2.5,
          "quantity": 1,
          "subTotal": 2.5
        },
        {
          "name": "massa de pizza",
          "price": 5,
          "quantity": 1,
          "subTotal": 5
        }
      ],
      "date": "1/2/2020 at 10:3",
      "orderNumber": 57,
      "total": 7.5
    },
    "customerName": "rafael jordao jardim",
    "customerPhone": "1999676552"
  },
  {
    "orderResponse": {
      "products": [
        {
          "name": "massa de cannoli",
          "price": 2.5,
          "quantity": 1,
          "subTotal": 2.5
        },
        {
          "name": "massa de pizza",
          "price": 5,
          "quantity": 1,
          "subTotal": 5
        }
      ],
      "date": "1/2/2020 at 10:18",
      "orderNumber": 58,
      "total": 7.5
    },
    "customerName": "rafael jordao jardim",
    "customerPhone": "1999676552"
  }
]
  ```
  #### Login
  ```javascript
 - all people can login
 - URI: /api/login
 - Method: POST
 - Body: {
	  email: "email",
	  password: "12345678"
  }
  - Response: 
    {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1ODQ1NzIyNDMsImV4cCI6MTU4NDU3NTg0M30.WJu9jP-1AlwpYkT75fA7WWxWN3mSqFh7CWM0iTXFXFk",
      admin: false
    }
  ```






