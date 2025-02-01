const hamburgerdiv = document.getElementById('hamburgerdiv');
const sliderdiv = document.getElementById('sliderdiv');

const toplinespan = document.getElementById('toplinespan');
const middlelinespan = document.getElementById('middlelinespan');
const bottomlinespan = document.getElementById('bottomlinespan');

let displayswitch = 0;

let initialLoadHandled = false;

hamburgerdiv.addEventListener('click', event => {
    
    if (displayswitch === 1) {
        sliderdiv.classList.remove('slider-visible');
        sliderdiv.classList.add('slider-hidden');
        displayswitch = 0;

        toplinespan.classList.remove('top_line-state-2');
        toplinespan.classList.add('top_line-state-1');
        middlelinespan.classList.remove('middle_line-state-2');
        middlelinespan.classList.add('middle_line-state-1');
        bottomlinespan.classList.remove('bottom_line-state-2');
        bottomlinespan.classList.add('bottom_line-state-1');

    } else {
        sliderdiv.classList.remove('slider-hidden');
        sliderdiv.classList.add('slider-visible');
        displayswitch = 1;

        toplinespan.classList.remove('top_line-state-1');
        toplinespan.classList.add('top_line-state-2');
        middlelinespan.classList.remove('middle_line-state-1');
        middlelinespan.classList.add('middle_line-state-2');
        bottomlinespan.classList.remove('bottom_line-state-1');
        bottomlinespan.classList.add('bottom_line-state-2');
    }

});

//------------------------------------------------------------------------------------------

// Function to check screen width and adjust menu accordingly
function adjustMenuBasedOnScreenWidth() {
    const screenWidth = window.innerWidth; // Get current screen width
    const thresholdWidth = 880; // Define the threshold width

    if (screenWidth > thresholdWidth && initialLoadHandled == false) {
        // Open the menu and adjust the hamburger icon if screen width is more than the threshold
        sliderdiv.classList.add('no-animation');

        sliderdiv.classList.remove('slider-hidden');
        sliderdiv.classList.add('slider-visible');

        toplinespan.classList.remove('top_line-state-1');
        toplinespan.classList.add('top_line-state-2');
        middlelinespan.classList.remove('middle_line-state-1');
        middlelinespan.classList.add('middle_line-state-2');
        bottomlinespan.classList.remove('bottom_line-state-1');
        bottomlinespan.classList.add('bottom_line-state-2');

        displayswitch = 1; // Update the switch to reflect the open state
        initialLoadHandled = true;

        globalThis.setTimeout(() => {
            sliderdiv.classList.remove('no-animation');
        }, 100);

    }
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', adjustMenuBasedOnScreenWidth);

//------------------------------------------------------------------------------------------

$(document).ready(function(){

    // jquery function to toggle sub menus on click
    $('.sub-button').click(function() {
        $(this).next('.sub-menu').slideToggle();
        $(this).find('.svgprop').toggleClass('rotate');
    })

    // Function to open specific sub-menus on page load based on page ID
    function openSubMenu(pageId, subMenuIndex) {
        if ($('body').attr('id') === pageId) {
            // subMenuIndex is optional, if you have multiple sub-menus and want to target a specific one
            // If not provided, it defaults to the first sub-menu
            var subMenuSelector = (subMenuIndex!== undefined)? `.sub-button:eq(${subMenuIndex})` : `.sub-button:first`;
            $(subMenuSelector).next('.sub-menu').slideDown(); // Use slideDown to show, not slideToggle
            $(subMenuSelector).find('.svgprop').addClass('rotate'); // Add the rotate class
        }
    } 

    openSubMenu('invitationpage', 0); // Opens the first sub-menu on the homepage
    openSubMenu('returnpage', 0);
    openSubMenu('sunsetpage', 0);
    openSubMenu('tangentialpage', 0);
    openSubMenu('podpage', 0);
    openSubMenu('windsweptpage', 0);
    openSubMenu('echopage', 0);

})
