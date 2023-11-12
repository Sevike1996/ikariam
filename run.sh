#!/bin/sh
mkdir -p /tmp/mysqld && sudo chown 999:999 /tmp/mysqld
docker-compose up -d
docker-compose logs -f | sed "/\/usr\/sbin\/mysqld: ready for connections/ q"
# docker-compose logs -f | sed "/foobar/ q"
mysql --socket=/tmp/mysqld/mysqld.sock -u root -e "create database ik_game;"
cat sim/{clean,battle}.sql |  mysql --socket=/tmp/mysqld/mysqld.sock -u root ik_game
history -s 'cat sim/{clean,battle}.sql |  mysql --socket=/tmp/mysqld/mysqld.sock -u root ik_game'
