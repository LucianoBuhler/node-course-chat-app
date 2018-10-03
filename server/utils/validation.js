// This file contain a list of validation functions used in this project

// test if the inserted param is a real not empty string and returns 'true' if is and 'false' if isn't
var isRealString = (str) => {
  // return typeof str === 'string' && str.trim().lenght > 0;
  return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};
