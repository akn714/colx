const get_lost_and_found = async (req, res) => {
    try {
        const lostFoundItems = await LostAndFound.find();
        console.log('[+] fetching lost and found...', lostFoundItems);
        res.json(lostFoundItems);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

const add_lost_and_found = async (req, res) => {
    try {
        const { author, title, type, location, contactMe, date } = req.body;
        await LostAndFound.create({
            title: data,
            description: '',
            type,
            // location,
            author,
            contactMe,
            // createdAt: new Date(date),
        });
        res.redirect(`${URL}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

const delete_from_lost_and_found = async (req, res) => {
    try {
        const { id } = req.body;
        await LostAndFound.findByIdAndDelete(id);
        res.redirect(`${URL}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

const post_found = async (req, res) => {
    try {
        const { name, contact, title, desc } = req.body;
        await LostAndFound.create({
            title: title,
            description: desc,
            type: 'found',
            // location: '',
            author: name,
            contactMe: contact,
            // createdAt: new Date(),
        });
        res.redirect(`${URL}/lost_and_found/lost_and_found`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

const post_lost = async (req, res) => {
    try {
        const { name, contact, title, desc } = req.body;
        await LostAndFound.create({
            title: title,
            description: desc,
            type: 'lost',
            // location: '',
            author: name,
            contactMe: contact,
            // createdAt: new Date(),
        });
        res.redirect(`${URL}/lost_and_found/lost_and_found`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

const get_lost_and_found_by_id = (req, res) => {
    // get lost_and_found item by id from /:id
}

const delete_from_lost_and_found_by_id = (req, res) => {
    // delete a perticular lost_and_found item by id from /:id
}

const update_lost_and_found = (req, res) => {
    // update a perticular lost_and_found item by if from /:id
}

module.exports = {
    'get_lost_and_found': get_lost_and_found,
    'add_lost_and_found': add_lost_and_found,
    'delete_from_lost_and_found': delete_from_lost_and_found,

    // removing these later
    'post_found': post_found,
    'post_lost': post_lost,

    // not implemented
    'get_lost_and_found_by_id': get_lost_and_found_by_id,
    'delete_from_lost_and_found_by_id': delete_from_lost_and_found_by_id,
    'update_lost_and_found': update_lost_and_found
}
