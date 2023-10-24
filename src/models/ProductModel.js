const db = require('../configs/connect')
const getAllProduct = function (callback) {
    db.query("SELECT * FROM product", function(err, product) {
        if(err) {
            callback (null)
        }
        else {
            callback (product)
        }
    })
}
const getAllProductType = function (id,callback) {
    db.query("SELECT * FROM product WHERE idNhom= ?",[id], function(err, product) {
        if(err) {
            callback (null)
        }
        else {
            callback (product)
        }
    })
}
const getAllCategory = function (callback) {
    db.query("SELECT * FROM type", function(err, category) {
        if(err) {
            callback (null)
        }
        else {
            callback (category)
        }
    })
}
const getProductId = function (id, callback)  {
     db.query('SELECT * FROM product WHERE idSP=?',[id], function(err,data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
     })
} 
const getMinProduct = function (callback) {
    db.query('SELECT * FROM product ORDER BY product.giaSP asc', function(err,data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
     })
}
const getMaxProduct = function (callback) {
    db.query('SELECT * FROM product ORDER BY product.giaSP desc', function(err,data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
     })
}
const getNewProduct = function (callback) {
    db.query('SELECT * FROM product ORDER BY product.idSP desc', function(err,data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
     })
}
const getRandomProduct = function (callback) {
    db.query('SELECT * FROM product ORDER BY RAND ( )', function(err,data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
     })
}
const getFindProduct = function (tenSP,callback) {
    db.query(`SELECT * FROM product WHERE tenSP LIKE %?%`,[tenSP], function(err,data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
     })
}
const getCategoriesId = function (id, callback)  {
    db.query('SELECT * FROM type WHERE idNhom=?',[id], function(err,data) {
       if(err) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
} 
const insert = async (tenSP,giaSP,hinhSP,tsSP,idNhom) => {
    await db.query('INSERT INTO product (tenSP, giaSP, hinhSP, tsSP, idNhom)  VALUE(?,?,?,?,?)',[tenSP,giaSP,hinhSP,tsSP,idNhom])
}
const deletesp = async (id) => {
    await db.query('DELETE  FROM product WHERE idSP = ?',[id])
} 
const updatesp = async (tenSP,giaSP,hinhSP,tsSP,idNhom,id) => {
    await db.query('UPDATE product SET tenSP = ?,giaSP = ?,hinhSP = ?, tsSP = ?, idNhom = ? WHERE idSP = ?',[tenSP,giaSP,hinhSP,tsSP,idNhom,id])
} 
const deletectgr = async (id) => {
    await db.query('DELETE  FROM type WHERE idNhom = ?',[id])
} 
const insertctgr = async (tenNhom) => {
    await db.query('INSERT INTO type (tenNhom)  VALUE(?)',[tenNhom])
}
const updatectgr = async (tenNhom,idNhom) => {
    await db.query('UPDATE type SET tenNhom = ? WHERE idNhom = ?',[tenNhom,idNhom])
} 
module.exports = {
    getAllProduct,
    getAllCategory,
    insert,
    deletesp,
    getProductId,
    updatesp,
    getCategoriesId,
    deletectgr,
    insertctgr,
    updatectgr,
    getAllProductType,
    getMinProduct,
    getMaxProduct,
    getNewProduct,
    getRandomProduct,
    getFindProduct,
}