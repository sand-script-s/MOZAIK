/*
This JavaScript is used to determine the aspect ratios of the various content posts.
To use this script, first make sure that you remove the current stylesheet for the html page's posts ratios.
There should already be no paddings or margins added to the post divs via CSS rules.
And also remember to add this script into the html.
Simply load the webpage and this JavaScript should run and ask you to save a CSS file to your harddrive.
That CSS file can then be added to the html collage, and this script removed, never needing to be ran again.

Note that the actual results you get will vary slightly from system to system as each have unique resolutions and settings.
My official conversions were done on a system with a 1920x1080 resolution and a browser window section of 1536.67 * 777.5 CSS pixels,
and a device pixel ratio (DPR) of 1.2.
 */

const constPostPadding = 6; //This constant defines how much space is added automatically at the end of each post
const constUnitsPerPost = 8; //This constand defines how many units (filmreel holes) each standard YouTube section is divided into

// Ensure the function runs after the page and all images have loaded
window.onload = runMain;

function runMain() {

    // This is the main function
    const ytStdArr = getStandardYTSize();
    const unitHeight = calcUnit(ytStdArr);
    const postHeightsArr = getPostHeights();
    const spacingArr = getPostSpacings();
    const standardisedPostHeightsArr = standardisePostHeights(postHeightsArr, unitHeight, ytStdArr[1], spacingArr);
    const standardisedRatioArr = calculateRatios(standardisedPostHeightsArr, ytStdArr);

    writeRatioCSS(standardisedRatioArr);

}


//-------------------------------functions-------------------------------


// This function records the height and width (in CSS pixels) of a post with only a standard YouTube video frame in it with some bottom-padding added.
// The numbers you get may change depending on your actual monitor size and settings.
function getStandardYTSize() {

    // Find the first div with class 'ytstandard'
    const ytBlock = document.querySelector('.ytstandard');

    if (ytBlock) {

        // Get the height and width of the div using getBoundingClientRect
        const rect = ytBlock.getBoundingClientRect();
        const ytBlockHeight = rect.height;
        const ytBlockWidth = rect.width;

        const ytStandardHeight = ytBlockHeight + constPostPadding;

        return [ytBlockWidth, ytStandardHeight];

    } else {

        console.log('No Divs with the class ytstandard found.');
        return null; // Return null to indicate no div was found

    }

}


// This function calculates the height (in CSS pixels) of a single unit that will contain one filmreel hole on the side.
function calcUnit(ytStandards) {

    var trackLength = ytStandards[1] / constUnitsPerPost; // divides the height of the standard div with the number of filmreel holes that will occupy the side of the div.
    return trackLength;

}


// This function retrieves every 'Post' div's height and also marks if it is a YTStandard post or not.
function getPostHeights() {

    let heights = []; // Initialize an empty array to hold heights

    const postDivs = document.querySelectorAll('.fitted');

    // Loop through each selected element and get its height
    postDivs.forEach((div, index) => {

        let box = div.getBoundingClientRect();
        let couplet = [];

        if (index == 0) { // If it is the header block
            box.height = 1; // Ignore preset height determined by font-size etc.
        }

        if (div.classList.contains('ytstandard')) {
            couplet = [1, box.height + constPostPadding];
        }
        else {
            couplet = [0, box.height + constPostPadding];
        }

        heights.push(couplet); // Append the height of each div to the heights array

    });

    return heights;

}


// Function to check if an element has a class starting with 'addspacing-'
function hasSpacingClass(element) {

    return Array.from(element.classList).some(cls => cls.startsWith('addspacing-'));

}


// Function to extract the number from the 'addspacing-' class
function getSpacingNumber(element) {

    const spacingClass = Array.from(element.classList).find(cls => cls.startsWith('addspacing-'));

    if (spacingClass) {
        return parseInt(spacingClass.split('-')[1], 10);
    }

    return null;

}


// This Function creates an array that contains every post's additional spacing number, 0 for none.
function getPostSpacings() {

    const elements = document.querySelectorAll('.fitted');
    let spacingArray = []; // Initialize spacingArray as an empty array

    elements.forEach(element => {

        let spacingNumber;
        if (hasSpacingClass(element)) {
            spacingNumber = getSpacingNumber(element);
        }
        else {
            spacingNumber = 0;
        }

        spacingArray.push(spacingNumber);

    });

    return spacingArray;

}


// This function takes an array of heights and standardises them to the nearest unit lenght up, in order to keep the filmreel holes on the side aligned.
function standardisePostHeights(inputArr, unitHeight, ytStandardHeight, spacingArray) {

    let standardisedHeights = [];

    inputArr.forEach((heightelement, index) => {

        let couplet;
        let stdCouplet = [1, ytStandardHeight];

        // See if this is a 'ytstandard' ratio, if so skip the calculations.
        if (heightelement[0] == 1) {
            standardisedHeights.push(stdCouplet);
        }
        else {
            // Calculate the nearest multiple of unitHeight by rounding
            
            var standardisedSingleHeight = (Math.ceil(heightelement[1] / unitHeight)) * unitHeight;
            standardisedSingleHeight += (spacingArray[index] * (unitHeight - 0.0001));

            couplet = [0, standardisedSingleHeight];
            standardisedHeights.push(couplet);
        }

    });

    return standardisedHeights;

}


// Greatest Common Divisor (GCD) function
function greatestCommonDivisor(a, b) {

    if (!b) {
        return a;
    }

    // Recursive call to find the GCD
    return greatestCommonDivisor(b, a % b);
}


// A Function to Simplify Ratios
function simplifyRatio(ratioArray) {

    let numerator = ratioArray[0];
    let denominator = ratioArray[1];
    
    // Calculate the greatest common divisor (GCD) of the numerator and denominator
    let divisor = greatestCommonDivisor(numerator, denominator);

    // Return the simplified ratio as an array [numerator/divisor, denominator/divisor]
    return [numerator / divisor, denominator / divisor].map(Math.floor);
}


// This function calculates the ratios for every post.
function calculateRatios(heightArr, ytStandards) {

    let ratioArr = [];
    let currentRatio = [];
    let ytStdRatio = simplifyRatio([Math.round(ytStandards[0] * 100), Math.round(ytStandards[1] * 100)]);
    var width = ytStandards[0];

    heightArr.forEach(height => {

        // See if this is a 'ytstandard' ratio, if so skip the calculations.
        if (height[0] == 1) {
            ratioArr.push(ytStdRatio)
        }
        else {
            currentRatio = simplifyRatio([Math.round(width * 100), Math.round(height[1] * 100)]);
            ratioArr.push(currentRatio);
        }

    });

    return ratioArr;

}


// This function writes the ratios into a CSS file that it then prompts the user to download it.
function writeRatioCSS(ratioArr) {

    let cssContent = '';

    ratioArr.forEach((ratio, index) => {

        if (index == 0) {
            cssContent += `.header-block {\n`;
            cssContent += `\taspect-ratio: ${ratio[0]} / ${ratio[1]};\n`;
            cssContent += `}\n\n`;
        }
        else {
            cssContent += `#post_${index} {\n`;
            cssContent += `\taspect-ratio: ${ratio[0]} / ${ratio[1]};\n`;
            cssContent += `}\n\n`;
        }

    });

    // Create a Blob from the CSS content
    const blob = new Blob([cssContent], { type: 'text/css' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'collage-ratios.css';

    // Append the anchor to the body (required for some browsers)
    document.body.appendChild(a);

    // Trigger the download
    a.click();

    // Clean up by removing the anchor and revoking the URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
}
    