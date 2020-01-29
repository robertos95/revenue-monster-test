# revenue-monster-test
Test for Revenue Monster (Backend) - Roberto

# Overview
An API to retreive movie information from themovieDB's API and save it to local DB + save image locally. Also able to retrieve movie saved in the local DB>

# Set up
1. Clone this repository to local machine.
2. Paste the .env file (sent separately via email) into the project folder (same level with Dockerfile, app.js)
3. By default the port will be mapped to port 8080 locally. 
If you wish to change this port, open docker-compose.yml file and on this line:
```
ports:
  - "8080:8000"
```
Change the first part (8080) to some other port number.

4. On the terminal, navigate to the project folder and type the following command.
```
docker-compose up
```
5. The server has been set up. You can now call the APIs.
*(Do remember to update the port number if you changed the default value in step 3.)*

For example retrieving all saved movies in the local DB
/GET http://localhost:8080/index

# API Documentation
https://documenter.getpostman.com/view/10129882/SWTBdx6N?version=latest
