

function loadData(){
    let savedQuestionSet = localStorage.getItem('sets');
    console.log(savedQuestionSet);
    let setList = savedQuestionSet ? JSON.parse(savedQuestionSet) : [];
    displayAllSet(setList);
}

loadData();

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
            let savedQuestionSet = localStorage.getItem('sets');
            let setList = savedQuestionSet ? JSON.parse(savedQuestionSet) : [];
          
            // Lọc bỏ lớp có ID trùng với classId
            setList = setList.filter(s => s.id !== set_id);
         
            localStorage.setItem('sets', JSON.stringify(setList));
           loadData();
        } else {
            alert(result.message); 
        }
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }    
}