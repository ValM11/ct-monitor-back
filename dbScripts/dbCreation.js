const mySQL = require("mysql2");

require("dotenv").config();

const connectionDb = mySQL.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PWD,
  multipleStatements: true, // this allow you to run multiple queries at once.
});

var sqlCommand = `
  create database ctmonitor;
  
  use ctmonitor;
  
  drop table if exists demographics;
  drop table if exists vital_signs;
  drop table if exists aes;
  drop table if exists link_patient_study;
  drop table if exists link_inv_studies;
  drop table if exists investigators;
  drop table if exists users;
  drop table if exists studies;
  
  CREATE TABLE studies(
  study_id varchar(8) primary key,
  product_id varchar(8),
  title VARCHAR(200),
  start_date date,
  end_date date
  );
  
  CREATE TABLE users(
  email varchar(20),
  passhash varchar(40),
  user_role varchar(3),
  constraint pk_user primary key(email)
  );
  
  CREATE TABLE investigators(
  inv_name varchar(30),
  email varchar(30),
  site_id int(3) unique not null,
  country_id int(3),
  constraint pk_inv primary key(email),
  constraint fk_inv_users FOREIGN KEY(email) REFERENCES users(email) 
  );
  
  CREATE TABLE link_inv_studies(
  email varchar(30),
  study_id varchar(8),
  constraint pk_inv_study primary key(email, study_id),
  constraint fk_inv_studies FOREIGN KEY(study_id) REFERENCES studies(study_id),
  constraint fk_linkinv_users FOREIGN KEY(email) REFERENCES users(email) 
  );
  
  CREATE TABLE link_patient_study(
  patient_id int(9),
  site_id int(3),
  study_id varchar(8),
  constraint pk_patient primary key(patient_id),
  constraint fk_patient_study FOREIGN KEY(study_id) REFERENCES studies(study_id),
  constraint fk_patient_site FOREIGN KEY(site_id) REFERENCES investigators(site_id)  
  );
  
  CREATE TABLE demographics(
  patient_id varchar(9),
  visit varchar(3),
  sex varchar(1),
  age int(3),
  weight int(3),
  height int(3),
  constraint pk_demo primary key(patient_id, visit)
  );
  
  CREATE TABLE vital_signs(
  patient_id varchar(9) ,
  visit varchar(3),
  sbp int(5),
  dbp int(5),
  hr int(5),
  constraint pk_vs primary key(patient_id, visit)
  );
  
  CREATE TABLE aes(
  ae_id int auto_increment,
  patient_id varchar(9) ,
  visit varchar(3),
  ae_desc varchar(150),
  ae_start_date date,
  ae_end_date date,
  constraint pk_aes primary key(ae_id)
  );
  
  `;

connectionDb.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
  con.query(sqlCommand, function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
