# XY Inc API

A Points Of Interest API.

This API aims to create points of interest and list them by proximity.

## Getting Started

**Requirements:**

  - [Node.js](https://nodejs.org/) (tested with v12.16.1)
  - [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable) (tested with v1.22.0)    

I'm using the MongoDB as database. If you want to use an online server, [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 
is a great free option to get started. 
Otherwise, you can download MongoDB Server [here](https://www.mongodb.com/download-center/community) (tested with v4.2.3).

**Install**

    $ git clone https://github.com/GabrielFreitasP/xy-inc
    $ cd xy-inc
    $ yarn install

**Configure app**

I'm using `dotenv` files. You must create the `.env` file based on the `.env.example` 
file, both located in the root directory. You can also check the environment variables 
below:

Required:

  - `APP_SECRET` (Secret key to generete API token with JWP)
  - `MONGO_USER` (MongoDB username)
  - `MONGO_PASS` (MongoDB password)
  - `MONGO_DB` (Database name)

Optional:

  - `MONGO_LOCAL` (If the MongoDB server is local or online - Default is `true`)
  - `MONGO_URL` (MongoDB server string URL - Default is `localhost`)
  - `MONGO_PORT` (MongoDB port - Default is `27017`)

_NOTE:_ The variable `MONGO_PORT` isn't used when `MONGO_LOCAL` has value `false`.

**Running the project**

    $ yarn dev

**Running the tests**

    $ yarn test

## Using

**Live Demo**

You can access live demo in http://xy-inc-g.herokuapp.com/ping

**Documentation**

For more information, check the API documentation [here](https://app.swaggerhub.com/apis-docs/GabrielFreitasP/XYInc/1.0.0-oas3).