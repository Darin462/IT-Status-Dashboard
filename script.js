// Sjekk Google DNS
function sjekkNettverk() {
    fetch('https://dns.google/resolve?name=example.com&type=A', { cache: "no-store" })
        .then(response => {
            const elem = document.getElementById('nettverk-status');
            if (response.ok) {
                elem.textContent = "Online";
                elem.className = "status-online";
            } else {
                elem.textContent = "Offline";
                elem.className = "status-offline";
            }
        })
        .catch(() => {
            const elem = document.getElementById('nettverk-status');
            elem.textContent = "Offline";
            elem.className = "status-offline";
        });
}

// Sjekk Webserver (escape-room-booker.vercel.app)
function sjekkWebserver() {
    fetch('https://escape-room-booker.vercel.app/', { cache: "no-store" })
        .then(response => {
            const elem = document.getElementById('webserver-status');
            if (response.ok) {
                elem.textContent = "Online";
                elem.className = "status-online";
            } else {
                elem.textContent = "Offline";
                elem.className = "status-offline";
            }
        })
        .catch(() => {
            const elem = document.getElementById('webserver-status');
            elem.textContent = "Offline";
            elem.className = "status-offline";
        });
}


function sjekkDatabase() {
    fetch('database.json', { cache: "no-store" })
        .then(res => res.json())
        .then(data => {
            const elem = document.getElementById('database-status');
            elem.textContent = data.status;
            elem.className = data.status === "Online" ? "status-online" : "status-offline";
        })
        .catch(() => {
            const elem = document.getElementById('database-status');
            elem.textContent = "Offline";
            elem.className = "status-offline";
        });
}

// Oppdater tid
function oppdaterTid() {
    const tid = new Date().toLocaleTimeString();
    document.getElementById('tid').textContent = tid;
}

// Kjør første gang
sjekkNettverk();
sjekkWebserver();
oppdaterTid();

// Oppdater hvert 5. sekund
setInterval(sjekkNettverk, 5000);
setInterval(sjekkWebserver, 5000);
setInterval(sjekkDatabase, 5000);
setInterval(oppdaterTid, 5000);