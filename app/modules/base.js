const Datastore = require('nedb')
const Joi = require('joi')
const EventEmitter = require('events')

class Module extends EventEmitter {
  constructor (name, schema, indexes = []) {
    super()
    this.schema = schema
    this.db = new Datastore(process.env.NODE_ENV === 'test' ? {
      inMemoryOnly: true,
      autoload: true,
      timestampData: true
    } : {
      filename: `./data/${name}.db`,
      autoload: true,
      timestampData: true
    })

    for (const index of indexes) {
      this.db.ensureIndex(index, function (err) {
        if (err) { console.error(err) }
      })
    }
  }

  findOne (q) {
    return new Promise((resolve, reject) => {
      this.db.findOne(q, function (err, doc) {
        if (err) {
          return reject(err)
        }
        return resolve(doc)
      })
    })
  }

  find (q, limit = 1000, sort = {}) {
    return new Promise((resolve, reject) => {
      this.db.find(q).sort(sort).limit(limit).exec(function (err, docs) {
        if (err) {
          return reject(err)
        }
        return resolve(docs)
      })
    })
  }

  findIds (q, limit = 1000) {
    return new Promise((resolve, reject) => {
      this.db.find(q, {_id: 1}).limit(limit).exec(function (err, docs) {
        if (err) {
          return reject(err)
        }
        return resolve(docs.map(d => d._id))
      })
    })
  }

  remove (q, multi = false) {
    return new Promise((resolve, reject) => {
      this.db.remove(q, { multi }, (err, numRemoved) => {
        if (err) {
          return reject(err)
        }
        this.emit('removed')
        return resolve(numRemoved)
      })
    })
  }

  upsert (q, doc) {
    return new Promise((resolve, reject) => {
      const {error, value} = Joi.validate(doc, this.schema, {stripUnknown: true})
      if (error) {
        return reject(error)
      }
      this.db.update(q, value, {upsert: true, returnUpdatedDocs: true}, (err, numb, doc, upsert) => {
        if (err) {
          return reject(err)
        }
        if (upsert) {
          this.emit('inserted', doc)
        } else {
          this.emit('updated', doc)
          this.emit(doc._id, doc)
        }
        return resolve([ doc, upsert ])
      })
    })
  }

  update (q, doc, multi = false) {
    return new Promise((resolve, reject) => {
      this.db.update(q, doc, {multi, returnUpdatedDocs: true}, (err, numb, doc) => {
        if (err) {
          return reject(err)
        }
        this.emit('updated', doc)
        this.emit(doc._id, doc)
        return resolve(doc)
      })
    })
  }

  count (q) {
    return new Promise((resolve, reject) => {
      this.db.count(q, function (err, count) {
        if (err) {
          return reject(err)
        }
        return resolve(count)
      })
    })
  }

  save (obj) {
    return new Promise((resolve, reject) => {
      const {error, value} = Joi.validate(obj, this.schema, {stripUnknown: true})
      if (error) {
        return reject(error)
      }
      if (value._id) {
        this.db.update({_id: value._id}, value, {returnUpdatedDocs: true}, (err, numb, doc) => {
          if (err) {
            return reject(err)
          }
          this.emit('updated', doc[0] || doc)
          this.emit(doc._id, doc)
          return resolve(doc[0] || doc)
        })
      } else {
        this.db.insert(value, (err, doc) => {
          if (err) {
            return reject(err)
          }
          this.emit('inserted', doc)
          return resolve(doc)
        })
      }
    })
  }
}

module.exports = Module
