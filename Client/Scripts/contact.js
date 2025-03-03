"use strict";
var core;
(function (core) {
    class Contact {
        m_fullName;
        m_contactNumber;
        m_emailAddress;
        get FullName() {
            return this.m_fullName;
        }
        set FullName(fullName) {
            this.m_fullName = fullName;
        }
        get ContactNumber() {
            return this.m_contactNumber;
        }
        set ContactNumber(contactNumber) {
            this.m_contactNumber = contactNumber;
        }
        get EmailAddress() {
            return this.m_emailAddress;
        }
        set EmailAddress(emailAddress) {
            this.m_emailAddress = emailAddress;
        }
        constructor(fullName = "", contactNumber = "", emailAddress = "") {
            this.m_fullName = fullName;
            this.m_contactNumber = contactNumber;
            this.m_emailAddress = emailAddress;
        }
        serialize() {
            let name = this.FullName;
            let number = this.ContactNumber;
            let email = this.EmailAddress;
            if (name !== "" && number !== "" && email !== "")
                return `${name},${number},${email}`;
            console.error('Invalid contact entered, contact not saved');
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }
        toString() {
            return `Full Name: ${this.FullName}\nContact Number: ${this.ContactNumber}\nEmail Address: ${this.EmailAddress}\n`;
        }
    }
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map