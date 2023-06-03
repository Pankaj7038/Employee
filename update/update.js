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
    let e_id = req.body.e_id
    let obj = {
        "e_name": req.body.e_name,
        "e_salary": req.body.e_salary
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('mydatabase')
            db.collection('employees').updateOne({ e_id }, { $set: obj }, (err) => {
                if (err)
                    res.json({ 'update': 'Error ' + err })
                else {
                    console.log('Data updated')
                    res.json({ 'update': 'Success' })
                    conn.close()
                }
            })
        }
    })
})
//export router
module.exports = router
