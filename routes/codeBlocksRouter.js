const express = require('express');
const router = express.Router();
const CodeBlock = require('../models/CodeBlock');

//Get all
router.get('/getAllTitles', async (req, res) => {
	try {
		//console.log('Nadav1');
		const blocks = await CodeBlock.find();
		//console.log('Nadav2');
		res.json(blocks);
		//console.log('Nadav3');
	} catch (err) {
		//console.log('Nadav4');
		res.status(500).json({ message: err.message });
	}
});

router.get('/getCodeBlockByTitle/:title', async (req, res) => {
	try {
		const blocks = await CodeBlock.find({ title: req.params.title });
		res.json(blocks[0]);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post('/updateCode', async (req, res) => {
	try {
		const blocks = await CodeBlock.updateOne(
			{ title: req.body.title },
			{ $set: { code: req.body.code } }
		);
		res.json(blocks);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post('/incCounter/:title', async (req, res) => {
	try {
		const blocks = await CodeBlock.find({ title: req.params.title });
		const newBlocks = await CodeBlock.updateOne(
			{ title: req.params.title },
			{ $set: { counter: blocks[0].counter + 1 } }
		);
		res.json(newBlocks);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post('/decCounter/:title', async (req, res) => {
	try {
		const blocks = await CodeBlock.find({ title: req.params.title });
		const newBlocks = await CodeBlock.updateOne(
			{ title: req.params.title },
			{ $set: { counter: blocks[0].counter - 1 } }
		);
		res.json(newBlocks);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.get('/getCounter/:title', async (req, res) => {
	try {
		const blocks = await CodeBlock.find({ title: req.params.title });
		res.json(blocks[0].counter);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post('/getReadWrite/:title', async (req, res) => {
	try {
		const blocks = await CodeBlock.find({ title: req.params.title });
		if (blocks[0].counter == 0) {
			//first enter
			const newBlocks = await CodeBlock.updateOne(
				{ title: req.params.title },
				{ $set: { counter: 1 } }
			);
			res.json(0);
		} else {
			//second enter
			const newBlocks = await CodeBlock.updateOne(
				{ title: req.params.title },
				{ $set: { counter: 0 } }
			);
			res.json(1);
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
