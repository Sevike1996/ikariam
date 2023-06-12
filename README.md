# Ikariam battle simulator

This is a part of a bigger project, where I try to recreate the online strategy game "Ikariam".  
Some of the code is available on GitHub, but the battle calculator is missing.

## Setup

To compile the simulator:
```sh
make -C sim -j 4
```

To setup the mysql server in a docker, with persistent volume in `/tmp`
```sh
mkdir -p /tmp/mysqld && sudo chown 999:999 /tmp/mysqld
docker run --rm --name some-mysql -v /tmp/mysqld:/var/run/mysqld/ -e MYSQL_ALLOW_EMPTY_PASSWORD=1 mysql:latest
```

Initialize the database
```sh
mysql --socket=/tmp/mysqld/mysqld.sock -u root -e "create database ik_game;"
cat sim/{clean,battle}.sql |  mysql --socket=/tmp/mysqld/mysqld.sock -u root ik_game
```

To run a php server that will serve the static pages + load simulator round data:
```sh
(cd server && php -S localhost:5000)
```

And finally, run the simulator:
```sh
./sim/bin/simulator
```

## Progress status

* Reserve button [DONE]
* Split rounds to jsons [DONE]
* Load rounds from previous round json [DONE]
* Bulk round calculation
* Benchmark
* PHP to support json [DONE]
* Better battle testing
* Larger battle UI checking
* Export API to delete round from BlobFS
* PHP extension integration

## Missing features

* Round morale. Armies will fight forever.
* Multiple player battles.
