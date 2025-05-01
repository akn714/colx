const LostAndFound = require('../models/Laf.model'); // changed from LAF to match usage

// Get all LAF entries
const get_lost_and_found = async (req, res) => {
    try {
        const items = await LostAndFound.find();
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Add new LAF entry
const add_lost_and_found = async (req, res) => {
    try {
        const { author, title, type, location, contactMe, date } = req.body;
        const item = await LostAndFound.create({
            author,
            title,
            type,
            location,
            contactMe,
            createdAt: date ? new Date(date) : new Date()
        });
        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Delete by body (legacy)
const delete_from_lost_and_found = async (req, res) => {
    try {
        const { id } = req.body;
        await LostAndFound.findByIdAndDelete(id);
        res.status(200).json({ message: `Deleted item ${id}` });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Get by ID
const get_lost_and_found_by_id = async (req, res) => {
    try {
        const item = await LostAndFound.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Delete by ID
const delete_from_lost_and_found_by_id = async (req, res) => {
    try {
        const deleted = await LostAndFound.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: `Deleted item ${req.params.id}` });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Update by ID
const update_lost_and_found = async (req, res) => {
    try {
        const updatedItem = await LostAndFound.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Updated item', item: updatedItem });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

module.exports = {
    get_lost_and_found,
    add_lost_and_found,
    delete_from_lost_and_found,
    get_lost_and_found_by_id,
    delete_from_lost_and_found_by_id,
    update_lost_and_found,
};
