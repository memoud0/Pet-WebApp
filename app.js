const express = require('express');
const session = require('express-session'); 
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

// Create a constant that check if a username is taken
const isUsernameTaken = (username) => {
    const loginData = fs.readFileSync('files/login.txt', 'utf8');
    const usernames = loginData.split('\n').map(line => line.split(':')[0]);
    return usernames.includes(username);
};

// Create a constant that adds a user and their password inside the login.txt file
const addNewUser = (username, password) => {
    fs.appendFileSync('files/login.txt', `${username}:${password}\n`);
};

const isLoggedIn = (req, res, next) => {
    // Check if the user is logged in
    if (req.session.username) {
        // User is authenticated, proceed to the next middleware
        next();
    } else {
        // User is not authenticated, redirect to the login page
        res.redirect('/login');
    }
};


// Read the content of header.html and footer.html files
const headerContent = fs.readFileSync('header.html', 'utf8');
const footerContent = fs.readFileSync('footer.html', 'utf8');

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'Assignment3', 
    resave: false,
    saveUninitialized: true
}));

// Redirect root URL to home page
app.get('/', (req, res) => {
    res.redirect('/home');
});

// Route for home page
app.get('/home', (req, res) => {
    const pageContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Adopt Cats And Dogs</title>
        <link rel="stylesheet" type="text/css" href="website.css">
        <script defer src="website.js"></script>
    </head>
    <body>
        ${headerContent}
        <div class="content">
            <h1>Find your new best friend</h1>
            <p>With more adoptable pets than ever, we have an urgent need for pet adopters. Search for dogs, cats, and other available pets for adoption near you.</p>
        </div>
        ${footerContent}
    </body>
    </html>`;
    res.send(pageContent);
});

// Route for browse page
app.get('/find', isLoggedIn, (req, res) => {
    const findPageContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Find a dog/cat</title>
        <link rel="stylesheet" type="text/css" href="website.css">
        <script defer src="website.js"></script>
    </head>
    <body>
        ${headerContent}
        <div class="content">
            <form action="/find" method="POST">
                <h1>Find a cat or dog</h1>
                <br>
                <label for="breed">Do you want a dog or a cat?</label>
                <select id="breed" name="breed">
                    <option value="dog">dog</option>
                    <option value="cat">cat</option>
                </select>
                <br>
                <label for="petcategory">Which breed?</label>
                <select id="petcategory" name="petcategory">
                    <option value="labrador">Labrador Retriever</option>
                    <option value="german">German Shepherd</option>
                    <option value="bulldog">Bulldog</option>
                    <option value="poodle">Poodle</option>
                    <option value="golden">Golden Retriever</option>
                    <option value="persian">Persian</option>
                    <option value="siamese">Siamese</option>
                    <option value="maine">Maine Coon</option>
                    <option value="bengal">Bengal</option>
                    <option value="sphynx">Sphynx</option>
                </select>
                <br>
                <label for="petage">Age (years old):</label>
                <select id="petage" name="petage">
                    <option value="notmatter">Does not matter</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <br>
                <label>Gender:</label>
                <input type="radio" id="female" name="gender" value="female">
                <label for="female">Female</label>
                <input type="radio" id="male" name="gender" value="male">
                <label for="male">Male</label>
                <input type="radio" id="notmatter" name="gender" value="notmatter">
                <label for="notmatter">Does not matter</label>
                <br>
                <label>Does it need to get along with</label>
                <br>
                <input type="checkbox" id="other-dogs" name="other-dogs" value="other-dogs">
                <label for="other-dogs">Other dogs</label>
                <input type="checkbox" id="other-cats" name="other-cats" value="other-cats">
                <label for="other-cats">Other cats</label>
                <input type="checkbox" id="small-children" name="small-children" value="small-children">
                <label for="small-children">Small children</label>
                <br>
                <div>
                    <input type="submit">
                    <input type="reset">
                </div>
                <br>
            </form>
        </div>
        ${footerContent}
    </body>
    </html>`;
    res.send(findPageContent);
});


// Route for browse page (post method)
app.post('/find', (req, res) => {
});

// Route for dog care page
app.get('/dog-care', (req, res) => {
    const dogCarePageContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dog Care</title>
            <link rel="stylesheet" type="text/css" href="website.css">
            <script defer src="website.js"></script>
        </head>
        <body>
            ${headerContent}
            <div class="content">
                <h1>Dog Care</h1>
                <p>
                    Dog care involves several key aspects: feeding, exercise, grooming, handling, housing, licensing, and identification. Puppies require frequent, portioned meals, while adult dogs typically need one or two meals daily of high-quality dry food supplemented with occasional treats.
                </p>
                <p>
                    Exercise is vital for physical and mental health, with activities tailored to the dog's breed, age, and health status. Regular grooming, including brushing and flea/tick checks, helps maintain cleanliness and reduces shedding.
                </p>
                <p>
                    Proper handling techniques prevent injury. Adequate shelter and access to water are essential, whether indoors or outdoors. Licensing, identification tags, and microchips aid in locating lost pets. Regular veterinary care, vaccinations, and spaying/neutering are crucial for health and population control.
                </p>
                <p>
                    A checklist of supplies includes food, bowls, toys, grooming tools, collar/leash, and bedding. Responsible waste management, including cleaning up after pets, is essential for community hygiene.
                </p>
                <p>
                    <a href="https://www.aspca.org/pet-care/dog-care/general-dog-care">Credit</a>
                </p>
            </div>
            ${footerContent}
        </body>
        </html>`;
    res.send(dogCarePageContent);
});

// Route for cat care page
app.get('/cat-care', (req, res) => {
    const catCarePageContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cat Care</title>
            <link rel="stylesheet" type="text/css" href="website.css">
            <script defer src="website.js"></script>
        </head>
        <body>
            ${headerContent}
            <div class="content">
                <h1>Cat Care</h1>
                <p>
                    For new cat owners, providing proper care is essential. Start with high-quality cat food, ensuring it's balanced for your cat's age and health needs.
                </p>
                <p>
                    Fresh water should always be available. Regular grooming and gentle handling are important for your cat's well-being. Indoors is safest for cats, as they face various risks outdoors. Identification, such as a collar with a tag or microchip, helps in case they get lost. A litter box should be clean and easily accessible.
                </p>
                <p>
                    Scratching posts are necessary to satisfy their natural behavior. Regular vet check-ups, vaccinations, and spaying/neutering are vital for their health. Avoid giving medication without veterinary advice and keep harmful substances away from your cat.
                </p>
                <p>
                    A checklist of supplies includes food, water bowls, toys, grooming tools, a litter box, and a carrier. With proper care, your new feline friend will thrive in their new home.
                </p>
                <p>
                    <a href="https://www.aspca.org/pet-care/cat-care/general-cat-care">Credit</a>
                </p>
            </div>
            ${footerContent}
        </body>
        </html>`;
    res.send(catCarePageContent);
});



// Route for creating-acount
app.get('/create-account', (req, res) => {
    const createAccountPageContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Create Account</title>
        <link rel="stylesheet" type="text/css" href="website.css">
        <script defer src="website.js"></script>
    </head>
    <body>
        ${headerContent}
        <div class="content">
            <h1>Create an Account</h1>
            <form action="/create-account" method="POST">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                <br>
                <label for="password">Password (at least 4 characters, containing at least one letter and one digit):</label>
                <input type="password" id="password" name="password" required>
                <br>
                <input type="submit" value="Create Account">
            </form>
        </div>
        ${footerContent}
    </body>
    </html>`;
    res.send(createAccountPageContent);
});



// Creating account submission route
app.post('/create-account', (req, res) => {
    const { username, password } = req.body;

    // Check if username is already taken
    if (isUsernameTaken(username)) {
        res.send('Username is not available. Please choose a different one.');
    } else {
        // Verify password
        if (password.length < 4 || !/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
            res.send('Password must be at least 4 characters long and contain at least one letter and one digit.');
        } else {
            // Add new user to login file
            addNewUser(username, password);
            res.send('Account created successfully. You can now login.');
        }
    }
});


// Route for the giveaway page
app.get('/giveaway', isLoggedIn,(req, res) => {
    const createPetEntryForm = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Create Pet Entry</title>
        <link rel="stylesheet" type="text/css" href="website.css">
        <script defer src="website.js"></script>
    </head>
    <body>
        ${headerContent}
        <div class="content">
            <form onsubmit="validateForm(event)" method="POST">
                <h1>Pet to give away</h1>
                <br>
                <label for="petcategory">Is it a dog or a cat?</label>
                <select id="petcategory" name="petcategory" required>
                    <option value="dog">dog</option>
                    <option value="cat">cat</option>
                </select>
                <br>
                <label for="petbreed">Which breed?</label>
                <select id="petbreed" name="petbreed" required>
                    <option value="labrador">Labrador Retriever</option>
                    <option value="german">German Shepherd</option>
                    <option value="bulldog">Bulldog</option>
                    <option value="poodle">Poodle</option>
                    <option value="golden">Golden Retriever</option>
                    <option value="persian">Persian</option>
                    <option value="siamese">Siamese</option>
                    <option value="maine">Maine Coon</option>
                    <option value="bengal">Bengal</option>
                    <option value="sphynx">Sphynx</option>
                </select>
                <br>
                <label for="petage">Age (years old):</label>
                <select id="petage" name="petage" required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <br>
                <label>Gender:</label>
                <input type="radio" id="female" name="gender" value="female" required>
                <label for="female">Female</label>
                <input type="radio" id="male" name="gender" value="male" required>
                <label for="male">Male</label>
                <br>
                <label>Does it need to get along with</label>
                <br>
                <input type="checkbox" id="other-dogs" name="other-dogs" value="other-dogs">
                <label for="other-dogs">Other dogs</label>
                <input type="checkbox" id="other-cats" name="other-cats" value="other-cats">
                <label for="other-cats">Other cats</label>
                <input type="checkbox" id="small-children" name="small-children" value="small-children">
                <label for="small-children">Small children</label>
                <br>
                <label for="comment">Comment area:</label>
                <textarea id="comment" name="comment" rows="4" cols="50"></textarea>
                <br>
                <label for="ownername">Owner's family and given names:</label>
                <input type="text" id="ownername" name="ownername" required>
                <br>
                <label for="email">Owner's email address:</label>
                <input type="text" id="email" name="email" required>
                <div>
                    <input type="submit">
                    <input type="reset">
                </div>
                <br>
            </form>
        </div>
        ${footerContent}
    </body>
    </html>`;
    res.send(createPetEntryForm);
});

// Route for posting a pet entry
app.post('/giveaway', isLoggedIn, (req, res) => {
    const { petcategory, petbreed, petage, gender, 'other-dogs': otherDogs, 'other-cats': otherCats, 'small-children': smallChildren, comment, ownername, email } = req.body;

    // Read available_pet_info.txt file
    let petInfoFileContent = fs.readFileSync('files/available_pet_info.txt', 'utf8');
    
    // Get the number of entries
    const numEntries = petInfoFileContent.split('\n').length;
    
    // Format the data
    const petInfo = `${numEntries}:${req.session.username}:${petcategory}:${petbreed}:${petage}:${gender}:${otherDogs ? 'other-dogs' : ''}:${otherCats ? 'other-cats' : ''}:${smallChildren ? 'small-children' : ''}:${comment}:${ownername}:${email}`;
    
    // Add the new pet data to the file
    fs.appendFileSync('files/available_pet_info.txt', `${petInfo}\n`);

    res.send('Pet entry created successfully.');
});




// Route login page
app.get('/login', (req, res) => {
    const loginPageContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
            <link rel="stylesheet" type="text/css" href="website.css">
            <script defer src="website.js"></script>
        </head>
        <body>
            ${headerContent}
            <div class="content">
                <h1>Login</h1>
                <form action="/login" method="POST">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                    <br>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                    <br>
                    <input type="submit" value="Login">
                </form>
            </div>
            ${footerContent}
        </body>
        </html>
    `;
    res.send(loginPageContent);
});

// Route for login submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verify if the user is registered by reading the login.txt file
    const loginData = fs.readFileSync('files/login.txt', 'utf8');
    const users = loginData.split('\n').map(line => line.split(':'));
    const user = users.find(user => user[0] === username && user[1] === password);

    if (user) {
        // New session
        req.session.username = username;
        res.send('Login successful. You can now create a pet entry.');
    } else {
        res.send('Login failed. Please check your username and password.');
    }
});

// Route for logging out
app.get('/logout', (req, res) => {
    // Clear the user's session
    req.session.destroy(() => {
        // Redirect the user to the home page
        res.redirect('/home');
    });
});





// Route for the contact page
app.get('/contact', (req, res) => {
    const contactPageContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Us</title>
            <link rel="stylesheet" type="text/css" href="website.css">
            <script defer src="website.js"></script>
        </head>
        <body>
            <div class="container">
                <nav>
                    <a href="home.html">
                        <img src="logo.png" class="logo" alt="Logo">
                    </a>
                    <ul>
                        <li><a href="home.html">Home page</a></li>
                        <li><a href="petss.html">Browse Available Pets</a></li>
                        <li><a href="find.html">Find a dog/cat</a></li>
                        <li><a href="dog-care.html">Dog Care</a></li>
                        <li><a href="cat-care.html">Cat Care</a></li>
                        <li><a href="giveaway.html">Have a pet to give away</a></li>
                        <li><a href="contact.html">Contact Us </a></li>
                        <li id="datetime"></li>
                    </ul>
                </nav>
            </div>

            <div class="content">
                <h1>Contact Us</h1>
                <br>
                <h2>Mohamed Mahmoud, 40283160, mohamedmahmoud4123@gmail.com</h2>
                <br>
            </div>
            <footer>
                <div class="policy">
                    <p>This website is for informational purpose only, see our <a href="disclaimer.html">Privacy/Disclaimer Statement</a></p>
                </div>
            </footer>
        </body>
        </html>`;
    
    res.send(contactPageContent);
});


// Serve static files from the 'files' directory
app.use(express.static('files'));

app.listen('5321');
console.log('Server running on port 5321')
