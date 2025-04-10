const express = require('express');
const session = require("express-session");

const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const pool = require('./data');
const bcrypt = require("bcryptjs");
const path = require('path');
const compression = require("compression");

const multer = require("multer");
const fs = require("fs");

const generator = require("generate-password");



app.use(compression());

app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'..', 'public')));
app.use(express.static(path.join(__dirname,'..', 'src')));
//app.use(express.static('public', { extensions: ['html', 'css', 'js'] }));


app.get('/', (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,'..', 'public', 'home.html'));
    }
    const user = req.session.user;
    return res.redirect(`/home/${user.username}`);

}); 

app.post("/register", async (req, res) => {
    try {
        console.log("Dữ liệu nhận từ client:", req.body);

        const { fullname, profession, month, day, year, email, username, password } = req.body;

        if (!fullname || !email || !username || !password || !profession) {
            return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
        }

        const checkUser = await pool.query(
            "SELECT * FROM users WHERE email = $1 OR username = $2",
            [email, username]
        );

        if (checkUser.rows.length > 0) {
            return res.status(400).json({ message: "Email hoặc Username đã tồn tại!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO users (fullname, profession, email, username, password) VALUES ($1, $2, $3, $4, $5)",
            [fullname, profession, email, username, hashedPassword]
        );

        const userQuery = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = userQuery.rows[0];
        req.session.user = { id: user.id, profession: user.profession, username: user.username };

        redirectUrl = `/home/${user.username}`;
      
        res.json({ message: "Đăng ký thành công!", redirect: redirectUrl });
    } catch (error) {
        console.error("Lỗi chi tiết:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message }); 
    }
});


app.post("/signIn", async (req, res) => {
    try {
        const { username, password } = req.body;

        const userQuery = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userQuery.rows.length === 0) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
        }

        const user = userQuery.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
        }

        req.session.user = { id: user.id, profession: user.profession, username: user.username };

        redirectUrl = `/home/${user.username}`;
       
        res.json({ message: "Đăng nhập thành công!", redirect: redirectUrl });
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
});


app.post("/create-folder",async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,'..', 'public', 'home.html'));
    }
    const { folderName } = req.body;
    const folderPath = path.join(__dirname, "uploads", folderName);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        res.json({ message: "Thư mục đã được tạo!" });
    } else {
        res.status(400).json({ message: "Thư mục đã tồn tại!" });
    }
});

app.post("/addClass", async (req, res) => {
    try {
        const { className, subject } = req.body;

        if (!className || !subject) {
            return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
        }

        const userId = req.session.user?.id; 
        const profession = req.session.user?.profession; 

        if (!userId) {
            return res.status(401).json({ message: "Bạn chưa đăng nhập!" });
        }

        const checkClass = await pool.query("SELECT * FROM classes WHERE name = $1 AND owner_id = $2 AND subject = $3", [className, userId, subject]);

        if (checkClass.rows.length > 0) {
            return res.status(400).json({ message: "Lớp đã tồn tại!" });
        }
        await pool.query("INSERT INTO classes (name, owner_id, subject) VALUES ($1, $2, $3)", [className, userId, subject]);

        const user = req.session.user;
        let redirectUrl = `/home/${user.username}`;

        res.json({ message: "Tạo lớp thành công!", redirect: redirectUrl });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ message: "❌ Có lỗi xảy ra, vui lòng thử lại sau." });
    }
});


app.post("/forgot-password", async (req, res) => {
    const { username, email } = req.body;
    try {
        const user = await pool.query(
            `SELECT * FROM users WHERE username = $1 AND email = $2`, 
            [username, email]
        );

        if (user.rows.length === 0) {
            return res.json({ message: "❌ Username hoặc email không tồn tại." });
        }
        const newPassword = generator.generate({
            length: 10,
            numbers: true,
            symbols: true,
            uppercase: true,
            strict: true, 
        });
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query(`UPDATE users SET password = $1 WHERE username = $2 AND email = $3`, 
                         [hashedPassword, username, email]);

        res.json({ message: `✅ Mật khẩu mới của bạn là: ${newPassword}` });

    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ message: "❌ Có lỗi xảy ra, vui lòng thử lại sau." });
    }
});


app.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Lỗi khi đăng xuất:", err);
        }
        res.redirect("/"); 
    });
});


app.get("/forgot", async (req, res) => {
    res.sendFile(path.join(__dirname, '..', "public", "fogot.html"));
});



app.get("/home/:username", (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,'..', 'public', 'home.html'));
    }
    res.sendFile(path.join(__dirname,'..', "public", "student.html"));
});

app.get("/all-classes", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Bạn chưa đăng nhập" });
    }

    try {
        const user = req.session.user; 
        const classes = await pool.query(`
            SELECT 
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
            ORDER BY created_at DESC;
            `,[user.id]);


        res.json({
            allClass: classes.rows
        }); 
    } catch (err) {
        console.error("Lỗi truy vấn:", err.stack);
        res.status(500).json({ error: "Lỗi server" });
    }
});

app.post("/toClass", (req, res) => {
    const { class_id } = req.body;
    if (!class_id) {
        return res.status(400).json({ message: "Thiếu class_id!" });
    } 
    res.json({ message: "Lớp học đã mở!", redirect: `/class/${class_id}` });
});

app.post("/deleteClass", async(req, res) => {
    const user = req.session.user; 
    if (req.session.owner != user.id) { return res.status(400).json({ message: "Ban khong co quyen" });}

    const idClass = req.session.class_id;
    await pool.query(`DELETE FROM class_members WHERE class_id = $1`, [idClass]);
    await pool.query(`DELETE FROM re_member WHERE class_id = $1`, [idClass]);
    await pool.query(`DELETE FROM classes WHERE id = $1`, [idClass]);

    res.json({ message: "Deleted!!!", redirect: `/home/${user.username}` });
});

app.post("/deleReMem", async(req, res) => {
    const user = req.session.user; 
    if (req.session.owner != user.id) { return res.status(400).json({ message: "Ban khong co quyen" });}
    const {  idUser } = req.body;
    const idClass = req.session.class_id;
    if (!idUser || !idClass) {
        return res.status(400).json({ message: "Thiếu id!" });
    } 
 
    await pool.query(`DELETE FROM re_member WHERE class_id = $1 AND user_id = $2`, [idClass, parseInt(idUser)]);

    res.json({ message: "Deleted!!!", redirect: `/class/${idClass}` });
});

app.post("/deleMem", async(req, res) => {
    const user = req.session.user.id;
    if (req.session.owner != user) { return res.status(400).json({ message: "Ban khong co quyen" });}
    const {  idUser } = req.body;
    const idClass = req.session.class_id;
    if (!idUser || !idClass) {
        return res.status(400).json({ message: "Thiếu id!" });
    } 
 
    await pool.query(`DELETE FROM class_members WHERE class_id = $1 AND user_id = $2`, [idClass,parseInt(idUser)]);

    res.json({ message: "Deleted!!!", redirect: `/class/${idClass}` });
});


app.post("/addMem", async (req, res) =>  {
    const user = req.session.user;
    if (req.session.owner != user.id) { return res.status(400).json({ message: "Ban khong co quyen" });}

    const {user_id} = req.body;
    const idClass = req.session.class_id;
    if (!user_id ) {
        return res.status(400).json({ message: "Thiếu id!" });
    } 
    
    await pool.query(`INSERT INTO class_members (class_id, user_id) VALUES ($1, $2)`, [parseInt(idClass),parseInt(user_id)]);
    await pool.query(`DELETE FROM re_member WHERE class_id = $1 AND user_id = $2`, [idClass,parseInt(user_id)]);

    res.json({ message: "Sucessfull!!!", redirect: `/class/${idClass}` });
});

app.post("/findMem", async (req, res) => {

    const user = req.session.user;
    const idClass = req.session.class_id;
    const { email, username } = req.body;

    if (req.session.owner != user.id) { return res.status(400).json({ message: "Ban khong co quyen" });}

    if (!email && !username) {
        return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }
    let checkUser;
    if (email && username) {
        checkUser = await pool.query("SELECT * FROM users WHERE email = $1 AND username = $2", [email, username]);
    }
    else if (email) {    
        checkUser = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
    }
    else {
        checkUser = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    }
   
    if (checkUser.rows.length === 0) {
        return res.status(400).json({ message: "Không tìm thấy người dùng!" });
    }
    
    const checkInClass = await pool.query("SELECT * FROM class_members WHERE user_id = $1 AND class_id = $2", [checkUser.rows[0].id, idClass]);
    if( checkInClass.rows.length > 0 ) {
        return res.status(400).json({ message: "Người dùng đã ở trong lớp!" });
    }

    await pool.query("INSERT INTO class_members (class_id, user_id ) VALUES ($1, $2)", [idClass, checkUser.rows[0].id]);

    let redirectUrl = `/class/${idClass}`;

    res.json({ message: "Tạo lớp thành công!", redirect: redirectUrl });

} )

    
app.get("/class/:class_id", async (req, res) => {
    try {
        const class_id = req.params.class_id; 
        if (isNaN(class_id)) {
            return res.status(400).send("class_id phải là số hợp lệ!");
        }
        req.session.class_id = class_id

        const classQuery = await pool.query("SELECT * FROM classes WHERE id = $1", [parseInt(class_id)]);

        if (classQuery.rows.length === 0) {
            return res.status(404).send("Lớp học không tồn tại!");
        }
        res.sendFile(path.join(__dirname,'..', "public", "class.html"));

    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).send("Lỗi server!");
    }
});
app.get("/infoClass", async (req, res) => {
    try {
        const class_id = req.session.class_id;

        const classInfo = await pool.query("SELECT * FROM classes WHERE id = $1", [class_id]);
        const ownerInfo = await pool.query("SELECT * FROM users WHERE id = $1", [classInfo.rows[0].owner_id]);
        const request = await pool.query("SELECT * FROM re_member JOIN users ON re_member.user_id = users.id WHERE re_member.class_id = $1", [class_id]);
        const member = await pool.query(`
            SELECT * 
            FROM users JOIN class_members ON users.id = class_members.user_id
            JOIN classes ON classes.id = class_members.class_id
            WHERE classes.id = $1`, [class_id]);

        
        if (classInfo.rows.length === 0) {
            return res.status(404).json({ message: "Lớp học không tồn tại!" });
        }
        req.session.owner = classInfo.rows[0].owner_id;

        res.json({
           infoClass: classInfo.rows[0],
           infoOwner: ownerInfo.rows[0],
           re_members: request.rows,
           members: member.rows
        }); 

    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
});



app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
