const {Report} = require('../models')
const {Op} = require('sequelize')

class Controller {
    static home(req, res) {
        res.render(`home`)
    }

    static getReports(req, res) {
        let searchByEvent = req.query.event
        let searchByAge = req.query.age
        let option = {
            order: [
                ['dateOfEvent', 'DESC']
            ],
            where: {}
        }

        if (searchByEvent) {
            option.where = {
                ...option.where,
                event: {
                    [Op.iLike]:`%${searchByEvent}%`
                }
            }
        }
        if (searchByAge) {
            option.where = {
                ...option.where,
                age: +searchByAge
            }
        }        
        Report.findAll(option)
        .then(result1 => {
            return Report.maxAge()
            .then(resMaxAge => {
                return { resMaxAge, result1 } 
            })
        })
        .then(result2 => {
            return Report.minAge()
            .then(resMinAge => {
                return { resMinAge, ...result2 }
            })
        })
        .then(result3 => {
            return Report.averageAge()
            .then(resAvgAge => {
                return { resAvgAge, ...result3 }
            })
        })
        .then(result => {
            res.render('showReports', {
                result,
                objMaxAge: result.resMaxAge[0].dataValues.maxAge,
                objMinAge: result.resMinAge[0].dataValues.minAge,
                objAvgAge: Math.floor(result.resAvgAge[0].dataValues.averageAge)
            });
        })
        .catch(err => {
            res.send(err);
            console.log(err);
        })
    }   

    static getAddFormReport(req, res) {
        res.render(`addFormReport`)
    }

    static postAddFormReport(req, res) {
        const { firstName, lastName, age, email, nik, event, description, photo, dateOfEvent} = req.body
        const objReport = { firstName, lastName, age, email, nik, event, description, photo, dateOfEvent}
       
        Report.create(objReport)
        .then( () => {
            res.redirect('/reports')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getEditFormReport(req, res) {
    const id = +req.params.id;

        Report.findByPk( id )
        .then(result => {
            res.render('editFormReport', {result});
        })
        .catch(err => {
            res.send(err);
        })
    }

    static postEditReport(req, res) {
        const { firstName, lastName, age, email, nik, event, description, photo, dateOfEvent} = req.body
        const objReport = { firstName, lastName, age, email, nik, event, description, photo, dateOfEvent}
        const id = +req.params.id;

    Report.update( objReport, { where: { id } } )
        .then( () => {
            res.redirect('/reports')
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static deleteReport(req, res) {
        const id = +req.params.id;

        Report.destroy({ where: { id } })
        .then( () => {
            res.redirect('/reports')
        })
        .catch(err => {
            res.send(err)
        })
    }

}

module.exports = Controller