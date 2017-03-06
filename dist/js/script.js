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
	var lastElement = "";// последний элемент в стеке

	var string = (inputString + " $").split(" ");
	var status = 2;
				//0 - преобразование невыполнено, ошибка; 
				//1 - преобразование выполнено успешно; 
				//2 - преобразование в процессе
	
	var i = 0;

	while(status == 2) {
		if ($.isNumeric(string[i])) { // если число
			numbersStack.push(string[i]);
			i++;
		}
		if (string[i] == "+" || string[i] == "-") {  // если - или +
			if (lastElement.length == 0 || lastElement == "(") {
				operatorsStack.push(string[i]);
				lastElement = string[i];
				i++;
			}
			else if (lastElement == "+" || lastElement == "-" || lastElement == "*" || lastElement == "/") {
				operatorsStack.pop(lastElement);
				numbersStack.push(lastElement);
				lastElement = operatorsStack;
			}
		}
		else if (string[i] == "*" || string[i] == "/") {  //если * или /
			if (lastElement.length == 0 || lastElement == "(" || lastElement == "+" || lastElement == "-") {
				operatorsStack.push(string[i]);
				lastElement = string[i];
				i++;
			}
			else if (lastElement == "*" || lastElement == "/") {
				operatorsStack.pop(lastElement);
				numbersStack.push(lastElement);
				lastElement = operatorsStack;
			}
		}
		else if (string[i] == "(") { //если на стрелке открывающая скобка, то добавляем её в стек 
				lastElement = string[i];
				operatorsStack.push(string[i]);
				i++;
		} 
		else if (string[i] == ")") {  //если на стрелке закрывающая скобка
			if (lastElement.length == 0) {
				status = 0;   // если на стрелке закрывающая скобка, а в стеке нет элементов - изменяем стутус на 0 - ошибка
			}
			else if (lastElement == "+" || lastElement == "-" || lastElement == "*" || lastElement == "/") {
				operatorsStack.pop(lastElement);
				numbersStack.push(lastElement);
				lastElement = operatorsStack;
			}
			else if (lastElement == "(") {
				operatorsStack.pop();
				lastElement = "";
				i++;
			}
		}
		else if (string[i] = "$") { //если последний элемент
			if (lastElement.length == 0) {
				status = 1; //преобразование из инфиксной нотации в постфиксную завершено
			}
			else if (lastElement == "+" || lastElement == "-" || lastElement == "*" || lastElement == "/") {
				operatorsStack.pop();
				numbersStack.push(lastElement);
				lastElement = "";
			}
			else if (lastElement == "(") {
				status = 0; //// если на стрелке последний вагон, а в стеке есть открывающая скобка - ошибка
			}
		}
		else {
			status = 0; // неизвестный символ
		}

	}

	if (status == 1) {
		var post = numbersStack.toString();
		post = post.replace(/,/g, " ");
		//alert(post);
		 $("#ansver").text(post); 
	}
}
