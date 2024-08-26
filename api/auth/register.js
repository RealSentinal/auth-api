async function Register(app, db) {
    app.post('/register', async (req, res) => {
        const { username, password } = req.body;
        db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (row) {
                res.status(409).send('Username already exists');
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }
                    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hash], (err) => {
                        if (err) {
                            res.status(500).send(err);
                            return;
                        }
                        res.status(201).send('User created');
                    });
                });
            }
        });
    });

}