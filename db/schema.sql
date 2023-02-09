-- Active: 1675924426175@@127.0.0.1@3306@techblog_db
DROP DATABASE IF EXISTS techblog_db;

CREATE DATABASE techblog_db;

use techblog_db;
SELECT * FROM user;

DELETE FROM user CASCADE;