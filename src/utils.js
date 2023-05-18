
const utils = {
  // input - andhra-pradesh
  // output - Andhra Pradesh
  getDisplayName: function (name) {
    let names = name.split('-');
    for (let i = 0; i < names.length; i++) {
      names[i] = names[i][0].toUpperCase() + names[i].substr(1);
    }

    return names.join(' ');
  },

  mapOutput: (arr) => {
    return arr.map((obj) => {

      let newObj = {};

      if (obj.date) {
        newObj.date = obj.date;
      }
      if (obj.price) {
        newObj.price = obj.price;
      }
      if (obj.state) {
        newObj.state = utils.getDisplayName(obj.state);
      }
      if (obj.city) {
        newObj.city = utils.getDisplayName(obj.city);
      }
      if (obj.country) {
        newObj.country = utils.getDisplayName(obj.country);
      }
      if (obj.fuel) {
        newObj.fuel = utils.getDisplayName(obj.fuel);
      }

      return newObj;
    })
  }
}

module.exports = utils;