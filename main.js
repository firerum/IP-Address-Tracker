const button = document.querySelector("#btn");


window.addEventListener("load", displayData);

function processIpData(resource) {
   // Create new promise. 
   return new Promise((resolve, reject) => {

      // Create new XMLHttp object
      const request = new XMLHttpRequest();
      request.open("GET", resource);
      request.addEventListener("readystatechange", rawData);

      // Handle the data from the end point
      function rawData() {
         if(request.readyState == 4 && request.status == 200) {
            const data = JSON.parse(request.responseText);
            resolve(data);
         } else if(request.readyState == 4) {
            reject("Data error: Unable to fetch data");
         }
      }
      request.send();
   });
}

// Put data into the webpage 
function displayData() {
   const wrongData = document.querySelector("p");
   const IpAddress = document.querySelector(".address");
   const location = document.querySelector(".location");
   const timeZone= document.querySelector(".time-zone");
   const serviceProvider= document.querySelector(".isp");
   const country= document.querySelector(".country");
   const userInput = document.querySelector("#ip").value;
   const api = `https://geo.ipify.org/api/v1?apiKey=at_Y3y5ARZsCJPGxt9VZnRPmRWe8dwci&ipAddress=${userInput}`;

   // Get the data
   processIpData(api)
      .then(data => {
         console.log(data);
         location.innerHTML = `<span class="title">LOCATION</span> <span>${data.location.city}, ${data.location.region}</span>`;
         IpAddress.innerHTML = `<span class="title">IP ADDRESS</span><span>${data.ip}</span>`;
         timeZone.innerHTML = `<span class="title">TIMEZONE</span><span>${data.location.timezone}</span>`;
         serviceProvider.innerHTML = `<span class="title">ISP</span><span>${data.isp}</span>`;
         country.innerHTML = `<span class="title">COUNTRY</span><span>${data.location.country}</span>`;
      })
      .catch(err => {
         wrongData.textContent = "Something went wrong. " + err;
         console.log("something went wrong:", err);
      });
}

// Function to set up the user map
function mapDisplay() {
   var mymap = L.map('mapid').setView([51.505, -0.09], 13);
   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: "pk.eyJ1IjoiZmlyZXJ1bSIsImEiOiJja2lxc2hnaXIwNHZmMnJuNDJnbjA4YXExIn0.yU4hTgG6qJ2p2Sye3IaLAw"
   }).addTo(mymap);
}

mapDisplay();

button.addEventListener("click", displayData);

