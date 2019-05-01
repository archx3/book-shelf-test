#API Specification Document
-

## Product APIs
###Post an item to the product database

_**URL**_ http://localhost:3000/api/products \
_**Headers**_ 
Content-Type: application/json \
_**Pyload**_  
```json
{
  "category": [String],
  "name": String,
  "price": Number
}
```
_**Response**_ 
```json
{
  "message": String,
  "result": [
    {
      "category": [String],
      "date_modified": null,
      "_id": String,
      "name": String,
      "type": String,
      "price": Number,
      "date_created": Date
    }
  ],
  "request": {
    "method": "GET",
    "url": "http://localhost:3000/api/products/"
  }
}
```

###

### Get an item
_**URL**_ http://localhost:3000/api/products/:id

_**Headers**_ 
Content-Type: Content-Type: application/x-www-form-urlencoded

_**Pyload**_ 
```json
{}
```
_**Response**_  
```json
{
  "message" : String,
  "result": {
      "category": [String],
      "date_modified": null,
      "_id": String,
      "name": String,
      "type": String,
      "price": Number,
      "date_created": Date
    },
  "request": {
    "method": "GET",
    "url": "http://localhost:3000/api/products/"
  }
}
```


###

//Get all items
GET http://localhost:3000/api/products/
Content-Type: application/x-www-form-urlencoded


###

//Delete an item
DELETE http://localhost:3000/api/products/5ca6166c2566c3149b348c80
Content-Type: application/x-www-form-urlencoded


###

##Post an item to the
PUT http://localhost:3000/api/products/5ca6166c2566c3149b348c80
Content-Type: application/json

{

  "name":"Fanta Cola Bottle",
  "type":"Food",
  "category":["Food", "Beverage" ],
  "price":50
}

###
