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
loadStudentData();
// import { getClassArray } from '../js/data.js';
// import { examArray } from '../js/data.js';
addClass();
createExam();
createQuestionSet();
// displayAllClass(getClassArray());
// displayExam(examArray);
