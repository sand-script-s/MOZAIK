const constUnitsPerPost = 8; //This constand defines how many units (filmreel holes) each standard YouTube section is divided into

//Grab elements as constants
const filmSideSection = document.querySelector('.film-perforations');
const filmLongContentContainer = document.querySelector('.snug-middle-content');

// Get the SVG elements
const filmSVG = document.querySelectorAll('.filmstrip-SVG');
const patternSVG = document.querySelectorAll('.filmstrip-pattern');

const svg_HoleShapeElement_Left = document.querySelector('#filmstrip-holeshape-left');
const svg_HoleShapeElement_Right = document.querySelector('#filmstrip-holeshape-right');


// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', measureNFit);

// Add event listener for resize
window.addEventListener('resize', measureNFit);


// -----This is the main function that runs after the DOM has loaded, and also upon a window resize-----
function measureNFit() {

    const sidestripWidth = getSidestripWidth();
    const filmstripHeight = getFilmstripHeight();
    const ytStdDims = getStandardYTSize();
    const unitHeight = calcUnit(ytStdDims);
    const svgPropsArray = determineSVGProperties(sidestripWidth, filmstripHeight, unitHeight);
    changeSVGProperties(svgPropsArray);

}


//-------------------------------functions---------------------------------


// Get the height of the long content container
function getSidestripWidth() {

    const sidestripDimensions = filmSideSection.getBoundingClientRect();
    const sidestripWidth = sidestripDimensions.width;

    return sidestripWidth;
}


// Get the height of the long content container
function getFilmstripHeight() {

    const filmstripLongDimensions = filmLongContentContainer.getBoundingClientRect();
    const filmstripLongHeight = filmstripLongDimensions.height;

    return filmstripLongHeight;
}


// This function records the height and width (in CSS pixels) of a post with only a standard YouTube video frame in it with some bottom-padding added.
function getStandardYTSize() {

    // Find the first div with class 'ytstandard'
    const ytBlock = document.querySelector('.ytstandard');

    //filmGridContainer.offsetWidth; // This will trigger a reflow

    if (ytBlock) {
        // Get the height and width of the div using getBoundingClientRect
        const rect = ytBlock.getBoundingClientRect();
        return [rect.width, rect.height];

    } else {
        console.log('No Divs with the class ytstandard found.');
        return null; // Return null to indicate no div was found
    }

}


// This function calculates the height (in CSS pixels) of a single unit that will contain one filmreel hole on the side.
function calcUnit(ytStandards) {

    const trackLength = ytStandards[1] / constUnitsPerPost; // divides the height of the standard div with the number of filmreel holes that will occupy the side of the div.
    return trackLength;

}


function determineSVGProperties(sidestripMeasurement, filmstripContentLong, unitMeasurement) {

    const viewportHeight = filmstripContentLong;

    const viewBoxWidth = sidestripMeasurement;
    const viewBoxHeight = unitMeasurement;

    const rectHeight = viewBoxHeight / 100 * 38; // 38%
    const rectWidth = viewBoxWidth / 100 * 46; //46%

    const rectXStart_Left = (viewBoxWidth - rectWidth) * 0.56; // 0.5 would place the hole in the middle of the sidestrip
    const rectXStart_Right = (viewBoxWidth - rectWidth) * 0.44;

    const rectYStart = (viewBoxHeight - rectHeight) * 0.35;

    const rectRY = rectHeight / 4;
    const rectRX = rectRY;

    // How many trackUnits
    //const numberOfTracks = Math.round(viewportHeight / viewBoxHeight);
    //const multipliedViewBoxHeight = mappedViewBoxHeight * numberOfTracks;

    return [viewportHeight, viewBoxWidth, viewBoxHeight, rectHeight, rectWidth, rectXStart_Left, rectXStart_Right, rectYStart, rectRY, rectRX];

}


function changeSVGProperties(propertiesArray) {

    let viewportHeight = propertiesArray[0];
    let viewportWidth = propertiesArray[1];

    let viewBoxWidth = propertiesArray[1];
    let viewBoxHeight = propertiesArray[2];

    let rectHeight = propertiesArray[3];
    let rectWidth = propertiesArray[4];

    let rectXStart_Left = propertiesArray[5];
    let rectXStart_Right = propertiesArray[6];
    let rectYStart = propertiesArray[7];

    let rectRY = propertiesArray[8];
    let rectRX = propertiesArray[9];

    // Scale all the properties to make calculations easier on the computer.

    /*viewportHeight = viewportHeight / 4;
    viewportWidth = viewBoxWidth / 4;
    viewBoxWidth = viewBoxWidth / 4;
    viewBoxHeight = viewBoxHeight / 4;
    rectHeight = rectHeight / 4;
    rectWidth = rectWidth / 4;
    rectXStart_Left = rectXStart_Left / 4;
    rectXStart_Right = rectXStart_Right / 4;
    rectYStart = rectYStart / 4;
    rectRY = rectRY / 4;
    rectRX / 4;*/

    // Set the attributes using the variables
    filmSVG.forEach(element=> { 
        element.setAttribute('viewBox', `${0} ${0} ${viewportWidth} ${viewportHeight}`);
    });

    patternSVG.forEach(element=> { 
        element.setAttribute('width', viewBoxWidth);
        element.setAttribute('height', viewBoxHeight);
    });

    svg_HoleShapeElement_Left.setAttribute('x', rectXStart_Left);
    svg_HoleShapeElement_Left.setAttribute('y', rectYStart);
    svg_HoleShapeElement_Left.setAttribute('width', rectWidth);
    svg_HoleShapeElement_Left.setAttribute('height', rectHeight);
    svg_HoleShapeElement_Left.setAttribute('rx', rectRX);
    svg_HoleShapeElement_Left.setAttribute('ry', rectRY);

    svg_HoleShapeElement_Right.setAttribute('x', rectXStart_Right);
    svg_HoleShapeElement_Right.setAttribute('y', rectYStart);
    svg_HoleShapeElement_Right.setAttribute('width', rectWidth);
    svg_HoleShapeElement_Right.setAttribute('height', rectHeight);
    svg_HoleShapeElement_Right.setAttribute('rx', rectRX);
    svg_HoleShapeElement_Right.setAttribute('ry', rectRY);

    return;

}


//-------------------------------------------------------------------------
    