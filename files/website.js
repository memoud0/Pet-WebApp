function updateTime() {
    const date = new Date();
    document.getElementById("datetime").innerHTML = date.toString();
}

updateTime(); // Initial call to display time immediately

// Update time every second
setInterval(updateTime, 1000);

// Function ensuring that the fields are not empty
function validateInput(event){


    // Get the value of the inputs
    const breed = document.getElementById("breed").value;
    const petcategory = document.getElementById("petcategory").value;
    const petage = document.getElementById("petage").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const otherDogs = document.getElementById("other-dogs").checked;
    const otherCats = document.getElementById("other-cats").checked;
    const smallChildren = document.getElementById("small-children").checked;

    if (!breed) {
        alert("Please select a breed.");
        event.preventDefault();
    }
    if (!petcategory) {
        alert("Please select a pet category.");
        event.preventDefault();
    }
    if (!petage) {
        alert("Please select an age.");
        event.preventDefault();

    }
    if (!gender) {
        alert("Please select a gender.");
        event.preventDefault();
    }
    if (!otherDogs && !otherCats && !smallChildren) {
        alert("Please select at least one option where it needs to get along.");    
        event.preventDefault();
    }
}


// Function ensuring that the fields (to submit a pet) are not empty
function validateForm(event) {

    event.preventDefault();
    // Get the value of the inputs
    const petCategory = document.getElementById("petcategory").value;
    const petBreed = document.getElementById("petbreed").value;
    const petAge = document.getElementById("petage").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const otherDogs = document.getElementById("other-dogs").checked;
    const otherCats = document.getElementById("other-cats").checked;
    const smallChildren = document.getElementById("small-children").checked;
    const comment = document.getElementById("comment").value;
    const ownerName = document.getElementById("ownername").value;
    const email = document.getElementById("email").value;

    // Regular Expression for email validation
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation checks
    if (!petCategory || !petBreed || !petAge || !gender || (!otherDogs && !otherCats && !smallChildren) || !comment || !ownerName || !email) {
        alert("Please fill out all fields.");
        return; 
    }

    if (!emailFormat.test(email)) {
        alert("Please enter a valid email address.");
        return; 
    }
    event.target.submit();


}







