const Account = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { use } = require('../routes/user')
exports.index = function (req, res)  {
        Account.get_all(function(data) {
            res.render('bodyadmin', {data})
        })
    }

exports.login = async (req, res) => {
    const {inputacc, inputpass} = req.body;
    if (inputacc && inputpass) { 
        await Account.login(inputacc,inputpass,(err,user)=>{
            if(user) {
                req.session.Acc = user.Acc
                req.session.Access = user.Access
                req.session.idAcc = user.idAcc
                if(user.Access == 0) {
                    res.redirect('/')
                }
                else {
                    res.redirect('/user/admin')
                }
                
            }
            else {
                res.send('loi')
            }
        })
    }
}

exports.register = async (req, res) => {
    const {Acc, Pass, Passn, Access} = req.body;
    var check = 0
    if (Pass === Passn)
    {
        await Account.insert(Acc,Pass,Access)
        check = 1
        res.render('product', {check})
    }
    else{
        alert('Nhập lại mật khẩu không đúng')
    }
}
exports.logout = async (req, res) => {
    req.session.destroy();
    res.redirect("/")
}
exports.showClient = async (req, res) => {
    const id = req.params.id
    res.render('product' , {id})
}
exports.showAdmin = async (req, res) => {
    res.render('bodyadmin',{layout: 'admin'})
}
exports.showListUser = function (req, res) {
    Account.get_all(function(data) {
    const count = data.filter(item => typeof item === 'object').length;
    var trang = count / 5;
    var page = req.params.page;
    var from = (page - 1) * 5;
    var to = from + 4;
    var datapage = [];
    for (let i = from; i <= to; i++) {
        if (!data[i]) {
            break
        }
        datapage.push(data[i])
    }
        res.render('listuser', {datapage,trang,from,to, layout: 'admin'})
    })
}
exports.showform = async (req, res) => {
        res.render('insertuser', {layout: 'admin'})
}
exports.insertUser = async (req, res) => {
    const {Acc, Pass, Pass1, Access} = req.body;
    if (Pass === Pass1)
    {
        await Account.insert(Acc,Pass,Access)
        res.redirect('/user/listuser/1')
    }
    else{
        alert('Nhập lại mật khẩu không đúng')
    }
}
exports.deleteUser = async (req, res) => {
    const id = req.params.iduser
    await Account.deleteuser(id)
    res.redirect('/user/listuser/1')
}
exports.showupdateUser = function (req, res) {
    const id = req.params.iduser
    Account.getUserId(id, function (data){
        res.render('updateuser', {data, layout: 'admin'})
    })
}
exports.update = async (req, res) => {
    const {Acc,Pass,Access,idAcc} = req.body
    await Account.updateUser(Acc,Pass,Access,idAcc)
    res.redirect('/user/listuser/1')
}