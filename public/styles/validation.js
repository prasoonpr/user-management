// const form = document.querySelector("form");
// const email = document.querySelector("#email");
// const username = document.querySelector("#username");
// const password = document.querySelector("#password");


// form.addEventListener("submit", (event) => {
//   console.log("hai");
  
//   if (email.value === "" && password.value === "" && username.value === "") {
//     event.preventDefault();
//     alert("please enter email and password and username");
//     return false;
//   } else if (username.value === "") {
//     event.preventDefault();
//     alert("please enter username");
//     return false;
//   } else if (password.value === "") {
//     event.preventDefault();
//     alert("please enter password");
//     return false;
//   } else if (email.value === "") {
//     event.preventDefault();
//     alert("please enter email");
//     return false;
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const email = document.querySelector("#email");
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");

  form.addEventListener("submit", (event) => {
    let errorMsg = "";

    if (username.value.trim() === "") {
      errorMsg += "Please enter a username.\n";
    }

    if (email.value.trim() === "") {
      errorMsg += "Please enter an email.\n";
    }

    if (password.value.trim() === "") {
      errorMsg += "Please enter a password.\n";
    } else {
      const passwordPattern = /^[A-Za-z0-9]{8}$/;
      if (!passwordPattern.test(password.value)) {
        errorMsg += "Password must be exactly 8 characters long and contain only letters and numbers.\n";
      }
    }

    if (errorMsg !== "") {
      event.preventDefault();
      alert(errorMsg);
    }
  });
});
