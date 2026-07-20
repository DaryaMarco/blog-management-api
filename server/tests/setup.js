require("../src/config/env");
// خروجی فایل را لازم نداریم فقط میخوائیم فایل اجرا شود

const mongoose = require("mongoose");
const config = require("../src/config/config");

beforeAll(async () => {
    await mongoose.connect(config.mongoURI);
});

beforeEach(async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});