module.exports = {
    readProducts: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.get_inventory()
            .then(products => res.status(200).send(products))
            .catch(err => {
                res.status(500).send("Sorry, there's an issue with the server");
                console.log(err);
            });
    },

    createProduct: (req, res) => {
        const dbInstance = req.app.get('db');
        const { name, price, img } = req.body;

        dbInstance.add_product([name, price, img])
            .then(() => res.sendStatus(200))
                .catch(err => {
                    res.status(500).send("Sorry, there's an issue with the server");
                    console.log(err);
                });
    },

    deleteProduct: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.remove_product(req.params.id)
            .then(() => res.sendStatus(200))
                .catch(err => {
                    res.status(500).send("Sorry, there's an issue with the server");
                    console.log(err);
                });
    },

    updateProduct: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.update_product([req.params.id, req.query.name, req.query.price, req.query.img])
            .then(() => res.sendStatus(200))
                .catch(err => {
                    res.status(500).send("Sorry, there's an issue with the server");
                    console.log(err);
                });
    },

}