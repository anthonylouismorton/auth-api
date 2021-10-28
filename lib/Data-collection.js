'use strict';


// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  async get(id) {
    try{
      let records = null;
      if(id){
        records = await this.model.findOne({where: {id}})
      }
      else{
        records = await this.model.findAll({})
      }
    }
    catch(e){
      return e;
    }
  }

  async create(json) {
    try{
      let record = await this.model.create(json)
      return record;
    }
    catch(e){
      return e;
    }
  }

  async update(id, json) {
    try{
      let record = await this.model.findOne({where: {id}})
      let upDatedRecord = await record.update(json)
      return upDatedRecord;
    }
    catch(e){
      return e;
    }
  }

  async delete(id) {
    try{
      let deletedRows = await this.model.destroy({where: {id}})
      let deleted = 'successfully deleted'
      return deleted;
    }
    catch(e){
      return e;
    }
  }

}

module.exports = DataCollection;
