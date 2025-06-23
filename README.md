# Members-Only Club

A secure Node.js web application where users can sign up, log in, create posts, and become members to access exclusive content.

[Preview](members-only-production-1e01.up.railway.app)

---

## Features

- User Authentication with Passport.js and bcrypt for password hashing  
- Membership system with a secret phrase to unlock exclusive content  
- Post creation, viewing, and deletion (only authors can delete their posts)  
- Input validation and sanitization with express-validator  
- Session management with express-session and secure cookies  
- Responsive UI using EJS templates  

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)  
- PostgreSQL database  
- Git  

### Installation

1. Clone the repository:

   git clone https://github.com/yourusername/members-only.git  
   cd members-only

2. Install dependencies:

   npm install

3. Create a `.env` file in the root directory and add:

   SECRET=your_session_secret  
   DATABASE_URL=your_postgres_connection_string  
   SECRET_PHRASE=your_membership_secret_phrase  
   NODE_ENV=development

4. Initialize your PostgreSQL database with the necessary tables.

5. Start the app:

   npm start

6. Open your browser at http://localhost:3000

---

## Usage

- Sign up with your name, username, and password  
- Log in to your account  
- Create posts visible to you and members  
- Become a member by entering the secret phrase  
- Delete your own posts  

---

## Environment Variables

Variable Name       - Description  
SECRET              - Session secret for express-session  
DATABASE_URL        - PostgreSQL connection string  
SECRET_PHRASE       - Secret phrase to become a member  
NODE_ENV            - Environment mode (development or production)  

---

## Security

- Passwords hashed securely with bcrypt  
- Input validation and sanitization implemented  
- Sessions secured with proper cookie settings in production  
- Authorization checks prevent unauthorized post deletions  

---

## Deployment

Deploy on platforms like Railway, Heroku, or any Node.js hosting with PostgreSQL support.

Make sure environment variables are set on your hosting provider and your database schema is initialized.

---

## Contributing

Contributions are welcome! Open issues or submit pull requests.

---

## License

MIT License

Copyright (c) 2025 [Kimball Oyler]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


---

## Contact

Created by Kimball Oyler (https://github.com/koyler88)
