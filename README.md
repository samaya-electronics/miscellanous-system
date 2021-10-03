# Misc Store Samaya 
The official Cairo branch Samaya electronics Misc storage system

### Development:
#### Tech-Stack
- Mysql
- Node.js
- Express.js
- sequelize
- NodeMailer
- Jest & supertest

To continue development on the Misc store i will guid you with a list,

- Keep up the conventions:
    - File naming conventions
    - variable naming
    - using dotenv
    - keep up the documentation that is named by http verb in docs folder
    - for any generic code please use the specific folder
    - for special functions and one time use stuff use the helpers folder
    - to write tests effectively you can create a test for each route and place all tests in the same describe block for the database mocking to work

- Development:
    - The server file is dedicated to only using the app file in a server env and for database mocking
    - During development we mock the database in the server file to help the front end devs in integration
    - Testing files allow for further database mocking specific to the test at hand and are used as the server file is never called in testing
    - while doing migrations and seeding use the database folder to host new folders

- TODO:
    - use Ldap for user authentication in auth routes and post the user data in the database when he logs in for the first time to keep the token
    - ask leader for FIFO implementation in the warehouse

## FUTURE WORK 2.0:
 - Make user approvals dynamic to any additional roles
 - make request GETing dynamic instead of hard coded functions
 - make roles and permissions dynamic instead of hard coded middleware
 - user FIFO in choosing stock locations