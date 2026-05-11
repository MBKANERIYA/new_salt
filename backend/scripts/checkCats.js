const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL).then(async () => {
    const db = mongoose.connection.db;
    const collection = db.collection('uploads');
    const r = await collection.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]).toArray();
    console.log(r);
    process.exit();
});
