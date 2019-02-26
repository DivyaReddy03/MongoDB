// Step 1: load mongoose client
const mongoose = require('mongoose')
// Step 2 : connect to mongo server
mongoose.connect('mongodb://localhost:27017/employees')
//const Schema = mongoose.Schema
// Step 3 : Define Schema for Employee
const projectSchema = new mongoose.Schema({
    
    pid: mongoose.SchemaTypes.Number,
    pname: mongoose.SchemaTypes.String,
    currency: mongoose.SchemaTypes.String,
    employees:[{
        id:mongoose.SchemaTypes.Number,
        name:mongoose.SchemaTypes.String,
        email:mongoose.SchemaTypes.Number,
        salary:mongoose.SchemaTypes.Number

    }]

    
})
// Step 4: build Employee Model
const pro = mongoose.model('pro',projectSchema)

// fetch all projects

const getProjects = (callback)=>{
    pro.find({},{__v:0},(err,data)=>{
        callback(err,data)
    })
}
//add a new project
const addProject=(proData,callback)=>{
    const p=new pro({
        pid:proData.pid,
        pname:proData.pname,
        currency: proData.currency,
        employees:proData.employees

    })
    pro.create(p, (err)=>{
        callback(err,{
            message : "project Added successfully"
        })

    })
}



// add a new employee by pid
const addEmployee = (pid,eData,callback)=>{
   pro.updateOne({
    pid:pid
},{
    $push:{
        employees:eData
    }},
    (err,eData)=>{
        callback(err,{
            message: "Employee added successfully"
        })
    })
}
// delete  employee by pid
const removeEmployee = (pid,eid,callback)=>{
    pro.updateOne({
     pid:pid
 },{
     $pull:{
         employees:{id:eid}
     }},(err,eData)=>{
        callback(err,{
            message: "Employee deleted successfully"
        })
     
    })
 }


// delete project by id
const delProject = (pid,callback)=>{
    pro.deleteOne({pid:pid},(err)=>{
        callback(err,{
            message:"project deleted"
        })
    })
}
module.exports={
    getProjects,addProject,addEmployee,removeEmployee,delProject
}
