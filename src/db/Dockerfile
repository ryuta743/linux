#FROM mysql:latest
FROM mysql:5.6
#FROM mysql:5.7
#FROM mariadb

#COPY /cnf/my.cnf /etc/mysql/conf.d
COPY ./sql/001-create-tables.sql /docker-entrypoint-initdb.d
COPY ./sql/002-insert-records.sql /docker-entrypoint-initdb.d
#COPY ./src/db/data /var/lib/mysql

#ENV MYSQL_ROOT_PASSWORD=root \
#MYSQL_DATABASE=tenshoku

#CMD [ "mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]