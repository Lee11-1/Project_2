
const pool = require('../data');
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

        if (!userId) {
            return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
        }

        const checkExam = await pool.query(
            'SELECT * FROM exams WHERE title = $1 AND user_id = $2',
            [title, userId]
        );

        if (checkExam.rows.length > 0) {
            return res.status(400).json({ message: 'Lớp đã tồn tại!' });
        }
        await pool.query(
            'INSERT INTO exams (title, timelimit, numberQuestion, user_id, Ended) VALUES ($1, $2, $3, $4, $5)',
            [title, timelimit, numberQuestion, userId, Ended]
        );

        const newEx = await pool.query( 
            `SELECT exams.id, exams.user_id, exams.timelimit, exams.numberQuestion, exams.title, exams.created_at, exams.user_id, exams.Ended
             FROM exams
             WHERE title = $1 AND user_id = $2`,
             [title, userId]);
        const user = req.session.user;
        const redirectUrl = `/home/${user.username}`;

        res.json({ message: 'Tạo Exam thành công!', redirect: redirectUrl, newExam: newEx.rows[0] });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: '❌ Có lỗi xảy ra, vui lòng thử lại sau.' });
    }
};


exports.getExamById = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', '..', 'public', 'home.html'));
    }
    try {
        const exam_id = req.params.exam_id;
        if (isNaN(exam_id)) {
            return res.status(400).send('class_id phải là số hợp lệ!');
        }

        const examQuery = await pool.query('SELECT * FROM exams WHERE id = $1', [parseInt(exam_id)]);

        if (examQuery.rows.length === 0) {
            return res.status(404).send('Lớp học không tồn tại!');
        }

        req.session.exam_id = exam_id;
       if (examQuery.rows[0].user_id != req.session.user.id) res.sendFile(path.join(__dirname, '..', '..', 'public', 'beforeTest.html'));
       else res.sendFile(path.join(__dirname, '..', '..', 'public', 'controllExam.html'));
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).send('Lỗi server!');
    }
};


exports.createQuestionSet = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title ) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
        }

        const userId = req.session.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
        }

        const checkSet = await pool.query(
            'SELECT * FROM questionSets WHERE name = $1 AND owner_id = $2',
            [title, userId]
        );

        if (checkSet.rows.length > 0) {
            return res.status(400).json({ message: 'Set đã tồn tại!' });
        }
        await pool.query(
            'INSERT INTO questionSets (name, owner_id) VALUES ($1, $2)',
            [title,  userId]
        );
        const set = await pool.query(`
            SELECT name, created_at, id
            FROM questionSets 
            WHERE name = $1 AND owner_id = $2`,
            [title, userId]);

        const user = req.session.user;
        const redirectUrl = `/${user.username}/questionSet`;

        res.json({ message: 'Tạo Exam thành công!', redirect: redirectUrl, newSet: set.rows[0] });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: '❌ Có lỗi xảy ra, vui lòng thử lại sau.' });
    }
};


exports.getAllSet= async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Bạn chưa đăng nhập' });
    }

    try {
        const user = req.session.user;
        const set = await pool.query(`
            SELECT questionSets.name, questionSets.created_at, questionSets.id
            FROM questionSets 
            JOIN users ON questionSets.owner_id = users.id
            WHERE users.id = $1 
            ORDER BY questionSets.created_at DESC;`, [user.id]);

        res.json({
            allSet: set.rows
        });
    } catch (err) {
        console.error('Lỗi truy vấn:', err.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};


exports.getQuestionSetById = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', '..', 'public', 'home.html'));
    }
    try {
        const set_id = req.params.set_id;
        if (isNaN(set_id)) {
            return res.status(400).send('set_id phải là số hợp lệ!');
        }

        const setQuery = await pool.query('SELECT * FROM questionSets WHERE id = $1', [parseInt(set_id)]);

        if (setQuery.rows.length === 0) {
            return res.status(404).send('Lớp học không tồn tại!');
        }

        req.session.set_id = set_id;
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'questions.html'));
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).send('Lỗi server!');
    }
};

exports.getInfoQuestionSet = async (req, res) => {
    try {
        const set_id = req.session.set_id;

        const setInfo = await pool.query('SELECT * FROM questionSets WHERE id = $1', [set_id]);
        if (setInfo.rows.length === 0) {
            return res.status(404).json({ message: 'Set không tồn tại!' });
        }

        const questions = await pool.query(
            `SELECT *
            FROM questions
            WHERE id_set= $1`,
            [set_id]
        );

        res.json({
            questions: questions.rows,
        });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
};

exports.addQuestionToSet = async (req, res) =>{
    try {
        const { task, title, answer_A, answer_B, answer_C, answer_D, answer_correct  } = req.body;

        if (!title|| !answer_A || !answer_B || !answer_C || !answer_D || !answer_correct) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
        }

        const set_id = req.session.set_id;

        await pool.query(
            'INSERT INTO questions (task, question_text, answer_A, answer_B, answer_C, answer_D, answer_correct, id_Set) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [task, title, answer_A, answer_B, answer_C, answer_D, answer_correct, set_id ]
        );

        const redirectUrl = `/questionSet/${set_id}`;

        res.json({ message: 'Tạo lớp thành công!', redirect: redirectUrl });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
}


exports.deleteSet = async (req, res) => {
    const user = req.session.user;
    const {set_id} = req.body;
    if (!set_id) {
        return res.status(400).json({ message: 'Thiếu id!' });
    }

    await pool.query('DELETE FROM questionSets WHERE id = $1', [set_id]);

    res.json({ message: 'Deleted!!!', redirect: `/${user.username}/questionSet` });
};


exports.findMember = async (req, res) => {
    const user = req.session.user;
    const exam_id = req.session.exam_id;
    const { email, username } = req.body;

    if (!email && !username) {
        return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
    }
    let checkUser;
    if (email && username) {
        checkUser = await pool.query('SELECT * FROM users WHERE email = $1 AND username = $2', [email, username]);
    } else if (email) {
        checkUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    } else {
        checkUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    }

    if (checkUser.rows.length === 0) {
        return res.status(400).json({ message: 'Không tìm thấy người dùng!' });
    }

    const checkInClass = await pool.query(
        'SELECT * FROM exams_mem WHERE user_id = $1 AND exam_id = $2',
        [checkUser.rows[0].id, exam_id]
    );
    if (checkInClass.rows.length > 0) {
        return res.status(400).json({ message: 'Người dùng đã ở trong lớp!' });
    }
     if (checkUser.rows[0].id == user.id){
         return res.status(400).json({ message: 'You are owner!' });
     }

    await pool.query('INSERT INTO exams_mem (exam_id, user_id ) VALUES ($1, $2)', [exam_id, checkUser.rows[0].id]);

    const exam = await pool.query ('SELECT * FROM exams WHERE id = $1', [exam_id]);
    const redirectUrl = `/exam/${exam.rows[0].title}/${exam_id}`;

    res.json({ message: 'Thêm thành viên thành công!', redirect: redirectUrl });
};


exports.addQuestionToExam = async (req, res) => {
    try {
        const { questionID } = req.body;
        const exam_id = req.session.exam_id;

     //   const questions = await pool.query("SELECT questions.id FROM questions JOIN questions_exams ON questions. WHERE exam_id = $1", [exam_id]);
        for (let i = 0; i < questionID.length; i++) {
            const result = await pool.query('SELECT * FROM questions WHERE id = $1', [questionID[i]]);
            const thisQuestion = result.rows[0];

            if (!thisQuestion) {
                return res.status(404).json({ message: `Không tìm thấy câu hỏi với ID ${questionID[i]}` });
            }

           // if()
            await pool.query(
                'INSERT INTO questions_exams (exam_id, question_id) VALUES ($1, $2)',
                [
                    exam_id,
                   questionID[i]
                ]
            );
        }

        res.status(200).json({ message: 'Thêm câu hỏi thành công!' });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
};


exports.deleteQuestionToExam = async (req, res) => {
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
            questions: question.rows
        });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
};

exports.checkStartExam = async(req, res) =>{
    try {
        if (!req.session.user) {
            return res.status(401).json({ error: 'Bạn chưa đăng nhập' });
        }
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
    try {
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'test.html'));
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
}


exports.getDataForExam = async (req, res) => {
    try {
        const exam_id = req.session.exam_id;

        const question = await pool.query(`
            SELECT  questions.id, questions.question_text, questions.answer_A, questions.answer_B, questions.answer_C, questions.answer_D, questions.answer_correct
            FROM questions
            JOIN questions_exams ON questions.id = questions_exams.question_id
            JOIN exams ON questions_exams.exam_id = exams.id
            WHERE exams.id = $1`,
            [exam_id]
        );

        const time = await pool.query(
            ` SELECT timelimit, title, numberQuestion FROM exams WHERE id = $1`,
            [exam_id]
        )

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
    try {
        const exam_id = req.session.exam_id;
        const user_id = req.session.user.id;
        const {score} = req.body;
        console.log(score);
        await pool.query("INSERT INTO exam_attempts (user_id, exam_id, score)  VALUES ($1, $2, $3) ", [user_id, exam_id, score]);

        const exam = await pool.query("SELECT title, id FROM exams WHERE id = $1", [exam_id]);
        res.json({ message: "Save thanh cong!!", redirect: `/exam/${exam.rows[0].title}/${exam_id}` });

    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
}