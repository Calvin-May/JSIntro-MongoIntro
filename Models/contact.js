"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const mongoose = require("mongoose");
const { Schema } = mongoose;
const ContactSchema = new Schema({
    DisplayName: String,
    EmailAddress: String,
    Username: String,
    Password: String
}, {
    collection: "contacts"
});
exports.Model = mongoose.model("Contacts", ContactSchema);
//# sourceMappingURL=contact.js.map