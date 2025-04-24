
async function loadQuestionSetData() {
    try {
        const response = await fetch(`/infoSet`);
        const data = await response.json();

        if (!response.ok) {
            alert("Lỗi khi tải dữ liệu");
            return;
        }
        console.log(data.questions);
       displayAllQuestion(data.questions,"bodyQuestion");

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Không thể tải dữ liệu lớp học.");
    }
}
loadQuestionSetData();


function addQuestion(){      
    document.getElementById("addQuestionButton").addEventListener("click", async function () {
        const form = document.getElementById("crNewQuestion");
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        try {
            const response = await fetch("/addQuestion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log(result); 
            if (response.ok) {
                window.location.href = result.redirect; 
            } else{
                alert(result.message);
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }  
    });
}
addQuestion();
