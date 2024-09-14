// Initialize the map and set its view to the Philippines with a suitable zoom level
var map = L.map('map').setView([14.45056, 120.98278], 10);

// Load and display tile layer on the map (OpenStreetMap in this case)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Define custom icons for "from" and "to" markers
var fromIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=80319&format=png&color=000000',
    iconSize: [40, 40],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
});

var toIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=13800&format=png&color=000000',
    iconSize: [40, 40],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
}); 

// Initialize draggable markers for "from" and "to" locations
var fromMarker = L.marker([14.2917, 120.8743], {
    icon: fromIcon,
    draggable: true
}).addTo(map);

var toMarker = L.marker([14.384444, 120.881111], { // Set different initial coordinates for the "to" marker
    icon: toIcon,
    draggable: true
}).addTo(map);

// Update input fields and calculate distance when either marker is dragged
function updateDistance() {
    var fromLatLng = fromMarker.getLatLng();
    var toLatLng = toMarker.getLatLng();

    var distance = fromLatLng.distanceTo(toLatLng) / 1000; // Convert meters to kilometers
    document.getElementById('distance').value = distance.toFixed(2);
}

function updateFromAddress() {
    var fromStreet = document.getElementById("fromStreet").value;
    var fromBarangay = document.getElementById("fromBarangay").value;
    var fromCity = document.getElementById("fromCity").value;
    var fromRegion = document.getElementById("fromRegion").value;

    var fromAddress = `${fromStreet}, ${fromBarangay}, ${fromCity}, ${fromRegion}`;
    fromMarker.bindPopup(fromAddress).openPopup();
}

function updateToAddress() {
    var toStreet = document.getElementById("toStreet").value;
    var toBarangay = document.getElementById("toBarangay").value;
    var toCity = document.getElementById("toCity").value;
    var toRegion = document.getElementById("toRegion").value;

    var toAddress = `${toStreet}, ${toBarangay}, ${toCity}, ${toRegion}`;
    toMarker.bindPopup(toAddress).openPopup();
}

fromMarker.on('dragend', function() {
    updateDistance();
    updateFromAddress();
});

toMarker.on('dragend', function() {
    updateDistance();
    updateToAddress();
});

document.getElementById("calculateButton").addEventListener("click", function() {
    updateDistance();
});

document.getElementById("bookButton").addEventListener("click", function() {
    var toName = document.getElementById("toName").value;
    var fromStreet = "Carmelita St.";
    var fromBarangay = "Sampalucan";
    var fromCity = "General Trias";
    var fromRegion = "Cavite";
    var toStreet = document.getElementById("toStreet").value;
    var toBarangay = document.getElementById("toBarangay").value;
    var toCity = document.getElementById("toCity").value;
    var toRegion = document.getElementById("toRegion").value;
    var distance = parseFloat(document.getElementById("distance").value);

    if (!isNaN(distance)) {
        // Calculate fare
        var baseFare = 49;
        var additionalFare = 5 * distance;
        var totalFare = baseFare + additionalFare;

        // Display receipt in the modal
        var receiptContent = `
            <strong>Passenger's Name:</strong> ${toName}<br>
            <strong>Pick-up Location:</strong> ${fromStreet}, ${fromBarangay}, ${fromCity}, ${fromRegion}<br>
            <strong>Drop-off Location:</strong> ${toStreet}, ${toBarangay}, ${toCity}, ${toRegion}<br>
            <strong>Distance:</strong> ${distance.toFixed(2)} km<br>
            <strong>Total Fare:</strong> PHP ${totalFare.toFixed(2)}
        `;
        document.getElementById("receiptContent").innerHTML = receiptContent;
        $('#receiptModal').modal('show');
    } else {
        alert("Please enter valid locations and calculate the distance.");
    }
});


// Add event listener for the close button
document.querySelector('#receiptModal .close').addEventListener('click', function() {
    $('#receiptModal').modal('hide');
});

document.querySelector('#receiptModal .btn-secondary').addEventListener('click', function() {
    $('#receiptModal').modal('hide');
});


// Initialize the input fields with the initial marker positions
document.getElementById('from').value = fromMarker.getLatLng().toString();
document.getElementById('to').value = toMarker.getLatLng().toString();
updateDistance();
