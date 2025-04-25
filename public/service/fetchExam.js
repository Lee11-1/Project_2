
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
findQuestion();
getListQuestionSet();
loadExamData();