import mongoose from "mongoose";

const apiSchema = new mongoose.Schema({
    username: { type: String, required: true },
    apikey: { type: String, required: true },
});

const Api = mongoose.model('Api', apiSchema);

export default Api;