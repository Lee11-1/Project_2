

async function getDataForExam() {
    try {
        const response = await fetch("/getDataForExam");
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
    // let score1 = 0;
    // let num = parseInt(numberQuestion);

    // try {
    //     const response = await fetch("/getCorrectAnswer");
    //     const result = await response.json();
    //     const correctAnswers = result.correct_answer;
    //     console.log(correctAnswers);
        // correctAnswers.forEach((answer, index) => {
        //     const questionDiv = document.getElementById(`quiz-${index}`);
        //     const selectedAnswer = questionDiv.dataset.selectedAnswer; // Get selected answer
        //     const correctAnswer = answer.answer_correct; // Get correct answer for this question
        
        //     if (selectedAnswer === correctAnswer) {
        //       score1++;
        //     }
        //   });
    // } catch (error) {
    //     console.error("Lỗi:", error);
    //     alert("Có lỗi xảy ra, vui lòng thử lại.");
    // }

   
    //console.log(score1, num);
    //let score = parseFloat( score1 * 10)/num;
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
        const response = await fetch("/submitExam", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({answers,numOfQuestion})
        }) ;

        const result = await response.json();
        if (response.ok) {
            window.location.href = result.redirect; 
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
}

getDataForExam();