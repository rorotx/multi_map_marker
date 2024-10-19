/* eslint-disable no-undef*/

$(document).ready(function () {
  let currentBedroomConfiguration = ""; // Current bedroom configuration
  let allowedValues = []; // Allowed "to" values for the current configuration

  function updateConfiguration() {
    var isStudioBedroomChecked = $(".studiobedroom").hasClass("active");
    var isOneBedroomChecked = $(".onebedroom").hasClass("active");
    var isTwoBedroomChecked = $(".twobedroom").hasClass("active");
    var isThreeBedroomChecked = $(".threebedroom").hasClass("active");

    let bedroomType = "";

    if (isStudioBedroomChecked && isOneBedroomChecked && isTwoBedroomChecked && isThreeBedroomChecked) {
      console.log("studioOneTwoThreeBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val("Studio Bedroom;1 Bedroom; 2 Bedroom; 3 Bedroom");
    }
    else if (isStudioBedroomChecked) {
      console.log("studioBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val("Studio Bedroom");
    }
    else if (isOneBedroomChecked) {
      console.log("oneBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val("1 Bedroom");
    } else if (isTwoBedroomChecked) {
      console.log("twoBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val("2 Bedroom");
    } else if (isThreeBedroomChecked) {
      console.log("threeBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val("3 Bedroom");
    }
    else if (isOneBedroomChecked && isTwoBedroomChecked) {
      console.log("oneTwoBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val(
        "1 Bedroom; 2 Bedroom"
      );
    } else if (isTwoBedroomChecked && isThreeBedroomChecked) {
      console.log("twoThreeBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val(
        "2 Bedroom; 3 Bedroom"
      );
    } else if (isOneBedroomChecked && isThreeBedroomChecked) {
      console.log("oneThreeBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val(
        "1 Bedroom; 3 Bedroom"
      );
    }
    else if (isStudioBedroomChecked && isOneBedroomChecked) {
      console.log("studioOneBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val("Studio Bedroom; 1 Bedroom");
    }
    else if (isStudioBedroomChecked && isTwoBedroomChecked) {
      console.log("studioTwoBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val("Studio Bedroom; 2 Bedroom");
    }
    else if (isStudioBedroomChecked && isThreeBedroomChecked) {
      console.log("studioThreeBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val("Studio Bedroom; 3 Bedroom");
    }
    else if (isStudioBedroomChecked && isOneBedroomChecked && isTwoBedroomChecked) {
      console.log("studioOneTwoBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val("Studio Bedroom; 1 Bedroom; 2 Bedroom");
    }
    else if (isStudioBedroomChecked && isOneBedroomChecked && isThreeBedroomChecked) {
      console.log("studioOneThreeBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val("Studio Bedroom; 1 Bedroom; 3 Bedroom");
    }
    else if (isStudioBedroomChecked && isTwoBedroomChecked && isThreeBedroomChecked) {
      console.log("studioTwoThreeBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val("Studio Bedroom; 2 Bedroom; 3 Bedroom");
    }

    else if (isOneBedroomChecked && isTwoBedroomChecked && isThreeBedroomChecked) {
      console.log("oneTwoThreeBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val(
        "1 Bedroom; 2 Bedroom; 3 Bedroom"
      );
    }
    else {
      console.log("oneTwoThreeBedroom");
      $("#hg__number_of_bedrooms__multiple_choice_").val(
        "1 Bedroom; 2 Bedroom; 3 Bedroom"
      );
    }
  }

  function console.log(bedroomType) {
    console.log('bedroomType', bedroomType);
    const minValues = bedroomConfigurations[bedroomType].map((pair) => pair[0]);
    const minValue = Math.min(...minValues);
    const maxValues = bedroomConfigurations[bedroomType].map((pair) => pair[1]);
    const maxValue = Math.max(...maxValues);
    const firstMaxValue = maxValues[0];

    const fromSlider = document.getElementById("fromSlider");
    const fromOutput = document.getElementById("fromInputValue");
    const toSlider = document.getElementById("toSlider");
    const toOutput = document.getElementById("toInputValue");

    const fromSliderValue = document.getElementById("min_monthly_budget");
    const toSliderValue = document.getElementById("max_monthly_budget");

    // Update the "from" slider and output
    fromSlider.min = minValue;
    fromSlider.value = minValue;
    fromOutput.innerHTML = "£" + minValue;
    fromSliderValue.value = minValue;

    toSlider.setAttribute("max", maxValues.length - 1);
    toSlider.setAttribute("min", 0);
    toSlider.setAttribute("value", maxValues.length - 1);
    toSlider.setAttribute("step", 1);
    toOutput.innerHTML = "£" + maxValues[toSlider.value];
    toSliderValue.setAttribute("value", maxValues[toSlider.value]);
    updateSliderValue();
  }

  function updateSliderValue() {
    const slider = document.getElementById("toSlider");
    const output = document.getElementById("toInputValue");

    let value = slider.value - slider.min;
    let maxDiff = slider.max - slider.min;
    let percent = (value / maxDiff) * 100;

    // Adjust the output position based on slider value
    output.style.left = `calc(${percent}% + (${8 - percent * 0.15}px))`;
  }
  $("#toSlider").on("input change", function () {
    updateConfiguration();
    updateSliderValue();
  });
  // Initial setup
  updateConfiguration();
  $(".form_checkbox_wrapper").on("change", function () {
    $(this).toggleClass("active");
    updateConfiguration();
  });
});
