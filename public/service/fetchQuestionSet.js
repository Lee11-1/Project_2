
async function loadQuestionSet() {
    try {
        const response = await fetch(`/all-questionSet`);
        const data = await response.json();

        if (!response.ok) {
            alert("Lỗi khi tải dữ liệu");
            return;
        }
        displayAllSet(data.allSet);

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Không thể tải dữ liệu.");
    }
} 
loadQuestionSet();
const data = require('../js/data.js');
displayAllSet(data.setArray);

async function viewQuestionInSet(set_id) {
    try {
         window.location.href = `/questionSet/${set_id}`; 
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
}

async function deleteSet(set_id) {
    try {
        const response = await fetch("/deleteSet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({set_id}) 
        });

        const result = await response.json();
        if (response.ok) {
           loadQuestionSet();
        } else {
            alert(result.message); 
        }
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }    
}