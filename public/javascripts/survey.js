const questions = [
    {
        question: "What type of family do you belong to ?",
        optionA: "Nuclear family",
        optionB: "Joint Family",
        optionC: "Nuclear family with siblings",
        optionD: "Nuclear family Single Child"
    },

    {
        question: "What type of family should you partner belong to?",
        optionA: "Nuclear family",
        optionB: "Joint Family",
        optionC: "Should have siblings",
        optionD: "Does not matter"
    },

    {
        question: "Who is your most preferred flavor of icecream among these?",
        optionA: "Vanilla",
        optionB: "Chocolate",
        optionC: "Strawberry",
        optionD: "I don't like icecream"
    },

    {
        question: "Which one of these is your preferred partner type?",
        optionA: "Should be a sweet tooth",
        optionB: "Should like icecream",
        optionC: "Should hate icecream",
        optionD: "Okay with sweets"
    }

]
results = [
    "Your soulmate is sweet!",
    "Your soulmate is Icy!",
    "Your soulmate is heartthrob!",
    "Your soulmate is not found!"
]


let questionIndex = 0;
let answers = [];
function ShowSurvey() {
    loadDoc("questionaire.txt", GetQuestionaire)
}
function ShowQuestion() {
   
    let chosenQuestion = questions[questionIndex];
    document.getElementById("question").innerText = "" + chosenQuestion.question;
    document.getElementById("option1").innerText = "" + chosenQuestion.optionA;
    document.getElementById("option2").innerText = "" + chosenQuestion.optionB;
    document.getElementById("option3").innerText = "" + chosenQuestion.optionC;
         document.getElementById("option4").innerText = "" + chosenQuestion.optionD;
    document.getElementById("questionaire").style.visibility = "visible";

}
function FormSubmit() {
    console.log("FormSubmit");
     document.getElementById("registrationForm").style.visibility = "hidden";
    document.getElementById("registrationResponse").style.visibility = "visible";
}

function SubmitAnswer(answer) {
    console.log("got answer" + answer);
    answers.push(parseInt(answer));
    questionIndex++;
    if (questionIndex >= questions.length) {
               loadDoc("/surveyresult", GetResult);
        } else {
        ShowQuestion();
        }
}



;

function loadDoc(url, cFunction) {
    const xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cFunction(this);
        }
    }
    
  xhttp.open("GET", url);
  xhttp.send();
}

function GetResult(xhttp) {
  document.getElementById("questionaire").innerHTML =xhttp.responseText;
    
}
function GetQuestionaire(xhttp) {
    // action goes here
     document.getElementById("flex").innerHTML = xhttp.responseText;
    ShowQuestion();
      
}

function mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
    }
