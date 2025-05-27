const { sql, config } = require('../data');
const path = require('path');

exports.createExam = async (req, res) => {
    try {
        const { title, timelimit, numberQuestion, Ended } = req.body;

        if (!title || !timelimit || !numberQuestion||!Ended) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
        }
        const now = new Date();
        const endedDate = new Date(Ended);
        
        if (endedDate <= now) {
            return res.status(400).json({ message: "Ngày kết thúc phải lớn hơn thời điểm hiện tại!" });
        }
        const userId = req.session.user?.id;

        if (!req.session.user) {
            return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
        }

        await sql.connect(config);
        const request = new sql.Request();

        const checkExam = await request.query(
            'SELECT * FROM exams WHERE title = @title AND user_id = @userId',
            {
                title: title,
                userId: userId
            }
        );

        if (checkExam.recordset.length > 0) {
            return res.status(400).json({ message: 'Lớp đã tồn tại!' });
        }

        await request.query(
            'INSERT INTO exams (title, timelimit, numberQuestion, user_id, Ended) VALUES (@title, @timelimit, @numberQuestion, @userId, @Ended)',
            {
                title: title,
                timelimit: timelimit,
                numberQuestion: numberQuestion,
                userId: userId,
                Ended: Ended
            }
        );

        const newEx = await request.query( 
            `SELECT exams.id, exams.user_id, exams.timelimit, exams.numberQuestion, exams.title, exams.created_at, exams.user_id, exams.Ended
             FROM exams
             WHERE title = @title AND user_id = @userId`,
             {
                 title: title,
                 userId: userId
             }
        );

        const user = req.session.user;
        const redirectUrl = `/home/${user.username}`;

        res.json({ message: 'Tạo Exam thành công!', redirect: redirectUrl, newExam: newEx.recordset[0] });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: '❌ Có lỗi xảy ra, vui lòng thử lại sau.' });
    } finally {
        sql.close();
    }
};

exports.getExamById = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    try {
        const exam_id = req.params.exam_id;
        if (isNaN(exam_id)) {
            return res.status(400).send('class_id phải là số hợp lệ!');
        }

        await sql.connect(config);
        const request = new sql.Request();

        const examQuery = await request.query('SELECT * FROM exams WHERE id = @exam_id', { exam_id: parseInt(exam_id) });

        if (examQuery.recordset.length === 0) {
            return res.status(404).send('Lớp học không tồn tại!');
        }

        req.session.exam_id = exam_id;
        if (req.session.user.profession == "Admin") res.sendFile(path.join(__dirname,  '..', 'public', 'controllExam.html'));
        else if (examQuery.recordset[0].user_id != req.session.user.id) res.sendFile(path.join(__dirname,  '..', 'public', 'beforeExam.html'));
        else res.sendFile(path.join(__dirname,  '..', 'public', 'controllExam.html'));
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).send('Lỗi server!');
    } finally {
        sql.close();
    }
};

exports.createQuestionSet = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title ) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
        }

        const userId = req.session.user?.id;

        if (!req.session.user) {
            return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
        }

        await sql.connect(config);
        const request = new sql.Request();

        const checkSet = await request.query(
            'SELECT * FROM questionSets WHERE name = @name AND owner_id = @userId',
            {
                name: title,
                userId: userId
            }
        );

        if (checkSet.recordset.length > 0) {
            return res.status(400).json({ message: 'Set đã tồn tại!' });
        }
        await request.query(
            'INSERT INTO questionSets (name, owner_id) VALUES (@name, @userId)',
            {
                name: title,
                userId: userId
            }
        );
        const set = await request.query(`
            SELECT name, created_at, id
            FROM questionSets 
            WHERE name = @name AND owner_id = @userId`,
            {
                name: title,
                userId: userId
            }
        );

        const user = req.session.user;
        const redirectUrl = `/${user.username}/questionSet`;

        res.json({ message: 'Tạo Exam thành công!', redirect: redirectUrl, newSet: set.recordset[0] });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: '❌ Có lỗi xảy ra, vui lòng thử lại sau.' });
    } finally {
        sql.close();
    }
};

exports.getAllSet = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }

    try {
        await sql.connect(config);
        const request = new sql.Request();
        const user = req.session.user;

        const set = await request.query(`
            SELECT questionSets.name, questionSets.created_at, questionSets.id
            FROM questionSets 
            JOIN users ON questionSets.owner_id = users.id
            WHERE users.id = @userId 
            ORDER BY questionSets.created_at DESC;`,
            { userId: user.id }
        );

        res.json({
            allSet: set.recordset
        });
    } catch (err) {
        console.error('Lỗi truy vấn:', err.stack);
        res.status(500).json({ error: 'Lỗi server' });
    } finally {
        sql.close();
    }
};

exports.getQuestionSetById = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    try {
        const set_id = req.params.set_id;
        if (isNaN(set_id)) {
            return res.status(400).send('set_id phải là số hợp lệ!');
        }

        await sql.connect(config);
        const request = new sql.Request();

        const setQuery = await request.query('SELECT * FROM questionSets WHERE id = @set_id', { set_id: parseInt(set_id) });

        if (setQuery.recordset.length === 0) {
            return res.status(404).send('Lớp học không tồn tại!');
        }

        req.session.set_id = set_id;
        res.sendFile(path.join(__dirname, '..', 'public', 'questions.html'));
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).send('Lỗi server!');
    } finally {
        sql.close();
    }
};

exports.getInfoQuestionSet = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
        }
        const set_id = req.session.set_id;

        await sql.connect(config);
        const request = new sql.Request();
        const setInfo = await request.query('SELECT * FROM questionSets WHERE id = @set_id', { set_id: set_id });
        if (setInfo.recordset.length === 0) {
            return res.status(404).json({ message: 'Set không tồn tại!' });
        }

        const questions = await request.query(
            `SELECT *
            FROM questions
            WHERE id_set= @set_id`,
            { set_id: set_id }
        );

        res.json({
            questions: questions.recordset,
        });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    } finally {
        sql.close();
    }
};

exports.addQuestionToSet = async (req, res) =>{
    try {
        if (!req.session.user) {
            return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
        }
        const { task, title, answer_A, answer_B, answer_C, answer_D, answer_correct  } = req.body;

        if (!title|| !answer_A || !answer_B || !answer_C || !answer_D || !answer_correct) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
        }

        const set_id = req.session.set_id;

        await sql.connect(config);
        const request = new sql.Request();

        await request.query(
            'INSERT INTO questions (task, question_text, answer_A, answer_B, answer_C, answer_D, answer_correct, id_Set) VALUES (@task, @title, @answer_A, @answer_B, @answer_C, @answer_D, @answer_correct, @set_id)',
            {
                task: task,
                title: title,
                answer_A: answer_A,
                answer_B: answer_B,
                answer_C: answer_C,
                answer_D: answer_D,
                answer_correct: answer_correct,
                set_id: set_id
            }
        );

        const redirectUrl = `/questionSet/${set_id}`;

        res.json({ message: 'Tạo lớp thành công!', redirect: redirectUrl });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    } finally {
        sql.close();
    }
}

exports.deleteSet = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }
    const user = req.session.user;
    const {set_id} = req.body;
    if (!set_id) {
        return res.status(400).json({ message: 'Thiếu id!' });
    }

    await sql.connect(config);
    const request = new sql.Request();

    await request.query('DELETE FROM questionSets WHERE id = @set_id', { set_id: set_id });

    res.json({ message: 'Deleted!!!', redirect: `/${user.username}/questionSet` });
};

exports.findMember = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    const user = req.session.user;
    const exam_id = req.session.exam_id;
    const { email, username } = req.body;

    if (!email && !username) {
        return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
    }
    let checkUser;
    if (email && username) {
        checkUser = await sql.connect(config);
        const request = new sql.Request();
        checkUser = await request.query('SELECT * FROM users WHERE email = @email AND username = @username', { email: email, username: username });
    } else if (email) {
        checkUser = await sql.connect(config);
        const request = new sql.Request();
        checkUser = await request.query('SELECT * FROM users WHERE email = @email', { email: email });
    } else {
        checkUser = await sql.connect(config);
        const request = new sql.Request();
        checkUser = await request.query('SELECT * FROM users WHERE username = @username', { username: username });
    }

    if (checkUser.recordset.length === 0) {
        return res.status(400).json({ message: 'Không tìm thấy người dùng!' });
    }

    await sql.connect(config);
    const request = new sql.Request();

    const checkInClass = await request.query(
        'SELECT * FROM exams_mem WHERE user_id = @userId AND exam_id = @exam_id',
        {
            userId: checkUser.recordset[0].id,
            exam_id: exam_id
        }
    );
    if (checkInClass.recordset.length > 0) {
        return res.status(400).json({ message: 'Người dùng đã ở trong lớp!' });
    }
     if (checkUser.recordset[0].id == user.id){
         return res.status(400).json({ message: 'You are owner!' });
     }

    await request.query('INSERT INTO exams_mem (exam_id, user_id ) VALUES (@exam_id, @userId)', { exam_id: exam_id, userId: checkUser.recordset[0].id });

    const exam = await request.query ('SELECT * FROM exams WHERE id = @exam_id', { exam_id: exam_id });
    const redirectUrl = `/exam/${exam.recordset[0].title}/${exam_id}`;

    res.json({ message: 'Thêm thành viên thành công!', redirect: redirectUrl });
};

exports.addQuestionToExam = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }
    try {
        const { questionID } = req.body;
        const exam_id = req.session.exam_id;

     //   const questions = await pool.query("SELECT questions.id FROM questions JOIN questions_exams ON questions. WHERE exam_id = $1", [exam_id]);
        await sql.connect(config);
        const request = new sql.Request();
        for (let i = 0; i < questionID.length; i++) {
            const result = await request.query('SELECT * FROM questions WHERE id = @questionID', { questionID: questionID[i] });
            const thisQuestion = result.recordset[0];

            if (!thisQuestion) {
                return res.status(404).json({ message: `Không tìm thấy câu hỏi với ID ${questionID[i]}` });
            }

           // if()
            await request.query(
                'INSERT INTO questions_exams (exam_id, question_id) VALUES (@exam_id, @question_id)',
                {
                    exam_id: exam_id,
                    question_id: questionID[i]
                }
            );
        }

        res.status(200).json({ message: 'Thêm câu hỏi thành công!' });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    } finally {
        sql.close();
    }
};

exports.addQuestionToTest = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }
    try {
        const { questionID } = req.body;
        const test_id = req.session.test_id;

     //   const questions = await pool.query("SELECT questions.id FROM questions JOIN questions_exams ON questions. WHERE exam_id = $1", [exam_id]);
        await sql.connect(config);
        const request = new sql.Request();
        for (let i = 0; i < questionID.length; i++) {
            const result = await request.query('SELECT * FROM questions WHERE id = @questionID', { questionID: questionID[i] });
            const thisQuestion = result.recordset[0];

            if (!thisQuestion) {
                return res.status(404).json({ message: `Không tìm thấy câu hỏi với ID ${questionID[i]}` });
            }

           // if()
            await request.query(
                'INSERT INTO questions_tests (test_id, question_id) VALUES (@test_id, @question_id)',
                {
                    test_id: test_id,
                    question_id: questionID[i]
                }
            );
        }

        res.status(200).json({ message: 'Thêm câu hỏi thành công!' });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
};

exports.deleteQuestionToExam = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    const exam_id = req.session.exam_id;
    const {questionID} = req.body;
    if (!questionID) {
        return res.status(400).json({ message: 'Thiếu id!' });
    }

    await pool.query('DELETE FROM questions_exams WHERE question_id = $1 AND exam_id = $2', [questionID, exam_id]);

    res.json({ message: 'Deleted!!!' });
};


// exports.getListQuestionSet = async(req, res) => {
//     try {
//         if (!req.session.user) {
//             return res.sendFile(path.join(__dirname, '..', '..', 'public', 'home.html'));
//         }
//             res.json({
//                 listQuestionSet: req.session.listSet
//             }); 
//     } catch (error ) {
//         console.error('Lỗi:', error);
//         res.status(500).json({ message: 'Lỗi server!' });
//     } 
// }
exports.findQuestions = async(req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }
    try {
        console.log(req.body);
        const { idQuestionSet, task } = req.body;
        const questions = await pool.query('SELECT* FROM questions WHERE id_Set = $1 AND task = $2', [idQuestionSet, task]);

        res.json({
            questions: questions.rows
        });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
}

exports.getInfoExam = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }
    try {
        const exam_id = req.session.exam_id;

        const examInfo = await pool.query('SELECT * FROM exams WHERE id = $1', [exam_id]);
        if (examInfo.rows.length === 0) {
            return res.status(404).json({ message: 'Exam không tồn tại!' });
        }
        const member = await pool.query(
            `SELECT *
            FROM users JOIN exams_mem ON users.id = exams_mem.user_id
            JOIN exams ON exams.id = exams_mem.exam_id
            WHERE exams.id = $1`,
            [exam_id]
        );

        const question = await pool.query(`
            SELECT  questions.id, questions.question_text, questions.answer_A, questions.answer_B, questions.answer_C, questions.answer_D, questions.answer_correct
            FROM questions
            JOIN questions_exams ON questions.id = questions_exams.question_id
            JOIN exams ON questions_exams.exam_id = exams.id
            WHERE exams.id = $1`,
            [exam_id]
        );


        res.json({
            members: member.rows,
            questions: question.rows,
            profession: req.session.user.profession,
            exam_id: exam_id  
        });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
};

exports.getInfoTest = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }
    try {
        const test_id = req.session.test_id;

        const examInfo = await pool.query('SELECT * FROM tests WHERE id = $1', [test_id]);
        if (examInfo.rows.length === 0) {
            return res.status(404).json({ message: 'Exam không tồn tại!' });
        }

        const question = await pool.query(`
            SELECT  questions.id, questions.question_text, questions.answer_A, questions.answer_B, questions.answer_C, questions.answer_D, questions.answer_correct
            FROM questions
            JOIN questions_tests ON questions.id = questions_tests.question_id
            JOIN tests ON questions_tests.test_id = tests.id
            WHERE tests.id = $1`,
            [test_id]
        );


        res.json({
            questions: question.rows,
            profession: req.session.user.profession,
            test_id: test_id  
        });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
};

exports.checkStartExam = async(req, res) =>{
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }
    try {
        const exam_id = req.session.exam_id;
        const exam = await pool.query("SELECT title as title, Ended as Ended FROM exams WHERE id = $1", [exam_id]);
        const now = new Date();
        const endedDate = new Date(exam.rows[0].Ended);
        
        if (endedDate <= now) {
            return res.status(400).json({ message: "Da qua han lam bai!" });
        }
        const redirectUrl = `/exam/${exam.rows[0].title}`;
        res.json({ message: 'Tạo lớp thành công!', redirect: redirectUrl });

    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
}

exports.startExam = async(req, res) =>{
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'exam.html'));
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
}
exports.startTest = async(req, res) =>{
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    const test_id = req.params.test_id;
    req.session.test_id = test_id;
    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'test.html'));
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
}
exports.editTest = async(req, res) =>{
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    const test_id = req.params.test_id;
    req.session.test_id = test_id;
    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'editTest.html'));
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
}

exports.getDataForExam = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    try {
        const exam_id = req.session.exam_id;

        const question = await pool.query(`
            SELECT  questions.id, questions.question_text, questions.answer_A, questions.answer_B, questions.answer_C, questions.answer_D
            FROM questions
            JOIN questions_exams ON questions.id = questions_exams.question_id
            JOIN exams ON questions_exams.exam_id = exams.id
            WHERE exams.id = $1`,
            [exam_id]
        );

        const time = await pool.query(
            ` SELECT timelimit, title, numberQuestion, id FROM exams WHERE id = $1`,
            [exam_id]
        )
        const now = new Date();
        req.session.beginExam = now;
        req.session.timelimit = time.timelimit;
        res.json({
            questions: question.rows,
            time: time.rows[0]
        });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
};

exports.getDataForTest = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    try {
        const test_id = req.session.test_id;

        const question = await pool.query(`
            SELECT  questions.id, questions.question_text, questions.answer_A, questions.answer_B, questions.answer_C, questions.answer_D
            FROM questions
            JOIN questions_tests ON questions.id = questions_tests.question_id
            JOIN tests ON questions_tests.test_id = tests.id
            WHERE tests.id = $1`,
            [test_id]
        );

        const time = await pool.query(
            ` SELECT timelimit, title, numberQuestion, id FROM tests WHERE id = $1`,
            [test_id]
        )
        const now = new Date();
        req.session.beginExam = now;
        req.session.timelimit = time.timelimit;
        res.json({
            questions: question.rows,
            time: time.rows[0]
        });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
};

exports.getAttempt = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }
    try {
        const exam_id = req.session.exam_id;
        const user_id = req.session.user.id;

        const attemps = await pool.query("SELECT score, submitted_at FROM exam_attempts WHERE exam_id = $1 AND user_id = $2 ORDER BY submitted_at  DESC", [exam_id, user_id]);
        
        res.json({
            attempts: attemps.rows
        });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
}

exports.submitExam = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }
    try {
        const now = new Date();
        const beginTime = new Date(req.session.beginExam);

        const timelimit = req.session.timelimit

        const timelimitMs = timelimit * 60 * 1000;
        const timeElapsed = now.getTime() - beginTime.getTime();
        const timeLimitPlusOneMinute = timelimitMs + 60 * 1000;

        let score1 = 0;
        const exam_id = req.session.exam_id;
        const user_id = req.session.user.id;
        const {answers, numOfQuestion} = req.body;
        const exam = await pool.query("SELECT title, id FROM exams WHERE id = $1", [exam_id]);

        if (timeElapsed > timeLimitPlusOneMinute) {
            console.log("Ban da gian lan!!!");
          } else {
          
            const answer_corrects = await pool.query(`
                SELECT questions.answer_correct
                FROM questions
                JOIN questions_exams ON questions.id = questions_exams.question_id
                JOIN exams ON questions_exams.exam_id = exams.id
                WHERE exams.id = $1`,
                [exam_id]
            );
           
    
            answers.forEach((userAnswer,index) => {
                const correct = answer_corrects.rows[index].answer_correct;
                if (correct  === userAnswer.selected) {
                    score1 += 1;
                }
            });
          }

        console.log(numOfQuestion)
        ;
        let score ;
        if(numOfQuestion) score = parseFloat(score1*10)/numOfQuestion; 
        else score = 0;
        
        await pool.query("INSERT INTO exam_attempts (user_id, exam_id, score)  VALUES ($1, $2, $3) ", [user_id, exam_id, score]);

        res.json({ message: "Save thanh cong!!", redirect: `/exam/${exam.rows[0].title}/${exam_id}`});

    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
}

exports.submitTest = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }
    try {
        const now = new Date();
        const beginTime = new Date(req.session.beginExam);

        const timelimit = req.session.timelimit

        const timelimitMs = timelimit * 60 * 1000;
        const timeElapsed = now.getTime() - beginTime.getTime();
        const timeLimitPlusOneMinute = timelimitMs + 60 * 1000;

        let score1 = 0;
        const test_id = req.session.test_id;
        const user_id = req.session.user.id;
        const {answers, numOfQuestion} = req.body;
        const test = await pool.query("SELECT title, id FROM tests WHERE id = $1", [test_id]);

        if (timeElapsed > timeLimitPlusOneMinute) {
            console.log("Ban da gian lan!!!");
          } else {
          
            const answer_corrects = await pool.query(`
                SELECT questions.answer_correct
                FROM questions
                JOIN questions_tests ON questions.id = questions_tests.question_id
                JOIN tests ON questions_tests.test_id = tests.id
                WHERE tests.id = $1`,
                [test_id]
            );
           
    
            answers.forEach((userAnswer,index) => {
                const correct = answer_corrects.rows[index].answer_correct;
                if (correct  === userAnswer.selected) {
                    score1 += 1;
                }
            });
          }

        console.log(numOfQuestion)
        ;
        let score ;
        if(numOfQuestion) score = parseFloat(score1*10)/numOfQuestion; 
        else score = 0;
        console.log(score, test_id);
        await pool.query("INSERT INTO test_attempts (user_id, test_id, score)  VALUES ($1, $2, $3) ", [user_id, test_id, score]);

       
        res.json({ class_id: req.session.class_id });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
}

exports.getAllAttempts = async (req, res) => {
    const exam_id = req.params.exam_id;
    const attempts = await pool.query(
        `SELECT DISTINCT ON (users.id)
            exam_attempts.*,
            users.fullname
        FROM exam_attempts
        JOIN users ON exam_attempts.user_id = users.id
        WHERE exam_attempts.exam_id = $1
        ORDER BY users.id, exam_attempts.score DESC, exam_attempts.submitted_at DESC
`,
        [exam_id]
    );
    const testAttempts = await pool.query("SELECT * FROM exam_attempts WHERE exam_id = $1", [exam_id]);
    console.log(attempts.rows);
    console.log(testAttempts.rows);
    res.json({ attempts: attempts.rows });
}   

exports.viewPoint = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'viewPoint.html'));
}



// exports.Answer = async (req, res) => {
//     try {
//         const exam_id = req.session.exam_id;
//         const answer_correct = await pool.query(`
//             SELECT questions.answer_correct
//             FROM questions
//             JOIN questions_exams ON questions.id = questions_exams.question_id
//             JOIN exams ON questions_exams.exam_id = exams.id
//             WHERE exams.id = $1`,
//             [exam_id]
//         );

//         res.json({ correct_answer: answer_correct.rows });
//     } catch (error) {
//         console.error('Lỗi:', error);
//         res.status(500).json({ message: 'Lỗi server!' });
//     }
// }