# WGO API To-Do

[x] Project setup
  [x] Install NestJs

[x] Supabase
   [x] Create Supabase project
   [x] Add environment variable from Supabase

[x] Prisma
   [x] Install Prisma
   [x] Create database schema
   [x] Migrate

[x] Auth
   [x] Intall dependencies
   [x] Generate modules and services of User and Auth
   [x] Create ```findOneByUsername``` method in ```UsersService``` (for login)
   [x] Create ```validateUser``` method in ```AuthService``` that returned access_token (jwt)
   [x] Install dependencies for passport-jwt
   [x] Add ```JWT_SECRET_KEY``` in ```.env```
   [x] Setup jwt and passport in ```AuthModule```
   [x] Add ```/login``` endpoint in ```AuthController```
   [x] Add passport strategy
   [x] Implements passport guard
   [x] Enable authentication globally
   [x] Add ```createUser``` method in ```UserService```
   [x] Add ```register``` method in ```AuthService``` that returnd access_token
   [x] Add ```/register``` in ```AuthController```

[x] Messages gateway
  [x] Install dependencies
  [x] Generate ```MessagesModule``` and ```MessagesGateway```
  [x] Handle connect and disconnect
  [x] Subcribe message to ```sendMessage``` and emit to ```receiveMessage```
  [x] Save the data in db!

[x] Friend Request
  [x] Genereate module, service, and controller
  [x] Create endpoint api 
    [x] ```POST /friends/request``` → send request
    [x] ```PATCH /friends/accept``` → accept request
    [x] ```DELETE /friends/accept``` → delete request
  [x] Create a room for 2 participant
