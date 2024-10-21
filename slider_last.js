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
            setAllowedValues("studioOneTwoThreeBedroom");
            $("#hg__number_of_bedrooms__multiple_choice_").val("Studio;1 Bedroom; 2 Bedroom; 3 Bedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("Studio;1 Bedroom; 2 Bedroom; 3 Bedroom");
        }
        else if (isOneBedroomChecked && isTwoBedroomChecked && isThreeBedroomChecked) {
            setAllowedValues("oneTwoThreeBedroom");
            $("#hg__number_of_bedrooms__multiple_choice_").val("1 Bedroom; 2 Bedroom; 3 Bedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("1 Bedroom; 2 Bedroom; 3 Bedroom");
        }
        else if (isStudioBedroomChecked && isOneBedroomChecked && isTwoBedroomChecked) {
            setAllowedValues("studioOneTwoBedroom");
            $("#hg__number_of_bedrooms__multiple_choice_").val("Studio; 1 Bedroom; 2 Bedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("Studio; 1 Bedroom; 2 Bedroom");
        }
        else if (isStudioBedroomChecked && isOneBedroomChecked && isThreeBedroomChecked) {
            setAllowedValues("studioOneThreeBedroom");
            $("#hg__number_of_bedrooms__multiple_choice_").val("Studio; 1 Bedroom; 3 Bedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("Studio; 1 Bedroom; 3 Bedroom");
        }
        else if (isStudioBedroomChecked && isTwoBedroomChecked && isThreeBedroomChecked) {
            setAllowedValues("studioTwoThreeBedroom");
            $("#hg__number_of_bedrooms__multiple_choice_").val("Studio; 2 Bedroom; 3 Bedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("Studio; 2 Bedroom; 3 Bedroom");
        }
        else if (isStudioBedroomChecked && isOneBedroomChecked) {
            setAllowedValues("studioOneBedroom");
            $("#hg__number_of_bedrooms__multiple_choice_").val("Studio; 1 Bedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("Studio; 1 Bedroom");
        }
        else if (isStudioBedroomChecked && isTwoBedroomChecked) {
            setAllowedValues("studioTwoBedroom");
            $("#hg__number_of_bedrooms__multiple_choice_").val("Studio; 2 Bedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("Studio; 2 Bedroom");
        }
        else if (isStudioBedroomChecked && isThreeBedroomChecked) {
            setAllowedValues("studioThreeBedroom");
            $("#hg__number_of_bedrooms__multiple_choice_").val("Studio; 3 Bedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("Studio; 3 Bedroom");
        }
        else if (isOneBedroomChecked && isTwoBedroomChecked) {
            setAllowedValues("oneTwoBedroom");
            $("#hg__number_of_bedrooms__multiple_choice_").val("1 Bedroom; 2 Bedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("1 Bedroom; 2 Bedroom");
        }
        else if (isTwoBedroomChecked && isThreeBedroomChecked) {
            setAllowedValues("twoThreeBedroom");
            $("#hg__number_of_bedrooms__multiple_choice_").val("2 Bedroom; 3 Bedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("2 Bedroom; 3 Bedroom");
        }
        else if (isOneBedroomChecked && isThreeBedroomChecked) {
            setAllowedValues("oneThreeBedroom");
            $("#hg__number_of_bedrooms__multiple_choice_").val("1 Bedroom; 3 Bedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("1 Bedroom; 3 Bedroom");
        }
        else if (isStudioBedroomChecked) {
            setAllowedValues("studioBedroom");
            $("#hg__number_of_bedrooms__multiple_choice_").val("Studio");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("Studio");
        }
        else if (isOneBedroomChecked) {
            setAllowedValues("oneBedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("1 Bedroom");
        }
        else if (isTwoBedroomChecked) {
            setAllowedValues("twoBedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("2 Bedroom");
        }
        else if (isThreeBedroomChecked) {
            setAllowedValues("threeBedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("3 Bedroom");
        }
        else {
            setAllowedValues("oneThreeBedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("");
            if (window.location.href.includes("kimmerston")) {
            setAllowedValues("studioBedroom");
            $("[id*='__number_of_bedrooms__multiple_choice_']").val("Studio");
            }
        }

    }

    function setAllowedValues(bedroomType) {
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
    setTimeout(function () {
        updateConfiguration();
    }, 100);
    
   
    $(".form_checkbox_wrapper").on("change", function () {
        $(this).toggleClass("active");
        updateConfiguration();
    });
});
