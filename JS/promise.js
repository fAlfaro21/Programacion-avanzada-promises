// Un ApiKey es una llave para usar una api de internet, algunas son de pago y otras son gratuitas
// Sirven para limitar el número de peticiones por desarrollador
// Para conseguir un API KEY visita: https://quizapi.io/clientarea/settings/token
const QUESTIONS_API_KEY = "5RGLnsGH0Iko0t1GykjgZwP1DrAMUqjoCHbBOZaM";

/**
 * This function will always return a `Promise` which will resolve to a `JSON` of questions and reject an Error
 *
 * For using this function, you must provide an `API KEY` on line 4 of `/JS/promise.js` for using the function
 * @typedef {object} QuestionData `QuestionData` is a JSON described in https://quizapi.io/docs/1.0/overview
 * @param {number} [maxNumberQuestions=5] maxNumberQuestions How many questions do you like to have, minimum 1
 * @returns {Promise<QuestionData>} A Promise which resolve to QuestionData
 */
function printChoices(answersArray, index2){
	choicesDiv = document.getElementById("containerPack");
	printInput = document.createElement("input"); 
	printInput.innerText = answersArray[index2]; 
	choicesDiv.appendChild(printInput); 

	getInput = document.getElementsByTagName("Input")[i];            
	printId = document.createAttribute("id");  
	printId.value = answersArray[index2];            
	printInput.setAttributeNode(printId);  
	
	printName = document.createAttribute("name");  
	printName.value = answersArray[index2];            
	printInput.setAttributeNode(printName); 
	
	printType = document.createAttribute("type"); 
	printType.value = "radio"; 
	printInput.setAttributeNode(printType); 
	
	printClass = document.createAttribute("class");
	printClass.value = "choices";
	printInput.setAttributeNode(printClass);

	//contenedor.push(printInput);  
}

function printQuestion(data,index1){
    questionsDiv = document.getElementById("containerPack");    

    //gameInfo = document.createElement("legend");
    //gameInfo.innerText = "Pregunta " + (questionNumber+1) + " de " + numberOfQ.value;
    //questionsDiv.appendChild(gameInfo);

    title = document.createElement("legend");    
    title.innerText = data[index1].question;       
    questionsDiv.appendChild(title);       
    
    //contenedor.push(gameInfo);
    //contenedor.push(title);
}

function printQandA(data,numberOfQestionsReq){

	let answersArray = [[]];

	data.map(element => {
		answersArray.push(element.answers);				  
	  })

	for (let index1 = 0; index1 < numberOfQestionsReq.length; index1++) {
		
		printQuestion(data,index1);		
		
		for (let index2 = 0; index2 < answersArray[index1].length; index2++) {		
	
			printChoices(answersArray, index2);
			
		}

	}
    
}

function getQuestions(maxNumberQuestions) {
	console.log(maxNumberQuestions);
	return new Promise((resolve, reject) => {
		if (!QUESTIONS_API_KEY)
			throw new Error("An API KEY must be provided on /JS/promise.js line 4 for function getQuestions to work");
		else if (maxNumberQuestions < 1)
			throw new Error("maxNumberQuestions must be greater than 0");
		else {
			fetch(`https://quizapi.io/api/v1/questions?apiKey=${QUESTIONS_API_KEY}&category=code&difficulty=Easy&limit=${maxNumberQuestions}&tags=JavaScript`)
			.then(response => response.json())
			.then(questions => resolve(questions))
			.catch(error => reject(error));
		}
	});
}

startButton.addEventListener ("click", function() {
	getQuestions(numberOfQ.value)
		.then(data => {
			console.log(data);
			printQandA(data, numberOfQ.value);
			//   data.daily.map(element => {
			// 	minTempArrayData.push(element.temp.min);
			// 	maxTempArrayData.push(element.temp.max);		  
			//   })
			})	
		//.then (() => paintGraphic(minTempArrayData, maxTempArrayData))
		.catch(error => console.error(error));
});
