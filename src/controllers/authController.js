
const pool = require('../data');
const bcrypt = require("bcryptjs");


exports.register = async (req, res) => {
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
};

exports.signIn = async (req, res) => {
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
};

exports.forgot = async (req, res) => {
    res.sendFile(path.join(__dirname, '..','..', "public", "fogot.html"));
};

exports.forgotPassword = async (req, res) => {
    const { username, email } = req.body;
    if(!username || !email) {
        return res.json({message:"Thieu thong tin bat buoc."});
    }
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
};


exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Lỗi khi đăng xuất:", err);
        }
        res.redirect("/"); 
    });
};


