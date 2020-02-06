const handleSignin = (db, bcrypt) => (req, res) => {
    // console.log(req.body.email);
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        const hash = data[0].hash;
        const isValid = bcrypt.compareSync(req.body.password, hash);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', req.body.email)
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