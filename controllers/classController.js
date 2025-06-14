const pool = require('../data');
const path = require('path');
const fs = require('fs');



exports.getAllClasses = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }

    try {
        const user = req.session.user;
        const classes = await pool.query(
            `SELECT
                c.id AS class_id,
                c.name AS class_name,
                c.subject AS subject,
                c.created_at
            FROM classes c
            JOIN users u ON c.owner_id = u.id
            WHERE u.id = $1
            UNION
            SELECT
                c.id AS class_id,
                c.name AS class_name,
                c.subject AS subject,
                c.created_at
            FROM classes c
            JOIN class_members cm ON c.id = cm.class_id
            WHERE cm.user_id = $1
            ORDER BY created_at DESC;`,
            [user.id]
        );
        const exams = await pool.query(
            `SELECT exams.id, exams.user_id, exams.timelimit, exams.numberQuestion, exams.title, exams.created_at, exams.user_id, exams.Ended
            FROM exams 
            JOIN users ON users.id = exams.user_id
            WHERE users.id = $1
            UNION
            SELECT exams.id, exams.user_id, exams.timelimit, exams.numberQuestion, exams.title,  exams.created_at, exams.user_id, exams.Ended
            FROM exams
            JOIN exams_mem ON exams.id = exams_mem.exam_id
            WHERE exams_mem.user_id = $1
            ORDER BY created_at DESC;`,
            [user.id]
        );

        const sets = await pool.query(
            `SELECT id, name
             FROM questionSets
             WHERE owner_id = $1 `,
             [user.id]
        );
        req.session.listSet = sets.rows;
        res.json({
            allClass: classes.rows,
            allExams: exams.rows
        });
    } catch (err) {
        console.error('Lỗi truy vấn:', err.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

exports.addClass = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    try {
        const { className, subject, type } = req.body;

        if (!className || !subject || !type || subject =="Subject") {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
        }

        const userId = req.session.user?.id;
        const profession = req.session.user?.profession;

        if (!userId) {
            return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
        }

        const checkClass = await pool.query(
            'SELECT * FROM classes WHERE name = $1 AND owner_id = $2 AND subject = $3',
            [className, userId, subject]
        );

        if (checkClass.rows.length > 0) {
            return res.status(400).json({ message: 'Lớp đã tồn tại!' });
        }
        await pool.query(
            'INSERT INTO classes (name, owner_id, subject, type) VALUES ($1, $2, $3, $4)',
            [className, userId, subject, type]
        );
        const newCls = await pool.query( `
            SELECT
                c.id AS class_id,
                c.name AS class_name,
                c.subject AS subject,
                c.created_at
            FROM classes c
            WHERE c.name = $1 AND c.owner_id = $2 AND c.subject = $3 `,
            [className, userId, subject]);

        const user = req.session.user;
        const redirectUrl = `/home/${user.username}`;

        res.json({ message: 'Tạo lớp thành công!', redirect: redirectUrl , newClass: newCls.rows[0]});
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: '❌ Có lỗi xảy ra, vui lòng thử lại sau.' });
    }
};



exports.deleteClass = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }
    const user = req.session.user;
    if (req.session.owner != user.id && user.profession != "Admin") {
        return res.status(400).json({ message: 'Bạn không có quyền' });
    }

    const idClass = req.session.class_id;
    await pool.query('DELETE FROM classes WHERE id = $1', [idClass]);

    if(user.profession !="Admin") res.json({ message: 'Deleted!!!', redirect: `/home/${user.username}` });
    else res.json({ message: 'Deleted!!!', redirect: `/admin/${user.username}` });
};

exports.getClassById = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }
    try {
        const class_id = req.params.class_id;
        if (isNaN(class_id)) {
            return res.status(400).send('class_id phải là số hợp lệ!');
        }

        const classQuery = await pool.query('SELECT * FROM classes WHERE id = $1', [parseInt(class_id)]);

        if (classQuery.rows.length === 0) {
            return res.status(404).send('Lớp học không tồn tại!');
        }
        
        req.session.class_id = class_id;
        if( req.session.user.profession == 'Admin'){
            res.sendFile(path.join(__dirname, '..', 'public', 'class_admin.html'));
        }
        else{
            res.sendFile(path.join(__dirname, '..', 'public', 'class.html'));
        }
       
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).send('Lỗi server!');
    }
};

exports.getInfoClass = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }
    try {
        const class_id = req.session.class_id;

        const classInfo = await pool.query('SELECT * FROM classes WHERE id = $1', [class_id]);
        if (classInfo.rows.length === 0) {
            return res.status(404).json({ message: 'Lớp học không tồn tại!' });
        }

        const ownerInfo = await pool.query('SELECT * FROM users WHERE id = $1', [classInfo.rows[0].owner_id]);
        const request = await pool.query(
            'SELECT * FROM re_member JOIN users ON re_member.user_id = users.id WHERE re_member.class_id = $1',
            [class_id]
        );
        const member = await pool.query(
            `SELECT *
            FROM users JOIN class_members ON users.id = class_members.user_id
            JOIN classes ON classes.id = class_members.class_id
            WHERE classes.id = $1`,
            [class_id]
        );
        const tests = await pool.query(`
            SELECT t.*, 
                   COALESCE(MAX(ta.score), NULL) as highest_score
            FROM tests t
            LEFT JOIN test_attempts ta ON t.id = ta.test_id AND ta.user_id = $2
            WHERE t.class_id = $1
            GROUP BY t.id
            ORDER BY t.created_at DESC
        `, [class_id, req.session.user.id]);

        req.session.owner = classInfo.rows[0].owner_id;

        res.json({
            infoClass: classInfo.rows[0],
            infoOwner: ownerInfo.rows[0],
            re_members: request.rows,
            members: member.rows,
            tests: tests.rows,
            user: req.session.user
        });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
};


exports.deleteMember = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    const user = req.session.user.id;
    if (req.session.owner != user) {
        return res.status(400).json({ message: 'Bạn không có quyền' });
    }
    const { idUser } = req.body;
    const idClass = req.session.class_id;
    if (!idUser || !idClass) {
        return res.status(400).json({ message: 'Thiếu id!' });
    }

    await pool.query('DELETE FROM class_members WHERE class_id = $1 AND user_id = $2', [idClass, parseInt(idUser)]);

    res.json({ message: 'Deleted!!!', redirect: `/class/${idClass}` });
};
exports.deleteTest = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
        }
        const user = req.session.user;
        if (req.session.owner != user.id) {
            return res.status(400).json({ message: 'Bạn không có quyền' });
        }
        const testId = req.params.testId;
        const test = await pool.query('SELECT * FROM tests WHERE id = $1', [testId]);
        if (test.rows.length === 0) {
            return res.status(400).json({ message: 'Bài test không tồn tại!' });
        }
        if (!testId) {  
            return res.status(400).json({ message: 'Thiếu id!' });  
        }
        await pool.query('DELETE FROM tests WHERE id = $1', [testId]);
        res.json({ message: 'Deleted!!!', redirect: `/class/${req.session.class_id}` });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
};

exports.deleteRequestMember = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    }
    const user = req.session.user;
    
    if (req.session.owner != user.id) {
        return res.status(400).json({ message: 'Bạn không có quyền' });
    }
    const { idUser } = req.body;
    const idClass = req.session.class_id;
    if (!idUser || !idClass) {
        return res.status(400).json({ message: 'Thiếu id!' });
    }

    await pool.query('DELETE FROM re_member WHERE class_id = $1 AND user_id = $2', [idClass, parseInt(idUser)]);

    res.json({ message: 'Deleted!!!', redirect: `/class/${idClass}` });
};

exports.findMember = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    const user = req.session.user;
    const idClass = req.session.class_id;
    const { email, username } = req.body;

    if (req.session.owner != user.id) {
        return res.status(400).json({ message: 'Bạn không có quyền' });
    }

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
        'SELECT * FROM class_members WHERE user_id = $1 AND class_id = $2',
        [checkUser.rows[0].id, idClass]
    );
    if (checkInClass.rows.length > 0) {
        return res.status(400).json({ message: 'Người dùng đã ở trong lớp!' });
    }
    if (checkUser.rows[0].id == user.id){
        return res.status(400).json({ message: 'You are owner!' });
    }

    await pool.query('INSERT INTO class_members (class_id, user_id ) VALUES ($1, $2)', [idClass, checkUser.rows[0].id]);

    const redirectUrl = `/class/${idClass}`;

    res.json({ message: 'Thêm thành viên thành công!', redirect: redirectUrl });
};

exports.addMember = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    const user = req.session.user;
    if (req.session.owner != user.id) {
        return res.status(400).json({ message: 'Bạn không có quyền' });
    }

    const { user_id } = req.body;
    const idClass = req.session.class_id;
    if (!user_id) {
        return res.status(400).json({ message: 'Thiếu id!' });
    }

    await pool.query('INSERT INTO class_members (class_id, user_id) VALUES ($1, $2)', [parseInt(idClass), parseInt(user_id)]);
    await pool.query('DELETE FROM re_member WHERE class_id = $1 AND user_id = $2', [idClass, parseInt(user_id)]);

    res.json({ message: 'Sucessfull!!!', redirect: `/class/${idClass}` });
};

exports.createFolder = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,   '..', 'public', 'home.html'));
    }
    const { folderName } = req.body;
    const folderPath = path.join(__dirname, '..', 'uploads', folderName);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        res.json({ message: 'Thư mục đã được tạo!' });
    } else {
        res.status(400).json({ message: 'Thư mục đã tồn tại!' });
    }
};
exports.createNewTest = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    const user = req.session.user;
    if (req.session.owner != user.id) {
        return res.status(400).json({ message: 'Bạn không có quyền' });
    }
    const { title, timelimit, numberQuestion } = req.body; 
    console.log(title, timelimit, numberQuestion);
    if (!title || !timelimit || !numberQuestion) {
        return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
    }
    await pool.query('INSERT INTO tests (title, timelimit, numberQuestion, class_id, created_by) VALUES ($1, $2, $3, $4,$5)', [title, timelimit, numberQuestion, req.session.class_id, req.session.user.id]);
    res.json({ message: 'Tạo bài test thành công!' });
};