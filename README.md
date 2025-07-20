# YelpCamp

A full-stack web application for discovering, reviewing, and sharing campgrounds. Features user authentication, interactive maps, image uploads, and more.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Demo

<!-- If deployed, add your live link here -->
[Live Demo](#)  
![YelpCamp Screenshot](#) <!-- Add a screenshot or GIF here -->

---

## Features

- User authentication (register, login, logout)
- Create, edit, and delete campgrounds
- Upload campground images (Cloudinary integration)
- Add and manage reviews for campgrounds
- Interactive maps with MapTiler SDK
- Flash messages for user feedback
- Input sanitization and error handling
- Responsive and clean UI

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** EJS, HTML, CSS, JavaScript
- **Maps:** MapTiler SDK
- **Image Uploads:** Cloudinary
- **Authentication:** Passport.js (assumed)
- **Other:** Express-Session, Connect-Flash, Input Sanitization

---

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- MapTiler account (for map API key)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/YelpCamp.git
   cd YelpCamp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret
   MAPTILER_KEY=your_maptiler_key
   DB_URL=your_mongodb_uri
   SECRET=your_session_secret
   ```

4. **Seed the database (optional):**
   ```bash
   node views/seeds/index.js
   ```

5. **Start the server:**
   ```bash
   node app.js
   ```
   Or, for development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Visit:**  
   [http://localhost:3000](http://localhost:3000)

---

## Usage

- Register for an account or log in.
- Browse campgrounds, view details, and see locations on the map.
- Add your own campgrounds with images and location.
- Leave reviews on campgrounds.
- Edit or delete your own campgrounds and reviews.

---

## Folder Structure

```
YelpCamp/
  app.js
  cloudinary/
  controllers/
  middleware.js
  models/
  public/
  Routes/
  utils/
  views/
  .env (not tracked)
  package.json
  README.md
```

- **controllers/**: Route logic for campgrounds, reviews, users
- **models/**: Mongoose schemas for Campground, Review, User
- **public/**: Static assets (JS, CSS)
- **Routes/**: Express route definitions
- **utils/**: Utility functions and error handling
- **views/**: EJS templates for UI

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

[MIT](LICENSE)

---

**Feel free to add screenshots, a live demo link, or any additional sections that showcase your work! If you want, I can help you write a more detailed section for any part of this README.**
