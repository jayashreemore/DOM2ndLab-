//PART ----II-----Creating a Menu Bar
var menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog', href: '#', subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ]
  },
  {
    text: 'orders', href: '#', subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ]
  },
  {
    text: 'account', href: '#', subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ]
  },
];
//Part--I--Select and cache the <main> element in a variable named mainEl.
// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
// Add a class of flex-ctr to mainEl.
const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add("flex-ctr");
// Part----II----Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
// Set the height of the topMenuEl element to be 100%.
// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
// Add a class of flex-around to topMenuEl.
const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add("flex-around");
// Part-------III--IV-V

const nav = document.querySelector('nav')
menuLinks.forEach((item) => {
  newItem = document.createElement('a');
  newItem.textContent = item.text;
  newItem.href = item.href;
  nav.appendChild(newItem);
  console.log(newItem)
})
//Part 2 -part 3 creating Submenu//
// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
// Set the height subMenuEl element to be "100%".
// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
// Add the class of flex-around to the subMenuEl element.
const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";
const topMenuLinks = document.querySelectorAll('a');

// Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
// Attach a delegated 'click' event listener to topMenuEl.
// The first line of code of the event listener function should call the event object's preventDefault() method.
// The second line of code of the function should immediately return if the element clicked was not an <a> element.
// Log the content of the <a> to verify the handler is working.
// The event listener should add the active class to the <a> element that was clicked, unless it was already active, in which case it should remove it.
// The event listener should remove the active class from each other <a> element in topMenuLinks - whether the active class exists or not.

topMenuEl.addEventListener("click", (event) => {
  event.preventDefault();
  // Check if the clicked element is an <a> tag and does not have class "active"
  if (event.target.tagName.toLowerCase() === 'a' && !event.target.classList.contains('active')) {
    // Remove "active" class from all links
    topMenuLinks.forEach(link => link.classList.remove('active'));
    // Add "active" class to the clicked link
    event.target.classList.add("active");
    // Check if the corresponding item in menuLinks has subLinks
    const index = Array.from(topMenuLinks).indexOf(event.target);
    if (index >= 0 && menuLinks[index].subLinks) {
      // Set the CSS top property of subMenuEl to 100%
      subMenuEl.style.top = "100%";
      // Build submenu based on the clicked link's subLinks
      buildSubmenu(menuLinks[index].subLinks);
    }
  }
  else {
    // If there are no subLinks, hide the sub menu
    subMenuEl.style.top = "0";
  }
});
function buildSubmenu(subLinks) {
  // Clear the current contents of subMenuEl
  subMenuEl.innerHTML = '';
  // Iterate over the subLinks array adding subMenuItems to subMenu
  subLinks.forEach(link => {
    const subMenuItem = document.createElement('a');
    subMenuItem.href = link.href;
    subMenuItem.textContent = link.text;
    subMenuEl.appendChild(subMenuItem);
  });
}
// Within the event listener, if the clicked <a> element does not yet have a class of "active" (it was inactive when clicked):
// If the clicked <a> element's "link" object within menuLinks has a subLinks property (all do, except for the "link" object for ABOUT), set the CSS top property of subMenuEl to 100%.
// Otherwise, set the CSS top property of subMenuEl to 0.
// Clear the current contents of subMenuEl.
// Iterate over the subLinks array, passed as an argument, and for each "link" object:
// Create an <a> element.
// Add an href attribute to the <a>, with the value set by the href property of the "link" object.
// Set the element's content to the value of the text property of the "link" object.
// Append the new element to the subMenuEl.
// Attach a delegated 'click' event listener to subMenuEl
subMenuEl.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.tagName.toLowerCase() !== 'a') {
    return ;
  }
  console.log(event.target.textContent);
  // Set the CSS top property of subMenuEl to 0
  subMenuEl.style.top = '0';
  // Remove the active class from each <a> element in topMenuLinks
  topMenuLinks.forEach(link => link.classList.remove('active'));
  // Update the contents of mainEl within an <h1> to the contents of the <a> element clicked within subMenuEl
  mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
});


