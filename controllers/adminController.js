const pool = require('../data');

exports.getAllData = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }

    try {
        const classes = await pool.query(
            `SELECT  
                c.id AS class_id,
                c.name AS class_name,
                c.subject AS subject,
                c.created_at
                FROM classes c ORDER BY created_at DESC`);
        const exams = await pool.query('SELECT exams.id, exams.user_id, exams.timelimit, exams.numberQuestion, exams.title, exams.created_at, exams.user_id, exams.Ended FROM exams ORDER BY created_at DESC');
        const users = await pool.query( `SELECT * FROM users WHERE profession != 'Admin' ORDER BY last_login DESC `);
        res.json({
            allClass: classes.rows,
            allExams: exams.rows,
            allUsers: users.rows
        });
    } catch (err) {
        console.error('Lỗi truy vấn:', err.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};