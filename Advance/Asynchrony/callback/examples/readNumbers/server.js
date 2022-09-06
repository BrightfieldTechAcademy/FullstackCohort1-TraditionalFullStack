const fs = require('fs');

const readNumbers = function(file, cb) {
        fs.readFile(file, function(err, data) {
            if (err) return cb(err);
            const lines = data.toString().trim().split("\n");
            cb(null, lines);
        })
    }
    //find old numbers
readNumbers('./numbers.txt', function(err, data) {
    let oldNumbers = data.filter(element => element % 2 === 1)
    console.log(oldNumbers)
})

//find even numbers
readNumbers('./numbers.txt', function(err, data) {
    let even = data.filter(element => element % 2 === 0)
    console.log(even)
})

//sum all numbers
readNumbers('./numbers.txt', function(err, data) {
    let sum = data.reduce((alc, cur) => alc + parseInt(cur), 0)
    console.log(sum)
})