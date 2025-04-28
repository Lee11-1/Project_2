

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

async function submitExam(questions, numberQuestion){
    let score1 = 0;
    let num = parseInt(numberQuestion);
    questions.forEach((question, index) => {
      const questionDiv = document.getElementById(`quiz-${index}`);
      const selectedAnswer = questionDiv.dataset.selectedAnswer; // Get selected answer
      const correctAnswer = question.answer_correct; // Get correct answer for this question
  
      if (selectedAnswer === correctAnswer) {
        score1++;
      }
    });
    console.log(score1, num);
    let score = parseFloat( score1 * 10)/num;
    try {
        const response = await fetch("/submitExam", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({score})
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