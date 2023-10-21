const getProfile = db => (req, res) => {
    const { id } = req.params;
    db.select('*')
    .from('users')
    .where({ id })
    .then(user => {
        if (user.length) { res.json(user[0]) } 
        else {
            res.status(404).json(`User with ID ${id} not found`)
        }
    })
}

module.exports = {getProfile};