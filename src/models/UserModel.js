const db = require('../configs/connect')
const get_all = function (result) {
    db.query("SELECT * FROM account", function(err, account) {
        if(err) {
            result (null)
        }
        else {
            result (account)
        }
    })
}

const login = async (Acc,Pass,result) => {
    await db.query(`SELECT * FROM account WHERE Acc=? AND Pass=?`,[Acc,Pass], function(err, res){
        if(err) {
            result (null)
            return
        }
        if(res.length) {
            result (null,res[0])
            return
        }
        result (null,null)
    })
}
// INSERT INTO `account` (`idAcc`, `Acc`, `Pass`, `Access`) VALUES
const register = async (Acc, Pass) => {
    await db.query('INSERT INTO account (Acc, Pass)  VALUE(?,?)',[Acc,Pass])
}
const insert = async (Acc,Pass,Access) => {
    await db.query('INSERT INTO account (Acc, Pass, Access)  VALUE(?,?,?)',[Acc,Pass,Access])
}
const deleteuser = async (id) => {
    await db.query('DELETE  FROM account WHERE idAcc = ?',[id])
} 
const getUserId = function (id, callback)  {
    db.query('SELECT * FROM account WHERE idAcc=?',[id], function(err,data) {
       if(err) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
} 
const updateUser = async (Acc,Pass,Access,idAcc) => {
    await db.query('UPDATE account SET Acc = ?,Pass = ?,Access = ? WHERE idAcc = ?',[Acc,Pass,Access,idAcc])
} 
module.exports = {
    get_all,
    login,
    register,
    insert,
    deleteuser,
    getUserId,
    updateUser,
}