/*role: admin, client, prof*/
/*password: admin2024 */
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('admin@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','Lorena', 'Planes',31094435,2284230375,'admin',1);
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('marisaruiz@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','Marisa', 'Ruiz',29365478,2284562541,'prof',1);
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('ireneacosta@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','Irene', 'Acosta',30698521,2284659874,'prof',1);
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('evagimenez@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','Eva', 'Gimenez',36854795,2284552518,'prof',1);
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('maitensuarez@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','Maiten', 'Suarez',41025698,2281362514,'prof',1);
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('naomialmeida@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','Naomi', 'Almeida',45986547,2284354152,'prof',1);
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('rominabenegas@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','Romina', 'Benegas',31258741,2284254178,'prof',1);

insert into specialties (name) values ('cosmetología');
insert into specialties (name) values ('peluquería');
insert into specialties (name) values ('maquillaje');
insert into specialties (name) values ('manicuría');
insert into specialties (name) values ('masoterapia');
insert into specialties (name) values ('depilación');

insert into professional (id_speciality,id_user) values (1,2);
insert into professional (id_speciality,id_user) values (2,3);
insert into professional (id_speciality,id_user) values (3,4);
insert into professional (id_speciality,id_user) values (4,5);
insert into professional (id_speciality,id_user) values (5,6);
insert into professional (id_speciality,id_user) values (6,7);

insert into services (name,id_speciality ,description, benefits,price, active) 
values ("Limpieza facial",1, "agregar descripcion", null, null, 1); 
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Peeling facial",1, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Drenaje linfático",1, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Peeling corporal",1, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Tratamiento para celulitis",1, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Drenaje linfático corporal",1, "agregar descripcion", null, null, 1);

insert into services (name,id_speciality, description, benefits,price, active) 
values ("Corte",2, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Nutrición",2, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Keratina",2, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Peinados",2, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Color",2, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Balayage",2, "agregar descripcion", null, null, 1);

insert into services (name,id_speciality, description, benefits,price, active) 
values ("Novias",3, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Quinceañeras",3, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Social",3, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Modelaje",3, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Artitistico infantil",3, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Artistico teatral",3, "agregar descripcion", null, null, 1);

insert into services (name,id_speciality, description, benefits,price, active) 
values ("Spa de manos",4, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Semipermanente",4, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Soft gel",4, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Nail art",4, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Caping",4, "agregar descripcion", null, null, 1);

insert into services (name,id_speciality, description, benefits,price, active) 
values ("Masaje terapéutico",5, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Masaje circulatorio",5, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Masaje deportivo",5, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Masaje descontracturante",5, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Masaje lifático",5, "agregar descripcion", null, null, 1);

insert into services (name,id_speciality, description, benefits,price, active) 
values ("Axilas",6, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Pierna entera",6, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Media pierna",6, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Cavado",6, "agregar descripcion", null, null, 1);
insert into services (name,id_speciality, description, benefits,price, active) 
values ("Bozo",6, "agregar descripcion", null, null, 1);

insert into professional_service (id_professional, id_service) values (1,1);
insert into professional_service (id_professional, id_service) values (1,2);
insert into professional_service (id_professional, id_service) values (1,3);
insert into professional_service (id_professional, id_service) values (1,4);
insert into professional_service (id_professional, id_service) values (1,5);
insert into professional_service (id_professional, id_service) values (1,6);

insert into professional_service (id_professional, id_service) values (2,7);
insert into professional_service (id_professional, id_service) values (2,8);
insert into professional_service (id_professional, id_service) values (2,9);
insert into professional_service (id_professional, id_service) values (2,10);
insert into professional_service (id_professional, id_service) values (2,11);
insert into professional_service (id_professional, id_service) values (2,12);

insert into professional_service (id_professional, id_service) values (3,13);
insert into professional_service (id_professional, id_service) values (3,14);
insert into professional_service (id_professional, id_service) values (3,15);
insert into professional_service (id_professional, id_service) values (3,16);
insert into professional_service (id_professional, id_service) values (3,17);
insert into professional_service (id_professional, id_service) values (3,18);

insert into professional_service (id_professional, id_service) values (4,19);
insert into professional_service (id_professional, id_service) values (4,20);
insert into professional_service (id_professional, id_service) values (4,21);
insert into professional_service (id_professional, id_service) values (4,22);
insert into professional_service (id_professional, id_service) values (4,23);

insert into professional_service (id_professional, id_service) values (5,24);
insert into professional_service (id_professional, id_service) values (5,25);
insert into professional_service (id_professional, id_service) values (5,26);
insert into professional_service (id_professional, id_service) values (5,27);
insert into professional_service (id_professional, id_service) values (5,28);

insert into professional_service (id_professional, id_service) values (6,29);
insert into professional_service (id_professional, id_service) values (6,30);
insert into professional_service (id_professional, id_service) values (6,31);
insert into professional_service (id_professional, id_service) values (6,32);
insert into professional_service (id_professional, id_service) values (6,33);