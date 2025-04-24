let setArray = [];
let classArray = [];
let examArray = [];

function setClassArray(allClass){
   
    allClass.forEach(classes => { 
        const classtData = {
            id: classes.id,
            name: classes.class_name,
            subject: classes.subject,
            createdAt: new Date(classes.created_at).toLocaleDateString("vi-VN")
        };
        classArray.push(classtData);
    });
}

function setExamArray(allExams){
    classArray.length = 0; 
    allExams.forEach(exam => {
        const examData = {
            id: exam.id,
            name: exam.title,
            timelimit: exam.timelimit,
            numberQuestion: exam.numberquestion,
            createdAt: new Date(exam.created_at).toLocaleDateString("vi-VN")
        };
        examArray.push(examData);
    });
}

function setSetArray(allSets){
    allSets.forEach(set =>{
        const setData = {
            id: set.id,
            name: set.name,
            createdAt: new Date(set.created_at).toLocaleDateString("vi-VN")
        };
        setArray.push(setData)
    });
}
function getClassArray() {
    return classArray;
}
export  {
    setArray,
    classArray,
    examArray,
    setClassArray,
    setExamArray,
    setSetArray,
    getClassArray
  };