const pool = require('../data');
const path = require('path');

exports.findClassBySubject = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..','..', 'public', 'home.html'));
    }
    try {
        const subject = req.params.subject;
        const validSubjects = ['Math', 'Science', 'Art', 'Other', 'Language', 'Social Science', 'Literature'];
        if (!validSubjects.includes(subject)) {
            return res.status(400).json({ message: 'Subject không hợp lệ!' });
        }

        req.session.subject = subject;
        res.sendFile(path.join(__dirname, '..','..', 'public', 'serch-result.html'));

    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

exports.resultFind = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname, '..', '..', 'public', 'home.html'));
    }
    try {
        const subject = req.session.subject;
        const user = req.session.user;
        const userId = user.id;

        const classes1 = await pool.query(
            `SELECT
                c.id AS class_id,
                c.name AS class_name,
                c.subject AS subject,
                c.created_at,
                u.username AS owner_username
            FROM classes c
            JOIN users u ON c.owner_id = u.id
            WHERE c.subject = $1
              AND c.owner_id != $2
              AND c.id NOT IN (
                SELECT class_id
                FROM class_members
                WHERE user_id = $2
                UNION
                SELECT class_id
                FROM re_member
                WHERE user_id = $2
              )
            ORDER BY c.created_at DESC;`,
            [subject, userId]
        );
      

        const classes2 = await pool.query(
            `SELECT
                c.id AS class_id,
                c.name AS class_name,
                c.subject AS subject,
                c.created_at,
                u.username AS owner_username
            FROM classes c
            JOIN users u ON c.owner_id = u.id
            WHERE c.subject = $1
              AND c.id IN (
                SELECT class_id
                FROM re_member
                WHERE user_id = $2
              )
            ORDER BY c.created_at DESC;`,
            [subject, userId]
        );

        const myClasses = await pool.query(
            `SELECT
            c.id AS class_id,
            c.name AS class_name,
            c.subject AS subject,
            c.created_at
        FROM classes c
        JOIN users u ON c.owner_id = u.id
        WHERE u.id = $1 AND c.subject = $2
        UNION
        SELECT
            c.id AS class_id,
            c.name AS class_name,
            c.subject AS subject,
            c.created_at
        FROM classes c
        JOIN class_members cm ON c.id = cm.class_id
        WHERE cm.user_id = $1 AND c.subject = $2
        ORDER BY created_at DESC;`,
            [userId, subject]
        );

        res.json({
            availableClasses: classes1.rows,
            pendingRequests: classes2.rows,
            myClasses: myClasses.rows
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};