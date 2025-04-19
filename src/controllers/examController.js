
const pool = require('../data');

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