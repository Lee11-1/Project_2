const  classTask =["signUpPage", "main", "signInPage"];
function showHomeMenu(task){
    for(i = 0; i < classTask.length; i++){
        if(task == classTask[i] && task == "main") document.getElementById(classTask[i]).style.display = "block";
        else if(task ==  classTask[i] ) document.getElementById(classTask[i]).style.display = "flex";
        else document.getElementById(classTask[i]).style.display = "none";
    }
}