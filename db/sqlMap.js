var sqlMap = {
    user: {
        add: 'insert into loginregisterstore (username, email, password) values (?,?,?)',
        select: 'select * from loginregisterstore'
    }
}

module.exports = sqlMap;