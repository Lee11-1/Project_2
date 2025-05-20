
function displayAllClass(allClass){
    const container = document.getElementById("class_container");
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
        idSubject.textContent = `ID: ${classes.class_id} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Subject: ${classes.subject}`; 
 
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
    const container = document.getElementById("class_container");

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
        idSubject.textContent = `Time linmit: ${exam.timelimit} minute \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Number questions: ${exam.numberquestion}`; 
                                                                                                                      
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
    
    
    function saveSelectedCheckboxes(selectedIds) {
        localStorage.setItem('selectedQuestions', JSON.stringify(selectedIds));
    }
    
    let selectedCheckboxes = getSelectedCheckboxes(); 
  
    questions.forEach((question, index) => { 
    
      const quizDiv = document.createElement("div");
      quizDiv.className = "quiz";
  
      const questionTitle = document.createElement("h3");
  
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
        checkbox.id = `${question.id}`; 
        checkbox.className = "question-checkbox"; 
        
        const isChecked = selectedCheckboxes.includes(checkbox.id);
        checkbox.checked = isChecked;
    
       
        checkbox.addEventListener("change", function() {
          if (this.checked) {
           
            if (!selectedCheckboxes.includes(this.id)) {
              selectedCheckboxes.push(this.id);
            }
          } else {
   
            selectedCheckboxes = selectedCheckboxes.filter(id => id !== this.id);
          }
          saveSelectedCheckboxes(selectedCheckboxes);
          displayNumOfQuestionSelected()
          console.log(selectedCheckboxes);
        });

        const questionHeader = document.createElement("div"); 
        questionHeader.style.display = "flex"; 
        questionHeader.style.alignItems = "center";
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
    saveSelectedCheckboxes(selectedCheckboxes); 
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
    quizDiv.id = `quiz-${index}`; 

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

    
    const answerInputs = quizDiv.querySelectorAll('.answer');
    answerInputs.forEach(input => {
      input.addEventListener('change', () => {
     
        quizDiv.dataset.selectedAnswer = input.value;
      });
    });
  });

  questionsList.appendChild(quizContainer);

  document.getElementById("submitTest").addEventListener("click", async function () {
         submitExam(questions.length);
         localStorage.removeItem(`startTime_${time.id}`);
  })
}
// function displayTime(time, questions) {
//   const timerDisplay = document.getElementById('timer');
  
//   let duration = time.timelimit * 60;
//   const examTimeKey = `examTime_${time.id}`; 

//   if (localStorage.getItem(examTimeKey)) {
//   duration = parseInt(localStorage.getItem(examTimeKey), 10);
//   } else {
  
//   localStorage.setItem(examTimeKey, duration.toString());
//   }
  
//   const countdown = setInterval(() => {
//   const minutes = Math.floor(duration / 60);
//   const seconds = duration % 60;
//   timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   duration--;
 
//   localStorage.setItem(examTimeKey, duration.toString());
  
//   if (duration < 0) {
//     clearInterval(countdown);
//     timerDisplay.textContent = "Hết giờ"; 
//     alert("Hết thời gian! Bài sẽ được nộp tự động.");
//     submitExam(questions.length);
//   }
// }, 1000);
//   }
function displayTime(time, questions) {
  const timerDisplay = document.getElementById('timer');
  const examTimeKey = `examTime_${time.id}`;
  const startTimeKey = `startTime_${time.id}`;

  let duration = time.timelimit * 60;
  let startTime;


  if (localStorage.getItem(startTimeKey)) {
      startTime = parseInt(localStorage.getItem(startTimeKey), 10);
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000); 
      duration = Math.max(0, duration - elapsed); 
  } else {

      startTime = Date.now();
      localStorage.setItem(startTimeKey, startTime.toString());
      localStorage.setItem(examTimeKey, duration.toString());
  }
  if (duration <= 0) {
    timerDisplay.textContent = "Hết giờ";
    alert("Hết thời gian! Bài sẽ được nộp tự động.");
    submitExam(questions.length);
    localStorage.removeItem(startTimeKey);
  }
  else{
    function updateTimerDisplay() {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  updateTimerDisplay(); 

  const timerInterval = setInterval(() => {
      duration--;
      localStorage.setItem(examTimeKey, duration.toString());
      updateTimerDisplay();

      if (duration <= 0) {
          clearInterval(timerInterval);
          timerDisplay.textContent = "Hết giờ";
          alert("Hết thời gian! Bài sẽ được nộp tự động.");
          submitExam(questions.length);
          localStorage.removeItem(startTimeKey);
      }
  }, 1000);
  }
  
}


 

  function displayAttempt(attempts, id) {
    const attemptList = document.getElementById(id);
    attemptList.innerHTML = ''; 
  
    
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.margin = "20px 0";
  
  
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
  
  
    const tbody = document.createElement("tbody");
    attempts.forEach((attempt, index) => { console.log(attempt);
      const row = document.createElement("tr");
      const idCell = document.createElement("td");
      idCell.textContent = index + 1;
      idCell.style.padding = "10px";
      idCell.style.borderBottom = "1px solid #ddd";
  
      const scoreCell = document.createElement("td");
      scoreCell.textContent = attempt.score;
      scoreCell.style.padding = "10px";
      scoreCell.style.borderBottom = "1px solid #ddd";
  
      const timeCell = document.createElement("td");
      timeCell.textContent = attempt.submitted_at;
      timeCell.style.padding = "10px";
      timeCell.style.borderBottom = "1px solid #ddd";
  
      row.appendChild(idCell);
      row.appendChild(scoreCell);
      row.appendChild(timeCell);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
  
   
    attemptList.appendChild(table);
  }

  function displayAcountInfo(info) {
    const bodyPage = document.getElementById('bodyAcount');
  
    if (!bodyPage) {
      console.error("Không tìm thấy phần tử có id 'bodyAcount' trong DOM.");
      return;
    }
  
    bodyPage.innerHTML = '';
  
    const container = document.createElement('div');
    container.classList.add('container');
  
    const heading = document.createElement('h2');
    heading.textContent = 'Thông tin tài khoản cơ bản';
    container.appendChild(heading);
  
    const description = document.createElement('p');
    description.textContent = 'Thiết lập thông tin cơ bản về tài khoản của bạn.';
    container.appendChild(description);
  

    function createInfoRow(labelText, valueText, descriptionText, isInput = false, inputType = 'text') {
      const formGroup = document.createElement('div');
      formGroup.classList.add('form-group');
  
      const labelColumn = document.createElement('div');
      labelColumn.classList.add('label-column');
      labelColumn.textContent = labelText;
  
      const valueColumn = document.createElement('div');
      valueColumn.classList.add('value-column');
  
      if (isInput) {
        const inputElement = document.createElement('input');
        inputElement.type = inputType;
        inputElement.value = valueText || '';
        valueColumn.appendChild(inputElement);
      } else {
        valueColumn.textContent = valueText;
      }
  
      const descriptionColumn = document.createElement('div');
      descriptionColumn.classList.add('description-column');
      descriptionColumn.textContent = descriptionText;
  
      formGroup.appendChild(labelColumn);
      formGroup.appendChild(valueColumn);
      formGroup.appendChild(descriptionColumn);
  
      return formGroup;
    }
  
 
    container.appendChild(createInfoRow(
      'Tên đăng nhập',
      info.username,
      'Tên định danh trên MOOC daotao.ai. Bạn không thể thay đổi tên đăng nhập.'
    ));
  
    container.appendChild(createInfoRow(
      'Tên đầy đủ',
      info.fullname,
      'Tên được sử dụng để xác minh ID và xuất hiện trên chứng chỉ của bạn.',
      true
    ));
  
    container.appendChild(createInfoRow(
      'Địa chỉ Email (Đăng nhập)',
      info.email,
      'Bạn nhận được tin nhắn từ MOOC daotao.ai tại địa chỉ này.',
      true,
      'email'
    ));
  
    container.appendChild(createInfoRow(
      'Profession',
      info.profession || '', 
      'Your profession',
      true
    ));
 
    const passwordGroup = document.createElement('div');
    passwordGroup.classList.add('password-group');
  
    const passwordFormGroup = document.createElement('div');
    passwordFormGroup.classList.add('form-group');
  
    const passwordLabelColumn = document.createElement('div');
    passwordLabelColumn.classList.add('label-column');
    passwordLabelColumn.textContent = 'Mật khẩu';
  
    const passwordValueColumn = document.createElement('div');
    passwordValueColumn.classList.add('value-column');
    const resetButton = document.createElement('button');
    resetButton.classList.add('password-button');
    resetButton.textContent = 'Đặt lại mật khẩu';
    resetButton.addEventListener("click", function () {
      showPopup('updatePassword');
    })

    passwordValueColumn.appendChild(resetButton);


  
    const passwordDescriptionColumn = document.createElement('div');
    passwordDescriptionColumn.classList.add('description-column');
    passwordDescriptionColumn.textContent = 'Kiểm tra tài khoản email để được hướng dẫn đặt lại mật khẩu.';
  
    passwordFormGroup.appendChild(passwordLabelColumn);
    passwordFormGroup.appendChild(passwordValueColumn);
    passwordFormGroup.appendChild(passwordDescriptionColumn);
  
    passwordGroup.appendChild(passwordFormGroup);
    container.appendChild(passwordGroup);
  
    bodyPage.appendChild(container);
  
    const style = document.createElement('style');
    style.textContent = `
      .container {
        width: 90%; /* Điều chỉnh độ rộng tùy ý */
        padding: 20px;
        font-family: sans-serif;
      }

      .container p{
        margin-top : 10px;
        margin-bottom: 10px;
      }
      .form-group {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
      }
  
      .label-column {
        flex: 1;
        width: 150px;
        font-weight: bold;
        padding-right: 15px;
        text-align: left;
      }
  
      .value-column {
        flex:2;
      }
  
      .value-column input[type="text"],
      .value-column input[type="email"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }
  
      .description-column {
        flex: 2;
        font-size: 0.9em;
        color: #777;
        margin-left: 15px;
      }
  
      .password-group {
        margin-top: 30px;
      }
  
      .password-button {
        padding: 10px 20px;
        background-color: #f44336; /* Màu đỏ tương tự */
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
  
      .password-button:hover {
        background-color:rgb(125, 31, 31);
      }
    `;
    document.head.appendChild(style);
  }
  
function displayDataForAdmin(users, allClass, allExams){

  const container = document.getElementById('class_container');
  container.innerHTML = ''; 

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
      idSubject.textContent = `ID: ${classes.class_id} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Subject: ${classes.subject}`; 

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
  });

  const container2 = document.getElementById("exam_container");

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
      idSubject.textContent = `Time linmit: ${exam.timelimit} minute \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Number questions: ${exam.numberquestion}`; 
                                                                                                                    
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
      container2.appendChild(projectDiv);
  });

  const usersList = document.getElementById("user_container");
  usersList.innerHTML = "";
  

  const table = document.createElement("table");
  table.style.width = "90%";
  table.style.borderCollapse = "collapse";
  table.style.margin = "auto";
  table.style.marginTop = "20px";
  table.style.border = "2px solid black";
  

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["Username", "Email", "Profession", "Fullname", "Last login"];
  
  headers.forEach(headerText => {
    const th = document.createElement("th");
    th.textContent = headerText;
    th.style.padding = "10px";
    th.style.borderBottom = "2px solid #ccc";
    th.style.textAlign = "left";
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  
  const tbody = document.createElement("tbody");
  users.forEach(user => {
    const row = document.createElement("tr");

    const date = new Date(user.last_login);
    date.setHours(date.getHours() + 7);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours(); 
    const minutes = String(date.getMinutes()).padStart(2, '0');

    
    const formatted = `${day}/${month}/${year} ${hours}:${minutes}`;
    const userData = [user.username, user.email, user.profession, user.fullname, formatted];
  
    userData.forEach(data => {
      const td = document.createElement("td");
      td.textContent = data;
      td.style.padding = "8px";
      td.style.borderBottom = "1px solid #eee";
      row.appendChild(td);
    });

    const td = document.createElement("td");
    td.style.padding = "8px";
    td.style.borderBottom = "1px solid #eee";
    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.style.border = "none";
    btn.style.background = "red";
    btn.style.width = "120px"
    btn.style.height = "40px"
    btn.style.color = "white";
    btn.style.cursor = "pointer";
    btn.addEventListener("mouseover", () => {
      btn.style.backgroundColor = " #831109";
    });
    btn.addEventListener("mouseout", () => {
      btn.style.backgroundColor = "red"; 
    });
    td.appendChild(btn);
    row.appendChild(td);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  
  usersList.appendChild(table);
}
