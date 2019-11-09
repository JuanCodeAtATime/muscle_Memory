let firebaseConfig = {
    apiKey: "AIzaSyAdVdy8evj2oqE2m4NUlCl8LddqLQeZpr8",
    authDomain: "musclememory2020.firebaseapp.com",
    databaseURL: "https://musclememory2020.firebaseio.com",
    projectId: "musclememory2020",
    storageBucket: "musclememory2020.appspot.com",
    messagingSenderId: "683230507544",
    appId: "1:683230507544:web:64d07b5363a3cb69a8496d",
    measurementId: "G-HF270L3PB5"

};

//1. Initializing Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();


function displayTime() {
    var time = moment().format('h:mm A');
    $('#clock').html(time);
    $('#lastM-input').val(time);
    setTimeout(displayTime, 1000);
}



$(document).ready(function () {

    let b = document.getElementById("frequency-input");

    $("#two-Five").on("click", function () {
        b.value = 150;
    });
    $("#three").on("click", function () {
        b.value = 180;
    });
    $("#three-Five").on("click", function () {
        b.value = 210;
    });
    $("#four").on("click", function () {
        b.value = 240;
    });
    displayTime();

});

// 2. Button for adding new meal
$("#add-meal-btn").on("click", function (event) {
    event.preventDefault();

    // Storing User input values into variables
    let mealName = $("#meal-name-input").val().trim();
    let calories = $("#calories-input").val().trim();
    let lastMeal = $("#lastM-input").val().trim();
    let freq = $("#frequency-input").val().trim();





    console.log(mealName);
    console.log("------------------");



    // Creating local "temporary" object to hold new train data
    let newMeal = {
        name: mealName,
        cals: calories,
        lastM: lastMeal,
        newFreq: freq
    };

    console.log(newMeal);
    console.log("lllllllllllllllllllllll");
    // Pushing new train data to the database
    database.ref().push(newMeal);

    // Logs everything to console
    console.log(newMeal.name);
    console.log(newMeal.cals);
    console.log(newMeal.lastM);
    console.log(newMeal.newFreq);

    alert("New flight successfully added");

    // Clears all of the text-boxes upon submission
    $("#meal-name-input").val("");
    $("#calories-input").val("");
    $("#lastM-input").val("");
    $("#frequency-input").val("");

});

// 2. Button for adding new meal
$("#create-meal-btn").on("click", function (event) {
    event.preventDefault();

    // Storing User input values into variables


    let mealNickname = $("#meal-nick-input").val().trim();
    let mealDescrip = $("#meal-descrip-input").val().trim();
    let carbs = $("#carbs-input").val().trim();
    let protein = $("#protein-input").val().trim();
    let fats = $("#fats-input").val().trim();
    let cals1 = $("#cals-input").val().trim();



    alert(mealNickname);


    // Creating local "temporary" object to hold new train data
    let newlyCreated = {
        newNick: mealNickname,
        mealDesc: mealDescrip,
        cHo: carbs,
        pro: protein,
        phat: fats,
        cal: cals1
    };

    console.log(newlyCreated);
    console.log("lllllllllllllllllllllll");
    // Pushing new train data to the database
    database.ref().push(newlyCreated);

    // Logs everything to console
    console.log(newlyCreated.newNick);
    console.log(newlyCreated.mealDesc);
    console.log(newlyCreated.cHo);
    console.log(newlyCreated.pro);
    console.log(newlyCreated.phat);
    console.log(newlyCreated.cal);

    // Create a modal for the below ALERT
    alert("New meal successfully created. View it in the updated Meal Plan");

    // Clears all of the text-boxes upon submission

    $("#meal-nick-input").val("")
    $("#meal-descrip-input").val("");
    $("#carbs-input").val("");
    $("#protein-input").val("");
    $("#fats-input").val("");
    $("#cals-input").val("");


});




// 3. Create Firebase event for adding meals to database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());


    // Store everything into a letiable.
    let mealName = childSnapshot.val().name;
    let calories = childSnapshot.val().cals;
    let lastMeal = childSnapshot.val().lastM;
    let freq = childSnapshot.val().newFreq;



    let mealNickname = childSnapshot.val().newNick;
    let mealDescrip = childSnapshot.val().mealDesc;
    let carbs = childSnapshot.val().cHo;
    let protein = childSnapshot.val().pro;
    let fats = childSnapshot.val().phat;
    let cals1 = childSnapshot.val().cal;



    // Declare new nutrient sum variables here






    // Calculation for the nutrient sum variables here

    // Train Info
    console.log(mealNickname);
    console.log(mealDescrip);
    console.log(carbs);
    console.log(protein);


    // Creating new row that will be populated with User input + time calculations based on this input




    //Calculation below uses Moment.JS and refers to WEEK 7 ACTIVITY #21


    // First Time (pushed back 1 year to make sure it comes before current time)
    let firstTimeConverted = moment(lastMeal, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time...Formatted to display time only, but still displays entire date time group :(
    let currentTime = moment().format('h:mm A');
    console.log("CURRENT TIME: " + currentTime);

    // Difference between the times
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minutes til next meal
    let mtNxMeal = freq - tRemainder;
    console.log("THIS>>>>>>>>>>>>" + mtNxMeal);



    // Next Meal Time
    var nxtMT = moment().add(mtNxMeal, "minutes");

    let nextMealT = moment(nxtMT).format('h:mm A');



    // Creating new row that will be populated with User input + time calculations based on this input

    let newRow = $("<tr>").append(
        $("<td>").text(mealName),
        $("<td>").text(calories),
        $("<td>").text(freq),
        $("<td>").text(mtNxMeal)

    );
    let newlyCreatedMealRow = $("<tr>").append(
        $("<td>").text(mealNickname),
        $("<td>").text(mealDescrip),
        $("<td>").text(carbs),
        $("<td>").text(protein),
        $("<td>").text(fats),
        $("<td>").text(cals1)
    );

    // Appending new row to the table
    $("#created-meals-table > tbody").append(newlyCreatedMealRow);

    // Appending new row to the table
    $("#meals-table > tbody").append(newRow);

    // Appending dynamic "Min. Until Next Meal" time to div below header title"
    $("#nxtMealT").text(nextMealT);


});







