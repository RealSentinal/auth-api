import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function Login(app, db) {
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;
        db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (row) {
                if (bcrypt.compareSync(password, row.password)) {
                    jwt.sign({ username: row.username }, 'add-secret-key-here', (err, token) => {
                        console.log(err)
                        res.status(200).send({ token: token });
                    });
                } else {
                    res.status(401).send('Invalid username or password');
                }
            } else {
                res.status(401).send('Invalid username or password');
            }
        });
    });
}

export { Login }