const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

mongoose.connect('mongodb+srv://samruddhip746:YSuv0J8H63njoDJK@cluster0.bndydac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define Mongoose schema and model
const customerSchema = new mongoose.Schema({
  fullName: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  address: { type: String, required: true },
  mobile: { type: String, required: true, match: /^\d{10}$/ },
  username: { type: String, required: true, unique: true, minlength: 6 },
  password: { type: String, required: true, minlength: 8 },
  userType: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
  loginTimes: [{ type: Date }],
  logoutTimes: [{ type: Date }],
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

// Handle POST request for registration
app.post('/', async (req, res) => {
  console.log("Received data:", req.body); // Log the incoming data

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newCustomer = { ...req.body, password: hashedPassword };

    const customer = await Customer.create(newCustomer);
    res.json(customer);
  } catch (err) {
    console.log("Error creating customer:", err); // Log detailed error
    res.status(500).json({ error: "Could not create customer" });
  }
});


// Handle GET request for fetching all users
app.get('/users', async (req, res) => {
  try {
    const users = await Customer.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Handle PUT request for updating logout times
app.put('/users/:userId/logout-time', async (req, res) => {
  const { userId } = req.params;
  const { logoutTime } = req.body;
  
  try {
    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({ error: "User not found" });
    }

    customer.logoutTime = logoutTime;
    await customer.save();

    res.json({ message: "Logout time updated successfully" });
  } catch (err) {
    console.error("Error updating logout time:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Handle DELETE request for deleting a user
app.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const customer = await Customer.findByIdAndDelete(userId);
    if (!customer) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Handle PUT request for updating login times
app.put('/users/:userId/login-times', async (req, res) => {
  const { userId } = req.params;
  const { loginTimes } = req.body;
  
  try {
    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({ error: "User not found" });
    }

    customer.loginTimes = loginTimes;
    await customer.save();

    res.json({ message: "Login times updated successfully" });
  } catch (err) {
    console.error("Error updating login times:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Handle PUT request to update logout time
app.put('/users/:userId/logout-time', async (req, res) => {
  const { userId } = req.params;
  const { logoutTime } = req.body;
  
  try {
    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the new logout time to the array
    customer.logoutTimes.push(logoutTime);
    await customer.save();

    res.json({ message: "Logout time updated successfully" });
  } catch (err) {
    console.error("Error updating logout time:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Handle GET request for fetching all users with logout times
// Handle GET request for fetching all users with logout times
app.get('/users', async (req, res) => {
  try {
    const users = await Customer.find().select('fullName email logoutTimes'); // Select fields to return
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// POST request for logout

// POST request for login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const customer = await Customer.findOne({ username });
    if (!customer) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    // Append the new login time
    customer.loginTimes.push(Date.now());
    await customer.save();
    const userType = customer.userType;
    res.json({ message: "Login successful", userType });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST request for logout
// Example backend endpoint to handle logout and store logout time
app.post('/logout', (req, res) => {
  // Assuming userId is sent in request body or through authentication
  const userId = req.body.userId; // Adjust this according to your authentication mechanism

  // Find user by userId and update logoutTimes array
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Add current time to logoutTimes array
      user.logoutTimes.push(new Date());

      // Save updated user object
      return user.save();
    })
    .then(updatedUser => {
      res.status(200).json({ message: 'Logout successful', user: updatedUser });
    })
    .catch(err => {
      console.error('Error during logout:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});


// Define a schema for the book
const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  copies: { type: Number, required: true },
  availableCopies: { type: Number, required: true },
  purchasedCopies: { type: Number, default: 0 },
  price: { type: Number, required: true }, // New field for price
  description: { type: String },
  imageUrl: { type: String, required: true },
  confirmed: { type: Boolean, default: false }
});

const publisherSchema = new mongoose.Schema({
  publisher: { type: String, required: true, unique: true },
  books: [bookSchema]
});

// Create the Publisher model
const Publisher = mongoose.model('Publisher', publisherSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// POST route to add a new book
app.post('/books', async (req, res) => {
  try {
    const { publisher, copies, price, ...bookData } = req.body;

    // Validate required fields including price
    if (!publisher || !bookData.name || !bookData.author || !bookData.year || !copies || !price || !bookData.imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Calculate purchased copies
    const purchasedCopies = copies - (bookData.availableCopies || 0);

    // Find the publisher by name
    let publisherDoc = await Publisher.findOne({ publisher });

    if (publisherDoc) {
      // If publisher exists, create a new book with the same availableCopies as copies
      const newBookData = { ...bookData, copies, availableCopies: copies, purchasedCopies, price }; // Include price and purchasedCopies
      publisherDoc.books.push(newBookData);
    } else {
      // If publisher does not exist, create a new publisher document with the new book
      publisherDoc = new Publisher({ publisher, books: [{ ...bookData, copies, availableCopies: copies, purchasedCopies, price }] });
    }

    // Save the publisher document
    await publisherDoc.save();
    res.status(201).json(publisherDoc);
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ error: "Could not add book" });
  }
});

// GET route to fetch all books
app.get('/books', async (req, res) => {
  try {
    const publishers = await Publisher.find();

    // Prepare the structured response
    const structuredResponse = publishers.map(publisher => {
      const publisherObj = {
        publisher: publisher.publisher,
        authors: []
      };

      // Group books by author
      const booksByAuthor = publisher.books.reduce((acc, book) => {
        if (!acc[book.author]) {
          acc[book.author] = [];
        }
        acc[book.author].push({
          _id: book._id,
          name: book.name,
          author: book.author,
          year: book.year,
          copies: book.copies,
          availableCopies: book.availableCopies,
          purchasedCopies: book.purchasedCopies,
          description: book.description,
          imageUrl: book.imageUrl,
          confirmed: book.confirmed,
          price: book.price // Include price in the response
        });
        return acc;
      }, {});

      // Format each author's books into an array
      Object.keys(booksByAuthor).forEach(author => {
        const authorObj = {
          authorName: author,
          books: booksByAuthor[author]
        };
        publisherObj.authors.push(authorObj);
      });

      return publisherObj;
    });

    res.status(200).json(structuredResponse);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Could not fetch books" });
  }
});

// PATCH route to confirm an order and update a book
// PATCH route to confirm an order and update a book
app.patch('/books/confirm/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the publisher containing the book
    const publisher = await Publisher.findOne({ "books._id": id });

    if (!publisher) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Find the book within the publisher's books array
    const book = publisher.books.id(id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Decrease availableCopies by 1 and increase purchasedCopies by 1
    book.availableCopies -= 1;
    book.purchasedCopies += 1;
    book.confirmed = true; // Update confirmed status
    book.price = req.body.price || book.price; // Update price if provided

    // Save the updated publisher document
    await publisher.save();

    res.json({ message: 'Order confirmed successfully', updatedBook: book });
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// PUT route to update a book
// PUT route to update a book
app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBookData = req.body;

    // Find the publisher containing the book and update the book
    const publisher = await Publisher.findOneAndUpdate(
      { "books._id": id },
      { $set: { "books.$": updatedBookData } },
      { new: true }
    );

    if (!publisher) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(updatedBookData); // Return updated book data
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// DELETE route to delete a book
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Find the publisher containing the book and remove the book from the array
    const publisher = await Publisher.findOneAndUpdate(
      { "books._id": id },
      { $pull: { books: { _id: id } } },
      { new: true }
    );
    if (!publisher) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Inquiry Schema and Model
const inquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  mobile: { type: String, required: true, match: /^\d{10}$/ }, // Mobile number should be 10 digits
  inquiry: { type: String, required: true }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// POST /inquiries
app.post('/inquiries', async (req, res) => {
  try {
    const inquiryData = req.body;

    // Validate required fields
    if (!inquiryData.fullName || !inquiryData.email || !inquiryData.mobile || !inquiryData.inquiry) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new inquiry
    const inquiry = new Inquiry(inquiryData);
    await inquiry.save();
    res.status(201).json(inquiry);
  } catch (err) {
    console.error("Error submitting inquiry:", err);
    res.status(500).json({ error: "Could not submit inquiry" });
  }
});

// GET /inquiries
app.get('/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json(inquiries);
  } catch (err) {
    console.error("Error fetching inquiries:", err);
    res.status(500).json({ error: "Could not fetch inquiries" });
  }
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
