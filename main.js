$(document).ready(function () {
  //for the accordion functionally
  let accordion = document.getElementsByClassName("accordion");
  let i;
  for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener("click", function () {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
  //   validate form and sending email
  $("#form button").click(function (e) {
    e.preventDefault();
    const phoneInput = document.getElementById("phone");
    const nameInput = document.getElementById("name");
    const name = nameInput.value;
    const phone = phoneInput.value;
    if (name === "") {
      $("#form small").html("מילוי שם הינו חובה");
      return;
    }
    if ($.isNumeric(name)) {
      $("#form small").html("שם חייב  לכלול רק אותיות");
      return;
    }
    if (phone === "") {
      $("#form small").html("אנא הכנס מספר טלפון");
      return;
    }
    if (phone.length < 9) {
      $("#form small").html("אנא הכנס מספר טלפון בעל 9 ספרות לפחות");
      return;
    }
    if (!$.isNumeric(phone)) {
      $("#form small").html("אנא הכנס מספר טלפון תקני");
      return;
    }

    let settings = {
      async: true,
      crossDomain: true,
      url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
      method: "POST",
      headers: {
        "x-rapidapi-host": "rapidprod-sendgrid-v1.p.rapidapi.com",
        "x-rapidapi-key": `${apiKey}`,
        "content-type": "application/json",
        accept: "application/json",
      },
      processData: false,
      data: `{  \"personalizations\": [    {      \"to\": [        {          \"email\": \"ronnizan01@gmail.com\"        }      ],      \"subject\": \"שלום, ${name}\"    }  ],  \"from\": {    \"email\": \"ronnizan01@gmail.com\"  },  \"content\": [    {      \"type\": \"text/plain\",      \"value\": \"בחרת להרשם לקבלת מידע על פסגות  שמך: ${name} מספר פלאפון ${phone}\"    }  ]}`,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      alert("אימייל נשלח בהצלחה");
    });
  });

  //   clearing error message
  $("#form-for-mobile input").keypress(function () {
    $("#form small").html("");
    return;
  });
  //   validate mobile form and sending email

  $("#form-for-mobile button").click(function (e) {
    e.preventDefault();
    const phoneInput = document.getElementById("phone-mobile");
    const nameInput = document.getElementById("name-mobile");
    const name = nameInput.value;
    const phone = phoneInput.value;
    if (name === "") {
      $("#form-for-mobile small").html("מילוי שם הינו חובה");
      return;
    }
    if ($.isNumeric(name)) {
      $("#form-for-mobile small").html("שם חייב  לכלול רק אותיות");
      return;
    }
    if (phone === "") {
      $("#form-for-mobile small").html("אנא הכנס מספר טלפון");
      return;
    }
    if (phone.length < 9) {
      $("#form-for-mobile small").html("אנא הכנס מספר טלפון בעל 9 ספרות לפחות");
      return;
    }
    if (!$.isNumeric(phone)) {
      $("#form-for-mobile small").html("אנא הכנס מספר טלפון תקני");
      return;
    }

    let settings = {
      async: true,
      crossDomain: true,
      url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
      method: "POST",
      headers: {
        "x-rapidapi-host": "rapidprod-sendgrid-v1.p.rapidapi.com",
        "x-rapidapi-key": `${apiKey}`,
        "content-type": "application/json",
        accept: "application/json",
      },
      processData: false,
      data: `{  \"personalizations\": [    {      \"to\": [        {          \"email\": \"ronnizan01@gmail.com\"        }      ],      \"subject\": \"שלום, ${name}\"    }  ],  \"from\": {    \"email\": \"ronnizan01@gmail.com\"  },  \"content\": [    {      \"type\": \"text/plain\",      \"value\": \"בחרת להרשם לקבלת מידע על פסגות  שמך: ${name} מספר פלאפון ${phone}\"    }  ]}`,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      alert("אימייל נשלח בהצלחה");
    });
  });
  //   clearing error message
  $("#form-for-mobile input").keypress(function () {
    $("#form-for-mobile small").html("");
    return;
  });

  //for changing checkbox style on change
  let checks = document.querySelectorAll("input[type='checkbox']");
  let isOverSixtyWithdrawChecked = false;
  let oneTimeDeposit;
  let monthlyDeposit;
  let numberOfSavingsYears;
  for (let i = 0; i < checks.length; i++) {
    let cb = checks[i];
    cb.classList.add("inactive");
    cb.onchange = function (x) {
      this.classList.remove("inactive");
      isOverSixtyWithdrawChecked = !isOverSixtyWithdrawChecked;
      if (!oneTimeDeposit || !monthlyDeposit || !numberOfSavingsYears) {
        return;
      }
      let expectedSavingsBeforeCheckboxCheck =
        monthlyDeposit * numberOfSavingsYears + oneTimeDeposit;
      let expectedSavings = isOverSixtyWithdrawChecked
        ? expectedSavingsBeforeCheckboxCheck +
          expectedSavingsBeforeCheckboxCheck * 0.1
        : expectedSavingsBeforeCheckboxCheck;
      let expectedSavingsInput = document.getElementById("expectedSavings");
      expectedSavingsInput.value = parseFloat(expectedSavings).toFixed(2);
    };
  }
  //handling calculator
  document
    .getElementById("oneTimeDeposit")
    .addEventListener("input", function () {
      $(".calculator-error-msg").html("");

      oneTimeDeposit = this.value;
      let expectedSavingsInput = document.getElementById("expectedSavings");
      if (+oneTimeDeposit > 71337) {
        $(".calculator-error-msg").html("בבקשה הכנס מספר תקני");
        expectedSavingsInput.value = 0;
        return;
      }
      if (!oneTimeDeposit || !monthlyDeposit || !numberOfSavingsYears) {
        let expectedSavingsInput = document.getElementById("expectedSavings");
        expectedSavingsInput.value = 0;
        return;
      }
      let expectedSavingsBeforeCheckboxCheck =
        monthlyDeposit * numberOfSavingsYears + oneTimeDeposit;
      let expectedSavings = isOverSixtyWithdrawChecked
        ? expectedSavingsBeforeCheckboxCheck +
          expectedSavingsBeforeCheckboxCheck * 0.1
        : expectedSavingsBeforeCheckboxCheck;
      expectedSavingsInput.value = expectedSavings;
    });

  document
    .getElementById("monthlyDeposit")
    .addEventListener("input", function () {
      $(".calculator-error-msg").html("");
      let expectedSavingsInput = document.getElementById("expectedSavings");

      monthlyDeposit = this.value;
      if (+monthlyDeposit > 71337) {
        $(".calculator-error-msg").html("בבקשה הכנס מספר תקני");
        expectedSavingsInput.value = 0;
        return;
      }

      if (!oneTimeDeposit || !monthlyDeposit || !numberOfSavingsYears) {
        let expectedSavingsInput = document.getElementById("expectedSavings");
        expectedSavingsInput.value = 0;
        return;
      }
      let expectedSavingsBeforeCheckboxCheck =
        monthlyDeposit * numberOfSavingsYears + oneTimeDeposit;
      let expectedSavings = isOverSixtyWithdrawChecked
        ? expectedSavingsBeforeCheckboxCheck +
          expectedSavingsBeforeCheckboxCheck * 0.1
        : expectedSavingsBeforeCheckboxCheck;
      expectedSavingsInput.value = expectedSavings;
    });
  document
    .getElementById("numberOfSavingsYears")
    .addEventListener("input", function () {
      $(".calculator-error-msg").html("");
      let expectedSavingsInput = document.getElementById("expectedSavings");

      numberOfSavingsYears = this.value;
      if (+numberOfSavingsYears > 70) {
        $(".calculator-error-msg").html("בבקשה הכנס מספר שנים תקני");
        expectedSavingsInput.value = 0;
        return;
      }
      if (!oneTimeDeposit || !monthlyDeposit || !numberOfSavingsYears) {
        let expectedSavingsInput = document.getElementById("expectedSavings");
        expectedSavingsInput.value = 0;
        return;
      }
      let expectedSavingsBeforeCheckboxCheck =
        monthlyDeposit * numberOfSavingsYears + oneTimeDeposit;
      let expectedSavings = isOverSixtyWithdrawChecked
        ? expectedSavingsBeforeCheckboxCheck +
          expectedSavingsBeforeCheckboxCheck * 0.1
        : expectedSavingsBeforeCheckboxCheck;
      expectedSavingsInput.value = expectedSavings;
    });
});
