alter database `tenshoku` character set utf8mb4;
show variables like 'char%';
---- drop ----
DROP TABLE IF EXISTS `mydata`;

---- create ----
create table IF not exists `mydata`
(
 `id` INT(20) AUTO_INCREMENT,
 `name` VARCHAR(40) NOT NULL,
 `mail` VARCHAR(40) DEFAULT NULL,
 `age` INT(3) DEFAULT NULL,
 `created_at`       Datetime DEFAULT NULL,
 `updated_at`       Datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

create table `user_lists`
(
  `user_id` INT(8) AUTO_INCREMENT NOT NULL,
  `user_name` VARCHAR(16) NOT NULL,
  `user_pass` VARCHAR(50) NOT NULL,
  `user_mail` VARCHAR(60) NOT NULL,
  `nationality`	INT(3) NOT NULL,
  `gender` INT(1) NOT NULL,
  `birth` DATE NOT NULL,
  `user_type` INT(1) NOT NULL,
  `create_day` DATE NOT NULL,
  PRIMARY KEY (`user_id`)
) DEFAULT CHARSET=utf8mb4;

create table `workshop_lists`
(
  `shop_id` INT(8) AUTO_INCREMENT NOT NULL,
  `shop_name` VARCHAR(30) NOT NULL,
  `shop_owner` INT(8) NOT NULL,
  `shop_description` VARCHAR(280),
  `create_day`	DATE NOT NULL,
  `shop_img` VARCHAR(200),
  `postal_code` INT(7) NOT NULL,
  `address` VARCHAR(50) NOT NULL,
  `work_mail` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`shop_id`,`shop_owner`)
) DEFAULT CHARSET=utf8mb4;

create table `product_lists`
(
  `product_id` INT(8) AUTO_INCREMENT NOT NULL,
  `shop_id` INT(8) NOT NULL,
  `product_name` VARCHAR(20) NOT NULL,
  `product_name_en` VARCHAR(50) NOT NULL,
  `product_number` INT(4),
  `price`	INT(10) NOT NULL,
  `record_date` DATE NOT NULL,
  `product_detail` VARCHAR(150),
  `product_img` VARCHAR(600),
  `stock` INT(10) NOT NULL,
  `safety` INT(10) NOT NULL,
  `size` VARCHAR(50) NOT NULL,
  `material` VARCHAR(80) NOT NULL,
  `weight` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`product_id`)
) DEFAULT CHARSET=utf8mb4;

create table `order_lists`
(
  `order_number` VARCHAR(50) NOT NULL,
  `user_id` INT(8) NOT NULL,
  `user_name` VARCHAR(16) NOT NULL,
  `shop_id` INT(8) NOT NULL,
  `buy_date`	DATE NOT NULL,
  `countory` VARCHAR(30) NOT NULL,
  `post_address` VARCHAR(50) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `price_all` INT(20),
  `status` INT(1) NOT NULL,
  `buy_type` INT(1) NOT NULL,
  `mail` VARCHAR(60) NOT NULL,
  `tel` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`order_number`,`shop_id`)
) DEFAULT CHARSET=utf8mb4;

create table `order_details`
(
  `order_number` VARCHAR(50) NOT NULL,
  `shop_id` INT(8) NOT NULL,
  `user_id` INT(8) NOT NULL,
  `user_name` VARCHAR(16) NOT NULL,
  `product_id` INT(8) NOT NULL,
  `product_name` VARCHAR(20) NOT NULL,
  `price` INT(10) NOT NULL,
  `count`	INT(4) NOT NULL,
  `proccess` INT(1) NOT NULL,
  PRIMARY KEY (`order_number`,`shop_id`,`product_id`)
) DEFAULT CHARSET=utf8mb4;

create table `line_link`
(
  `user_id` INT(8) NOT NULL,
  `line_id` VARCHAR(60) NOT NULL
) DEFAULT CHARSET=utf8mb4;

create table `discount`
(
  `sale_id` VARCHAR(50) NOT NULL,
  `product_id` INT(8) NOT NULL,
  `shop_id` INT(8) NOT NULL,
  `rate` INT(2) NOT NULL,
  `sale_name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`sale_id`,`product_id`)
) DEFAULT CHARSET=utf8mb4;

create table `cart_list`
(
  `user_id` INT(8) NOT NULL,
  `product_id` INT(8) NOT NULL,
  `count` INT(3) NOT NULL,
  `add_date` DATE NOT NULL,
  PRIMARY KEY (`user_id`,`product_id`)
) DEFAULT CHARSET=utf8mb4;

create table `product_tags`
(
  `product_id` INT(8) NOT NULL,
  `tag` VARCHAR(40) NOT NULL,
  `tag_en` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`product_id`,`tag`)
) DEFAULT CHARSET=utf8mb4;

create table `product_favo`
(
  `user_id` INT(8) NOT NULL,
  `product_id` INT(8) NOT NULL,
  PRIMARY KEY (`user_id`,`product_id`)
) DEFAULT CHARSET=utf8mb4;

create table `shop_favo`
(
  `user_id` INT(8) NOT NULL,
  `shop_id` INT(8) NOT NULL,
  PRIMARY KEY (`user_id`,`shop_id`)
) DEFAULT CHARSET=utf8mb4;

create table `reviews`
(
  `review_id` INT(10) AUTO_INCREMENT NOT NULL,
  `product_id` INT(8) NOT NULL,
  `user_id` INT(8) NOT NULL,
  `evaluation` INT(1) NOT NULL,
  `comment` VARCHAR(120),
  `post_time` TIMESTAMP NOT NULL,
  PRIMARY KEY (`review_id`)
) DEFAULT CHARSET=utf8mb4;

create table `contacts`
(
  `contact_id` INT(10) AUTO_INCREMENT NOT NULL,
  `user_id` INT(8) NOT NULL,
  `contact_date` TIMESTAMP NOT NULL,
  `contact_detail` VARCHAR(500),
  `helper_id` INT(8),
  PRIMARY KEY (`contact_id`)
) DEFAULT CHARSET=utf8mb4;