namespace core{ 

    export class User {

        // Private Instance Members
        private m_displayName: string;
        private m_emailAddress: string;
        private m_username: string;
        private m_password: string;

        // Public Properties (Getters/Setters)
        public get DisplayName(): string {
            return this.m_displayName;
        }
        public set DisplayName(displayName: string) {
            this.m_displayName = displayName;
        }
        
        public get EmailAddress(): string {
            return this.m_emailAddress;
        }
        public set EmailAddress(emailAddress: string) {
            this.m_emailAddress = emailAddress;
        }
        
        public get Username(): string {
            return this.m_username;
        }
        public set Username(username: string) {
            this.m_username = username;
        }

        public get Password(): string {
            return this.m_password;
        }
        public set Password(password: string) {
            this.m_password = password;
        }


        // Constructor
        constructor(displayName: string = '', emailAddress: string = '', username: string = '', password: string = '') {
            this.m_displayName = displayName;
            this.m_emailAddress = emailAddress;
            this.m_username = username;
            this.m_password = password;
        }

        // TODO: Missing Getters and Setters

        // Overwritten Methods
        /**
         * Overrides the built in toString method and returns a comma separated string containing
         * the Objects properties
         * @override
         * @returns {string}
         */
        toString(): string {
            return `Display Name: ${this.DisplayName}\nEmail Address: ${this.EmailAddress}\nUsername: ${this.Username}`
        }
        // Utility Methods
        
        /**
         * 
         * @returns ({DisplayName: string, EmailAddress: string, Username: string})
         */
        toJSON(): { DisplayName: string, EmailAddress: string, Username: string} {
            return {
                "DisplayName": this.DisplayName,
                "EmailAddress": this.EmailAddress,
                "Username": this.Username,
            }
        }

        fromJSON(data: User): void {
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }

        /**
         * Converts the objects properties into a comma-separated string
         * @returns {(string | null)}
         */
        serialize(): string | null {
            // Check that Contact Information is provided before serializing
            let displayName = this.DisplayName;
            let emailAddress = this.EmailAddress;
            let username = this.Username;
        
            if (displayName !== "" && emailAddress !== "" && username !== "")
              return `${displayName},${emailAddress},${username}`
        
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
          deserialize(data: string): void { // Assume incoming data is provided in a comma separated format (array of properties)
        
            let propertyArray = data.split(","); 
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
          }

    }
}