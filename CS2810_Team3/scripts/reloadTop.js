/*
 * In the case where the user clicks the 'refresh page' button on the browser, 
 * the page is reloaded with its position at the top of the page.
 */
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}