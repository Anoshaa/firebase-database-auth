import { auth, sendEmailVerification, updateProfile, signOut, onAuthStateChanged, db,doc,setDoc,getDoc } from "./firebase.js";

// Load Profile Info
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("userName").textContent = user.displayName || "No Name";
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("emailVerifiedStatus").textContent = user.emailVerified ? "Verified" : "Not Verified";

    
  }
});

// dgab3urbo
// mgidbdbq

// profile pic
document.addEventListener("DOMContentLoaded", () => {
  const uploadButton = document.getElementById("uploadButton");
  const profilePicNavbar = document.getElementById("profilePicNavbar");
  const profilePicMain = document.getElementById("profilePicMain");

  // Cloudinary upload widget setup
  const cloudinaryWidget = cloudinary.createUploadWidget(
      {
          cloudName: "dgab3urbo", // Replace with your Cloudinary cloud name
          uploadPreset: "mgidbdbq", // Replace with your Cloudinary upload preset
          multiple: false,
          showAdvancedOptions: false,
          cropping: true,
          maxFileSize: 2000000, // Max file size (2MB)
      },
      async (error, result) => {
          if (!error && result && result.event === "success") {
              const imageUrl = result.info.secure_url;

              // Update the profile pictures in both navbar and main content
              profilePicNavbar.src = imageUrl;
              profilePicMain.src = imageUrl;

              // Save the uploaded image URL to Firestore
              const user = auth.currentUser;

              if (user) {
                  const userDocRef = doc(db, "users", user.uid);
                  try {
                      await setDoc(
                          userDocRef,
                          { profileImage: imageUrl },
                          { merge: true } // Merge with existing user data
                      );

                      // Show success message with SweetAlert
                      Swal.fire({
                          icon: 'success',
                          title: 'Profile image updated!',
                          text: 'Your profile image has been successfully updated.',
                          confirmButtonText: 'OK'
                      });
                  } catch (firestoreError) {
                      console.error("Error saving image URL to Firestore:", firestoreError);
                      alert("Failed to save image URL. Please try again.");
                  }
              } else {
                  alert("No user is signed in.");
              }
          }
      }
  );

  // Trigger the Cloudinary widget on button click
  uploadButton.addEventListener("click", () => {
      cloudinaryWidget.open();
  });

  // Check if the user is logged in and load their profile picture
  onAuthStateChanged(auth, async (user) => {
      if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
              const userData = userDoc.data();
              if (userData.profileImage) {
                  profilePicNavbar.src = userData.profileImage;
                  profilePicMain.src = userData.profileImage;
              }
          }
      }
  });
});

// Verify Email
document.getElementById("verifyEmailBtn").addEventListener("click", () => {
  const user = auth.currentUser;
  if (!user) {
    Swal.fire("Error", "No user signed in.", "error");
    return;
  }
  sendEmailVerification(user).then(() => {
    Swal.fire("Success", "Verification email sent.", "success");
  });
});

// Update Name
document.getElementById("updateNameBtn").addEventListener("click", () => {
  Swal.fire({
    title: "Update Name",
    input: "text",
    showCancelButton: true,
    confirmButtonText: "Update",
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const updatedName = result.value.toUpperCase(); // Convert input name to uppercase
      updateProfile(auth.currentUser, { displayName: updatedName }).then(() => {
        document.getElementById("userName").textContent = updatedName; // Update name in uppercase
        Swal.fire("Success", "Name updated.", "success");
      });
    }
  });
});

// Sign Out Button
document.getElementById('signOutBtn').addEventListener('click', () => {
  signOut(auth).then(() => {
    Swal.fire({
      icon: 'success',
      title: 'Signed Out',
      text: 'You have been signed out successfully.',
    }).then(() => {
      window.location.href = './index.html'; // Redirect to home or login page
    });
  }).catch((error) => {
    console.error("Error signing out: ", error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'There was an issue signing out.',
    });
  });
});






