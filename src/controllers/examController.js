
const { accessSync } = require('fs');
const pool = require('../data');
const path = require('path');

exports.createExam = async (req, res) => {
    try {
        const { title, timelimit, numberQuestion } = req.body;

        if (!title || !timelimit || !numberQuestion) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
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
            'INSERT INTO exams (title, timelimit, numberQuestion, user_id) VALUES ($1, $2, $3, $4)',
            [title, timelimit, numberQuestion, userId]
        );

        const user = req.session.user;
        const redirectUrl = `/home/${user.username}`;

        res.json({ message: 'Tạo Exam thành công!', redirect: redirectUrl });
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
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'beforeTest.html'));
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

        const user = req.session.user;
        const redirectUrl = `/${user.username}/questionSet`;

        res.json({ message: 'Tạo Exam thành công!', redirect: redirectUrl });
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

exports.addQuestion = async (req, res) =>{
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