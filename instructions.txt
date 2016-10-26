# Running

1. Serve the `public/` folder statically in any web server and program the back-end URLs in the top section in `public\assets\js\app.js`

---- OR ----

2. Use NodeJS:
  a. Install NodeJS (https://nodejs.org/en/download/) (Run `node --version` to check if it installed correctly)
  b. In the root of this project, run `npm install` (you might have to configure the HTTP_PROXY environment variable to use this command within the Sabre LAN)
  c. After the dependencies get installed run `npm start` or `node server.js`, this starts the server on localhost port 1337
  d. See the app on http://localhost:1337/#/