
# Library Management





## Run Locally

Requirement

```bash
  express js, prisma, nodemon
```

Clone the project

```bash
  git clone https://github.com/SetraNugraha/library-management-SGT
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  pnpm install express prisma nodemon
```


Setup .env

```bash
  create your Schema on PostgreSQL
  DATABASE_URL="postgresql://username:password@localhost:5432/schemaname?schema=public"
  Example : "postgresql://setra:rahasia123@localhost:5432/library?schema=public"
```

Setup prisma

```bash
  npx prisma generate
  npx prisma db push
```

Run Seeder for example data

```bash
  node prisma/seed.js
```

Start the server

```bash
  pnpm run server
```


## API Documentation

#### GET /api/books

```bash
Deskripsion : Get ll data books

Query params :
1. title : string Case Sensitive
2. author : string Case Sensitive
3. page : Int
4. limit : Int
```

```bash
Response :
success: boolean,
message: "string",
data: [
 {
    "id": "uuid",
    "title": "string",
    "author": "string",
    "published_year": Int,
    "stock": Int,
    "created_at": Date,
    "updated_at": Date,
    "isbn": "string",
    "available": boolean
 }
]
"pagination": {
        "total": Int,
        "page": Int,
        "limit": Int,
        "totalPages": Int
    }
}
```

#### POST /api/borrowings

```bash
Deskripsion : Create new borrowings data

Request Body :
1. member_id : "uuid"
2. book_id : "uuid"
```

```bash
Response :
{
    "success": boolean,
    "message": "string",
    "data": {
        "id": "uuid",
        "book_id": "uuid",
        "member_id": "uuid",
        "borrow_date": Date,
        "return_date": Date,
        "status": enum,
        "created_at": Date,
        "updated_at": Date
    }
}
```

#### PUT /api/borrowings/:id/return

```bash
Deskripsion : update status in borrowings to RETURNED

Request params :
1. id : "uuid"
```

```bash
Response :
{
    "success": boolean,
    "message": "string"
}
```

#### POST /api/members

```bash
Deskripsion : Register new member

Request body :
1. name : "string"
2. email : "string"
3. phone : "string"
4. address : "string"
```

```bash
Response :
{
    "success": boolean,
    "message": "string",
    "data": {
        "id": "uuid",
        "name": "string",
        "email": "string",
        "phone": "string",
        "address": "string",
        "created_at": Date,
        "updated_at": Date
    }
}
```

#### GET /api/members/:id/borrowings

```bash
Deskripsion : Get data history borrowings by member id

Query Params :
1. status : enum
2. page : Int
3. limit : Int
```

```bash
Response :
{
    "success": boolean,
    "message": "string",
    "data": {
        "data": {
            "id": "uuid",
            "name": "string",
            "email": "string",
            "phone": "string",
            "address": "string",
            "created_at": Date,
            "updated_at": Date
            "borrowing": [
                {
                    "id": "uuid",
                    "book_id": "uuid",
                    "member_id": "uuid",
                    "borrow_date": Date,
                    "return_date": Date,
                    "status": enum,
                    "created_at": Date
                    "updated_at": Date
                    "book": {
                        "id": "uuid",
                        "title": "string",
                        "author": "string",
                        "published_year": Int,
                        "stock": Int,
                        "created_at": Date,
                        "updated_at": Date,
                        "isbn": "string"
                    }
                }
            ]
        },
        "pagination": {
            "total": Int,
            "page": Int,
            "limit": Int,
            "totalPages": Int
        }
    }
}
```
