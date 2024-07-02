const userQueries = {
    selectUserByMail: 'select * from users where mail = ? and active = 1',
    insertUser: `insert into users (mail,password,name,lastname,dni,phone,role,active) values (?,?,?,?,?,?,?,1);`,
}

export default userQueries;