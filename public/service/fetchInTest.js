

async function getDataForTest() {
    try {
        const response = await fetch("/getDataForTest");
        const result = await response.json();
        if (response.ok) {
           displayQuestionForExam(result.questions, result.time);
           displayTime(result.time, result.questions);
        } else{
            alert(result.message);
        }
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
}

async function submitExam(numOfQuestion){
   
    const answers = [];

    for (let index = 0; index < numOfQuestion; index++) {
        const questionDiv = document.getElementById(`quiz-${index}`);
        if (questionDiv) {
            const selectedOption = questionDiv.querySelector('input[type="radio"]:checked');
            if (selectedOption) {
                answers.push({
                    question_id: questionDiv.dataset.questionId, // hoặc một cách khác lấy ID nếu bạn có
                    selected: selectedOption.value
                });
            } else {
                // Nếu người dùng chưa chọn gì, bạn có thể push null hoặc xử lý tùy ý
                answers.push({
                    question_id: questionDiv.dataset.questionId,
                    selected: null
                });
            }
        }
    }
    try {
        const response = await fetch("/submitTest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({answers,numOfQuestion})
        }) ;

        const result = await response.json();
        if (response.ok) {
            window.location.href = `/class/${result.class_id}`; 
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
}

getDataForTest();