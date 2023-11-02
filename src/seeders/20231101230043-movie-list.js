'use strict';
const fs = require("fs");
const { parse } = require("csv-parse");
const path = require('path');

function _extractNames(nameData) {
  const regex = /\s+and\s+/;
  if(nameData.includes(", and")) {
    nameData = nameData.replace(regex, '');
  } else {
    nameData = nameData.replace(regex, ', ');
  }  
  const nameFormatted = nameData.split(",");
  if(nameFormatted.length> 0) {
    return nameFormatted;
  }
  return [nameData];
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let MovieList = [];
    return new Promise((resolve, reject) => {
      const movieFile = path.join(__dirname, '../../data', 'movielist.csv');
      if(fs.existsSync(movieFile)) {
        fs.createReadStream(movieFile)
        .pipe(parse({ delimiter: ";", from_line: 2 }))
        .on("data", (rowData) => {          
          MovieList.push({
            year: rowData[0],
            title: rowData[1],
            studios: JSON.stringify(_extractNames(rowData[2])),
            producers: JSON.stringify(_extractNames(rowData[3])),
            winner: rowData[4].length == 0 ? false : true
          });
        })
        .on("end", () => {
          queryInterface.bulkInsert('Movie', MovieList).then(() => {
            resolve();
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
        });
      } else {
        reject("NO FILE FOUND");
      }
      
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Movie', null, {});
  }
};
