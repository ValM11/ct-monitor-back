const mySQL = require("mysql2");

require("dotenv").config();

const connectionDb = mySQL.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PWD,
  database: process.env.SQL_DATABASE,
  dateStrings: true,
  multipleStatements: true, // this allow you to run multiple queries at once.
});

var sqlCommand = `
  use ctmonitor;

  insert into studies(study_id, product_id, title, start_date) values('ADS0001', 'PRO10789','Protocol 1', '2020-09-01');
  insert into studies(study_id, product_id, title, start_date, end_date) values('ADS0005', 'THF5653','Protocol 5', '2021-07-16', '2022-01-23');
  insert into studies(study_id, product_id, title, start_date) values('RDS1002', 'PRO10789','Protocol 2', '2022-09-11');
  insert into studies(study_id, product_id, title, start_date) values('RDS1014', 'JIK57832','Protocol 14', '2022-11-30');

  insert into users(email, passhash, user_role) values('ctm1@monitor.fr', 'test1password', 'CTM');
  insert into users(email, passhash, user_role) values('ctm2@monitor.fr', 'test2password', 'CTM');
  insert into users(email, passhash, user_role) values('inv1@test.fr', 'test1inv', 'INV');

  insert into investigators(inv_name, email, site_id, country_id) values('Inv1', 'inv1@test.fr',456, 250);

  insert into link_inv_studies(email, study_id) values('inv1@test.fr','RDS1002');

  insert into link_patient_study(patient_id, site_id, study_id) values(250456001, 456, 'RDS1002');
  `;

connectionDb.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
  con.query(sqlCommand, function (err, result) {
    if (err) throw err;
    console.log("Data inserted");
  });
});
