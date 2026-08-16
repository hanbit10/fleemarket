import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema for productCard - post on webapp
// Category & District & Dealtype can be stored only in the restricted form
// imageUrl: directory path of local storage - images store to local
const productCardSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
       type: String,
       required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
			type: String,
			enum: [ 'Book', 'Clothing', 'Food', 'Electronics', 'Kitchen', 'Furniture', 'Sporting goods', 'Hobbies' ],
			required: true
		},
    imageUrl: {
      type: [String],
      dafault: ['no image']
    },
    user: { 
      userId: { type: String, required: true },
      email: { type: String, required: true },
    },
    district: {
      type: String,
      enum: ['Markt', 'Theater', 'Lindenplatz', 'St. Jakob', 'Westpark', 'Kronenberg', 'Hörn', 'Ponttor', 'Hansemannplatz', 'Soers', 'Jülicher Straße', 'Kalkofen', 'Kaiserplatz', 'Adalbertsteinweg', 'Panneschopp', 'Rothe Erde', 'Forst', 'Frankenberger Viertel', 'Burtscheid', 'Marschiertor', 'Beverau' ],
      default: 'Markt',
      required: true },
    dealType: {
      type: String,
      enum: ['sell', 'buy', 'freecycle'],
      default: 'sell',
      required: true
    },
    createdAt: {
      type: Date,
      dafault: Date.now
    }
  }
);

const ProductCard = mongoose.model('ProductCard', productCardSchema);
export default ProductCard;

// Get all post-datas which in DB stored
export async function getAll() {
  return ProductCard.find({});
}

// Get only the data of corresponding id
export async function getProductCard(id) {
  return ProductCard.findById(id);
}

// Get only the data of corresponding userId
export async function getProductCardByUser(userId) {
  return ProductCard.find({ "user.userId": userId });
}

// Create new post with the Schema 
export async function createCard(title, description, price, category, imageUrl, user, district, dealType) {
  return new ProductCard({
    title,
    description,
    price,
    category,
    imageUrl,
    user,
    district,
    dealType,
    createdAt: Date.now()
  }).save();
}

// Update the existing post with the information
export async function updateCard(id, title, description, price, category, imageUrl, user, district, dealType) {
  return ProductCard.findByIdAndUpdate(id, { title, description, price, category, imageUrl, user, district, dealType }, { returnOriginal: false});
}

// Delete the post from DB
export async function removeCard(id) {
  return ProductCard.findByIdAndDelete(id);
}
