import { 
  auth,
  googleProvider, // Import the provider directly from firebase.js
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "./firebase.js";

let signupBtn = document.getElementById("signupBtn");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");
let googleSignupBtn = document.getElementById("googleSignupBtn");

signupBtn.addEventListener("click", () => {
  if (signupEmail.value.trim() && signupPassword.value.trim()) {
    createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
      .then((userCredential) => {
        console.log("User signed up:", userCredential);
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You have successfully signed up.",
        }).then(() => {
          location.href = "signin.html";
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.error("Signup error:", error.message);
      });
  } else {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Details",
      text: "Please fill in both email and password.",
    });
  }
});

// Google Signup
googleSignupBtn.addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      console.log("Google sign-in successful:", result.user);
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You have signed up with Google.",
      }).then(() => {
        location.href = "dashboard.html";
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Google Sign-In failed. Please try again.",
      });
      console.error("Google sign-in error:", error.message);
    });
});