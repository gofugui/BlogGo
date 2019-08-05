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
    return value;
  },
  addAt: (type, value, index) => {
    if (!value.id) {
      value.id = uuidV4();
    }
    db.get(type).splice(index, 0, value).sortBy('name').write();
  },
  deleteById: (type, id) => db.get(type).remove({ id }).write(),
  deleteByName: (type, name) => db.get(type).remove({ name }).write(),
  select: (type, id) => (id ? db.get(type).find({ id }).value() :
    db.get(type).value()),
  update: (type, { id, name }) => db.get(type).find({ id }).assign({ name }).write(),
  state: () => db.getState(),
  setState: newState => db.setState(newState),
};
