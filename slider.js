/* eslint-disable no-undef*/

$(document).ready(function () {
    let currentBedroomConfiguration = ""; // Current bedroom configuration
    let allowedValues = []; // Allowed "to" values for the current configuration
  
    function updateConfiguration() {
      const isOneBedroomChecked = $(".onebedroom").hasClass("active");
      const isTwoBedroomChecked = $(".twobedroom").hasClass("active");
      const isThreeBedroomChecked = $(".threebedroom").hasClass("active");
  
      let bedroomType = "";
      if (isOneBedroomChecked && isTwoBedroomChecked && isThreeBedroomChecked) {
        setAllowedValues("oneTwoThreeBedroom");
        $("#hg__number_of_bedrooms__multiple_choice_").val(
          "1 Bedroom; 2 Bedroom; 3 Bedroom"
        );
      } else if (isOneBedroomChecked && isTwoBedroomChecked) {
        setAllowedValues("oneTwoBedroom");
        $("#hg__number_of_bedrooms__multiple_choice_").val(
          "1 Bedroom; 2 Bedroom"
        );
      } else if (isTwoBedroomChecked && isThreeBedroomChecked) {
        setAllowedValues("twoThreeBedroom");
        $("#hg__number_of_bedrooms__multiple_choice_").val(
          "2 Bedroom; 3 Bedroom"
        );
      } else if (isOneBedroomChecked && isThreeBedroomChecked) {
        setAllowedValues("oneThreeBedroom");
        $("#hg__number_of_bedrooms__multiple_choice_").val(
          "1 Bedroom; 3 Bedroom"
        );
      } else if (isOneBedroomChecked) {
        setAllowedValues("oneBedroom");
        $("#hg__number_of_bedrooms__multiple_choice_").val("1 Bedroom");
      } else if (isTwoBedroomChecked) {
        setAllowedValues("twoBedroom");
        $("#hg__number_of_bedrooms__multiple_choice_").val("2 Bedroom");
      } else if (isThreeBedroomChecked) {
        setAllowedValues("threeBedroom");
        $("#hg__number_of_bedrooms__multiple_choice_").val("3 Bedroom");
      } else {
        setAllowedValues("oneTwoThreeBedroom");
        $("#hg__number_of_bedrooms__multiple_choice_").val(
          "1 Bedroom; 2 Bedroom; 3 Bedroom"
        );
      }
    }
  
    function setAllowedValues(bedroomType) {
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
      fromOutput.innerHTML = "Â£" + minValue;
      fromSliderValue.value = minValue;
  
      toSlider.setAttribute("max", maxValues.length - 1);
      toSlider.setAttribute("min", 0);
      toSlider.setAttribute("value", maxValues.length - 1);
      toSlider.setAttribute("step", 1);
      toOutput.innerHTML = "Â£" + maxValues[toSlider.value];
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
