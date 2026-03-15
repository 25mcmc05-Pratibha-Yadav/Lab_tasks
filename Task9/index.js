const fetching = async () => {
  const response = await fetch("https://api.countrystatecity.in/v1/countries", {
    headers: {
      "X-CSCAPI-KEY":
        "c65c227da0b1d0690250bbd1cb1b4804306454bdb4babf7a7d74a1796a2d82d7",
    },
  });

  if (response.ok) {
    const countries = await response.json();
    return countries;
  } else {
    console.error("Api is not working");
  }
};

const getStatesByCountry = async (countryCode) => {
  const response = await fetch(
    `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
    {
      headers: {
        "X-CSCAPI-KEY":
          "c65c227da0b1d0690250bbd1cb1b4804306454bdb4babf7a7d74a1796a2d82d7",
      },
    },
  );

  if (response.ok) {
    const states = await response.json();
    console.log(states);
    return states;
  } else {
    console.error("Country not found or no states available");
  }
};

const addCountry = async () => {
  const country = await fetching();

  country.forEach((element) => {
    const option = $("<option>");
    option.val(element.iso2);
    option.text(element.name);
    $("#country").append(option);
  });
};

const addState = async (countryCode) => {
  const state = await getStatesByCountry(countryCode);
  $("#state").empty();
  state.forEach((element) => {
    const option = $("<option>");
    option.val(element.iso2);
    option.text(element.name);
    $("#state").append(option);
  });
};

const validateName = () => {
  const name = $("#name").val();
  if (name.trim().length === 0) {
    $("#nameError").text("Name can't be empty");
    return false;
  }
  for (let i = 0; i < name.length; i++) {
    if (
      !(
        (name[i] >= "a" && name[i] <= "z") ||
        (name[i] >= "A" && name[i] <= "Z")
      )
    ) {
      $("#nameError").text("Incorrect format for name");
      return false;
    }
  }
  $("#nameError").text("");
  return true;
};

const validatePassword = () => {
  const pswd = $("#password").val();
  let length = false;
  let upperCase = false;
  let lowerCase = false;
  let digit = false;
  let specialCase = false;

  if (pswd.length >= 8) {
    length = true ;
    // return true;
  } else {
    $("#passError").text("Password should contain atleast 8 characters");
    return false;
  }

  for (const el of pswd) {
    if (el >= "a" && el <= "z") {
      lowerCase = true;
    } else if (el >= "A" && el <= "Z") {
      upperCase = true;
    } else if (el == "#" || el == "@" || el == "!" || el == "$") {
      specialCase = true;
    } else if (el >= 0 && el <= 9) {
      digit = true;
    }
  }
  if (lowerCase && upperCase && specialCase && digit) {
    $("#passError").text("");
    return true;
  } else {
    $("passError").text("Password should fulfill all the requirements");
    return false;
  }
};

const validateEmail = () => {
  const email = $("#email").val();

  const dotIndex = email.indexOf(".");
  const atTheRateIndex = email.lastIndexOf("@");

  if(email.trim().length === 0){
    $("#emailError").text("Email cannot be empty");
    return false;
  }

  if (dotIndex == -1 || atTheRateIndex == -1) {
    $("#emailError").text("Invalid email");
    return false;
  } else if (dotIndex <=  atTheRateIndex) {
    $("#emailError").text("Invalid email");
    return false;
  }

  $("#emailError").text("");
  
  return true;
};

// const submit = () => {
    
    
// } 

$(document).ready(function () {
  addCountry();
});

$("#country").change(function (e) {
  e.preventDefault();
  const state = $("#country").val();
  console.log(state);
  addState(state);
});

$("#name").on("input", function () {
    validateName()
});

$("#password").on("input",function (){
    validatePassword()
});

$("#email").on("input",function (){
    validateEmail()
});

// $("#submit").on("submit",function (e){
//     e.preventDefault();
    
// });


$("#form").submit(function (e) { 
    e.preventDefault();
    if(validateName() && validateEmail() && validatePassword()){
        alert("sahi kar be")
    }
    else{
        alert("Cannot submit the form");
    }
});



