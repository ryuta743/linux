FROM mariadb:latest
# EXPOSE: 3306
# ADD ./my.cnf /etc/mysql/conf.d/my.cnf
COPY my.cnf /etc/mysql/conf.d/
RUN sed -e 's/^ *user *= *mysql$/user = root/' -i /etc/mysql/conf.d/my.cnf