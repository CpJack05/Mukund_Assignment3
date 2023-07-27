// import dependencies you will use
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//setting up Express Validator
const { check, validationResult } = require('express-validator');

// set up variables to use packages
var myApp = express();
myApp.use(bodyParser.urlencoded({ extended: false }));

// set path to public folders and view folders

myApp.set('views', path.join(__dirname, 'views'));
//use public folder for CSS etc.
myApp.use(express.static(__dirname + '/public'));
myApp.set('view engine', 'ejs');
// set up different routes (pages) of the website

//home page
myApp.get('/', function (req, res) {
    res.render('OnlineStore'); // no need to add .ejs to the file name
});


myApp.post('/', [
], function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //console.log(errors); // check what is the structure of errors
        res.render('OnlineStore', {
            errors: errors.array()
        });
    }
    else {

        var name = req.body.name;
        var email = req.body.email;
        var address = req.body.address;
        var phonenumber = req.body.phonenumber;
        var city = req.body.city;
        var province = req.body.province;
        var bread = req.body.bread;
        var milk = req.body.milk;
        var softdrink = req.body.softdrink;

        //define local variable
        var breadCharge = 0;
        var milkCharge = 0;
        var softdrinkCharge = 0;
        var subTotal = 0;
        var totalAmount = 0;
        var taxAmount = 0;
        var tax = 0;

        breadCharge = 2.5 * bread;
        milkCharge = 7 * milk;
        softdrinkCharge = 3.5 * softdrink;
        subTotal = breadCharge + milkCharge + softdrinkCharge;

        var pageData = {
            name: name,
            email: email,
            address: address,
            phonenumber: phonenumber,
            city: city,
            province: province,
            breadCharge: breadCharge,
            milkCharge: milkCharge,
            softdrinkCharge: softdrinkCharge,
            subTotal: subTotal,
            taxAmount: taxAmount,
            totalAmount: totalAmount
        }
        res.render('OnlineStore', pageData);
    }
});

// start the server and listen at a port
myApp.listen(8080);

//tell everything was ok
console.log('Everything executed fine.. website at port 8080....');
