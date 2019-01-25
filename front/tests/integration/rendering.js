const puppeteer = require("puppeteer");
const fs = require("fs");

let testsPassed = true;

const elementSelectors = {
  searchbar: ".v-autocomplete-input",
  searchbarSuggestionItems: ".searchbar-suggestion",
  filmThumbnails: ".film-thumbnail-container"
};

let counter = 0; // used for screenshot indexing

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 1080 });

  const requests = {
    success: {},
    failure: {}
  };

  page.on("requestfinished", req => {
    let code = req.response().status();
    if (!requests.success[code]) {
      requests.success[code] = [];
    }
    requests.success[code].push(req);
  });

  page.on("requestfailed", req => {
    let code = -1;
    if (req.response()) {
      code = req.response().status();
    }
    if (!requests.failure[code]) {
      requests.failure[code] = [];
    }
    requests.failure[code].push(req);
  });

  // Listening for debug logs, to perform specific actions in response
  page.on("console", msg => {
    if (msg.type() === "debug") {
      let debugPoint = JSON.parse(msg.text());
      console.log(`[${debugPoint.action}]  ${debugPoint.description}`);
    }
  });

  await page.goto("http://localhost:8081/").catch(e => {
    console.log("FAILURE: reachingHost > ", e);
    testsPassed = false;
  });
  await page.screenshot({ path: getCaptureFileName() });

  if (testsPassed) {
    await wait(10000);
    await test_filmsFetchedAtStart(page).catch(e => {
      console.error("FAILURE: filmsFetchedAtStart > ", e);
      testsPassed = false;
    });
    await wait(3000);
    await page.screenshot({ path: getCaptureFileName() });
  }


  if (testsPassed) {
    await wait(1000);
    await test_searchFilm(page).catch(e => {
      console.error("FAILURE: searchFilm > ", e);
      testsPassed = false;
    });
    await page.screenshot({ path: getCaptureFileName() });
  }

  if (testsPassed) {
    test_noNetworkError(requests);
    writeDebugFile(requests);
  }

  await browser.close();

  if (testsPassed) {
    console.log("\nReturning with exit code 0 (tests successful)");
    process.exit(0);
  } else {
    console.log("\nReturning with exit code 1 (tests not successful)");
    process.exit(1);
  }
})();

// UTILS FUNCTIONS
function getCaptureFileName() {
  counter++;
  return "capture_" + counter + ".png";
}

async function wait(delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

// TESTS
function test_noNetworkError(requests) {
  let recap = " | ";
  let isError = false;
  for (let code in requests.success) {
    recap += code + ":" + requests.success[code].length + " | ";
  }
  for (let code in requests.failure) {
    isError = true;
    recap += code + ":" + requests.failure[code].length + " | ";
  }
  console.log("network responses" + recap);

  return isError;
}

async function test_searchFilm(page) {
  // 1°) selection
  const searchbar = await page.$(elementSelectors.searchbar);
  if (searchbar) {
    await page.focus(elementSelectors.searchbar);
    await page.type(elementSelectors.searchbar, "dark", { delay: 200 });

    const suggestions = await page.$$(
      elementSelectors.searchbarSuggestionItems
    );
    if (suggestions && suggestions.length > 0) {
      return true;
    } else {
      throw new Error("Searchbar autocomplete not working");
    }
  } else {
    throw new Error("No searchbar found");
  }
}

async function test_filmsFetchedAtStart(page) {
  const films = await page.$$(elementSelectors.filmThumbnails);

  if (films && films.length > 0) {
    return true;
  } else {
    throw new Error("No film thumbnails found");
  }
}

// LOGS
function writeDebugFile(requests) {
  const filename = "debug_" + Date.now() + ".txt";

  const requestsNotCircular = {};

  for (let code in requests.success) {
    requestsNotCircular[code] = [];
    for (let i = 0; i < requests.success[code].length; i++) {
      requestsNotCircular[code].push({
        url: requests.success[code][i].url(),
        method: requests.success[code][i].method(),
        headers: requests.success[code][i].headers(),
        responseCode: requests.success[code][i].response().status(),
        type: requests.success[code][i].resourceType()
      });
    }
  }

  for (let code in requests.failure) {
    requestsNotCircular[code] = [];
    for (let i = 0; i < requests.failure[code].length; i++) {
      requestsNotCircular[code].push({
        url: requests.failure[code][i].url(),
        method: requests.failure[code][i].method(),
        headers: requests.failure[code][i].headers(),
        responseCode: requests.failure[code][i].response().status(),
        type: requests.failure[code][i].resourceType()
      });
    }
  }

  const content = {
    network: requestsNotCircular
  };

  fs.writeFile(filename, JSON.stringify(content), function(err) {
    if (err) {
      return console.log("ERROR WRITING DEBUG FILE ", err);
    }
  });
}
