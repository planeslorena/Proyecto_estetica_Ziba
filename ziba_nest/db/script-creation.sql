create schema if not exists ziba;

use ziba;

create table if not exists users (
	id_user int not null auto_increment,
	mail varchar(100) not null,
	password varchar(200) not null,
	name varchar (100) not null,
	lastname varchar(100) not null,
	dni int not null,
	phone bigint not null,
	/*role: admin, client, prof*/
	role varchar(10) not null,
	active bit not null, 
	primary key (id_user),
	constraint UK_user_mail unique key (mail)
);

create table if not exists specialties (
	id_speciality int not null auto_increment,
	name varchar(100) not null,
	primary key (id_speciality)
);

create table if not exists professional (
	id_professional int not null auto_increment,
	id_user int not null,
	id_speciality int not null,
	primary key (id_professional),
	constraint FK_prof_users foreign key (id_user) references users(id_user),
	constraint FK_prof_specialties foreign key (id_speciality) references specialties(id_speciality)
);

create table if not exists services (
	id_service int not null auto_increment,
	name varchar(100) not null,
	id_speciality int not null,
	description varchar(1000) not null,
	price float,
	duration int,
	active bit not null,
	primary key (id_service),
	constraint FK_service_specialties foreign key (id_speciality) references specialties(id_speciality)
);

create table if not exists calendar (
	id_calendar int not null auto_increment,
	id_professional int not null,
	week_day varchar(10) not null,
	hour_begin time not null ,
	hour_end time not null,
	primary key (id_calendar),
	constraint FK_calendar_services foreign key (id_professional) references professional(id_professional),
	constraint UK_professional_day unique key (id_professional,week_day)
);

create table if not exists appointments (
	id_appointments int not null auto_increment,
	date date not null,
	hour time not null,
	id_user int not null ,
	id_service int not null,
	/*0-reservado 1-atendido*/
	state bit not null,
	primary key (id_appointments),
	constraint FK_appointments_services foreign key (id_service) references services(id_service),
	constraint FK_appointments_user foreign key (id_user) references users(id_user)
);