
async function addMemToExam() {
    const form = document.getElementById("findMember"); 
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try{ 
        const response = await fetch("/findMemtoExam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result); 
    if (response.ok) {
        loadExamData();
    } else{
        alert(result.message);
    }

    } catch (error){
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
} 
async function getListQuestionSet() {

    // try {
    //     const response = await fetch("/getListQuestionSet");
    //     const data = await response.json();
    //     if (!response.ok) {
    //         alert("Lỗi khi tải dữ liệu");
    //         return;
    //     }
    //     displayListQuestionSet(data.listQuestionSet);

    // } catch (error) {
    //     console.error("Lỗi:", error);
    //     alert("Có lỗi xảy ra, vui lòng thử lại.");
    // }
    let savedQuestionSet = localStorage.getItem('sets');
    console.log(savedQuestionSet);
    let setList = savedQuestionSet ? JSON.parse(savedQuestionSet) : [];
    displayListQuestionSet(setList);
    displayNumOfQuestionSelected();

    // let num = 0;
    // localStorage.setItem('numOfQuestion', JSON.stringify(num));
}
function findQuestion(){
    document.getElementById("findQuestion").addEventListener("click", async function () {
        const form = document.getElementById("selectLabelQuestion");
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        try {
            const response = await fetch("/findQuestion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log(result); 

            if (response.ok) {
               displayAllQuestion(result.questions,"selectQuestionToExam");
            } else{
                alert(result.message);
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }  
    });
}

function deleteSelect(){
    document.getElementById("deleteSelect").addEventListener("click", function () {
        localStorage.removeItem('selectedQuestions');
        displayNumOfQuestionSelected();
        location.reload();

    });
};
function addQuestion() {
    document.getElementById("addQuestionToExamButton").addEventListener("click", async function () {
        const saved = localStorage.getItem('selectedQuestions');
        let questionID = [];

        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                questionID = parsed;
            } else {
                console.warn("selectedQuestions không phải mảng hợp lệ.");
                alert("Dữ liệu câu hỏi không hợp lệ.");
                return;
            }
        } catch (err) {
            console.error("Không thể phân tích JSON:", err);
            alert("Dữ liệu câu hỏi bị lỗi.");
            return;
        }

        if (questionID.length === 0) {
            alert("Bạn chưa chọn câu hỏi nào.");
            return;
        }

        try {
            const response = await fetch("/addQuestionToExam", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ questionID })
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message || "Thêm câu hỏi thành công!");
                loadExamData(); 
            } else {
                alert(result.message || "Thêm câu hỏi thất bại!");
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
    });
}


addQuestion();
deleteSelect();
findQuestion();
getListQuestionSet();
loadExamData();
displayNumOfQuestionSelected();