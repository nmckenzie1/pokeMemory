CREATE DATABASE pokemon_db;

USE pokemon_db;

CREATE TABLE user (
    id integer auto_increment not null primary key,
    username varchar(30) not null,
    password varchar(30) not null
    );

CREATE TABLE hiscore (
    id integer auto_increment not null primary key,
    score int not null,
    foreign key (userID) references user.id
)