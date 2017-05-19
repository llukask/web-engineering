/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */

var express = require("express");
var app = express();
var fs = require("fs");
var expressWs = require("express-ws")(app);
var http = require("http");

var simulation = require("./simulation.js");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var cors = require("cors");
var uuid = require("uuid");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//TODO Implementieren Sie hier Ihre REST-Schnittstelle
/* Ermöglichen Sie wie in der Angabe beschrieben folgende Funktionen:
 *  Abrufen aller Geräte als Liste
 *  Hinzufügen eines neuen Gerätes
 *  Löschen eines vorhandenen Gerätes
 *  Bearbeiten eines vorhandenen Gerätes (Verändern des Gerätezustandes und Anpassen des Anzeigenamens)
 *  Log-in und Log-out des Benutzers
 *  Ändern des Passworts
 *  Abrufen des Serverstatus (Startdatum, fehlgeschlagene Log-ins).
 *
 *  BITTE BEACHTEN!
 *      Verwenden Sie dabei passende Bezeichnungen für die einzelnen Funktionen.
 *      Achten Sie bei Ihrer Implementierung auch darauf, dass der Zugriff nur nach einem erfolgreichem Log-In erlaubt sein soll.
 *      Vergessen Sie auch nicht, dass jeder Client mit aktiver Verbindung über alle Aktionen via Websocket zu informieren ist.
 *      Bei der Anlage neuer Geräte wird eine neue ID benötigt. Verwenden Sie dafür eine uuid (https://www.npmjs.com/package/uuid, Bibliothek ist bereits eingebunden).
 */
var devices = [];
var credentials = {};

app.get("/devices", function(req, res) {
    "use strict"
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(devices));
});

var images = {
  "Beleuchtung": { "image": "images/bulb.svg",
                   "image_alt": "Glühbirne als Indikator für Aktivierung"  },
  "Heizkörperthermostat": { "image": "images/thermometer.svg",
                            "image_alt": "Thermometer zur Temperaturanzeige"  },
  "Rollladen": { "image": "images/roller_shutter.svg",
                 "image_alt": "Rollladenbild als Indikator für Öffnungszustand"  },
  "Überwachungskamera": { "image": "images/webcam.svg",
                          "image_alt": "Webcam als Indikator für Aktivierung"  },
  "Webcam": { "image": "images/webcam.svg",
              "image_alt": "Webcam als Indikator für Aktivierung"  }
};

let cuTypes = ["boolean", "continous", "enum"];

function validateControlUnit(cu) {
  let cuPropsExist = cu.hasOwnProperty("name")
      && cu.hasOwnProperty("type")
      && cu.hasOwnProperty("current")
      && cu.hasOwnProperty("primary")
      && typeof cu["primary"] === 'boolean';

  if(cuPropsExist !== true) {
    return false;
  }

  if(cu["type"] === "boolean") {
    return cu.hasOwnProperty("values")
        && cu["values"] === [""]
        && (cu["current"] === 1 || cu["current"] === 0);
  } else if(cu["type"] === "enum") {
    return cu.hasOwnProperty("values")
        && Arrays.isArray(cu["values"])
        && (cu["current"] < cu["values"].length)
  } else if(cu["type"] == "continous") {
    return cu.hasOwnProperty("min") && cu.hasOwnProperty("max");
  }
}

function validateDeviceReq(deviceReq) {
  let deviceValid = deviceReq.hasOwnProperty("description")
                 && deviceReq.hasOwnProperty("display_name")
                 && deviceReq.hasOwnProperty("type_name")
                 && deviceReq.hasOwnProperty("type")
                 && deviceReq.hasOwnProperty("control_units")
                 && images.hasOwnProperty(deviceReq["type"]);

  if(deviceValid !== true) {
    return false;
  }

  let controlUnitsIsArray = Array.isArray(deviceReq["control_units"]);

  if(controlUnitsIsArray !== true) {
    return false;
  }

  let controlUnitsValid = deviceReq["control_units"].length > 0
                       && deviceReq["control_units"].every(validateControlUnit);

  if(controlUnitsValid !== true) {
    return false;
  }
  return true;
}

function makeDevice(dev) {
  dev["id"] = uuid.v4();
  return Object.assign(dev, images[dev["type"]]);
}

app.post("/devices", function(req, res) {
  "use strict"
  console.log(req.body);
  let deviceReq = req.body;
  if(validateDeviceReq(req.body)) {
    let device = makeDevice(deviceReq);
    console.log("Adding device: " + JSON.stringify(device));
    devices.push(device);
    res.status(200).send(JSON.stringify(device));
  } else {
    res.status(400).send("validation error!");
  }
  res.send("ok");
});

app.delete("/devices/:id", function(req, res) {
  console.log(JSON.stringify(req.params));
  let id = req.params["id"];
  let filtered = devices.filter(dev => dev["id"] === id);
  if(filtered.length < 1) {
    res.status(404).send("not found");
  } else {
    console.log("Deleteing device: " + JSON.stringify(filtered[0]));
    devices.splice(devices.indexOf(filtered[0], 1));
    res.status(200).send("ok");
  }
  res.send("ok");
});


app.post("/updateCurrent", function (req, res) {
    "use strict";
    //TODO Vervollständigen Sie diese Funktion, welche den aktuellen Wert eines Gerätes ändern soll
    /*
     * Damit die Daten korrekt in die Simulation übernommen werden können, verwenden Sie bitte die nachfolgende Funktion.
     *      simulation.updatedDeviceValue(device, control_unit, Number(new_value));
     * Diese Funktion verändert gleichzeitig auch den aktuellen Wert des Gerätes, Sie müssen diese daher nur mit den korrekten Werten aufrufen.
     */

});


function readUser() {
    "use strict";
    //TODO Lesen Sie die Benutzerdaten aus dem login.config File ein.
    let userContents = fs.readFileSync("resources/login.config", "utf-8");
    let lines = userContents.split('\r\n');
    let pairs = lines.map(l => l.split(': '));
    pairs.forEach(p => credentials[p[0]] = p[1]);
    console.log(credentials);
}

function readDevices() {
    "use strict";
    //Lesen Sie die Gerätedaten aus der devices.json Datei ein.
    /*
     * Damit die Simulation korrekt funktioniert, müssen Sie diese mit nachfolgender Funktion starten
     *      simulation.simulateSmartHome(devices.devices, refreshConnected);
     * Der zweite Parameter ist dabei eine callback-Funktion, welche zum Updaten aller verbundenen Clients dienen soll.
     */
     simulation.simulateSmartHome(devices, refreshConnected);
     devices = JSON.parse(fs.readFileSync("resources/devices.json", "utf-8")).devices;
}


function refreshConnected() {
    "use strict";
    //TODO Übermitteln Sie jedem verbundenen Client die aktuellen Gerätedaten über das Websocket
    /*
     * Jedem Client mit aktiver Verbindung zum Websocket sollen die aktuellen Daten der Geräte übermittelt werden.
     * Dabei soll jeder Client die aktuellen Werte aller Steuerungselemente von allen Geräte erhalten.
     * Stellen Sie jedoch auch sicher, dass nur Clients die eingeloggt sind entsprechende Daten erhalten.
     *
     * Bitte beachten Sie, dass diese Funktion von der Simulation genutzt wird um periodisch die simulierten Daten an alle Clients zu übertragen.
     */
}


var server = app.listen(8081, function () {
    "use strict";
    readUser();
    readDevices();

    // console.log(devices)

    var host = server.address().address;
    var port = server.address().port;
    console.log("Big Smart Home Server listening at http://%s:%s", host, port);
});
