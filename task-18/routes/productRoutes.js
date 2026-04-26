const router = require("express").Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);

// PROTECTED
router.post("/", auth, productController.createProduct);
router.put("/:id", auth, productController.updateProduct);
router.delete("/:id", auth, productController.deleteProduct);

module.exports = router;