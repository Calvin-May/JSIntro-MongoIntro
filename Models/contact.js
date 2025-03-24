"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const mongoose = require("mongoose");
const { Schema } = mongoose;
const ContactSchema = new Schema({
    FullName: String,
    EmailAddress: String,
    PhoneNumber: String,
}, {
    collection: "contacts"
});
exports.Model = mongoose.model("Contacts", ContactSchema);
//# sourceMappingURL=contact.js.map