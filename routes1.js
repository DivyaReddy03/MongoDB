const express = require('express')
const routes = express.Router()
const dao = require('./dao1')

// get all employees
routes.get('/pro',(rq,rs)=>{
    dao.getProjects((err,projects)=>{
        if(err){
            rs.status(500).send({
                error: "Unable to load data"
            })
        }else{
            rs.status(200).send({
                projects : projects
            })
        }
    })
})
// add a new project
routes.post('/projects/add',(rq,rs)=>{
    rs.send({
        data: dao.addProject(rq.body)
    })
})
//add a new employee to the project
routes.post('/projects/employees/add/:pid',(rq,rs)=>{
    dao.addEmp(parseInt(rq.params.pid),rq.body,(err,data)=>{
        if(err){
            rs.status(500).send({
                error: "Unable to process the request"
            })
        }else{
            rs.status(200).send(data)
        }
    })
    
    
})
//delete employee by id
routes.post('/projects/employees/del/:pid/:eid',(rq,rs)=>{
    dao.delEmp(parseInt(rq.params.pid),parseInt(rq.params.eid),(err,data)=>{
        if(err){
            rs.status(500).send({
                error: "Unable to process the request"
            })
        }else{
            rs.status(200).send(data)
        }
    })
    
    
})

module.exports={
    routes
}