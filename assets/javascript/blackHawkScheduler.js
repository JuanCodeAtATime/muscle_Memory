// Steps to complete:
// 1. Initialize Firebase
// 2. Create button for adding new train - then update the html + update the database
// 3. Create a way to retrieve newly added trains from train database.
// 4. Create a way to calculate the next arrival time + determine minutes away.
// 5. Use moment.js formatting to maintain time.



// My web app's Firebase configuration
console.log(moment().format('HH:mm'))


function displayTime() {
    var time = moment().format('HH:mm:ss');
    $('#clock').html(time);
    setTimeout(displayTime, 1000);
}

$(document).ready(function () {
    displayTime();
});

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

// 2. Button for adding new train
$("#add-flight-btn").on("click", function (event) {
    event.preventDefault();

    // Storing User input values into variables
    let mealName = $("#meal-name-input").val().trim();
    let calories = $("#calories-input").val().trim();
    let lastMeal = $("#lastM-input").val().trim();
    let freq = $("#frequency-input").val().trim();

    console.log(mealName)

    // Initializing variables that will be dynamically generated    
    // let nxtArrival = "";
    // let minAway = "";

    // Creating local "temporary" object to hold new train data
    let newMeal = {
        name: mealName,
        cals: calories,
        lastM: lastMeal,
        newFreq: freq
    };

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

// 3. Create Firebase event for adding meals to database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());


    // Store everything into a letiable.
    let mealName = childSnapshot.val().name;
    let calories = childSnapshot.val().destin;
    let lastMeal = childSnapshot.val().firstTime;
    let freq = childSnapshot.val().newFreq;

    // Train Info
    console.log(mealName);
    console.log(calories);
    console.log(lastMeal);
    console.log(freq);



    //Calculation below uses Moment.JS and refers to WEEK 7 ACTIVITY #21


    // First Time (pushed back 1 year to make sure it comes before current time)
    let firstTimeConverted = moment(firstFlightT, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time...Formatted to display time only, but still displays entire date time group :(
    let currentTime = moment().format('HH:mm');
    console.log("CURRENT TIME: " + currentTime);

    // Difference between the times
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    let minAway = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minAway);

    // Next Train
    var ttNxMeal = moment().add(minAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nxtArrival).format("HH:mm"));


    // Creating new row that will be populated with User input + time calculations based on this input

    let newRow = $("<tr>").append(
        $("<td>").text(mealName),
        $("<td>").text(calories),
        $("<td>").text(freq),
        $("<td>").text(ttNxMeal)

    );

    // Appending new row to the table
    $("#flights-table > tbody").append(newRow);


    //Added addtional real-time clock for aesthetics

    function displayTime() {
        var time = moment().format('HH:mm:ss');
        $('#clock').html(time);
        setTimeout(displayTime, 1000);
    }

    $(document).ready(function () {
        displayTime();
    });

});

