create database garbage_collector;

CREATE TABLE garbage_collector.users(
  id bigint NOT NULL AUTO_INCREMENT,
  login varchar(150) NOT null,
  password varchar(255) NOT null,
  regdate datetime NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

create table garbage_collector.user_params(
	id bigint NOT NULL AUTO_INCREMENT,
	`user` bigint NOT NULL,
	code varchar(255) NOT null,
	value text,
	PRIMARY KEY (id),
	FOREIGN KEY (`user`) REFERENCES users (id)
);

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
);

CREATE TABLE garbage_collector.claim_params(
	id bigint NOT NULL AUTO_INCREMENT,
	claim bigint NOT NULL,
	code varchar(255) NOT null,
	value text,
	PRIMARY KEY (id),
	FOREIGN KEY (claim) REFERENCES claims (id)
);

create table garbage_collector.delivery_points (
	id bigint NOT NULL AUTO_INCREMENT,
	coord_x int,
	coord_y int,
	adress text,
	`user` bigint,
	PRIMARY KEY (id),
	FOREIGN KEY (`user`) REFERENCES users (id)
);

-- type citizen, collector, admin
insert into users values (null, 'test_user', md5('test_password'), now(), 'citizen'),
	(null, 'test_collector', md5('test_passwd'), now(), 'collector'),
	(null, 'test_collector2', md5('test_passwd2'), now(), 'collector');

create table  garbage_collector.garbage_types (
	id bigint NOT NULL AUTO_INCREMENT,
	name varchar(255),
	unit varchar(255),
	PRIMARY KEY (id)
);

create table  garbage_collector.delivery_point_garbage_types (
	id bigint NOT NULL AUTO_INCREMENT,
	`type` bigint not null,
	point bigint not null,
	PRIMARY KEY (id),
	FOREIGN KEY (`type`) REFERENCES garbage_types (id),
	FOREIGN KEY (point) REFERENCES delivery_points (id)
);
