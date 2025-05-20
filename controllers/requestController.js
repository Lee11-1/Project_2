
const pool = require('../data');

exports.sendRequest = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    try {
        const {idClass} = req.body;
        const user = req.session.user;
        if(!idClass) {
            return res.status(400).json({message: "Thieu idClass"});
        }
        await pool.query('INSERT INTO re_member (class_id, user_id) VALUES ($1, $2)', [parseInt(idClass), user.id]);
    
        res.json({message: "ok"});
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).send("Lỗi server!");
    } 
};

exports.unRequest = async (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,  '..', 'public', 'home.html'));
    }
    try {
        const {idClass} = req.body;
        const user = req.session.user;
        if(!idClass) {
            return res.status(400).json({message: "Thieu idClass"});
        }
        await pool.query("DELETE FROM re_member WHERE user_id = $1 AND class_id = $2" ,[user.id, parseInt(idClass)]);
        res.json({message: "ok"});
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).send("Lỗi server!");
    }
};