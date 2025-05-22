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
    if (!infoDiv) {
        console.error('Element with id "class-name" not found');
        return;
    }

    // Thêm CSS cho class info
    const style = document.createElement('style');
    style.textContent = `
        .class-info-container {
            background-color: white;
            border-radius: 10px;
            padding: 25px;
            margin: 20px auto;
            max-width: 800px;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }

        .class-info-container h2 {
            color: #14888e;
            font-size: 24px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #14888e;
        }

        .class-info-container p {
            font-size: 16px;
            margin: 12px 0;
            color: #333;
            display: flex;
            align-items: center;
        }

        .class-info-container p::before {
            content: "•";
            color: #14888e;
            font-weight: bold;
            margin-right: 10px;
        }

        .deleteClass {
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
            transition: background-color 0.3s ease;
        }

        .deleteClass:hover {
            background-color: #c82333;
        }

        @media (max-width: 768px) {
            .class-info-container {
                margin: 10px;
                padding: 15px;
            }

            .class-info-container h2 {
                font-size: 20px;
            }

            .class-info-container p {
                font-size: 14px;
            }
        }
    `;
    document.head.appendChild(style);

    infoDiv.innerHTML = `
        <div class="class-info-container">
            <h2>Class name: ${classInfo.name}</h2>
            <p>Start: ${new Date(classInfo.created_at).toLocaleString()}</p>
            <p>Owner: ${infoOwner.fullname}</p>
            <p>Email: ${infoOwner.email}</p>
        </div>
    `;

    const infoDiv2 = document.getElementById('classInfo');
    if (!infoDiv2) {
        console.error('Element with id "classInfo" not found');
        return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Delete Class"; 
    button.classList.add("deleteClass"); 
    button.addEventListener("click", async function(event) {  
        event.preventDefault(); 
        deleteClass(classInfo.id);
    });

    infoDiv2.appendChild(button);
}

function displayClassHome(re_members){
    const infoDiv = document.getElementById('reMem');
    if (!infoDiv) {
        console.error('Element with id "reMem" not found');
        return;
    }

    // Thêm CSS cho danh sách thành viên
    const style = document.createElement('style');
    style.textContent = `
        .member-list {
            list-style: none;
            padding: 0;
            margin: 20px 0;
        }

        .member-item {
            background-color: white;
            border-radius: 8px;
            padding: 15px 20px;
            margin-bottom: 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: transform 0.2s ease;
        }

        .member-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .member-info {
            flex: 1;
            margin-right: 20px;
        }

        .member-info p {
            margin: 0;
            font-size: 16px;
            color: #333;
        }

        .member-actions {
            display: flex;
            gap: 10px;
        }

        .acceptMem {
            background-color: #28a745;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .acceptMem:hover {
            background-color:rgb(23, 88, 37);
        }

        .deleteMem {
            background-color: #dc3545;
            color: white;
            border: none;
            max-width: 120px;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .deleteMem:hover {
            background-color:rgb(138, 20, 32);
        }

        @media (max-width: 768px) {
            .member-item {
                flex-direction: column;
                align-items: flex-start;
            }

            .member-info {
                margin-right: 0;
                margin-bottom: 10px;
            }

            .member-actions {
                width: 100%;
                justify-content: flex-end;
            }
        }
    `;
    document.head.appendChild(style);

    infoDiv.innerHTML = '<ul class="member-list"></ul>';
    const memberList = infoDiv.querySelector('.member-list');

    re_members.forEach(re_mem => {
        const li = document.createElement("li");
        li.className = 'member-item';
        
        const infoDiv = document.createElement("div");
        infoDiv.className = 'member-info';
        infoDiv.innerHTML = `<p>Name: ${re_mem.fullname} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email: ${re_mem.email}</p>`;

        const actionsDiv = document.createElement("div");
        actionsDiv.className = 'member-actions';

        const acceptButton = document.createElement("button");
        acceptButton.type = "button";
        acceptButton.textContent = "Accept";
        acceptButton.classList.add("acceptMem");
        acceptButton.addEventListener("click", async function(event) {
            event.preventDefault();
            addMem(re_mem.user_id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("deleteMem");
        deleteButton.addEventListener("click", async function(event) {
            event.preventDefault();
            deleteReMem(re_mem.user_id);
        });

        actionsDiv.appendChild(acceptButton);
        actionsDiv.appendChild(deleteButton);

        li.appendChild(infoDiv);
        li.appendChild(actionsDiv);
        memberList.appendChild(li);
    });
}

function displayMembers(members, id) {
    const membersList = document.getElementById(id);
    if (!membersList) {
        console.error(`Element with id "${id}" not found`);
        return;
    }

    // Thêm CSS cho danh sách thành viên
    const style = document.createElement('style');
    style.textContent = `
        .members-list {
            list-style: none;
            padding: 0;
            margin: 20px 0;
        }

        .member-item {
            background-color: white;
            border-radius: 8px;
            padding: 15px 20px;
            margin-bottom: 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: transform 0.2s ease;
        }

        .member-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .member-info {
            flex: 1;
            margin-right: 20px;
        }

        .member-info p {
            margin: 0;
            font-size: 16px;
            color: #333;
        }

        .deleteMem {
            background-color: #dc3545;
            color: white;
            border: none;
            max-width: 120px;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .deleteMem:hover {
            background-color:rgb(108, 20, 29);
        }

        @media (max-width: 768px) {
            .member-item {
                flex-direction: column;
                align-items: flex-start;
            }

            .member-info {
                margin-right: 0;
                margin-bottom: 10px;
            }

            .deleteMem {
                align-self: flex-end;
            }
        }
    `;
    document.head.appendChild(style);

    membersList.innerHTML = '<ul class="members-list"></ul>';
    const list = membersList.querySelector('.members-list');

    members.forEach(member => {
        const li = document.createElement("li");
        li.className = 'member-item';

        const infoDiv = document.createElement("div");
        infoDiv.className = 'member-info';
        infoDiv.innerHTML = `<p>Name: ${member.fullname} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email: ${member.email}</p>`;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("deleteMem");
        deleteButton.addEventListener("click", async function(event) {
            event.preventDefault();
            deleteMem(member.user_id);
        });

        li.appendChild(infoDiv);
        li.appendChild(deleteButton);
        list.appendChild(li);
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
    if (!setLists) {
        console.error('Element with id "set_container" not found');
        return;
    }

    // Thêm CSS cho danh sách set
    const style = document.createElement('style');
    style.textContent = `
        .set-list {
            list-style: none;
            padding: 0;
            margin: 20px 0;
        }

        .set-item {
            background-color: white;
            border-radius: 8px;
            height: auto;
            min-height: 50px;
            padding: 20px;
            margin-bottom: 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: transform 0.2s ease;
        }

        .set-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .set-info {
            flex: 2;
            margin-right: 20px;
            display: flex;
        }

        .set-info p {
            margin: 5px 0;
            font-size: 16px;
            color: #333;
        }

        .set-info p:first-child {
            font-weight: bold;
            color: #14888e;
            font-size: 18px;
        }

        .set-actions {
            display: flex;
            gap: 10px;
        }

        .viewSet {
            background-color: #14888e;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            max-width: 120px;
        }

        .viewSet:hover {
            background-color: rgb(16, 97, 100);
        }

        .deleteSet {
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            max-width: 120px;
        }

        .deleteSet:hover {
            background-color: rgb(138, 20, 32);
        }

        @media (max-width: 768px) {
            .set-item {
                flex-direction: column;
                align-items: flex-start;
            }

            .set-info {
                margin-right: 0;
                margin-bottom: 15px;
            }

            .set-actions {
                width: 100%;
                justify-content: flex-end;
            }
        }
    `;
    document.head.appendChild(style);

    setLists.innerHTML = '<ul class="set-list"></ul>';
    const list = setLists.querySelector('.set-list');

    sets.forEach(set => {
        const li = document.createElement("li");
        li.className = 'set-item';

        const infoDiv = document.createElement("div");
        infoDiv.className = 'set-info';
        infoDiv.innerHTML = `
            <p>${set.name}</p>
            <p>Ngày tạo: ${new Date(set.created_at).toLocaleDateString("vi-VN")}</p>
        `;

        const actionsDiv = document.createElement("div");
        actionsDiv.className = 'set-actions';

        const viewButton = document.createElement("button");
        viewButton.type = "button";
        viewButton.textContent = "View";
        viewButton.classList.add("viewSet");
        viewButton.addEventListener("click", async function(event) {
            event.preventDefault();
            viewQuestionInSet(set.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("deleteSet");
        deleteButton.addEventListener("click", async function(event) {
            event.preventDefault();
            deleteSet(set.id);
        });

        actionsDiv.appendChild(viewButton);
        actionsDiv.appendChild(deleteButton);

        li.appendChild(infoDiv);
        li.appendChild(actionsDiv);
        list.appendChild(li);
    });
}

function displayAllQuestion(questions, id) {
    const questionsList = document.getElementById(id);
    if (!questionsList) {
        console.error(`Element with id "${id}" not found`);
        return;
    }

    // Thêm CSS cho danh sách câu hỏi
    const style = document.createElement('style');
    style.textContent = `
        .quiz {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: transform 0.2s ease;
        }

        .quiz:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .quiz h3 {
            color: #14888e;
            font-size: 20px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .quiz p {
            font-size: 18px;
            color: #333;
            margin-bottom: 15px;
            line-height: 1.5;
        }

        .quiz ul {
            list-style: none;
            padding: 0;
            margin: 0 0 20px 40px;
        }

        .quiz ul li {
            padding: 8px 12px;
            margin-bottom: 8px;
            background-color: #f8f9fa;
            border-radius: 4px;
            font-size: 15px;
            color: #444;
        }

        .quiz .correct {
            width: 200px;
            height: 40px;
            padding-top: 10px;
            text-align: center;
            background-color: #d4edda;
            color: #155724;
            border-left: 4px solid #28a745;
            font-weight: bold;
        }

        .question-checkbox {
            width: 18px;
            height: 18px;
            margin-right: 10px;
            cursor: pointer;
        }

        .question-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }

       

        @media (max-width: 768px) {
            .quiz {
                padding: 15px;
            }

            .quiz h3 {
                font-size: 16px;
            }

            .quiz p {
                font-size: 14px;
            }

            .quiz ul li {
                font-size: 14px;
                padding: 6px 10px;
            }
        }
    `;
    document.head.appendChild(style);

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
        questionTitle.textContent = `Câu số ${index + 1} :`;
  
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

        if (id == "selectQuestionToExam") {
            const questionHeader = document.createElement("div");
            questionHeader.className = "question-header";
            
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
                displayNumOfQuestionSelected();
            });

            questionHeader.appendChild(checkbox);
            questionHeader.appendChild(questionTitle);
            quizDiv.appendChild(questionHeader);
        }
        else if (id == "examQuestions") {
            const questionHeader = document.createElement("div");
            questionHeader.className = "question-header";
            
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = "Delete";
            button.addEventListener("click", async function(event) {
                event.preventDefault();
                deleteQuestion(question.id);
            });

            questionHeader.appendChild(button);
            questionHeader.appendChild(questionTitle);
            quizDiv.appendChild(questionHeader);
        }
        else {
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
    if (!questionsList) {
        console.error('Element with id "quiz_container" not found');
        return;
    }

    // Thêm CSS cho form bài thi và timer
    const style = document.createElement('style');
    style.textContent = `
        .quiz_container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }

        .quiz {
            background-color: white;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .quiz h3 {
            color: #14888e;
            font-size: 20px;
            margin-bottom: 20px;
        }

        .quiz p {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }

        .quiz ul {
            list-style: none;
            padding: 0;
            margin: 0 0 20px 40px;
        }

        .quiz ul li {
            padding: 12px 15px;
            margin-bottom: 12px;
            background-color: #f8f9fa;
            border-radius: 6px;
            font-size: 16px;
            color: #444;
        }

        .quiz input[type="radio"] {
            width: 18px;
            height: 18px;
            margin-right: 12px;
            cursor: pointer;
        }

        .time {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }

        #timer {
            font-size: 20px;
            font-weight: bold;
            color: #14888e;
            margin: 0 10px;
        }

        #submitTest {
            background-color:rgb(204, 31, 31);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 20px;
        }

        #submitTest:hover {
            background-color: rgb(90, 16, 16);
        }
    `;
    document.head.appendChild(style);

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
                <li>
                    <input class="answer" name="answer${index + 1}" type="radio" value="A" id="q${index + 1}a">
                    <label for="q${index + 1}a">A. ${question.answer_a}</label>
                </li>
                <li>
                    <input class="answer" name="answer${index + 1}" type="radio" value="B" id="q${index + 1}b">
                    <label for="q${index + 1}b">B. ${question.answer_b}</label>
                </li>
                <li>
                    <input class="answer" name="answer${index + 1}" type="radio" value="C" id="q${index + 1}c">
                    <label for="q${index + 1}c">C. ${question.answer_c}</label>
                </li>
                <li>
                    <input class="answer" name="answer${index + 1}" type="radio" value="D" id="q${index + 1}d">
                    <label for="q${index + 1}d">D. ${question.answer_d}</label>
                </li>
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

    const submitButton = document.getElementById("submitTest");
    if (submitButton) {
        submitButton.addEventListener("click", async function() {
            submitExam(questions.length);
            localStorage.removeItem(`startTime_${time.id}`);
        });
    }
}

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


function displayViewPoint(attempts, id){
    const container = document.getElementById(id);
    if (!container) {
        console.error(`Container with id "${id}" not found`);
        return;
    }

    if (!Array.isArray(attempts) || attempts.length === 0) {
        container.innerHTML = '<div class="container"><p>Không có dữ liệu bài thi nào.</p></div>';
        return;
    }

    // Thêm CSS cho bảng
    const style = document.createElement('style');
    style.textContent = `
        .view-point-table {
            width: 100%;
            border-collapse: collapse;
            margin: auto;
            font-size: 16px;
            border: 2px solid #14888e;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        .view-point-table th,
        .view-point-table td {
            padding: 15px;
            text-align: center;
            border: 1px solid #14888e;
            vertical-align: middle;
        }

        .view-point-table th {
            background-color: #14888e;
            color: white;
            font-weight: bold;
            font-size: 18px;
        }



        .view-point-table td {
            font-size: 16px;
        }

        @media (max-width: 768px) {
            .view-point-table {
                font-size: 14px;
            }

            .view-point-table th,
            .view-point-table td {
                padding: 10px;
            }
        }
    `;
    document.head.appendChild(style);

    let html = `
        <div class="container">
            <table class="view-point-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Điểm số</th>
                        <th>Thời gian nộp bài</th>
                    </tr>
                </thead>
                <tbody>
    `;

    attempts.forEach((attempt, index) => {
        try {
            const submitTime = attempt.submitted_at ? 
                new Date(attempt.submitted_at).toLocaleString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                }) : 'N/A';
            const score = typeof attempt.score === 'number' ? attempt.score.toFixed(2) : 'N/A';
            
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${attempt.fullname || 'N/A'}</td>
                    <td>${score}</td>
                    <td>${submitTime}</td>
                </tr>
            `;
        } catch (error) {
            console.error('Error processing attempt:', error);
        }
    });

    html += `
                </tbody>
            </table>
        </div>
    `;

    container.innerHTML = html;
}

function displayGraph(attempts, id){
    const container = document.getElementById(id);
    if (!container) {
        console.error(`Container with id "${id}" not found`);
        return;
    }

    if (!Array.isArray(attempts) || attempts.length === 0) {
        container.innerHTML = '<div class="container"><p>Không có dữ liệu để hiển thị biểu đồ.</p></div>';
        return;
    }

    // Thêm CSS cho biểu đồ
    const style = document.createElement('style');
    style.textContent = `
        .graph-container {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }

        #scoreDistribution {
            width: 100% !important;
            height: 400px !important;
        }
    `;
    document.head.appendChild(style);

    // Xóa canvas cũ nếu tồn tại
    const oldCanvas = document.getElementById('scoreDistribution');
    if (oldCanvas) {
        oldCanvas.remove();
    }

    // Tạo container cho biểu đồ
    const graphContainer = document.createElement('div');
    graphContainer.className = 'graph-container';
    container.appendChild(graphContainer);

    // Tạo canvas mới cho biểu đồ
    const canvas = document.createElement('canvas');
    canvas.id = 'scoreDistribution';
    graphContainer.appendChild(canvas);

    // Phân loại điểm số
    const scoreRanges = {
        '0-2': 0,
        '2-4': 0,
        '4-6': 0,
        '6-8': 0,
        '8-10': 0
    };

    let validScores = 0;
    attempts.forEach(attempt => {
        const score = parseFloat(attempt.score);
        if (!isNaN(score) && score >= 0 && score <= 10) {
            validScores++;
            if (score < 2) scoreRanges['0-2']++;
            else if (score < 4) scoreRanges['2-4']++;
            else if (score < 6) scoreRanges['4-6']++;
            else if (score < 8) scoreRanges['6-8']++;
            else scoreRanges['8-10']++;
        }
    });

    if (validScores === 0) {
        container.innerHTML = '<div class="container"><p>Không có dữ liệu điểm số hợp lệ để hiển thị biểu đồ.</p></div>';
        return;
    }

    // Tạo biểu đồ
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: Object.keys(scoreRanges),
            datasets: [{
                label: 'Số lượng bài thi',
                data: Object.values(scoreRanges),
                backgroundColor: 'rgba(225, 102, 102, 0.7)',
                borderColor: 'rgb(228, 149, 29)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Phân bố điểm số',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const percentage = ((value / validScores) * 100).toFixed(1);
                            return `${value} bài thi (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Số lượng bài thi',
                        font: {
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        stepSize: 1
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Khoảng điểm',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}
  