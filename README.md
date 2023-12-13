# uLesson-test

uLesson Snr. Backend Eng Test

### Dependencies

-  Node 20.10.0
-  MySQL 8
-  Redis 7

### Cloning the Repository

Open your terminal and type
`https://github.com/django102/uLesson-test.git`

### Commands

1. `npm install` - Installs all dependencies
2. `npm test` - Runs all tests
3. `npm start` - Runs `node app.js`
4. `npm dev-start` - Runs `nodemon`

### Environment Variables

| Key               | Description                   | Sample Value |
| ----------------- | ----------------------------- | ------------ |
| NODE_ENV          | Environment                   | dev          |
| PORT              | Application Port              | 80           |
| DB_MYSQL_HOST     | MySQL Host or Url             | localhost    |
| DB_MYSQL_DATABASE | MySQL Database Name           |              |
| DB_MYSQL_PORT     | MySQL Port                    | 3306         |
| DB_MYSQL_USER     | MySQL User                    |              |
| DB_MYSQL_PASSWORD | MySQL Password                |              |
| REDIS_CLUSTER_IP  | Redis IP                      | 127.0.0.1    |
| REDIS_PORT        | Redis Port                    | 6379         |
| REDIS_USER        | User for Redis Instance       |              |
| REDIS_PASSWORD    | Password to Redis Instance    |              |
| APP_NAME          | Name of Application           | uLesson      |
| APP_VERSION       | App Version                   | 1.0.0        |
| JWT_SECRET        | Secret used for encoding JWTs |              |

### Database Migrations

You might need to make updates to the database structure during development. To ensure that these changes translate to production, a migration script will need to be created

Please strictly follow the steps below:

-  Open your terminal at the root of the project
-  Run the command `npm run create-migration --name=name_of_sql_file` where `name_of_sql-file` is the name of the sql file
-  Look in the `migrations` folder. You'll see an `sqls` folder. Open it and look for 2 files with filenames that look like `20231207165116-my-migration-down.sql` and `20231207165116-my-migration-up.sql`. Insert your SQL scripts here.
   -  The `UP` file runs the actual script to create a table, add a column, etc,
   -  The `DOWN` file is run incase of a rollback, say you're adding a few columns and there's a failure in the script.
