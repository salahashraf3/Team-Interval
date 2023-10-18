# Team-Interval Task List and Schedule App

Team-Interval is a task list and schedule app that helps you stay organized and manage your tasks efficiently.

#Video-Demo
https://youtu.be/GbcsCH8qBEA

## Frontend

The frontend of Team-Interval is built using Vite and React, providing a responsive and user-friendly interface for managing your tasks and schedules.

## Backend

The backend of Team-Interval is powered by Node.js and Express.js, ensuring a robust and reliable server to handle your task data.

## Database

Team-Interval uses MySQL as its database system to store and manage your task and schedule data.

## How To Run

Follow these steps to get Team-Interval up and running on your local environment:

### Frontend

1. Navigate to the `client` folder using your terminal.
2. Run the following commands to set up the frontend:

```bash
npm install
npm run dev
```

### Backend

1. Navigate to the `server` folder in your terminal.
2. Run the following commands to set up the backend:

```bash
npm install
npm start
```

### Database

A MySQL database export is included in the project directory. To import the database, follow these steps:

1. Access your MySQL database server using a tool like MySQL Workbench or the command line.
2. Create a new database with an appropriate name (e.g., `team_interval_db`).
3. Import the provided MySQL database dump file into the newly created database. You can use a command like this:

```bash
mysql -u your_username -p your_database_name < team_interval_database_dump.sql
```

Make sure to replace `your_username` and `your_database_name` with your MySQL username and the name of the database you created.

Now you're all set to run and use Team-Interval! Enjoy managing your tasks and schedules with ease.
