# Misc Store Samaya 
The official Cairo branch Samaya electronics Misc storage system

### Development:
for development purposes the testing and dev domain is samaya-misc.herokuapp.com


## TODO
 - [X] finish DB EER
 - [X] use .env in work env
 - [X] use sequelize in api enpoints
 - [X] refactor all controllers into services
 - [X] refactor all pk to ids
 - [X] write tests for all services and controllers
 - [X] implement validation & constraints in Models
 - [X] logout
 - [X] remove unwanted info from user in token
 - [X] clean up middleware function
 - [X] request creation logic
 - [X] request approval logic
 - [ ] get errors in string or json format to be able to display them
 - [ ] talk about how new stock arrives and work out how to insert new quantity instead of just editing the int
 - [ ] formal email service
 - [ ] finish authentication with ldap
 - [ ] if security is tight, user UUIDs instead of IDs

### ASK Hazem :
 - what will warehouse admin need to verify a user
 - how will we know team leaders from team members
 - what data will come from auth server

## FUTURE WORK 2.0:
 - Make user approvals dynamic to any additional roles
 - make request GETing dynaming instead of hard coded functions
 - make roles and permissions dynamic instead of hard coded middleware