const  controllTask =["addQuestionToExam", "viewMemAndQues"];
function seeControllTask(task){
    for(i = 0; i < controllTask.length; i++){
        if(task == controllTask[i]) document.getElementById(controllTask[i]).style.display = "flex";
        else document.getElementById(controllTask[i]).style.display = "none";
    }
}
