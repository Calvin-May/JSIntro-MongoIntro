//import { Schema } from "mongoose"; // Can use this to replace lines 2-3
import mongoose = require('mongoose');
const { Schema } = mongoose; // Can also write like this: const Schema = mongoose.Schema

// Create the Contact Schema
const ContactSchema = new Schema(
    {// Schema Definition 
    DisplayName: String,
    EmailAddress: String,
    Username: String,
    Password: String
    },
    {// Schema's can also have addition options 
        collection: "contacts" // Models using this Schema are placed into the contacts collection
    }
);

// Export the Schema to a Model so that we can use it in code
export const Model = mongoose.model("Contacts", ContactSchema);

// Can also export like this:
//module.exports.Model = Model;