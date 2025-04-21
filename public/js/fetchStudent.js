

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
addClass();
createExam();
createQuestionSet();
