// Initialize Firebase
var config = {
    apiKey: "AIzaSyCghdK19GV2rguIfbWtUG9i7WucaUuVKC8",
    authDomain: "trainscheduler-92e12.firebaseapp.com",
    databaseURL: "https://trainscheduler-92e12.firebaseio.com",
    storageBucket: "trainscheduler-92e12.appspot.com",
    messagingSenderId: "676872432035"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function() {

    var name = $('#train-name-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var firstTrain = $('#first-train-input').val().trim();
    var tFrequency = $('#train-frequency-input').val().trim();

    var newTrain = {
        TrainName: name,
        Destination: destination,
        FirstTrain: firstTrain,
        Frequency: tFrequency,
    };

    database.ref().push(newTrain);

    alert(" NEW TRAIN SCHEDULED");
    $('#train-destination-input').val("");
    $('#first-train-input').val("");
    $('#train-frequency-input').val("");

    return false;

});

database.ref().on('child_added', function(childSnapshot, prevChildKey) {

    var name = childSnapshot.val().TrainName;
    var destination = childSnapshot.val().Destination;
    var firstTrain = childSnapshot.val().FirstTrain;
    var tFrequency = childSnapshot.val().Frequency;



    var firstimeConvertion = moment(firstTrain, 'hh:mm').subtract(1, 'years');
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstimeConvertion, 'HH:mm'), 'minutes');
    var timeRemaining = diffTime % parseInt(tFrequency);
    var minutesTillArr = parseInt(tFrequency) - timeRemaining;
    var nextTrain = moment().add(minutesTillArr, 'minutes').locale('en').format('hh:mm A');


    console.log('time diffrence ' + diffTime);
    console.log('remaining time ' + timeRemaining);
    console.log('current time ' + moment(currentTime).locale('en').format('hh:mm A'));
    console.log('remaining time ' + diffTime);
    console.log('time before arrival ' + moment(minutesTillArr).format('HH:MM'));
    console.log('NEXT TRAIN: ' + nextTrain);

    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
        tFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillArr + "</td></tr>");

});