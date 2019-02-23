// load mongo client
const MongoClient = require('mongodb').MongoClient
const _url = 'mongodb://localhost:27017'
const _db = 'employees'
//get all projects
const getProjects = (callback)=>{
    // Step 1: connect to mongo server
    MongoClient.connect(_url,(err,conn)=>{
        console.log('Connected to Mongo Server')
        // Step 2: connect to data base
        // Step 3: fetch all documents from the collections
        conn.db(_db).collection('pro').find({},{fields:{ _id:0}}).toArray((err,projects)=>{
            // callback function to handle async flow 
            callback(err,projects)
        })
    })
}
// add a new project
const addProject  = (p)=>{
    MongoClient.connect(_url,(err,conn)=>{
        conn.db(_db).collection('pro').insertOne(p,(err)=>{
            console.log("project added")
        })
    })
}
//add emp by projectid
const addEmp =(pid,empdata,callback)=>{
    MongoClient.connect(_url,(err,conn)=>{
        conn.db(_db).collection('pro').updateOne({
            pid:pid
        },{
            $push:{
                employees:empdata
            }},(err, data)=>{
                callback(err,{ message:'employee Updated'})

            })
            //close connection
            conn.close()
    })
}
//remove emp in a project
const delEmp=(pid,eid,callback)=>{
    MongoClient.connect(_url,(err,conn)=>{
        conn.db(_db).collection('pro').updateOne({
            pid:pid
        },{
            $pull:{
                employees:{id:eid}
            }
        },(err,data)=>{
            callback(err,{message:'employee deleted'})
        })
        //close connection
        conn.close()

    
    })
}
module.exports={
    getProjects, addProject, addEmp,delEmp
}