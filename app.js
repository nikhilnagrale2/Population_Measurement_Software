//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);



const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({
      googleId: profile.id
    }, function(err, user) {
      return cb(err, user);
    });
  }
));

var data = {
  India: {
    male: 623724248,
    female: 586469174,
    area: 3287240,
    crudeBirthRate: 18.69,
    totalfertilityRate: 2.02,
    Uttarpradesh: {
      male: 104480510,
      female: 95331831,
      area: 240928,
      crudeBirthRate: 22.6,
      totalfertilityRate: 2.74
    },
    Maharashtra: {
      male: 58243056,
      female: 54131277,
      area: 307713,
      crudeBirthRate: 16.6,
      totalfertilityRate: 1.87,
      Mumbai: {
        male:6715931,
        female:5726442,
        area:603.4,
        crudeBirthRate:13.48,
        totalfertilityRate:1.4
      },
      Nagpur:{
        male:1225405,
        female:1180260,
        area:227.4,
        crudeBirthRate:14.22,
        totalfertilityRate:1.9
      }
    },
    Bihar: {
      male: 542781157,
      female: 49821295,
      area: 94163,
      crudeBirthRate: 27.1,
      totalfertilityRate: 3.41
    },
    WestBengal: {
      male: 4680927,
      female: 44467088,
      area: 88752,
      crudeBirthRate: 16.6,
      totalfertilityRate: 1.77
    },
    MadhyaPradesh: {
      male: 37612306,
      female: 35014503,
      area: 308245,
      crudeBirthRate: 20.2,
      totalfertilityRate: 2.32
    },
    Tamilnadu: {
      male: 36137975,
      female: 36009055,
      area: 130058,
      crudeBirthRate: 15.5,
      totalfertilityRate: 1.7
    },
    Rajasthan: {
      male: 35550997,
      female: 32997440,
      area: 342239,
      crudeBirthRate: 20.8,
      totalfertilityRate: 2.4
    },
    Karnataka: {
      male: 30966657,
      female: 30128640,
      area: 191791,
      crudeBirthRate: 15.9,
      totalfertilityRate: 1.81
    },
    Gujrat: {
      male: 31491260,
      female: 28948432,
      area: 196024,
      crudeBirthRate: 16.7,
      totalfertilityRate: 2.03
    },
    Andhrapradesh: {
      male: 24738068,
      female: 24648731,
      area: 160205,
      crudeBirthRate: 16.1,
      totalfertilityRate: 1.83
    },
    Odisha: {
      male: 21212136,
      female: 20762082,
      area: 155707,
      crudeBirthRate: 18.1,
      totalfertilityRate: 2.05
    },
    Telangana: {
      male: 17704078,
      female: 17489900,
      area: 114840,
      crudeBirthRate: 17.1,
      totalfertilityRate: 1.79
    },
    Kerala: {
      male: 16027412,
      female: 17378649,
      area: 38863,
      crudeBirthRate: 11.2,
      totalfertilityRate: 1.56
    },
    Jharkhand: {
      male: 16930315,
      female: 16057819,
      area: 79714,
      crudeBirthRate: 21.7,
      totalfertilityRate: 2.55
    },
    Assam: {
      male: 15939443,
      female: 15266133,
      area: 78438,
      crudeBirthRate: 19.5,
      totalfertilityRate: 2.21
    },
    Punjab: {
      male: 14639465,
      female: 13103873,
      area: 50362,
      crudeBirthRate: 13.8,
      totalfertilityRate: 1.62
    },
    Chhattisgarh: {
      male: 12832895,
      female: 12712303,
      area: 135191,
      crudeBirthRate: 20.7,
      totalfertilityRate: 2.23
    },
    Haryana: {
      male: 13494734,
      female: 11856728,
      area: 44212,
      crudeBirthRate: 18.7,
      totalfertilityRate: 2.05
    },
    Delhi: {
      male: 8887326,
      female: 7800615,
      area: 1484,
      crudeBirthRate: 17.8,
      totalfertilityRate: 1.32
    },
    JammuandKashmir: {
      male: 6640662,
      female: 2900640,
      area: 222236,
      crudeBirthRate: 17.7,
      totalfertilityRate: 2.01
    },
    Uttarakhand: {
      male: 5137773,
      female: 4948519,
      area: 53483,
      crudeBirthRate: 19,
      totalfertilityRate: 2.07
    },
    HimachalPradesh: {
      male: 3481873,
      female: 3382729,
      area: 55673,
      crudeBirthRate: 15.3,
      totalfertilityRate: 1.88
    },
    Tripura: {
      male: 1874376,
      female: 1799541,
      area: 10486,
      crudeBirthRate: 15.3,
      totalfertilityRate: 1.69
    },
    Meghalaya: {
      male: 1491832,
      female: 1475057,
      area: 22429,
      crudeBirthRate: 24.6,
      totalfertilityRate: 3.04
    },
    Manipur: {
      male: 1438687,
      female: 1417107,
      area: 22327,
      crudeBirthRate: 21.2,
      totalfertilityRate: 2.61
    },
    Nagaland: {
      male: 1024649,
      female: 953853,
      area: 16579,
      crudeBirthRate: 21.4,
      totalfertilityRate: 2.74
    },
    Goa: {
      male: 739140,
      female: 719405,
      area: 3702,
      crudeBirthRate: 12.8,
      totalfertilityRate: 1.66
    },
    AruncachalPradesh: {
      male: 713912,
      female: 669815,
      area: 83743,
      crudeBirthRate: 17.9,
      totalfertilityRate: 2.12
    },
    Puducherry: {
      male: 612511,
      female: 635442,
      area: 479,
      crudeBirthRate: 18.7,
      totalfertilityRate: 2.26
    },
    Mizoram: {
      male: 555339,
      female: 541867,
      area: 21081,
      crudeBirthRate: 18.7,
      totalfertilityRate: 2.26
    },
    Chandigarh: {
      male: 580663,
      female: 474787,
      area: 114,
      crudeBirthRate: 14.1,
      totalfertilityRate: 1.23
    },
    Sikkim: {
      male: 323070,
      female: 287507,
      area: 7096,
      crudeBirthRate: 11.4,
      totalfertilityRate: 1.17
    },
    AndamanandNicobarIslands: {
      male: 202871,
      female: 177710,
      area: 8249,
      crudeBirthRate: 15.6,
      totalfertilityRate: 1.32
    },
    DadraandNagarHaveli: {
      male: 193760,
      female: 149949,
      area: 491,
      crudeBirthRate: 26.6,
      totalfertilityRate: 1.21
    },
    DamanandDiu: {
      male: 150301,
      female: 92946,
      area: 112,
      crudeBirthRate: 11.1,
      totalfertilityRate: 1.24
    },
    Lakshadweep: {
      male: 33123,
      female: 31350,
      area: 32,
      crudeBirthRate: 14.3,
      totalfertilityRate: 1.4
    }
  }
};


app.get("/", function(req, res) {
  res.render("home");
});

app.get("/auth/google",
  passport.authenticate('google', {
    scope: ["profile"]
  })
);

app.get('/auth/google/secrets',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect Secrets.
    res.redirect('/secrets');
  });

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/secrets", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/country", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("country");
  } else {
    res.redirect("/login");
  }
});

app.get("/state", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("state");
  } else {
    res.redirect("/login");
  }
});

app.get("/city", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("city");
  } else {
    res.redirect("/login");
  }
});

app.get("/countryresults", function(req, res) {
  let male = data.India.male;
  let female = data.India.female;
  let area = data.India.area;
  let totalPopulation = male + female;
  let populationDensity = totalPopulation / area;
  let sexRatio = (male / female) * 100;
  let birthRate = data.India["crudeBirthRate"];
  let totalfertilityRate = data.India["totalfertilityRate"];
  res.render("countryresults", {
    male: male,
    female: female,
    area: area,
    totalPopulation: totalPopulation,
    populationDensity: populationDensity,
    sexRatio: sexRatio,
    birthRate: birthRate,
    totalfertilityRate: totalfertilityRate
  });
});


let state;
app.get("/stateresults", function(req, res) {
  let male = data.India[state]["male"];
  let female = data.India[state]["female"];
  let area = data.India[state]["area"];
  let birthRate = data.India[state]["crudeBirthRate"];
  let totalfertilityRate = data.India[state]["totalfertilityRate"];
  let totalPopulation = male + female;
  let populationDensity = totalPopulation / area;
  let sexRatio = (male / female) * 100;
  console.log(state);
  res.render("stateresults", {
    state: state,
    male: male,
    female: female,
    area: area,
    totalPopulation: totalPopulation,
    populationDensity: populationDensity,
    sexRatio: sexRatio,
    birthRate: birthRate,
    totalfertilityRate: totalfertilityRate
  });
});

let city;
app.get("/cityresults", function(req, res) {
  let male = data.India[state]["male"]/10;
  let female = data.India[state]["female"]/10;
  let area = data.India[state]["area"]/100;
  let birthRate = data.India[state]["crudeBirthRate"];
  let totalfertilityRate = data.India[state]["totalfertilityRate"];
  let totalPopulation = male + female;
  let populationDensity = totalPopulation / area;
  let sexRatio = (male / female) * 100;
  res.render("cityresults", {
    city: city,
    state: state,
    male: male,
    female: female,
    area: area,
    totalPopulation: totalPopulation,
    populationDensity: populationDensity,
    sexRatio: sexRatio,
    birthRate: birthRate,
    totalfertilityRate: totalfertilityRate
  });
});


app.post("/register", function(req, res) {
  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });

});

app.post("/login", function(req, res) {

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});


app.post("/stateresults", function(req, res) {
  state = req.body.state;
  res.redirect("/stateresults");
});

app.post("/cityresults", function(req, res) {
  state = req.body.state;
  // console.log(state);
  city = req.body.city;
  res.redirect("/cityresults");
});

app.post("/countryresults", function(req, res) {
  res.redirect("/countryresults");
});

app.post("/cityresults", function(req, res) {
  res.redirect("/cityresults");
});

app.listen(3000, function() {
  console.log("Server started on port 3000..");
});
