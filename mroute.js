const express = require('express')
const routes = express.Router()
const dao = require('./mdao')

// get all projects
routes.get('/',(rq,rs)=>{
    dao.getProjects((err,projects)=>{
        if(err){
            rs.status(500).send({
                error: "Unable to load data"
            })
        }else{
            rs.status(200).send(projects)
        }
    })
})
//add a new project
routes.post('/add/project',(rq,rs)=>{
    dao.addProject(rq.body,(err,proData)=>{
        if(err){
            rs.status(500).send({
                error:"unable to process the request",
                trace:err
            })
        }else{
            rs.status(201).send(proData)
        }
    })
})
// add a new employee
routes.post('/add/employee/:pid',(rq,rs)=>{
    dao.addEmployee(parseInt(rq.params.pid),rq.body,(err,eData)=>{
        if(err){
            rs.status(500).send({
                error: "Unable to process the request ",
                trace: err
            })
        }else{
            rs.status(201).send(eData)
        }
    })
})

//delete employee by pId
routes.post('/del/employee/:pid/:eid',(rq,rs)=>{
    dao.removeEmployee(parseInt(rq.params.pid),parseInt(rq.params.eid),(err,eData)=>{
        if(err){
            rs.status(500).send({
                error: "Unable to process the request ",
                trace: err
            })
        }else{
            rs.status(201).send(eData)
        }
    })
})
// delete project
routes.delete('/delete/:pid',(rq,rs)=>{
    dao.delProject(parseInt(rq.params.pid),(err)=>{
        if(err){
            rs.status(500).send({
                error: "Unable to process the request"
            })
        }else{
            rs.status(200).send({
                message : "Employee Deleted"
            })
        }
    })
})


module.exports={
    routes
}
