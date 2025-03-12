const Sequelize = require('sequelize');

const PGHOST='ep-floral-recipe-a8qyywzk-pooler.eastus2.azure.neon.tech'
const PGDATABASE='neondb'
const PGUSER='neondb_owner'
const PGPASSWORD='npg_wYzkam5i0RoH'

// set up sequelize to point to our postgres database
const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
});

// Define a "Project" model

const Project = sequelize.define('Project', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
  });

// Define our "User" and "Task" models

const User = sequelize.define('User', {
    fullName: Sequelize.STRING, // the user's full name (ie: "Jason Bourne")
    title: Sequelize.STRING, // the user's title within the project (ie, developer)
  });
  
  const Task = sequelize.define('Task', {
    title: Sequelize.STRING, // title of the task
    description: Sequelize.TEXT, // main text for the task
  });
  
  // Associate Task with User & automatically create a foreign key
  // relationship on "Task" via an automatically generated "UserId" field
  
  Task.belongsTo(User);

  // Define a "Name" model

const Name = sequelize.define('Name', {
    fName: Sequelize.STRING, // first Name
    lName: Sequelize.STRING, // Last Name
  });
  
  // synchronize the Database with our models and automatically add the
  // table if it does not exist
  
  sequelize.sync().then(() => {
    // return all first names only
    Name.findAll({
      attributes: ['fName'],
    }).then((data) => {
      console.log('All first names');
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].fName);
      }
    });
  
    // return all first names where id == 2
    Name.findAll({
      attributes: ['fName'],
      where: {
        id: 2,
      },
    }).then((data) => {
      console.log('All first names where id == 2');
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].fName);
      }
    });
  });