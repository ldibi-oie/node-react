class UserService {
    constructor(sequelize) {
        this.client = sequelize;
        this.models = sequelize.models;
    }

    async getUserRoute() {
        return 'User page';
    }

}

module.exports = UserService;