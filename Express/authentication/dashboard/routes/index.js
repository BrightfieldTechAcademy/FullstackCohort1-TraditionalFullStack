var express = require('express');
const request = require('request');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (!req.user) {
        return res.render('home');
    }
    res.redirect('/dashboard')
});

router.get('/dashboard', function(req, res, next) {
    request('https://jsonplaceholder.typicode.com/users', (error, response, body) => {
        let data = JSON.parse(body);
        res.render('index', { user: req.user, data });
    });
})


module.exports = router;