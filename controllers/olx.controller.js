const Olx = require('../models/Product.model');

// Fetch all OLX products
const fetch_products = async (req, res) => {
    try {
        console.log('[+] fetching products');
        const products = await Olx.find().populate('seller', 'name contact');
        res.json(products);
    } catch (error) {
        console.error('[-]', error);
        res.status(500).json({
            error: 'Server Error!'
        });
    }
};

const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];
// Post a new product
const post_product = async (req, res) => {
    try {
        console.log('[+] registering product');
        const { title, price, description } = req.body;
        const product = await Olx.create({
            title,
            description,
            price,
            condition: "Good",
            isSold: false,
            seller: req.id
        });
        
        res.status(201).json(product);
    } catch (error) {
        console.error('[-]', error);
        res.status(500).json({
            error: 'Server Error!'
        });
    }
};

// Mark as sold
const set_sold = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Olx.findByIdAndUpdate(id, { isSold: true }, { new: true });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        console.log(`[+] set product ${id} to sold`);
        res.json({ message: `Product ${id} marked as sold`, product });
    } catch (error) {
        console.error('[-]', error);
        res.status(500).json({
            error: 'Server Error!'
        });
    }
};

// Get product by ID
const get_product = async (req, res) => {
    try {
        console.log(`[+] fetching product ${req.params.id}`);
        const product = await Olx.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        console.error('[-]', error);
        res.status(500).json({
            error: 'Server Error!'
        });
    }
};

// Delete product by ID
const delete_product = async (req, res) => {
    try {
        console.log(`[+] deleting product ${req.params.id}`);
        const deleted = await Olx.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: `Deleted product ${req.params.id}` });
    } catch (error) {
        console.error('[-]', error);
        res.status(500).json({
            error: 'Server Error!'
        });
    }
};

// Update product
const update_product = async (req, res) => {
    try {
        console.log('[+] updating product')
        const updated = await Olx.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Updated product', product: updated });
    } catch (error) {
        console.error('[-]', error);
        res.status(500).json({
            error: 'Server Error!'
        });
    }
};

module.exports = {
    fetch_products,
    post_product,
    set_sold,
    get_product,
    delete_product,
    update_product,
};
