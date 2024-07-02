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

insert into specialties (name) values ('Cosmetología');
insert into specialties (name) values ('Peluquería');
insert into specialties (name) values ('Maquillaje');
insert into specialties (name) values ('Manicuría');
insert into specialties (name) values ('Masoterapia');
insert into specialties (name) values ('Depilación');
insert into specialties (name) values ('Cejas y pestañas');


insert into professional (id_speciality,id_user) values (1,2);
insert into professional (id_speciality,id_user) values (2,3);
insert into professional (id_speciality,id_user) values (3,4);
insert into professional (id_speciality,id_user) values (4,5);
insert into professional (id_speciality,id_user) values (5,6);
insert into professional (id_speciality,id_user) values (6,7);

/*["Limpieza facial", "Peeling facial","Drenaje linfático","Peeling corporal", "Tratamiento para celulitis", "Drenaje linfático corporal"]/
*/
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Limpieza facial",1, " La limpieza facial profunda es un procedimiento de mantenimiento que elimina todas las impurezas que se encuentran en la piel generadas por el mismo cuerpo y por el ambiente.  Es importante realizarse una limpieza facial para dar brillo y vitalidad a la piel, hidratar y nutrir tu piel, mejorar la uniformidad y la textura de la piel, evitar la aparición de imperfecciones como espinillas y puntos negros, prevenir enfermedades cutáneas causadas por bacterias e impurezas.", 7500, 30, 1); 
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Peeling facial",1, "Un peeling es un proceso de exfoliación de la piel, que consiste en eliminar las células muertas de las capas superficiales de la piel, que en muchos casos contienen melanina y provoca que se vean manchas en la piel. Gracias a un peeling, conseguiremos renovar nuestra piel correctamente, eliminaremos impurezas y unificaremos el tono, reduciendo también pequeñas manchas causadas por el sol. Además, mejoraremos la luminosidad y textura de la piel.", 10000, 60, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Drenaje linfático",1, "El drenaje linfático facial activa la circulación de los líquidos del cuerpo hacia los ganglios linfáticos mediante un masaje manual con movimientos suaves y ligeros usando las yemas de los dedos. Sus beneficios son la reducción de la hinchazón y la inflamación, mejora la circulación sanguínea, desintoxica la piel, relaja y reduce el estrés, mejora la elasticidad y tono de la piel, alivia problemas sinusales y acelera cicatrizaciones.", 12000, 60, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Peeling corporal",1, "El peeling corporal es un tratamiento estético que consiste en la exfoliación profunda de la piel del cuerpo, este procedimiento puede realizarse mediante productos químicos, como ácidos exfoliantes, o mediante métodos físicos, como exfoliantes con partículas abrasivas o dispositivos de microdermoabrasión. Sus beneficios son la eliminación de células muertas, mejorar la textura de la piel, estimular la regeneración celular, reducir las imperfecciones, mejorar la hidratación de la piel, estimular la circulación sanguínea y prevenir la formación de pelos encarnados.", 15000, 90, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Drenaje linfático corporal",1, "El drenaje linfático corporal es una técnica de masaje suave y rítmico que se enfoca en estimular el flujo de la linfa a lo largo de todo el cuerpo. Este masaje se realiza siguiendo la dirección de los canales linfáticos para promover la circulación de la linfa, ayudando a eliminar toxinas y desechos del cuerpo y mejorando el funcionamiento del sistema inmunológico.", 15000, 90, 1);
	
	/*["Corte", "Nutrición","Keratina","Peinados","Tinte","Balayage"]},*/
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Corte",2, "Cortarse el cabello regularmente, tiene sus beneficios como la eliminación de puntas abiertas, el cual previene que se extienda el daño, el mismo crezca más fuerte y saludable.", 7000, 30, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Nutrición",2, "Realizarse una nutrición capilar de manera mensual ofrece muchos beneficios como la hidratación profunda, reparación y fortalecimiento del cabello, mejora del brillo y suavidad, protección contra futuros daños causados por la exposición al sol, factores ambientales o la utilización de planchas y secador de pelo.", 7000, 30, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Keratina",2, "La keratina es un tratamiento capilar el cual alisa y suaviza el cabello, al dejarlo más liso y manejable reduce el tiempo de peinado y secado. También ayuda a mantenerlo hidratado y con más brillo. El tratamiento puede durar de tres a cinco meses, dependiendo del cabello. ", 8000, 30, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Peinados",2, "Realizarse un peinado en la peluquería para eventos ofrece numerosos beneficios en términos de profesionalismo, durabilidad y adaptación a la ocasión. Elegir el peinado adecuado puede mejorar significativamente la apariencia y la confianza, asegurando que se luzca perfecta para cualquier evento especial.", 12000, 60, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Color",2, "Los estilistas profesionales pueden ofrecerte asesoramiento personalizado sobre qué tonos y técnicas de coloración serán los más favorecedores para tu tono de piel, tipo de cabello y estilo personal.", 17000, 120, 1);
	
	/* ["Novias","Quinceañeras","Social","Modelaje","Artitistico infantil","Artistico teatral"]*/
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Novias",3, "En Zibá, entendemos que el día de tu boda es uno de los momentos más especiales de tu vida, y queremos asegurarnos de que luzcas radiante y te sientas completamente segura con tu maquillaje. Nuestros servicios de maquillaje profesional para novias están diseñados para resaltar tu belleza natural y complementar tu estilo personal, adaptándonos a cada preferencia y tipo de piel.", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Quinceañeras",3, "En Zibá, comprendemos que los quince años marcan un momento especial en la vida de una joven, y queremos asegurarnos de que este día sea aún más memorable con un maquillaje profesional que realce su belleza natural y celebre su estilo único. Nuestros servicios de maquillaje para quinceañeras están diseñados para capturar la esencia juvenil y fresca, adaptándonos a cada preferencia personal y tipo de piel.", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Social",3, "Ofrecemos un servicio especializado en maquillaje social que resalta la belleza natural de nuestros clientes para cualquier ocasión. Nuestros expertos utilizan productos de alta calidad y técnicas avanzadas para crear looks personalizados que se adapten a cada estilo y preferencia.", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Modelaje",3, "En nuestro centro de estética  brindamos un servicio especializado en maquillaje para modelaje, diseñado para realzar las características únicas de cada modelo y cumplir con las exigencias del mundo de la moda. Nuestros maquilladores emplean técnicas avanzadas y productos de alta gama para crear looks que se adapten perfectamente a las pasarelas y sesiones fotográficas.", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Artitistico infantil",3, "En nuestra estética ofrecemos un servicio seguro y divertido de maquillaje artístico para niños, ideal para fiestas y eventos especiales. Nuestros maquilladores utilizan productos hipoalergénicos y de calidad para crear diseños coloridos y temáticos que capturan la imaginación de los pequeños", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Artistico teatral",3, "En zibá ofrecemos un servicio especializado en maquillaje artístico teatral, diseñado para resaltar personajes y emociones en el escenario.", null, null, 1);
	
	/*["Spa de manos","Semipermanente","Soft gel","Nail art","Caping"]*/
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Spa de manos",4, "Es un servicio que combina varios tratamientos diseñados para mejorar la apariencia y salud de las manos y las uñas. Los servicios típicos incluyen: exfoliación, hidratación y masajes relajantes.", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Semipermanente",4, "El esmaltado semipermanente es un tipo de esmalte que se aplica como un esmalte tradicional, pero se cura bajo una lámpara UV o LED para secarse y endurecerse. Este proceso crea una capa más resistente y duradera en comparación con el esmalte de uñas normal.", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Soft gel",4, "El soft gel es un tipo de gel para uñas que se diferencia de otros productos como el gel tradicional o el acrílico por su consistencia más suave y flexible. Este tipo de gel está especialmente formulado para proporcionar una capa protectora y estética sobre las uñas naturales o extensiones de uñas.", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Nail art",4, "El nail art es una práctica creativa que consiste en decorar las uñas con diseños elaborados, patrones y colores que van más allá del simple esmaltado tradicional. Puede incluir una amplia variedad de técnicas y estilos, desde diseños geométricos y abstractos hasta motivos florales, dibujos animados, degradados de colores, pedrería, y más.", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Caping",4, "El capping se refiere a la aplicación de una capa adicional de gel o acrílico sobre las uñas naturales o extensiones de uñas para proporcionar una protección adicional y mejorar su durabilidad. Esta técnica se utiliza principalmente en el proceso de aplicación de uñas de gel o acrílicas para asegurar que las uñas sean fuertes y resistentes.", null, null, 1);
	
	/*"Masaje terapéutico","Masaje circulatorio","Masaje deportivo","Masaje descontracturante","Masaje lifático"*/
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Masaje terapéutico",5, "El masaje terapéutico es una forma de manipulación de los tejidos blandos del cuerpo que tiene como objetivo aliviar el dolor, reducir el estrés y mejorar la salud general. Utilizando técnicas específicas como el amasamiento, la fricción y la aplicación de presión controlada, este tipo de masaje puede ayudar a mejorar la circulación sanguínea, relajar los músculos tensos y promover la recuperación de lesiones", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Masaje circulatorio",5, "El masaje circulatorio es una técnica terapéutica centrada en mejorar la circulación sanguínea y linfática del cuerpo. Mediante movimientos suaves y rítmicos, se estimula el flujo de sangre hacia y desde el corazón, lo que ayuda a eliminar toxinas y mejorar el transporte de nutrientes por todo el cuerpo", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Masaje deportivo",5, "El masaje deportivo es una técnica especializada diseñada para atletas y personas activas. Se enfoca en preparar los músculos antes de la actividad física, mejorar el rendimiento durante el ejercicio y acelerar la recuperación después del entrenamiento o competición.", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Masaje descontracturante",5, "El masaje descontracturante es una técnica terapéutica enfocada en aliviar contracturas musculares y puntos de tensión. Mediante la aplicación de presión firme y profunda sobre áreas específicas del cuerpo, se busca liberar nudos musculares y mejorar la circulación sanguínea en la zona afectada. ", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Masaje lifático",5, "El masaje linfático es una técnica terapéutica diseñada para estimular el sistema linfático, que es responsable de eliminar toxinas y desechos del cuerpo. A través de movimientos suaves y ritmicos, se busca mejorar el flujo de la linfa, reducir la retención de líquidos y fortalecer el sistema inmunológico.", null, null, 1);
	
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Axilas",6, "La depilación láser en axilas es un tratamiento estético que utiliza pulsos de luz intensa para eliminar el vello no deseado de manera permanente o prolongada. Este método es eficaz, cómodo y puede reducir significativamente el vello en pocas sesiones, ofreciendo resultados duraderos y una piel más suave.", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Pierna entera",6, "La depilación laser en las piernas es una opción popular debido a su eficacia, comodidad y capacidad para proporcionar una piel suave y libre de vello por períodos prolongados, haciendo que sea una alternativa conveniente a los métodos tradicionales de depilación como el afeitado o la depilación con cera.", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Brazos",6, "La depilación láser en brazos es una opción popular para quienes buscan una solución duradera y efectiva para la eliminación del vello, proporcionando beneficios estéticos y prácticos a largo plazo.", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Cavado",6, "La depilación láser en cavado es un procedimiento estético que utiliza tecnología láser para eliminar el vello no deseado en la zona del bikini o cavado. Este método es eficaz para proporcionar resultados duraderos y suaves, minimizando la necesidad de métodos de depilación temporales como el afeitado o la depilación con cera. ", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Bozo",6, "La depilación láser en bozo es un procedimiento en el que se aplica un láser específico en la zona del labio superior para destruir el folículo piloso. Esto reduce el crecimiento del vello de manera efectiva y duradera.", null, null, 1);
	
insert into calendar (id_professional,week_day,hour_begin,hour_end) values (1,'Lunes','10:00:00','16:00:00');
insert into calendar (id_professional,week_day,hour_begin,hour_end) values (1,'Martes','10:00:00','16:00:00');
insert into calendar (id_professional,week_day,hour_begin,hour_end) values (2,'Lunes','10:00:00','16:00:00');
insert into calendar (id_professional,week_day,hour_begin,hour_end) values (3,'Lunes','10:00:00','16:00:00');
insert into calendar (id_professional,week_day,hour_begin,hour_end) values (4,'Lunes','10:00:00','16:00:00');
insert into calendar (id_professional,week_day,hour_begin,hour_end) values (5,'Lunes','10:00:00','16:00:00');
insert into calendar (id_professional,week_day,hour_begin,hour_end) values (6,'Martes','11:00:00','18:00:00');

insert into appointments (date,hour,id_user,id_service,state) values ('2024-06-29', '14:00:00',2,2,0);
insert into appointments (date,hour,id_user,id_service,state) values ('2024-06-29', '13:00:00',2,1,0);
insert into appointments (date,hour,id_user,id_service,state) values ('2024-06-25', '13:00:00',13,6,0);
insert into appointments (date,hour,id_user,id_service,state) values ('2024-06-17', '13:00:00',12,7,0);
insert into appointments (date,hour,id_user,id_service,state) values ('2024-06-20', '13:00:00',3,12,0);