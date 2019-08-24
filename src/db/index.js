import db from './datastore';
const uuidV4 = require('uuid/v4');
// const _ = require('lodash-id');

export default {
  add: (type, value) => {
    if (!value.id) {
      value.id = uuidV4();

      value.timestamp = new Date().getTime();
    }

    db.get(type).push(value).write();
    return value.id;
  },
  addAt: (type, value, index) => {
    if (!value.id) {
      value.id = uuidV4();
    }
    db.get(type).splice(index, 0, value).sortBy('name').write();
  },

  deleteById: (type, id) => db.get(type).remove({ id }).write(),
  deleteByName: (type, name) => db.get(type).remove({ name }).write(),
  select: (type, key, id) => (key ? db.get(type).value().filter(item => item[key] === id) :
    db.get(type).value().concat([])),
  selectCount: (type, key, id) => db.get(type).value().filter(item => item[key] === id).length,
  update: (type, id, obj) => db.get(type).find({ id }).assign(obj).write(),
  state: () => db.getState(),
  setState: newState => db.setState(newState),
};
