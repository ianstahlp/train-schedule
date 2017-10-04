//Firebase setup
 var config = {
    apiKey: "AIzaSyDF_0XhTnpDDjurw67LmFlxpyEVVRJVd1U",
    authDomain: "train-schedule-91c75.firebaseapp.com",
    databaseURL: "https://train-schedule-91c75.firebaseio.com",
    projectId: "train-schedule-91c75",
    storageBucket: "train-schedule-91c75.appspot.com",
    messagingSenderId: "671446867665"
  };

  firebase.initializeApp(config);


  var database = firebase.database();
  var currentTime = moment();


//In which the fun stuff occurs
  database.ref().on("child_added", function(childSnapshot) {

  	console.log(childSnapshot.val());

  	var trainName = childSnapshot.val().name;
  	var trainDestination = childSnapshot.val().arrivalDestination;
  	var trainTime = childSnapshot.val().time;
  	var trainFrequency = childSnapshot.val().frequency;
  	var minutesUntilTrain = childSnapshot.val().min;
  	var nextTrain = childSnapshot.val().next;

  	   $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesUntilTrain + "</td><tr>");

  });

  database.ref().on("value", function(snapshot){
console.log(snapshot.val().name)
  });

//on click function to add trains to table
$("#submitButton").on('click', function() {

	var trainName = $("#trainNameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var trainTime = $("#timeInput").val().trim();
	var trainFrequency = $("#frequencyInput").val().trim();

	//CALCULUS 
	var trainConversion = moment(trainTime, "hh:mm").subtract("1, years");
	//STATISTICS
	var differencial = currentTime.diff(moment(trainConversion), "minutes");
	var modal = differencial % trainFrequency;
	var minutesUntilTrain = trainFrequency - modal;
	var nextTrain = moment().add(minutesUntilTrain, "minutes").format("hh:mm a");
	//information for the local session implementation.
	var newTrain = {
		name: trainName,
		arrivalDestination: trainDestination,
		time: trainTime,
		frequency: trainFrequency,
		min: minutesUntilTrain,
		next: nextTrain
	};

	database.ref().push(newTrain)

	console.log(newTrain.name);
	console.log(newTrain.arrivalDestination);
	console.log(newTrain.time);
	console.log(newTrain.frequency);


//empties the submission once it's been entered in. also stops the page from refreshing for a clean look.
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#timeInput").val("");
	$("#frequencyInput").val("");
return false;
});



