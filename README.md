# Weather App

## Set up

Install server dependencies 
`npm i`

Install React client dependencies
`cd client && npm i`

To run locally in development mode, install [nodemon](https://nodemon.io/) if you don't have it already. 
`npm i -g nodemon`

In order to load environment variables, add a .env file in the project root with key value pairs, e.g. 
```
GEOENCODING_URL=http://example.com
```

To start the express server, run `npm run local` in the project root. 

To start the development React build, in a new terminal run `cd client && npm start`.
Visit the site at http://localhost:3000

To run the production build locally, run `npm run local` in the project root, and visit http://localhost:5000 (you don't need to run anything in the client folder).

To create a new production build, cd into client and run `npm run build`