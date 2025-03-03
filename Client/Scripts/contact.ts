namespace core
{
  
  export class Contact {

    // Private Instance Members
    private m_fullName: string;
    private m_contactNumber: string;
    private m_emailAddress: string;

    // Public Properties (Getters/Setters)
    public get FullName() {
      return this.m_fullName;
    }
    public set FullName(fullName: string) {
      this.m_fullName = fullName;
    }
  
    public get ContactNumber() {
      return this.m_contactNumber;
    }
    public set ContactNumber(contactNumber: string) {
      this.m_contactNumber = contactNumber;
    }
  
    public get EmailAddress() {
      return this.m_emailAddress;
    }
    public set EmailAddress(emailAddress: string) {
      this.m_emailAddress = emailAddress;
    }
  
    // Constructor
    constructor(fullName: string = "", contactNumber: string = "", emailAddress: string = "") {
      this.m_fullName = fullName;
      this.m_contactNumber = contactNumber;
      this.m_emailAddress = emailAddress;
    }
  
    // Utility Methods Public
  
    /**
     * Converts the Objects properties to a comma-separated string
     * 
     * @returns {(string | null)
     */
    serialize(): string | null {
      // Check that Contact Information is provided before serializing
      let name = this.FullName;
      let number = this.ContactNumber;
      let email = this.EmailAddress;
  
      if (name !== "" && number !== "" && email !== "")
        return `${name},${number},${email}`
  
      // If the contact cannot be serialized, provide an error and return null
      console.error('Invalid contact entered, contact not saved');
      return null;
    }
  
    /**
     * Separates a serialized data string into the Objects properties 
     * 
     * @param {string} data 
     * @returns {void}
     */
    deserialize(data: string) { // Assume incoming data is provided in a comma separated format (array of properties)
  
      let propertyArray: string[] = data.split(","); 
      this.FullName = propertyArray[0];
      this.ContactNumber = propertyArray[1];
      this.EmailAddress = propertyArray[2];
    }
  
    // Public Overrides
    /**
     * Overrides the built-in string toString method and returns a string containing the
     * values of the objects properties
     * 
     * @override
     * @returns {string}
     */
    toString() {
      return `Full Name: ${this.FullName}\nContact Number: ${this.ContactNumber}\nEmail Address: ${this.EmailAddress}\n`;
    }
  }

}


