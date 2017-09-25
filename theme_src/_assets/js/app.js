import './modules';

import { u } from "umbrellajs";
const validate = require("validate");
const SmoothScroll = require("smooth-scroll");


/**
 * adds basic form validation
 */

validate.init();

/** scroll to top */

const screenHeight = window.innerHeight;
const toTop = u(".back-to-top");

onscroll = () => {

  if(scrollY >= screenHeight) {
	 toTop.removeClass("hide");
  } else {
	toTop.addClass("hide");
  }

}

/** smooth scroll */


const scroll = new SmoothScroll('a[href*="#"]', {

 after: () => console.log("scrolling")

});



