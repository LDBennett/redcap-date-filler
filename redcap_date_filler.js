/*
REDCAP Date Filler (ASC or DESC)
-------------------------------
AUTHOR: Lee Bennett
CONTACT: LDBennett@gmail.com
___________________________________________________________________
HOW TO USE:
-Copy this code into the browser's console while having 
 the REDCAP form you want to insert the dates into open.
-Be sure to rename any variables below to ones appropriate
 for your project
___________________________________________________________________
This code gets the inital date from the REDCAP form (or from the 
startDate var) and then either puts in the previous (or next) dates
in an array. A loop then puts the values from the array into the 
correct REDCAP fields in the correct (mm/dd/yyyy) format.
*/

//Input date variable name from REDCAP form OR an actual start date in mm-dd-yyyy 
//format to get initial date
var startDate = $('input[name=tf_date]').val(); 

//Variable name for the list of days
var varDateName = "tf_day";

//Variable for how many days from REDCAP form OR input number of days
var countDate = $('input[name=tf_days]').val();

//Calls function autoFillDate with the appropriate arguments
autoFillDate(startDate,countDate,true,varDateName);

//This functions gets the two variables names of the start date from
//the function call. It then gets how many days it needs to go back
//and creates a array of dates to be put into the dateVar field.
//This assumes the variables names ascend starting at 1.
//[EX: tf_day1, tf_day2, tf_day3]
function autoFillDate(start,count,descend,dName){

	//Creates date into Date object
	var date = new Date(start);

	//Days array to store the Date Objects
	var days = [];

	//Count for how many dates need to be inserted
	var d_num = 0;
	
	var plusOrMinus = 0;

	if (descend === true){
		plusOrMinus = -1;//If dates are descending
	}
	else{
		plusOrMinus = 1;//If dates are ascending
	}
	
	//Loop that inserts each date into an array (called days) while d_num is 
	//less than the dates given from the parameter count
	while(d_num < count){
		days[days.length] = date.setDate(date.getDate()+(plusOrMinus * 1));
		d_num++;
	}
	//Loop that created variable input name then inserts date from the
	//array days into the field
	for (var i = 0; i < count; i++){
		var name = dName + (i+1);
		$('input[name='+name+']').val(getFormattedDate(days[i]));
	}
}

//Function to create have date in correct format (mm-dd-yyyy)
function getFormattedDate(date) {
  date = new Date(date);
  
  var year = date.getFullYear();
  
  var month = (1 + date.getMonth()).toString(); //Adds 1 to .getMonth() since it starts at 0
  month = month.length > 1 ? month : '0' + month; //2 digit months; Adds a 0 if there is only 1 digit
  
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day; //2 digit days; Adds a 0 if there is only 1 digit
  
  return month + '-' + day + '-' + year; //returns in format mm-dd-yyyy
}