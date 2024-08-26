import jwt from 'jsonwebtoken';

async function Authectication(app, db) {
    app.post('/auth', async (req, res) => {
        const { token } = req.body;

        jwt.verify(token, 'add-secret-key-here', (err, decoded) => {
            if (err) {
                res.status(401).send('Invalid token');
            } else {
                res.status(200).send(decoded);
            }
        })
    })
}

export { Authectication }