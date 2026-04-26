const db = require("../config/db");

// CREATE PRODUCT
exports.createProduct = (req, res) => {
    const { name, description, price, category } = req.body;

    db.query(
        "INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)",
        [name, description, price, category],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Product created" });
        }
    );
};

// GET ALL PRODUCTS
exports.getProducts = (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// GET SINGLE PRODUCT
exports.getProduct = (req, res) => {
    db.query(
        "SELECT * FROM products WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results[0]);
        }
    );
};

// UPDATE PRODUCT
exports.updateProduct = (req, res) => {
    const { name, description, price, category } = req.body;

    db.query(
        "UPDATE products SET name=?, description=?, price=?, category=? WHERE id=?",
        [name, description, price, category, req.params.id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Product updated" });
        }
    );
};

// DELETE PRODUCT
exports.deleteProduct = (req, res) => {
    db.query(
        "DELETE FROM products WHERE id=?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Product deleted" });
        }
    );
};