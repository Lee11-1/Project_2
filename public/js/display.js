
function displayAllClass(allClass){
    const container = document.getElementById('class_container');
    container.innerHTML = ''; 

    let savedClasses = localStorage.getItem('classes');
    let classList = savedClasses ? JSON.parse(savedClasses) : [];

    allClass.forEach(classes => { console.log(classes);
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('classes');
    
        const img = document.createElement('img');
        img.src = "/src/class.png";
        img.alt = "Ảnh lớp học";  
    
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('cl_2');
  
        const name = document.createElement('h3');
        name.textContent = ` ${classes.class_name}`;
   
        const idSubject = document.createElement('p');
        idSubject.textContent = `ID: ${classes.class_id} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Subject: ${classes.subject}`; // \u00A0 là khoảng trắng không ngắt dòng
 
        const date = document.createElement('p');
        date.textContent = `Date: ${new Date(classes.created_at).toLocaleDateString()}`;

        const viewClassButton = document.createElement('button');
        viewClassButton.textContent = 'View Class';
    
        const addClass = document.createElement('p');
        addClass.classList.add('addClass')
        addClass.appendChild(viewClassButton);
    
        projectDiv.addEventListener("click", function() {
            openClass(classes.class_id);
        });
    
        infoDiv.appendChild(name);
        infoDiv.appendChild(idSubject);
        infoDiv.appendChild(date);
        infoDiv.appendChild(addClass);
    
        projectDiv.appendChild(img);
        projectDiv.appendChild(infoDiv);
        container.appendChild(projectDiv);

        if (!classList.find(c => c.class_id === classes.class_id)) { 
            classList.push(classes);
          }
       
    });
    localStorage.setItem('classes', JSON.stringify(classList));
}


function displayExam(allExams){
    const container = document.getElementById('class_container');

    let savedExams= localStorage.getItem('exams');
    let examList = savedExams ? JSON.parse(savedExams) : [];
    allExams.forEach(exam => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('classes');
    
        const img = document.createElement('img');
        img.src = "/src/exam.png";
        img.alt = "Ảnh lớp học";  
    
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('cl_2');
  
        const name = document.createElement('h3');
        name.textContent = ` ${exam.title}`;
   
        const idSubject = document.createElement('p');
        idSubject.textContent = `Time linmit: ${exam.timelimit} minute \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Number questions: ${exam.numberquestion}`; // \u00A0 là khoảng trắng không ngắt dòng
                                                                                                                      
        const date = document.createElement('p');
        date.textContent = `Ended: ${new Date(exam.ended).toLocaleDateString()}`;

        const viewClassButton = document.createElement('button');
        viewClassButton.textContent = 'View Exam';
    
        const addClass = document.createElement('p');
        addClass.classList.add('addClass')
        addClass.appendChild(viewClassButton);
    
        projectDiv.addEventListener("click", function() {
            openExam(exam.id, exam.title);
        });
    
        infoDiv.appendChild(name);
        infoDiv.appendChild(idSubject);
        infoDiv.appendChild(date);
        infoDiv.appendChild(addClass);
    
        projectDiv.appendChild(img);
        projectDiv.appendChild(infoDiv);
        container.appendChild(projectDiv);

        if (!examList.find(e => e.id === exam.id)) { 
            examList.push(exam);
          }
    });
    localStorage.setItem('exams', JSON.stringify(examList));
}




function displayClassInfo(classInfo, infoOwner){
    const infoDiv = document.getElementById('class-name');
    infoDiv.innerHTML = '';
    infoDiv.innerHTML = `
    <h2>Class name: ${classInfo.name}</h2>
    <p>Start: ${new Date(classInfo.created_at).toLocaleString()}</p>
    <p>Owner: ${infoOwner.fullname} </p>
    <p>Email: ${infoOwner.email} </p>
`;
    const infoDiv2 = document.getElementById('classInfo');

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Delete Class"; 
    button.classList.add("deleteClass"); 
    button.addEventListener("click",async function(event) {  event.preventDefault(); deleteClass( classInfo.id)  });

    infoDiv2.appendChild(button);

}

function displayClassHome(re_members){
    const infoDiv = document.getElementById('reMem');
    infoDiv.innerHTML = '';
    re_members.forEach(re_mem =>{
        const li = document.createElement("li");
        li.innerHTML = `<p> Name: ${re_mem.fullname} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email: ${re_mem.email} </p>`;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Delete"; 
        button.classList.add("deleteMem"); 
        button.addEventListener("click",async function(event) {  event.preventDefault(); deleteReMem( re_mem.user_id)  });


        const button1 = document.createElement("button");
        button1.textContent = "Accept"; 
        button1.classList.add("acceptMem"); 
        button1.addEventListener("click",async function(event) {  event.preventDefault(); addMem(re_mem.user_id)  });

        li.appendChild(button1);
        li.appendChild(button);

        infoDiv.appendChild(li);
    });
}

function displayMembers(members, id) {
    const membersList = document.getElementById(id);
    membersList.innerHTML = "";
    members.forEach(member => {
        const li = document.createElement("li");
        li.innerHTML = ` <p> Name: ${member.fullname}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email: ${member.email} </p>`;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Delete"; 
        button.classList.add("deleteMem"); 
        button.addEventListener("click",async function(event) {  event.preventDefault(); deleteMem(member.user_id)  });
        li.appendChild(button);
        membersList.appendChild(li);
    });
}


 function displayResultFind(allClass , type){
    const container = document.getElementById('bodySearch');
    console.log(allClass, type);
    if(type == "1") container.innerHTML = '';
    allClass.forEach(classes => {
        if(type == "1"){
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('classes');
            projectDiv.addEventListener("click", function() { requestToClass(classes.class_id)  });
            projectDiv.innerHTML = `
                <img src="/src/class.png" alt="">
                <div class = "cl_2"> 
                    <h3> ${classes.class_name}</h3>
                    <p>ID:${classes.class_id}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Subject: ${classes.subject} </p>
                    <p>Date: ${new Date(classes.created_at).toLocaleDateString()}</p>
                    <p class = "addClass" id = "addClass" > <button> Request </button> </p>
                </div>   `;
            container.appendChild(projectDiv);
        }
        else if (type == "2"){
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('classes');
            projectDiv.addEventListener("click", function() { unRequest(classes.class_id)  });
            projectDiv.innerHTML = `
                <img src="/src/class.png" alt="">
                <div class = "cl_2"> 
                    <h3> ${classes.class_name}</h3>
                    <p>ID:${classes.class_id}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Subject: ${classes.subject} </p>
                    <p>Date: ${new Date(classes.created_at).toLocaleDateString()}</p>
                    <p class = "Sent" id = "Sent" > <button> Sent </button> </p>
                </div>   `;
            container.appendChild(projectDiv);
        }
        else if (type == "3"){
            const projectDiv = document.createElement('div');
        projectDiv.classList.add('classes');
    
        const img = document.createElement('img');
        img.src = "/src/class.png";
        img.alt = "Ảnh lớp học";  
    
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('cl_2');
  
        const nameHeading = document.createElement('h3');
        nameHeading.textContent = ` ${classes.class_name}`;
   
        const idSubjectParagraph = document.createElement('p');
        idSubjectParagraph.textContent = `ID: ${classes.class_id} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Subject: ${classes.subject}`; // \u00A0 là khoảng trắng không ngắt dòng
 
        const dateParagraph = document.createElement('p');
        dateParagraph.textContent = `Date: ${new Date(classes.created_at).toLocaleDateString()}`;

        const viewClassButton = document.createElement('button');
        viewClassButton.textContent = 'View Class';
    
        const addClassParagraph = document.createElement('p');
        addClassParagraph.classList.add('addClass')
        addClassParagraph.appendChild(viewClassButton);
    
        projectDiv.addEventListener("click", function() {
            openClass(classes.class_id);
        });
    
        infoDiv.appendChild(nameHeading);
        infoDiv.appendChild(idSubjectParagraph);
        infoDiv.appendChild(dateParagraph);
        infoDiv.appendChild(addClassParagraph);
    
        projectDiv.appendChild(img);
        projectDiv.appendChild(infoDiv);
        container.appendChild(projectDiv);
        }  
    });
}



function displayAllSet(sets) {
    const setLists = document.getElementById("set_container");
    setLists.innerHTML = "";

    sets.forEach(set => {
        const li = document.createElement("li");
        li.innerHTML = ` <p>  ${set.name}  </p> <p> ${new Date(set.created_at).toLocaleDateString("vi-VN")}</p>`;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "View"; 
        button.classList.add("viewSet"); 
        button.addEventListener("click",async function(event) {  
            event.preventDefault();  
            viewQuestionInSet(set.id);
        });
        const button2 = document.createElement("button");
        button2.type = "button";
        button2.textContent = "Delete"; 
        button2.classList.add("deleteSet"); 
        button2.addEventListener("click",async function(event) {  
            event.preventDefault();  
           deleteSet(set.id);
        });
        li.appendChild(button);
        li.appendChild(button2);
        setLists.appendChild(li);
       
    });
 
}

function displayAllQuestion(questions, id) {
    const questionsList = document.getElementById(id);
    questionsList.innerHTML = ""; 

    function getSelectedCheckboxes() {
        const saved = localStorage.getItem('selectedQuestions');
        return saved ? JSON.parse(saved) : [];
    }
    
      // Function to save selected checkbox IDs to Local Storage
    function saveSelectedCheckboxes(selectedIds) {
        localStorage.setItem('selectedQuestions', JSON.stringify(selectedIds));
    }
    
    let selectedCheckboxes = getSelectedCheckboxes(); // Load saved state
  
    questions.forEach((question, index) => { 
    
      const quizDiv = document.createElement("div");
      quizDiv.className = "quiz";
  
      const questionTitle = document.createElement("h3");
      //questionTitle.textContent = `Câu số ${index + 1} (${question.task}):`;
      questionTitle.textContent = `Câu số ${index + 1}${id !== "examQuestions" ? ` (${question.task})` : ''}:`;

  
      const questionText = document.createElement("p");
      questionText.textContent = question.question_text;
  
      const answerList = document.createElement("ul");
  
      const answers = [
        { text: question.answer_a, letter: 'A' },
        { text: question.answer_b, letter: 'B' },
        { text: question.answer_c, letter: 'C' },
        { text: question.answer_d, letter: 'D' }
      ];
  
      answers.forEach(answer => {
        const answerItem = document.createElement("li");
        answerItem.textContent = `${answer.letter}. ${answer.text}`;
        answerList.appendChild(answerItem);
      });
  
      const correctAnswer = document.createElement("li");
      correctAnswer.className = "correct";
      correctAnswer.textContent = `Correct Answer: ${question.answer_correct}`;

      if (id == "selectQuestionToExam"){

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `${question.id}`; // Unique ID for the checkbox
        checkbox.className = "question-checkbox"; // Class for styling if needed
        
        const isChecked = selectedCheckboxes.includes(checkbox.id);
        checkbox.checked = isChecked;
    
        // Lắng nghe sự kiện 'change' của checkbox
        checkbox.addEventListener("change", function() {
          if (this.checked) {
            // Add to the list of selected checkboxes
            if (!selectedCheckboxes.includes(this.id)) {
              selectedCheckboxes.push(this.id);
            }
          } else {
            // Remove from the list of selected checkboxes
            selectedCheckboxes = selectedCheckboxes.filter(id => id !== this.id);
          }
          saveSelectedCheckboxes(selectedCheckboxes); // Save the updated list
          displayNumOfQuestionSelected()
          console.log(selectedCheckboxes);
        });

        const questionHeader = document.createElement("div"); //create a div to hold checkbox and questionTitle
        questionHeader.style.display = "flex"; //use flexbox to align items
        questionHeader.style.alignItems = "center"; // vertically center items
        questionHeader.appendChild(checkbox);
        questionHeader.appendChild(questionTitle);
        quizDiv.appendChild(questionHeader); 
      }
      else if(id == "examQuestions" ){
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Delete"
       
        button.addEventListener("click",async function(event) {
            event.preventDefault();
            deleteQuestion(question.id);
        });

        const questionHeader = document.createElement("div"); 
        questionHeader.style.display = "flex"; 
        questionHeader.style.alignItems = "center"; 
        questionHeader.appendChild(button);
        questionHeader.appendChild(questionTitle);
        quizDiv.appendChild(questionHeader); 
      }
      else{
        quizDiv.appendChild(questionTitle);
      }
      
      quizDiv.appendChild(questionText);
      quizDiv.appendChild(answerList);
      quizDiv.appendChild(correctAnswer);
  
      questionsList.appendChild(quizDiv);
    });
    saveSelectedCheckboxes(selectedCheckboxes); //save initial state
}

function displayListQuestionSet(allSets){
    const setList = document.getElementById("selectQuestionSet");
    setList.innerHTML = ""; 

    allSets.forEach(set => {
        const option = document.createElement("option");
        option.innerHTML = `${set.name}`;
        option.value = set.id;
        setList.appendChild(option);
    });
}

function displayNumOfQuestionSelected(){
    const divNum = document.getElementById("numOfQuestionSelected");
    divNum.innerHTML = ""; 
    const saved = localStorage.getItem('selectedQuestions');
    let questionList = saved ? JSON.parse(saved) : [];
    divNum.innerHTML =  `Selected: ${questionList.length}`;
}

function displayQuestionForExam(questions, time) { 
  const questionsList = document.getElementById("quiz_container");
  questionsList.innerHTML = "";

  const quizContainer = document.createElement("div");
  quizContainer.className = "quiz_container";
  quizContainer.id = "quiz_container";

  questions.forEach((question, index) => {
    const quizDiv = document.createElement("div");
    quizDiv.className = "quiz";
    quizDiv.id = `quiz-${index}`; // Thêm ID để dễ truy cập

    const questionHTML = `
      <h3>Câu số ${index + 1}:</h3>
      <p>${question.question_text}</p>
      <ul>
        <li><input class="answer" name="answer${index + 1}" type="radio" value="A"> A. ${question.answer_a}</li>
        <li><input class="answer" name="answer${index + 1}" type="radio" value="B"> B. ${question.answer_b}</li>
        <li><input class="answer" name="answer${index + 1}" type="radio" value="C"> C. ${question.answer_c}</li>
        <li><input class="answer" name="answer${index + 1}" type="radio" value="D"> D. ${question.answer_d}</li>
      </ul>
    `;
    quizDiv.innerHTML = questionHTML;
    quizContainer.appendChild(quizDiv);

    // Lắng nghe sự kiện thay đổi của các radio button
    const answerInputs = quizDiv.querySelectorAll('.answer');
    answerInputs.forEach(input => {
      input.addEventListener('change', () => {
        // Lưu đáp án đã chọn vào thuộc tính data của questionDiv
        quizDiv.dataset.selectedAnswer = input.value;
      });
    });
  });

  questionsList.appendChild(quizContainer);

  document.getElementById("submitTest").addEventListener("click", async function () {
         submitExam(questions, questions.length);
  })
}

  function displayTime(time, questions){

    // const header = document.getElementById("headTest");
    // header.innerHTML= "";
    // header.innerHTML = `${time.title}`;

    let duration = time.timelimit * 60; 
    const timerDisplay = document.getElementById('timer');

    const countdown = setInterval(() => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        duration--;

        if (duration < 0) {
            clearInterval(countdown);
            alert("Hết thời gian! Bài sẽ được nộp tự động.");
            submitExam(questions, questions.length);
        }
    }, 1000);
  }

 

  function displayAttempt(attempts) {
    const attemptList = document.getElementById("userAttempts");
    attemptList.innerHTML = ''; // Clear any existing content
  
    // Create the table element
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.margin = "20px 0";
  
    // Create the table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
  
    const idHeader = document.createElement("th");
    idHeader.textContent = "ID";
    idHeader.style.padding = "10px";
    idHeader.style.borderBottom = "1px solid #ddd";
    idHeader.style.textAlign = "left";
    idHeader.style.background = " #14888e;"
  
    const scoreHeader = document.createElement("th");
    scoreHeader.textContent = "Score";
    scoreHeader.style.padding = "10px";
    scoreHeader.style.borderBottom = "1px solid #ddd";
    scoreHeader.style.textAlign = "left";
  
    const timeHeader = document.createElement("th");
    timeHeader.textContent = "Time Attempt";
    timeHeader.style.padding = "10px";
    timeHeader.style.borderBottom = "1px solid #ddd";
    timeHeader.style.textAlign = "left";
  
    headerRow.appendChild(idHeader);
    headerRow.appendChild(scoreHeader);
    headerRow.appendChild(timeHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    // Create the table body
    const tbody = document.createElement("tbody");
    attempts.forEach((attempt, index) => { console.log(attempt);
      const row = document.createElement("tr");
      const idCell = document.createElement("td");
      idCell.textContent = index + 1; // ID tăng dần
      idCell.style.padding = "10px";
      idCell.style.borderBottom = "1px solid #ddd";
  
      const scoreCell = document.createElement("td");
      scoreCell.textContent = attempt.score;
      scoreCell.style.padding = "10px";
      scoreCell.style.borderBottom = "1px solid #ddd";
  
      const timeCell = document.createElement("td");
      timeCell.textContent = attempt.submitted_at; // Giả sử tên thuộc tính là time_attempt
      timeCell.style.padding = "10px";
      timeCell.style.borderBottom = "1px solid #ddd";
  
      row.appendChild(idCell);
      row.appendChild(scoreCell);
      row.appendChild(timeCell);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
  
    // Add the table to the container
    attemptList.appendChild(table);
  }