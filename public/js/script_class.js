
const  classTask =["homeClass","classTest","classDocu","classMem","classInfo"];
function seeClassTask(task){
    for(i = 0; i < classTask.length; i++){
        if(task == classTask[i]) document.getElementById(classTask[i]).style.display = "flex";
        else document.getElementById(classTask[i]).style.display = "none";
    }
}


