const testController =  (req, res) => {
    res.status(200).send({
       message: "Вітаю користувач",
       success: true,
    });
};

export default testController;