# uLesson-test
uLesson Snr. Backend Eng Test


Node Version: 20.10.0


## Database Migrations

You might need to make updates to the database structure during development. To ensure that these changes translate to production, a migration script will need to be created

Please strictly follow the steps below:

-  Open your terminal at the root of the project
-  Run the command `npm run create-migration --name=name_of_sql_file` where `name_of_sql-file` is the name of the sql file
-  Look in the `migrations` folder. You'll see an `sqls` folder. Open it and look for 2 files with filenames that look like `20231207165116-my-migration-down.sql` and `20231207165116-my-migration-up.sql`. Insert your SQL scripts here. 
    - The `UP` file runs the actual script to create a table, add a column, etc, 
    - The `DOWN` file is run incase of a rollback, say you're adding a few columns and there's a failure in the script.