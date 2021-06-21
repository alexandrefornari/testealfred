const userService = require('../services/user');

const getAllUsers = async (req, res) => {
    const users = await userService.getAll();

    //console.log(users);

    res.json(users);
}

const getUserById = async (req, res) => {
    const user = await userService.findById(req.params.id);

    //console.log(user);

    res.json(user);
}

const createUser = async (req, res) => {
    userService.create(req.body)
    .then(user => {
        res.json(user)
    })
    .catch(error => {
        res.json(error)
    })
}

const deleteUser = async (req, res) => {
    const user = await userService.deleteById(req.params.id);

    //console.log(user);
    if(user){
        res.send('Usuário removido com sucesso');
    }else{
        res.status(500).send('Usuário não encontrado');
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
}