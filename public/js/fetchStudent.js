
document.getElementById("addClassButton").addEventListener("click", async function () {
    const form = document.getElementById("crClass");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
        const response = await fetch("/addClass", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result); 
        if (response.ok) {
            window.location.href = result.redirect; 
        }
        else{
            alert(result.message);
        }

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }  
    
});


document.getElementById("createExamButton").addEventListener("click", async function () {
    const form = document.getElementById("crTest");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/createExam", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }) ;

        const result = await response.json();
        if (response.ok) {
            window.location.href = result.redirect; 
        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Error");
    }
    
});


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