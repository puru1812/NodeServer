
function FormSubmit() {
    console.log("FormSubmit");
        storeFormData();
}

function storeFormData() {
     
   loadDoc("/subscribe", GetResult);
    
}

function loadDoc(url, cFunction) {
  var name = document.getElementById("fname").value;
  var age = document.getElementById("age").value;
  var gender = document.getElementById("gender").value;
  var email = document.getElementById("email").value;
  if (name == "" || age == "" || gender== "" || email =="") {
    alert("Please fill out the form fields");
    return false;
  }
    document.getElementById("registrationForm").style.visibility = "hidden";
   
 
    const xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cFunction(this);
        }
    }
    
  xhttp.open("POST", url);
  xhttp.setRequestHeader("Content-type", "application/json");
 xhttp.send(JSON.stringify({ "name": name, "age": age,"gender":gender,"email":email}));

}

function GetResult(xhttp) {
  console.log("got response"+xhttp.responseText);
  document.getElementById("register").innerHTML ='<p>Thanks for subscribing '+xhttp.responseText+'. We will send you an invite once the search begins!Also, to fill in the surve, click on <a href="survey.html">Survey</a> in topbar!</p>';
    
}