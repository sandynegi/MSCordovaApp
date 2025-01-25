/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("deviceready").classList.add("ready");

  console.log("Cordova is ready!");

  const fetchButton = document.getElementById("fetchButton");
  const itemList = document.getElementById("itemList");

  // Function to fetch data from an API
  async function fetchData() {
    try {
      // Replace this with your actual API endpoint
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      // Clear existing items
      itemList.innerHTML = "";

      // Populate list with data from API
      data.slice(0, 10).forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item.name; // Replace with appropriate field from your API
        itemList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Check the console for details.");
    }
  }

  // Attach click event to fetchButton
  fetchButton.addEventListener("click", fetchData);

  window.addEventListener("batterystatus", dummyBatteryFunc);
  window.removeEventListener("batterystatus", dummyBatteryFunc);

  window.addEventListener("batterystatus", onBatteryStateChange, false);

  function dummyBatteryFunc() {}

  function onBatteryStateChange(status) {
    const batterContainer = document.getElementById("battery-container");
    const battery = document.createElement("p");
    const bLevel = document.createElement("span");
    bLevel.textContent = "Battery level: " + status.level;

    const bPlugged = document.createElement("span");
    bPlugged.textContent = "isPlugged: " + status.isPlugged;

    battery.append(bLevel);
    battery.append(document.createElement("br"));
    battery.append(bPlugged);

    batterContainer.append(battery);
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
  }

  const locationContainer = document.getElementById("location-container");
  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        locationContainer.innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;
        console.log("Location fetched:", latitude, longitude);
      },
      (error) => {
        console.error("Error fetching location:", error);
        alert("Error fetching location. Check the console for details.");
      },
      { enableHighAccuracy: true }
    );
  }

  const getLocationButton = document.getElementById("getLocationButton");
  getLocationButton.addEventListener("click", getLocation);
}
