import { signInWithEmailAndPassword, auth } from "./firebase.js";

let signinEmail = document.getElementById("signinEmail");
let signinPassword = document.getElementById("signinPassword");
let signinBtn = document.getElementById("signinBtn");

signinBtn.addEventListener("click", () => {
  if (signinEmail.value.trim() && signinPassword.value.trim()) {
    signInWithEmailAndPassword(auth, signinEmail.value, signinPassword.value)
      .then((userCredential) => {
        const user = userCredential.user;
        // Display a success message
        Swal.fire({
          icon: "success",
          title: "Signin Successful!",
          text: "You have successfully signed in.",
        }).then(() => {
          location.href = "dashboard.html";
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.error("Signin error:", error.message);
      });
  } else {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Details",
      text: "Please fill in both email and password.",
    });
  }
});
