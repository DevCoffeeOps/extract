## extract

Add this to your root project dir
```js
// set_env.js
process.env.GOOGLE_MAPS_API_KEY = PUT_YOUR_KEY_HERE
```

Note: `data/` is `.gitignored`

use `data/raw/*` to work with api response data

use `data/processed/*` to ensure view models are constructed properly

#### package.scripts
```js
// runs after npm install, required for ts-runtime-assert which provides runtime type validation for src/utils/DbClientFactory.ts (this is nice bcuz with one db:migrate command you get entire CRUD db client with runtime type validation)
"postinstall": "npx ts-patch install",

// wipe migrations and generate new one based off of schema
// does not build history of schema changes, it wipes and replaces one single migration file
"db:migrate": "rm -rf prisma/migrations && npx prisma migrate reset -f && npx prisma generate && npx prisma migrate dev --name init",

// opens interactive webapp that allows CRUD operations on current data tables
"db:studio": "npx prisma studio",

// creates prisma/backup.sql that contains commands to recreate the existing db schema and all insertions needed to build sql db up to match the current one
"db:backup": "sqlite3 prisma/running_shoe_stores.db .dump > prisma/backup.sql",

// deletes current db and uses prisma/backup.sql to recreate schema and refill db
"db:restore": "rm -f prisma/running_shoe_stores.db && sqlite3 prisma/running_shoe_stores.db < prisma/backup.sql",

// deletes local build artifacts, dist/ is .gitignored
"prebuild": "rm -rf dist/ && rm -f tsconfig.tsbuildinfo",

// compiles typescript to js in dist/, copies set_env.js to dist/, set_env.js is .gitignored
"build": "tsc && tsc-alias && cp set_env.js dist/",

// extract raw data from API!
"extract": "npm run build && node dist/0.extract/index.js",

// transform raw data into a specific schema!
"process": "npm run build && node dist/1.process/index.js",

// load transformed data into SQL database!
"load": "npm run build && node dist/2.load/index.js"
```