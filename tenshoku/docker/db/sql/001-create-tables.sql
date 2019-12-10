---- drop ----
DROP TABLE IF EXISTS `userLists`;

---- create ----
create table IF not exists `userLists`
(
 `id`               INT(10) NOT NULL,
 `password`             VARCHAR(60) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
