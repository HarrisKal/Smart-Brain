const handleImage = db => (req, res) => {
    const { id } = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(`${entries[0].entries}`)
    })
    .catch(err => res.status(400).json('Could not update entries'))
};

module.exports = {handleImage};