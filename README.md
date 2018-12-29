# MHE Tool Backend

This is node server REST api for MHE Tool. This api is used to get/save/update assignment data between Tool and MongoDB database. In this api, we have used Express.js framework with Mongoose.js driver for MongoDB connection.

# Pre-reqs

* Install [Node.js](https://nodejs.org/en/)
* Install [MongoDB](https://docs.mongodb.com/manual/installation/)
* Install [VS Code](https://code.visualstudio.com/)

# Getting started

<!-- - Clone the repository
```
git clone --depth=1 https://github.com/Microsoft/TypeScript-Node-Starter.git <project_name>
``` -->

* Install dependencies

```
cd <project_name>
npm install
```

* Start your mongoDB server (you'll probably want another command prompt)

```
mongod
```

* Build and run the project

```
npm run build
npm start
```

Navigate to `http://localhost:3000`

## Project Structure

The most obvious difference in a TypeScript + Node project is the folder structure.
In a TypeScript project, it's best to have separate _source_ and _distributable_ files.
TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.
The `test` and `views` folders remain top level as expected.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

| Name                 | Description                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| **.vscode**          | Contains VS Code specific settings                                                                         |
| **dist**             | Contains the distributable (or output) from your TypeScript build. This is the code you ship               |
| **node_modules**     | Contains all your npm dependencies                                                                         |
| **src**              | Contains your source code that will be compiled to the dist dir                                            |
| **src/config**       | constants, DB setup                                                                                        |
| **src/routers**      | Routers assign functions that respond to various http requests                                             |
| **src/controllers**  | Controllers define functions that respond to various http requests                                         |
| **src/models**       | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB               |
| **src/services**     | Services act as proxy to models, tools, etc                                                                |
| **src/types**        | Holds .d.ts files not found on DefinitelyTyped. Covered more in this [section](#type-definition-dts-files) |
| **src**/server.ts    | Entry point to your express app                                                                            |
| **test**             | Contains your tests. Seperate from source because there is a different build process.                      |
| **views**            | Views define how your app renders on the client. In this case we're using pug                              |
| .env.example         | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos.              |
| .travis.yml          | Used to configure Travis CI build                                                                          |
| .copyStaticAssets.ts | Build script that copies images, fonts, and JS libs to the dist folder                                     |
| package.json         | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped) |
| tsconfig.json        | Config settings for compiling server code written in TypeScript                                            |
| tsconfig.tests.json  | Config settings for compiling tests written in TypeScript                                                  |
| tslint.json          | Config settings for TSLint code style checking                                                             |

### VSCode Extensions

To enhance your development experience while working in VSCode we also provide you a list of the suggested extensions for working with this project:

![Suggested Extensions In VSCode](https://user-images.githubusercontent.com/14539/34583539-6f290a30-f198-11e7-8804-30f40d418e20.png)

* [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
* [Azure Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb)
