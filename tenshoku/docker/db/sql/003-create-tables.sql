USE mydb;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP table IF EXISTS userLists;

---- create ----
create table userLists
(
    id INT(10) NOT NULL,
    password VARCHAR(60) NOT NULL,
    PRIMARY KEY (id)
);

---- record of userLists ----
BEGIN;
INSERT INTO `userLists` ('id, password') VALUES ('123, root');
INSERT INTO `userLists` ('id, password') VALUES ('455, root');
COMMIT;

