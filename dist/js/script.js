var inputString = "";
$(document).ready(function() {
      $("#myform").keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
      }
   });
});
function inputCheck() {
	if ($('#inputString').val()=="")
	{
		
		alert('Введите выражение!');
	}
	else
	{
		inputString = $("#inputString").val();
		$(".div-answer").show();
		Conver(inputString);
	}
}


function Conver(inputString) {
	var numbersStack = [];
	var operatorsStack = [];
	var lastElement = [];

	var string = (inputString + " $").split(" ");
	var status = 2;
				//0 - преобразование невыполнено, ошибка; 
				//1 - преобразование выполнено успешно; 
				//2 - преобразование в процессе
	var i = 0;

	while(status == 2) {
		if ($.isNumeric(string[i])) { 
			numbersStack.push(string[i]);
			i++;
		}
		if (string[i] == "+" || string[i] == "-") {  
			if (lastElement.length == 0 || lastElement[lastElement.length - 1] == "(") {
				operatorsStack.push(string[i]);
				lastElement.push(string[i]);
				i++;
			}//
			else if (lastElement[lastElement.length - 1] == "+" || lastElement[lastElement.length - 1] == "-" || lastElement[lastElement.length - 1] == "*" || lastElement[lastElement.length - 1] == "/") {
				operatorsStack.pop();
				numbersStack.push(lastElement[lastElement.length - 1]);
				lastElement.pop();
			}
		}
		else if (string[i] == "*" || string[i] == "/") {  
			if (lastElement.length == 0 || lastElement[lastElement.length - 1] == "(" || lastElement[lastElement.length - 1] == "+" || lastElement[lastElement.length - 1] == "-") {
				operatorsStack.push(string[i]);
				lastElement.push(string[i]);
				i++;
			}
			else if (lastElement[lastElement.length - 1] == "*" || lastElement[lastElement.length - 1] == "/") {
				operatorsStack.pop();
				numbersStack.push(lastElement[lastElement.length - 1
					]);
				lastElement.pop();
			}
		}
		else if (string[i] == "(") { 
				operatorsStack.push(string[i]);
				lastElement.push(string[i]);
				i++;
		} 
		else if (string[i] == ")") {  
			if (lastElement.length == 0) {
				status = 0;   
			}
			else if (lastElement[lastElement.length - 1] == "+" || lastElement[lastElement.length - 1] == "-" || lastElement[lastElement.length - 1] == "*" || lastElement[lastElement.length - 1] == "/") {
				operatorsStack.pop();
				numbersStack.push(lastElement[lastElement.length - 1]);
				lastElement.pop();
			}
			else if (lastElement[lastElement.length - 1] == "(") {
				operatorsStack.pop();
				lastElement.pop();
				i++;
			}
		}
		else if (string[i] = "$") { 
			if (lastElement.length == 0) {
				status = 1; 
			}
			else if (lastElement[lastElement.length - 1] == "+" || lastElement[lastElement.length - 1] == "-" || lastElement[lastElement.length - 1] == "*" || lastElement[lastElement.length - 1] == "/") {
				operatorsStack.pop();
				numbersStack.push(lastElement[lastElement.length - 1]);
				lastElement.pop();
			}
			else if (lastElement[lastElement.length - 1] == "(") {
				status = 0; 
				alert ('ошибка!');
			}
		}
		else {
			status = 0; 
			alert ('ошибка!');
		}
	}

	if (status == 1) {
		var post = numbersStack.toString();
		post = post.replace(/,/g, " ");
		 $("#ansver").text(post); 
	}
}
