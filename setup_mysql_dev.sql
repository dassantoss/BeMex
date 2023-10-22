-- prepares a MySQL server for the BeMex project

CREATE DATABASE IF NOT EXISTS bemexdb;
CREATE USER IF NOT EXISTS 'bemexuser'@'localhost' IDENTIFIED BY 'bemexpwd';
GRANT ALL PRIVILEGES ON `bemexdb`.* TO 'bemexuser'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'bemexuser'@'localhost';
FLUSH PRIVILEGES;
