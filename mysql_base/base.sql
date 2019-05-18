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