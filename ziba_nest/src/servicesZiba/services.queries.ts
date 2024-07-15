const servicesQueries = {
    selectAllSpecialties: `select s.id_speciality, s.name speciality,p.id_professional, u.name name,u.lastname lastname
                        from professional p 
                        join users u 
                        join specialties s 
                        on p.id_user = u.id_user 
                        and p.id_speciality = s.id_speciality
                        where u.active = 1;`,
    selectAllServices: `select  s.name speciality , se.name service, se.id_service, se.price, se.description,se.duration
                        from specialties s 
                        join services se
                        on s.id_speciality = se.id_speciality
                        where se.active = 1`,
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
    selectServiceBySpeciality: `select se.id_service, se.name service, se.duration  
                                    from specialties s 
                                    join services se
                                    on se.id_speciality  = s.id_speciality
                                    where se.id_speciality = ?
                                    and se.active = 1`,
    selectCalendarBySpeciality: `select * 
                                    from calendar c
                                    join professional p 
                                    on c.id_professional = p.id_professional 
                                    where p.id_speciality = ?`,
    selectServiceAppointmentsForAdmin: `select se.id_service, se.name service, s.name speciality, u.name, u.lastname, se.price, sum(se.price) profits
                                    from professional p 
                                    join users u 
                                    join specialties s 
                                    join services se
                                    join appointments a
                                    on p.id_user = u.id_user 
                                    and p.id_speciality = s.id_speciality
                                    and se.id_speciality  = s.id_speciality
                                    and a.id_service = se.id_service
                                    where u.active = 1
                                    and se.active = 1
                                    and a.state = 1
                                   	group by se.id_service, se.name, se.price, s.name, u.name, u.lastname ;`,
    selectServiceAppointmentsForProf: `select se.id_service, se.name service, s.name speciality, se.price, sum(se.price) profits, u.name, u.lastname, u.mail, u.phone
                                    from professional p 
                                    join users u 
                                    join specialties s 
                                    join services se
                                    join appointments a                                
                                    on p.id_user = u.id_user 
                                    and p.id_speciality = s.id_speciality
                                    and se.id_speciality  = s.id_speciality
                                    and a.id_service = se.id_service
                                    where u.active = 1
                                    and se.active = 1
                                    and a.state = 1
                                    and p.id_user = ?
                                   	group by se.id_service, se.name, se.price, s.name, u.name, u.lastname, u.mail, u.phone;`,
    selectAllAppointments: `select a.id_appointment, date,hour,u.name, u.lastname, s.name service
                            from appointments a 
                            join users u 
                            join services s 
                            on a.id_user = u.id_user 
                            and a.id_service = s.id_service 
                            where date > sysdate();`,
    selectAppointmentsbyClient: `select a.id_appointment, date,hour,s.name service, s.duration, sp.name speciality, u2.name, u2.lastname 
                                from appointments a 
                                join users u 
                                join services s 
                                join specialties sp
                                join professional p 
                                join users u2
                                on a.id_user = u.id_user 
                                and a.id_service = s.id_service
                                and s.id_speciality = sp.id_speciality 
                                and p.id_speciality = sp.id_speciality 
                                and p.id_user = u2.id_user
                                where u.id_user = ?
                                and date >= sysdate()
                                order by date;`,
    selectAppointmentsbyProf: `select a.id_appointment,a.state,date,hour,s.name service, s.duration, sp.name speciality, u.name, u.lastname, u.phone
                                from appointments a 
                                join users u 
                                join services s 
                                join specialties sp
                                join professional p 
                                join users u2
                                on a.id_user = u.id_user 
                                and a.id_service = s.id_service
                                and s.id_speciality = sp.id_speciality 
                                and p.id_speciality = sp.id_speciality 
                                and p.id_user = u2.id_user
                                where p.id_user = ?
                                and date >= sysdate()
                                order by date;`,
    selectSpecialtiesWhitoutProf: `select s.id_speciality, s.name
                            from specialties s 
                            left join (select p.* from professional p inner join users u on p.id_user = u.id_user where u.active = 1) p
                            on s.id_speciality = p.id_speciality 
                            where p.id_speciality is null`,
    selectServiceById: `select s.id_service, s.duration, s.id_speciality, c.week_day, c.hour_begin ,c.hour_end  
                        from services s
                        join professional p 
                        join calendar c 
                        on s.id_speciality = p.id_speciality
                        and p.id_professional = c.id_professional 
                        where s.id_service = ?`,
    selectAppointmentsByDate: `select a.hour,s.duration,s.duration/30 cantidad
                                from appointments a 
                                join services s 
                                on a.id_service = s.id_service 
                                where date = ?
                                and s.id_speciality  = ?;`,
    selectAppointmentsByClientAndDate: `select a.hour,s.duration,s.duration/30 cantidad
                                        from appointments a 
                                        join services s 
                                        on a.id_service = s.id_service 
                                        where date = ?
                                        and a.id_user  = ?;`,
    insertService: `insert into services (name,id_speciality,description,price,duration, active) 
	                    values (?,?, ?, ?, ?, 1); `,
    insertAppointment: 'insert into appointments (date,hour,id_user,id_service,state) values (?,?,?,?,0);',
    updateService: `update services 
                set name = ?,id_speciality = ?,description = ?,price = ?,duration = ?
                where id_service = ?;`,
    deleteService: `update services set active = 0 where id_service = ?`,
    deleteAppointmentsbyService: 'delete from appointments where id_service = ? and date >= sysdate() and state = 0;',
    deleteAppointment: 'delete from appointments where id_appointment = ?',
    updateAppointment: 'update appointments set state = 1 where id_appointment = ?'
}
export default servicesQueries;