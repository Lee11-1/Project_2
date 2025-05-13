const  Task =["allUser", "allClass", "allExam"];
function seeTask(task){
    for(i = 0; i < Task.length; i++){
        if(task == Task[i]){
            if(task == "user_container")  document.getElementById(Task[i]).style.display = "flex";
            else document.getElementById(Task[i]).style.display = "block";
        } 
        else document.getElementById(Task[i]).style.display = "none";
    }
}