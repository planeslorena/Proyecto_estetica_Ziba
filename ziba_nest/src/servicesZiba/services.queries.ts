const servicesQueries = {
    selectAllSpecialties: `select s.name speciality,u.name name,u.lastname lastname
                        from professional p 
                        join users u 
                        join specialties s 
                        on p.id_user = u.id_user 
                        and p.id_speciality = s.id_speciality;`,
    selectAllServices:`select  s.name speciality , se.name service
                        from specialties s 
                        join services se
                        join professional_service ps 
                        on s.id_speciality = se.id_speciality 
                        and se.id_service = ps.id_service; `
}

export default servicesQueries;