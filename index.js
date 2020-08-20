const express = require('express');
const path = require('path');
const crypto  = require('crypto');
const passport = "grihgbavhbakhlrb"
const ports = 3000 //process.env.port;
const app = express();

//this cryptographic function is use to encrypt passwords
//this is essential method for cybersecurity
function encrypt(text){
    var mykey = crypto.createCipher('aes-128-cbc',passport);
    var mystr = mykey.update(text,'utf8','hex');
    mystr += mykey.final('hex');
    return mystr;
}

app.use(express.static(path.join(__dirname,'/public')));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('myweb2');//this is only for temporary. this is home page
})

app.get('/register',(req,res)=>{
    res.render('register');
})

app.post('/register',(req,res)=>{
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var password = req.body.password;
    var passwordAgain = req.body.passwordagain;

    //check password conditions
    var errorCode  = 0;
    if(password != passwordAgain ){
        //passwords not match error
        errorCode = errorCode + 1;
    }

    if(password.length < 6){
        //password too short error
        errorCode = errorCode + 2;
    }

    var n = 0;
    var u = 0;
    var l = 0;
    for(var i = 0 ; i < password.length ; i++){
        var chara = password.charAt(i);
        if(!isNaN(chara * 1)){
            //numeric character detected!
            n = 1;
        }else{
            if(chara == chara.toUpperCase()){
                //uppercase detected!
                u = 1;
            }else{
                //lowercase detected
                l = 1;
            }
        }
    }

    if(n == 0 ){
        errorCode = errorCode + 4 ;
    }

    if(u == 0 ){
        errorCode = errorCode + 8 ;
    }

    if( l == 0 ){
        errorCode = errorCode + 16;
    }

    if(errorCode == 0){
        var encpass = encrypt(password);
        //update database and create cookies and redirect
        //fname,lname,email,encpass to make database
    }else{
        //show error and redirect to register page
    }
    res.redirect('/');
})

app.get('/dash-dctr',(req,res)=>{
    res.render('dash-dctr');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.listen(ports,(error)=>{
    if(error) throw error;
    console.log('Server running in port : '+ ports);
})