
const  classTask =["homeClass","classTest","classDocu","classMem","classInfo"];
function seeClassTask(task){
    for(i = 0; i < classTask.length; i++){
        if(task == classTask[i]) document.getElementById(classTask[i]).style.display = "flex";
        else document.getElementById(classTask[i]).style.display = "none";
    }
}
document.getElementById("className").addEventListener("input", function() {
    if (this.value.length > 20) {
        alert("Tên lớp không được vượt quá 20 ký tự!");
        this.value = this.value.slice(0, 20); // Cắt bớt ký tự dư
    }
});

document.addEventListener("DOMContentLoaded", function() {
    loadClassData();
 });
 
