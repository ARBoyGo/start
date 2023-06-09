// grabs all links from the shortcuts
const uiNames = document.querySelectorAll("a[href]");
const uiNamesarr = Array.from(uiNames);

let objOfLinks = [];
objOfLinks = uiNamesarr.map((item) => {
  return { name: item.firstChild.data, link: item.attributes.href.nodeValue };
});

let arrOfNames = [];
objOfLinks.forEach((e) => {
  arrOfNames.push(e.name);
});

// if the input search has a similar pattern it takes you to that website
document.querySelector(".search-form").addEventListener("keydown", function (e) {
  let keyCode = e.keyCode || e.which; // runs when user presses "enter" key
  if (keyCode === 13) {
    const userInput = document.querySelector(".search-form").value; // grabs what user typed

    // Check if the user input is a valid website address
    if (isValidWebsiteAddress(userInput)) {
      let linkToOpen = userInput;
      if (!linkToOpen.startsWith("http")) {
        linkToOpen = "https://" + linkToOpen;
      }
      window.open(linkToOpen, "_self");
      return;
    }

    const match = arrOfNames.find((name) => {
      const lowercaseName = name.toLowerCase();
      const lowercaseInput = userInput.toLowerCase();

      if (lowercaseName.includes(lowercaseInput) && lowercaseInput.length >= 3) {
        return true;
      }
    });

    let linkToOpen = false;
    objOfLinks.forEach((e) => {
      if (match === e.name) {
        linkToOpen = e.link;
      }
    });

    if (linkToOpen) {
      window.open(linkToOpen, "_self");
    } else {
      const baseLink = "http://search.in.projectsegfau.lt/search?q=";
      const link = baseLink.concat(userInput);
      console.log(link);
      window.open(link, "_self");
    }
  }
}, false);

// Function to check if a string is a valid website address
function isValidWebsiteAddress(address) {
  return address.includes(".");
}
