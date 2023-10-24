const Product = require('../models/ProductModel')
const bcrypt = require('bcrypt')
exports.index = function (req, res) {
    var nguoidung = 0
    var user = 'user'
    var type = 0
    if(req.session.Acc){
        nguoidung = 1;
        user = req.session.Acc;
    }
    
    Product.getAllProduct(function(data) {
        // Phân Trang
        const count = data.filter(item => typeof item === 'object').length;
        var trang = count / 10;
        var page = 1;
        var trangn = []
        for (let i = 0; i<=trang+1; i++) {
            trangn.push(i)
        }
        if(req.params.page){
         page = req.params.page;
        }
        var from = (page - 1) * 10;
        var to = from + 9;
        var datapage = [];
        for (let i = from; i <= to; i++) {
            if (!data[i]) {
                break
            }
            datapage.push(data[i])
        }
        Product.getAllCategory(function(category) {           
            res.render('product', {datapage,category,nguoidung,user,trang,from,to,page,type})
        })
    })
}
exports.showlist = async (req, res) => {
    Product.getAllProduct(function(data) {
     return res.status(200).json({
        massege: 'thanh cong',
        data: data
     })
    })
}
exports.showform = async (req, res) => {
    Product.getAllCategory(function(category) {
        res.render('insertsp', {category,layout: 'admin'})
    })
}
exports.insert = async (req, res) => {
        const {tenSP, giaSP, hinhSP, tsSP, idNhom} = req.body;
        await Product.insert(tenSP,giaSP,hinhSP,tsSP,idNhom)
        if(!tenSP||!giaSP||!hinhSP||!tsSP||!idNhom) {
            return res.status(200).json({
                massege: 'that bai',
             })
        }
        else {
            return res.status(200).json({
                massege: 'thanh cong',
             })
        }

}
exports.deleteproduct = async (req, res) => {
    const id = req.params.idsp
    if(!id){
        return res.status(200).json({
            massege: 'that bai',
         })
    }
    await Product.deletesp(id)
    return res.status(200).json({
        massege: 'Thanh Cong',
     })
}
exports.showupdatesp = function (req, res) {
    Product.getProductId(req.params.idsp, function(data) {
        Product.getAllCategory(function(category) {
            res.render('updatesp', {data,category,layout: 'admin'})
        })
    })
}
exports.updatesp = async (req, res) => {
    const {tenSP,giaSP,hinhSP,tsSP,idNhom,id} = req.body
    await Product.updatesp(tenSP,giaSP,hinhSP,tsSP,idNhom,id)
        return res.status(200).json({
            massege: 'thanh cong',
         })
    

}
exports.showlistctgr = function (req, res) {
    Product.getAllCategory(function(data) {
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
            res.render('categories', {datapage,trang,from,to,layout: 'admin'})
    })
}
exports.deletectgr = async (req, res) => {
    const id = req.params.idctgr
    await Product.deletectgr(id)
    res.redirect('/showcategories/1')
}
exports.showformctgr = async (req, res) => {
        res.render('insertctgr', {layout: 'admin'})
}
exports.insertctgr = async (req, res) => {
    const {tenNhom} = req.body;
    await Product.insertctgr(tenNhom)
    res.redirect('/showcategories/1')
}
exports.showupdatectgr = function (req, res) {
    Product.getCategoriesId(req.params.idctgr, function(data) {
            res.render('updatectgr', {data,layout: 'admin'})
    })
}
exports.updatectgr = async (req, res) => {
    const {tenNhom, idNhom} = req.body
    await Product.updatectgr(tenNhom, idNhom)
    res.redirect('/showcategories/1')
}
exports.type = function (req, res) {
    var nguoidung = 0
    var user = 'user'
    if(req.session.Acc){
        nguoidung = 1;
        user = req.session.Acc;
    }
    const {idnhom} = req.body
        var type = 1
        Product.getAllProductType(idnhom,function(data) {
            // Phân Trang
            const count = data.filter(item => typeof item === 'object').length;
            var trang = count / 10;
            var page = 1;
            var trangn = []
            for (let i = 0; i<=trang+1; i++) {
                trangn.push(i)
            }
            if(req.params.page){
             page = req.params.page;
            }
            var from = (page - 1) * 10;
            var to = from + 9;
            var datapage = [];
            for (let i = from; i <= to; i++) {
                if (!data[i]) {
                    break
                }
                datapage.push(data[i])
            }
            Product.getAllCategory(function(category) {           
                res.render('producttype', {datapage,category,nguoidung,user,trangn,from,to,page,type})
            })
        })
    }

