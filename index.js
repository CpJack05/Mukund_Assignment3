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

var phoneNumberRegex = /^\d{10}$/;
var positiveNumber = /^[0-9][0-9]*$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//function to check that value is valid or not using regular expression
function checkRegex(userInput, regex) {
    if (regex.test(userInput)) {
        return true;
    }
    else {
        return false;
    }
}

//Phone number validation function
function customPhoneNumberValidation(value) {
    if (!checkRegex(value, phoneNumberRegex)) {
        throw new Error('Phone No. should be in the format : 0123456789');
    }
    return true;
}

//Email validation function
function customEmialValidation(value) {
    if (!checkRegex(value, emailRegex)) {
        throw new Error('Credit Card No. should be in the format : test@test.com');
    }
    return true;
}

//For positive numbers
function breadValidation(value, {req}){
    var bread  = req.body.bread;

    if(!checkRegex(value, positiveNumber)){
        throw new Error('Please enter positive number in a Bread field');
    }
    return true;
}

function milkValidation(value, {req}){
    var milk = req.body.milk;

    if(!checkRegex(value, positiveNumber)){
        throw new Error('Please enter positive number in a Milk field ');
    }
    return true;
}

function softdrinkValidation(value, {req}){
    var softdrink = req.body.softdrink;

    if(!checkRegex(value, positiveNumber)){
        throw new Error('Please enter positive number in a Soft-Drink field ');
    }
    return true;
}

function checkTotalValue(value, {req})
{
    var softdrink = req.body.softdrink;
    var milk = req.body.milk;
    var bread  = req.body.bread;

    var subTotal = (softdrink * 3.5) + (milk * 7) + (bread * 2.5);

    if(subTotal < 10)
    {
        throw new Error('Sub total must be greater than 10.');
    }
    return true;
}

myApp.post('/', [
    check('name', 'You must enter your Name').not().isEmpty(),
    check('email', 'You must enter your e-mail ID').isEmail(),
    check('phonenumber').custom(customPhoneNumberValidation),
    check('address', 'You must enter you Address').not().isEmpty(),
    check('city', 'You must enter your City').not().isEmpty(),
    check('province', 'You must select Province').not().isEmpty(),
    check('bread').custom(breadValidation),
    check('milk').custom(milkValidation),
    check('softdrink').custom(softdrinkValidation),
    check('subTotal').custom(checkTotalValue)
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


