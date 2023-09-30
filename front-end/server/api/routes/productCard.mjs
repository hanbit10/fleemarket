import express from 'express';
const router = express.Router();
import * as productCardRepository from '../models/productCard.model.mjs'
import storage from "../middleware/upload.js";

// Get all cards
router.get('/cards', async (req, res) => {
  const productCards = await productCardRepository.getAll();
  if (productCards) {
    res.status(200).json(productCards);
  } else {
    res.status(404).json({
      message: 'product-cards are not found'
    });
  }
})

// Get card
router.get('/card/:id', async(req, res) => {
  const id = req.params.id;
  const product = await productCardRepository.getProductCard(id);
  console.log('why');
  if(product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'product not found' });
  }
})

// Get cards by user
router.get('/user/:userid', async(req, res) => {
  const userId = req.params.userid;
  const products = await productCardRepository.getProductCardByUser(userId);
  if(products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: 'product not found' });
  }
})

// Create a card
router.post('/register', async (req, res) => {
  const { title, description, price, category, imageUrl, user, district, dealType } = req.body;
  const productCard = await productCardRepository.createCard(title, description, price, category, imageUrl, user, district, dealType);
  res.status(201).json(productCard);
})

router.post("/register/image", storage, async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.json({ message: "Successfully uploaded files" });
});


// Update the card
router.put('/update/:id', async (req, res) => {
  const { title, description, price, category, imageUrl, user, district, dealType } = req.body;
  const id = req.params.id;
  const prodcutCard = await productCardRepository.getProductCard(id);
  if (!prodcutCard) {
    res.status.json({
      message: `can not find product-card with ${id}`
    });
  }
  const updated = await productCardRepository.updateCard(id, title, description, price, category, imageUrl, user, district, dealType);
  res.status(200).json(updated);
})


// Delete the card
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  const productCard = await productCardRepository.getProductCard(id);
  if (!productCard) {
    res.status(404).json({ message: `can not find product-card with ${id}`});
  }
  await productCardRepository.removeCard(id);
  res.sendStatus(204);
})





export default router;
