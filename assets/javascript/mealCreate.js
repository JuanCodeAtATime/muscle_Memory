let firebaseConfig1 = {
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
firebase.initializeApp(firebaseConfig1);

let database1 = firebase.database();



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

    mealNickname = childSnapshot.val().newNick;
    mealDescrip = childSnapshot.val().mealDesc;
    carbs = childSnapshot.val().cHo;
    protein = childSnapshot.val().pro;
    fats = childSnapshot.val().phat;
    cals1 = childSnapshot.val().cals1;

    // Train Info
    console.log(mealNickname);
    console.log(mealDescrip);
    console.log(carbs);
    console.log(protein);





    // Creating new row that will be populated with User input + time calculations based on this input

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



});
