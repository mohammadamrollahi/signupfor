$(".top-colors div").on("click", function () {
  console.log($(this));
  const b = $(".leftSide").css("background-color");
  $(".leftSide").css("background-color", $(this).css("background-color"));
  $(this).css("background-color", b);
  console.log($(this));
});

let ham = true;
$(".hamburgarMenu").on("click", function () {
  if (ham) {
    $(".leftSide").animate({
      width: "10%",
    });
    $(".rightSide").animate({
      width: "90%",
    });
    $(".leftSideimg").hide(500);
    $(".top-colors").animate({
      width: "37px",
      height: "200px",
    });
    $(".top-colors").css({
      "flex-direction": "column",
    });
    ham = false;
  } else if (!ham) {
    $(".leftSide").animate({
      width: "50%",
    });
    $(".rightSide").animate({
      width: "50%",
    });
    $(".leftSideimg").show(1500);
    $(".top-colors").animate({
      width: "200px",
      height: "37px",
    });
    $(".top-colors").css({
      "flex-direction": "unset",
    });
    ham = true;
  }
});

function showError(input, message) {
  input.css("border-color","red")
  const small =input.next();
  small.text(message)
}

function showSuccess(input) {
  input.css("border-color","green")
  const small =input.next();
  small.text("")
}

function isEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.val().trim())) {
      showSuccess(input);
  } else {
      showError(input, 'Email is not valid');
  }
}

function isEmpty(inputArr) {
  inputArr.forEach(function ( input) {
      if (input.val().trim() === '') {
          showError(input, `${getInputName(input)} is required`);
      } else {
          showSuccess(input);
      }
  });
}

function checkLength(input, min, max) {
  if (input.val().length < min) {
      showError(
          input,
          `${getInputName(input)} must be at least ${min} characters`
      );
  } else if (input.val().length > max) {
      showError(
          input,
          `${getInputName(input)} must be less than ${max} characters`
      );
  } else {
      showSuccess(input);
  }
}

function isMatch(input1, input2) {
  if (input1.val() !== input2.val()) {
      showError(input2, 'Passwords do not match');
  }
}

function getInputName(input) {
  return input.attr("id").charAt(0).toUpperCase() + input.attr("id").slice(1);
}


$("#form :input").each(function () {
  $(this).on("focusout", () => {
      isEmpty([$(this)]);
      if ($(this).attr("id") == "username" || $(this).attr("id") == "password") {
          checkLength($(this), 3, 15);
      } else if ($(this).attr("id") == "email") {
          isEmail($(this));
      } else if ($(this).attr("id") == "password2") {
          isMatch($("#password"), $("#password2"));
      }
  });
});

