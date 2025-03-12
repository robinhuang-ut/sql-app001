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
  
  // synchronize the Database with our models and automatically add the
  // table if it does not exist
  
  sequelize.sync().then(() => {
    // create a new "Project" record and add it to the database table
    Project.create({
      title: 'Project1',
      description: 'First Project',
    })
      .then((project) => {
        // you can now access the newly created Project via the variable project
        console.log('success!');
      })
      .catch((error) => {
        console.log('something went wrong!');
      });
  });