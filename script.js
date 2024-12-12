import { database } from "./firebase-config.js";
import { ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// DOM Elements
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const driverLoginBtn = document.getElementById("driver-login-btn");
const searchBusBtn = document.getElementById("search-bus-btn");
const postBusInfoBtn = document.getElementById("post-bus-info-btn");

const authSection = document.getElementById("auth-section");
const driverLoginSection = document.getElementById("driver-login-section");
const busSection = document.getElementById("bus-section");
const driverDashboardSection = document.getElementById("driver-dashboard-section");

let currentUser = null;

// ** User Authentication **
registerBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const usersRef = ref(database, "users/");
        const newUser = push(usersRef);
        await set(newUser, { email, password });

        alert("User registered successfully!");
    } catch (error) {
        console.error("Error registering user:", error);
    }
});

loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const snapshot = await get(ref(database, "users/"));
        let found = false;

        snapshot.forEach((user) => {
            const data = user.val();
            if (data.email === email && data.password === password) {
                currentUser = data;
                found = true;
            }
        });

        if (found) {
            alert("User login successful!");
            authSection.style.display = "none";
            busSection.style.display = "block";
        } else {
            alert("Invalid credentials!");
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
});

// ** Driver Authentication **
driverLoginBtn.addEventListener("click", async () => {
    const email = document.getElementById("driver-email").value;
    const password = document.getElementById("driver-password").value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const snapshot = await get(ref(database, "drivers/"));
        let authenticated = false;

        snapshot.forEach((driver) => {
            const data = driver.val();
            if (data.email === email && data.password === password) {
                authenticated = true;
            }
        });

        if (authenticated) {
            alert("Driver login successful!");
            driverLoginSection.style.display = "none";
            driverDashboardSection.style.display = "block";
        } else {
            alert("Invalid driver credentials!");
        }
    } catch (error) {
        console.error("Error during driver login:", error);
    }
});

// ** Bus Search **
searchBusBtn.addEventListener("click", async () => {
    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;

    if (!source || !destination) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const busesRef = ref(database, "buses/");
        const snapshot = await get(busesRef);

        let resultHtml = "<h3>Available Buses:</h3>";
        snapshot.forEach((bus) => {
            const data = bus.val();
            if (data.route.includes(source) && data.route.includes(destination)) {
                resultHtml += `<p>Bus: ${data.busType}, Contact: ${data.contact}</p>`;
            }
        });

        document.getElementById("bus-result").innerHTML = resultHtml;
    } catch (error) {
        console.error("Error fetching bus data:", error);
    }
});

// ** Post Bus Information **
postBusInfoBtn.addEventListener("click", async () => {
    const busType = document.getElementById("post-bus-type").value;
    const route = document.getElementById("post-route").value;
    const contact = document.getElementById("post-contact").value;

    if (!busType || !route || !contact) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const busesRef = ref(database, "buses/");
        const newBus = push(busesRef);

        await set(newBus, { busType, route, contact });

        document.getElementById("driver-info-result").innerHTML =
            `<p>Bus Type: ${busType}</p>
             <p>Route: ${route}</p>
             <p>Contact: ${contact}</p>`;

        alert("Bus information posted successfully!");
    } catch (error) {
        console.error("Error posting bus information:", error);
    }
});
