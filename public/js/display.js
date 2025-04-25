
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
        date.textContent = `Date: ${new Date(exam.created_at).toLocaleDateString()}`;

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
  
    questions.forEach((question, index) => { 
    
      const quizDiv = document.createElement("div");
      quizDiv.className = "quiz";
  
      const questionTitle = document.createElement("h3");
      questionTitle.textContent = `Câu số ${index + 1} (${question.task}):`;
  
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
        checkbox.id = `question-${index}-${question.task}`; // Unique ID for the checkbox
        checkbox.className = "question-checkbox"; // Class for styling if needed



        const savedState = localStorage.getItem(`checkboxState-${index}-${question.task}`);
        const isChecked = savedState === "true"; // Chuyển đổi chuỗi "true" thành boolean true
        checkbox.checked = isChecked;

        // Lưu trạng thái ban đầu vào Local Storage
        localStorage.setItem(`checkboxState-${index}-${question.task}`, isChecked.toString());

        // Lắng nghe sự kiện 'change' của checkbox
        checkbox.addEventListener("change", function() {
        // Cập nhật trạng thái tương ứng trong Local Storage khi checkbox thay đổi
        localStorage.setItem(`checkboxState-${index}-${question.task}`, this.checked.toString());
        console.log(localStorage.getItem(`checkboxState-${index}-${question.task}`));
    });
        const questionHeader = document.createElement("div"); //create a div to hold checkbox and questionTitle
        questionHeader.style.display = "flex"; //use flexbox to align items
        questionHeader.style.alignItems = "center"; // vertically center items
        questionHeader.appendChild(checkbox);
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