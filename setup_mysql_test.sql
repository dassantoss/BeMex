-- prepares a MySQL server to test for the BeMex project

CREATE DATABASE IF NOT EXISTS bemexdb;
CREATE USER IF NOT EXISTS 'bemexusr'@'localhost' IDENTIFIED BY 'bemexpwd';
GRANT ALL PRIVILEGES ON `bemexusr`.* TO 'bemexusr'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'bemexusr'@'localhost';
FLUSH PRIVILEGES;
