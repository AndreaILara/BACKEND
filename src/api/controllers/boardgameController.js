const Boardgame = require('../models/Boardgame');

exports.getAllBoardgames = async (req, res) => {
    try {
        // Busca todos los juegos en la colección
        const boardgames = await Boardgame.find();

        // Responde con los datos encontrados y un código de estado 200
        res.status(200).json(boardgames);
    } catch (error) {
        // Si ocurre algún error, responde con un código de estado 500 y el mensaje del error
        res.status(500).json({ error: error.message });
    }
};

// Add a Boardgame
exports.addBoardgame = async (req, res) => {
    try {
        const images = req.files.map(file => file.path); // Obtén las URLs desde Cloudinary

        const boardgame = await Boardgame.create({
            ...req.body,
            images: images // Guarda las URLs en el campo `images`
        });

        res.status(201).json({ message: 'Boardgame created successfully!', boardgame });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Boardgame
exports.updateBoardgame = async (req, res) => {
    try {
        const boardgameId = req.params.id;
        const updates = req.body;

        // Si se subieron nuevas imágenes, inclúyelas en la actualización
        if (req.files) {
            const images = req.files.map(file => file.path);
            updates.images = images;
        }

        const updatedBoardgame = await Boardgame.findByIdAndUpdate(boardgameId, updates, { new: true });
        res.status(200).json({ message: 'Boardgame updated successfully', updatedBoardgame });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Boardgame
exports.deleteBoardgame = async (req, res) => {
    try {
        const boardgameId = req.params.id;
        const deletedBoardgame = await Boardgame.findByIdAndDelete(boardgameId);
        res.status(200).json({ message: 'Boardgame deleted', deletedBoardgame });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
