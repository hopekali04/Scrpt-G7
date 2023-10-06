// the database migrations for the system to work

const createTablesIfNotExist = (connection) => {
    // Function to create tables if they don't exist
    // timestamps will help in performing soft deletion
    // add default user ID for fetching logo since it's not a full system with authentication features
    const createLogoTableQuery =`
        CREATE TABLE IF NOT EXISTS logo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT UNIQUE,
            logo BLOB,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(ID)
        );  
    `
    const createTeamTableQuery = `
      CREATE TABLE IF NOT EXISTS team (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      )
    `;
  
    const createProjectsTableQuery = `
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        start_date DATE,
        end_date DATE,
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      )
    `;
  
    const createCalendarTableQuery = `
      CREATE TABLE IF NOT EXISTS calendars (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_name VARCHAR(255) NOT NULL,
        event_date DATE,
        event_time TIME,
        location VARCHAR(255),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      )
    `;
  
    const createDocumentsTableQuery = `
      CREATE TABLE IF NOT EXISTS documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255),
        file_url VARCHAR(255),
        uploaded_by VARCHAR(255),
        upload_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      )
    `;
  
    const createReportsTableQuery = `
      CREATE TABLE IF NOT EXISTS reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        author VARCHAR(255),
        created_date DATE,
        file_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      )
    `;
    const createCropsTableQuery = `
      CREATE TABLE IF NOT EXISTS Crops (
        CropID INT PRIMARY KEY AUTO_INCREMENT,
        CropName VARCHAR(255) NOT NULL,
        CropType VARCHAR(50),
        PlantingSeason VARCHAR(50),
        Description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
    );
  `  
  connection.query(createCropsTableQuery, (err) => {
    if (err) {
      console.error('Error creating crops table: ', err);
      return;
    }
    console.log('Team table created');
  });
    connection.query(createTeamTableQuery, (err) => {
      if (err) {
        console.error('Error creating team table: ', err);
        return;
      }
      console.log('Team table created');
    });
    connection.query(createLogoTableQuery, (err) => {
        if (err) {
          console.error('Error creating Logo table: ', err);
          return;
        }
        console.log('Logo table created');
      });
    connection.query(createProjectsTableQuery, (err) => {
      if (err) {
        console.error('Error creating projects table: ', err);
        return;
      }
      console.log('Projects table created');
    });
  
    connection.query(createCalendarTableQuery, (err) => {
      if (err) {
        console.error('Error creating calendar table: ', err);
        return;
      }
      console.log('Calendar table created');
    });
  
    connection.query(createDocumentsTableQuery, (err) => {
      if (err) {
        console.error('Error creating documents table: ', err);
        return;
      }
      console.log('Documents table created');
    });
  
    connection.query(createReportsTableQuery, (err) => {
      if (err) {
        console.error('Error creating reports table: ', err);
        return;
      }
      console.log('Reports table created');
    });
};
const createUserTableIfNotExists =(connection)=>{
  const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `
  connection.query(createUserTable, (err) => {
    if (err) {
      console.error('Error creating user table: ', err);
      return;
    }
    console.log('User table created');
  });
}
module.exports = {
    createTablesIfNotExist,
    createUserTableIfNotExists
}