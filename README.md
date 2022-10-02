# graphql-postgres-typeorm

Hi, its easy peasy express + graphQL + postgreSQL + typescript application template.

First of all you need install and run postgreSQL server https://www.postgresql.org/download/

Secondary you should create database:
in terminal
```
CREATE USER rafael WITH PASSWORD 'rafael97'

CREATE DATABASE rafaeldb WITH OWNER rafael ENCODING='UTF8' LC_COLLATE='en_US.utf8' LC_CTYPE='en_US.utf8'

\l+
```
\l+ show all databases in postgreSQL

Then write name to config (my DB is “rafael”)
```js
await createConnection({
    type: "postgres",
    database: "rafaeldb",
    entities: [DataModel],
    logging: true,
    synchronize: true,
    username: "rafael",
    password: "rafael97",
    port: 5432,
  });
```

Then open terminal in “server” folder and paste this command 
```
npm run dev
```

Paste this url to browser search line 
http://localhost:8000/graphql 

Here you go GraphQl api server is running 

For create new data 

```graphql
mutation{
  createData(
    title: "Rafael", 
    description: "this video about Rafael", 
    posterLink: "https://i.ytimg.com/vi/uHnRcOucYDI/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB0e6EddvWYjntzLrugAPTlM3Xh-Q", 
    videoUrl: "https://www.youtube.com/watch?v=VuH6QUmJwfA"
  ){
    id
    title
    description
    posterLink
    videoUrl
  }
}

```

For getting all data
```graphql
query{
  datas{
    title
    description
    videoUrl
  }
}
```

For updating data
```graphql
mutation {
  updateData(
    id: 4,
    title: "changed title",
    description: "changed description", 
    posterLink: "changed link", 
    videoUrl: "changed link",
  )
}
```



