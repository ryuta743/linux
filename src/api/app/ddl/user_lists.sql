create tables user_lists(
    user_id INT(8) AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(16) NOT NULL,
    user_pass VARCHAR(50) NOT NULL,
    user_mail VARCHAR(60) NOT NULL,
    nationality	INT(3) NOT NULL,
    gender INT(1) NOT NULL,
    birth DATE NOT NULL,
    user_type INT(1) NOT NULL,
    create_day DATE NOT NULL,
    PRIMARY KEY (user_id)
)