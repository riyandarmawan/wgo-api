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

[] Auth
   [] Intall dependencies
   [] Generate modules and services of User and Auth
   [] Create ```findOne``` method in ```AuthService``` (for login)
   [] Create ```validateUser``` method in ```AuthService```
   [] Install dependencies for passport-jwt
   [] Add ```login``` method in ```AuthService``` that's return access_token (jwt)
   [] Add ```JWT_SECRET_KEY``` in ```.env```
   [] Setup jwt and passport in ```AuthModule```
   [] Add ```/login``` endpoint in ```AuthController```
   [] Add passport strategy
   [] Implements passport guard
   [] Enable authentication globally
   [] Add ```createUser``` method in ```UserService```
   [] Add ```register``` method in ```AuthService```
   [] Add ```/register``` in ```AuthController```
