/**
 * Used to add a numeric id on slide creation to let us target the element later
 * 
 * @var int
 */
var slide_no = 0;

/**
 * Tells us which slide we are on
 * 
 * @var int
 */
var current_slide_no = 0;

/**
 * An Array to hold all the slides
 * 
 * @var int
 */
var ary_slides = [];


/**
 * Create a custom slide object
 * 
 * @param title string slide title
 * @param subtitle string slide description
 * @param background_img url background image url
 * @param link url
 * @param status boolean
 * 
 * @return void
 */
function Slide(title, subtitle, background_img, link, status ) {
	this.title = title;
	this.subtitle = subtitle;
	this.background_img = background_img;
	this.link = link;
	this.status = status;
	this.id = "slide" + slide_no;

	// Add one to the index for the next slide number
	slide_no++;

	ary_slides.push(this);
}

/** Initialize the slides by calling the slide objects */
new Slide(
	"First slide", 
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 
	"https://source.unsplash.com/1600x900/?nature", 
	"https://source.unsplash.com/1600x900/?cycle",
	1
);
new Slide(
	"Second slide", 
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 
	"https://source.unsplash.com/1600x900/?road", 
	"https://source.unsplash.com/1600x900/?bike",
	0
);
new Slide(
	"Third slide", 
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 
	"https://source.unsplash.com/1600x900/?building", 
	"https://source.unsplash.com/1600x900/?cars"
);


/**
 * Create HTML for slides and display on a webpage
 * 
 * @return void
 */
function init_carousel(){

	// A variable to hold all our HTML
	var carousel = '';

	ary_slides.forEach(function( slide ) {

		carousel += '<div id="' + slide.id + '" class="slide ' + (slide.status === 1 ? 'slide-in-right' : 'slide-out-right') + '" style="background-image: url(' + slide.background_img + ')">';
			carousel += '<div class="overlay">';
				carousel += '<div class="item">';
					carousel += '<h1>' + slide.title + '</h1>';
					carousel += '<h4>' + slide.subtitle + '</h4>';
					carousel += '<a href="' + slide.link + '" target="_blank">Read More &raquo;</a>';
				carousel += '</div>';
			carousel += '</div>';
		carousel += '</div>';

	});

	// next/previous control
	carousel += '<div id="controls">';
		carousel += '<a id="prev" onclick="prev();">&laquo;</a>';
		carousel += '<a id="next" onclick="next();">&raquo;</a>';
	carousel += '</div>';
	
	document.getElementById('carousel').innerHTML = carousel;
		
	// Display the first slide
	document.getElementById("slide" + current_slide_no).style.left = 0;

}
init_carousel();

// Navigates to the previous slide in the list
function prev(){

	// Figure out what the previous slide is
	var next_slide_no;

	// If we are at zero go to the last slide in the list
	if (current_slide_no === 0 ) next_slide_no = ary_slides.length - 1;
	else next_slide_no = current_slide_no - 1; // Otherwise the next one is this slide minus 1
	
	// Setup the next slide and current slide for animations
	document.getElementById("slide" + next_slide_no).style.left = "-100%";
	document.getElementById("slide" + current_slide_no).style.left = 0;
	
	// Add the appropriate animation class to the slide
	document.getElementById("slide" + next_slide_no).setAttribute("class", "slide slide-in-left");
	document.getElementById("slide" + current_slide_no).setAttribute("class", "slide slide-out-right");
	
	// Set current slide to the new current slide
	current_slide_no = next_slide_no;
}


// Navigates to the next slide in the list
function next(){

	// Figure out what the next slide is
	var next_slide_no;

	// If we are at the last slide the next one is the first (zero based)
	if (current_slide_no === (ary_slides.length - 1) ) next_slide_no = 0;
	else next_slide_no = current_slide_no + 1; // Otherwise the next slide is the current one plus 1
	
	// Setup the next slide and current slide for animations
	document.getElementById("slide" + next_slide_no).style.left = "100%";
	document.getElementById("slide" + current_slide_no).style.left = 0;
	
	// Add the appropriate animation class to the slide
	document.getElementById("slide" + next_slide_no).setAttribute("class", "slide slide-in-right");
	document.getElementById("slide" + current_slide_no).setAttribute("class", "slide slide-out-left");
	
	// Set current slide to the new current slide
	current_slide_no = next_slide_no;
}
