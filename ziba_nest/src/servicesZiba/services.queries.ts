const servicesQueries = {
    selectAllSpecialties: `select s.id_speciality, s.name speciality,u.name name,u.lastname lastname
                        from professional p 
                        join users u 
                        join specialties s 
                        on p.id_user = u.id_user 
                        and p.id_speciality = s.id_speciality
                        where u.active = 1;`,
    selectAllServices:`select  s.name speciality , se.name service
                        from specialties s 
                        join services se
                        on s.id_speciality = se.id_speciality
                        where se.active = 1;`,
    selectServiceWithSpeciality: `select se.id_service, se.name service,se.description, s.name speciality ,u.name,u.lastname, se.price
                                    from professional p 
                                    join users u 
                                    join specialties s 
                                    join services se
                                    on p.id_user = u.id_user 
                                    and p.id_speciality = s.id_speciality
                                    and se.id_speciality  = s.id_speciality
                                    where u.active = 1
                                    and se.active = 1;`,
    selectAllAppointments:`select a.id_appointment, date,hour,u.name, u.lastname, s.name service
                            from appointments a 
                            join users u 
                            join services s 
                            on a.id_user = u.id_user 
                            and a.id_service = s.id_service 
                            where date > sysdate();`,
    selectSpecialtiesWhitoutProf:`select s.id_speciality, s.name
                            from specialties s 
                            left join (select p.* from professional p inner join users u on p.id_user = u.id_user where u.active = 1) p
                            on s.id_speciality = p.id_speciality 
                            where p.id_speciality is null`,
    insertService: `insert into services (name,id_speciality,description,price,duration, active) 
	                    values (?,?, ?, ?, ?, 1); `,
    updateService:`update services 
                set name = ?,id_speciality = ?,description = ?,price = ?,duration = ?
                where id_service = ?;`,
    deleteService: `update services set active = 0 where id_service = ?`,
    deleteAppointmentsbyService:'delete from appointments where id_service = ? and date >= sysdate() and state = 0;' ,
    deleteAppointment: 'delete from appointments where id_appointment = ?'
}
export default servicesQueries;