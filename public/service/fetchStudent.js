async function loadStudentData() {
    try {
        const response = await fetch(`/all-classes`);
        const data = await response.json();

        if (!response.ok) {
            alert("Lỗi khi tải dữ liệu");
            return;
        }
        displayAllClass(data.allClass); 
        
        console.log(data.allExams);
        displayExam(data.allExams);

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Không thể tải dữ liệu lớp học.");
    }
}

async function loadQuestionSet() {
    try {
        const response = await fetch(`/all-questionSet`);
        const data = await response.json();

        if (!response.ok) {
            alert("Lỗi khi tải dữ liệu");
            return;
        }
        let savedQuestionSet = localStorage.getItem('sets');
        console.log(savedQuestionSet);
        let setList = savedQuestionSet ? JSON.parse(savedQuestionSet) : [];
        data.allSet.forEach(set => {
            if (!setList.find(s => s.id === set.id)) { 
                setList.push(set);
              }
        });
        localStorage.setItem('sets', JSON.stringify(setList));

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Không thể tải dữ liệu.");
    }
} 
function loadData(){

    let savedClasses = localStorage.getItem('classes');
    console.log(savedClasses);
    let classList = savedClasses ? JSON.parse(savedClasses) : [];
    let savedExams= localStorage.getItem('exams');
    let examList = savedExams ? JSON.parse(savedExams) : [];
    let savedQuestionSet = localStorage.getItem('sets');
    console.log(savedQuestionSet);
    let setList = savedQuestionSet ? JSON.parse(savedQuestionSet) : [];
 
    if (classList.length === 0) {
    loadStudentData();  }
    else{
        displayAllClass(classList);
        displayExam(examList);
    }
    if (setList.length === 0) {
        loadQuestionSet();  }
}

loadData();
addClass();
createExam();
createQuestionSet();
// displayAllClass(getClassArray());
// displayExam(examArray);
