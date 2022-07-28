sequelize
    .sync({
        alter: true,
    })
    .then(() => {
        console.log("Database synced");
        sequelize.close();
    });
