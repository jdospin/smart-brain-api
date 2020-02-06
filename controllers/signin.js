const handleSignin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        res.status(400).json('incorrect form submission');
        return;
    }
    
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const hash = data[0].hash;
        const isValid = bcrypt.compareSync(password, hash);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else {
            console.log('internal');
            res.status(400).json('wrong credentials')
        }
    })
    .catch(err => {res.status(400).json('wrong credentials'); console.log(err); })
}

module.exports = {
    handleSignin
}