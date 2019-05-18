create database garbage_collector;
/*
drop table garbage_collector.delivery_point_garbage_types;
drop table garbage_collector.garbage_types;
drop table garbage_collector.delivery_points;
drop table garbage_collector.claim_params;
drop table garbage_collector.claims;
drop table garbage_collector.user_params;
drop table garbage_collector.users;
*/
CREATE TABLE garbage_collector.users(
  id bigint NOT NULL AUTO_INCREMENT,
  login varchar(150) NOT null,
  password varchar(255) NOT null,
  regdate datetime NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (id)
)DEFAULT CHARACTER SET utf8;

create table garbage_collector.user_params(
	id bigint NOT NULL AUTO_INCREMENT,
	`user` bigint NOT NULL,
	code varchar(255) NOT null,
	value text,
	PRIMARY KEY (id),
	FOREIGN KEY (`user`) REFERENCES users (id)
)DEFAULT CHARACTER SET utf8;

CREATE TABLE garbage_collector.claims (
	id bigint NOT NULL AUTO_INCREMENT,
	create_time datetime NOT NULL,
	state bigint NOT NULL,
	creator bigint NOT NULL,
	executor bigint,
	update_time datetime,
	PRIMARY KEY (id),
	FOREIGN KEY (creator) REFERENCES users (id),
	FOREIGN KEY (executor) REFERENCES users (id)
)DEFAULT CHARACTER SET utf8;

CREATE TABLE garbage_collector.claim_params(
	id bigint NOT NULL AUTO_INCREMENT,
	claim bigint NOT NULL,
	code varchar(255) NOT null,
	value text,
	PRIMARY KEY (id),
	FOREIGN KEY (claim) REFERENCES claims (id)
)DEFAULT CHARACTER SET utf8;

create table garbage_collector.delivery_points (
	id bigint NOT NULL AUTO_INCREMENT,
	coord_x int,
	coord_y int,
	adress text,
	`user` bigint,
	PRIMARY KEY (id),
	FOREIGN KEY (`user`) REFERENCES users (id)
) DEFAULT CHARACTER SET utf8;
-- type citizen, collector, admin
insert into garbage_collector.users values (null, 'test_user', md5('test_password'), now(), 'citizen'),
	(null, 'test_collector', md5('test_passwd'), now(), 'collector'),
	(null, 'test_collector2', md5('test_passwd2'), now(), 'collector');

create table  garbage_collector.garbage_types (
	code varchar(255) NOT NULL,
	name varchar(255),
	unit varchar(255),
	PRIMARY KEY (code)
)DEFAULT CHARACTER SET utf8;

create table  garbage_collector.delivery_point_garbage_types (
	id bigint NOT NULL AUTO_INCREMENT,
	`type` varchar(255) not null,
	point bigint not null,
	PRIMARY KEY (id),
	FOREIGN KEY (`type`) REFERENCES garbage_types (code),
	FOREIGN KEY (point) REFERENCES delivery_points (id)
)DEFAULT CHARACTER SET utf8;

insert into garbage_types values ('glass', 'Стекло', 'кг'), ('plastic', 'Пластик', 'кг'), ('metal', 'Метал', 'кг');

insert into garbage_collector.delivery_points values (null, null, null, 'Тестовая улица дом 1', 2), (null, null, null, 'Тестовая улица дом 31', 2);
insert into delivery_point_garbage_types values (null, 'glass', 1), (null, 'glass', 2), (null, 'plastic', 2);