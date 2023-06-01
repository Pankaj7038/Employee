//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
router.post("/", (req, res) => {
    let obj = {
        "e_id": req.body.e_id,
        "e_name": req.body.e_name,
        "e_salary": req.body.e_salary
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('nodedb')
            db.collection('products').insertOne(obj,(err)=>{
                if(err)
                    res.json({'insert':'Error '+err})
                else{
                    console.log('Data inserted')
                    res.json({'insert':'Success'})
                    conn.close()
                }
            })
        }
    })
})
//export router
module.exports = router
