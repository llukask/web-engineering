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

// Implementieren Sie hier Ihre REST-Schnittstelle
/* Ermöglichen Sie wie in der Angabe beschrieben folgende Funktionen:
 *  DONE Abrufen aller Geräte als Liste
 *  DONE Hinzufügen eines neuen Gerätes
 *  DONE Löschen eines vorhandenen Gerätes
 *  DONE Bearbeiten eines vorhandenen Gerätes (Verändern des Gerätezustandes und Anpassen des Anzeigenamens)
 *  TODO Log-in und Log-out des Benutzers
 *  TODO Ändern des Passworts
 *  DONE Abrufen des Serverstatus (Startdatum, fehlgeschlagene Log-ins).
 *
 *  BITTE BEACHTEN!
 *      Verwenden Sie dabei passende Bezeichnungen für die einzelnen Funktionen.
 *      Achten Sie bei Ihrer Implementierung auch darauf, dass der Zugriff nur nach einem erfolgreichem Log-In erlaubt sein soll.
 *      Vergessen Sie auch nicht, dass jeder Client mit aktiver Verbindung über alle Aktionen via Websocket zu informieren ist.
 *      Bei der Anlage neuer Geräte wird eine neue ID benötigt. Verwenden Sie dafür eine uuid (https://www.npmjs.com/package/uuid, Bibliothek ist bereits eingebunden).
 */
var devices = [];
var credentials = {};

var tokens = [];

var state = {};
var wsConnected = [];

app.get("/devices", function(req, res) {
    "use strict"
    res.json(devices);
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

function getDevice(id) {
  return devices.filter(dev => dev["id"] === id)[0];
}

function removeDevice(device) {
  return devices.splice(devices.indexOf(device), 1);
}

app.post("/devices", function(req, res) {
  "use strict"
  console.log(req.body);
  let deviceReq = req.body;
  if(validateDeviceReq(req.body)) {
    let device = makeDevice(deviceReq);
    console.log("Adding device: " + JSON.stringify(device));
    devices.push(device);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(device));
  } else {
    res.status(400).send("validation error!");
  }
  res.send("ok");
});

app.delete("/devices/:id", function(req, res) {
  console.log(JSON.stringify(req.params));
  let id = req.params["id"];
  let device = getDevice(id);
  if(device) {
    console.log("Deleting device: " + JSON.stringify(device));
    removeDevice(device);
    res.status(200).send("ok");
  } else {
    res.status(404).send("device with id " + id + " not found");
  }
});


app.post("/updateCurrent", function (req, res) {
    "use strict";
    // Vervollständigen Sie diese Funktion, welche den aktuellen Wert eines Gerätes ändern soll
    /*
     * Damit die Daten korrekt in die Simulation übernommen werden können, verwenden Sie bitte die nachfolgende Funktion.
     *      simulation.updatedDeviceValue(device, control_unit, Number(new_value));
     * Diese Funktion verändert gleichzeitig auch den aktuellen Wert des Gerätes, Sie müssen diese daher nur mit den korrekten Werten aufrufen.
     */
     let id = req.body["id"];
     let controlUnitIdx = req.body["control_unit_index"];
     let newVal = req.body["new_value"];

     let device = getDevice(id);
     if(!device) {
       res.status(404).send("device with id " + id + " not found!");
       return;
     }
     let controlUnit = device["control_units"][controlUnitIdx];
     if(!controlUnit) {
       res.status(404).send("control unit with index " + controlUnitIdx
        + " not found on device with id " + id);
       return;
     }

     console.log("updating cu: " + JSON.stringify(controlUnit) + " in device " + device);

     switch (controlUnit["type"]) {
       case "boolean":
         if(newVal !== 0 && newVal !== 1) {
           res.status(400).send("value " + newVal + "is invalid for device of type boolean");
           return;
         }
         break;
       case "enum":
         if(newVal < 0 || newVal >= controlUnit["values"].length) {
           res.status(400).send("value " + newVal + "is invalid for device of "
              + "type enum with values " + JSON.stringify(controlUnit["values"]));
           return;
         }
        break;
        case "continuous":
          if(newVal < controlUnit["min"] || newVal > controlUnit["max"]) {
            res.status(400).send("value " + newVal + "is invalid for device of "
               + "type continuous with min: " + controlUnit["min"] + " and max: "
               + controlUnit["max"]);
            return;
          }
         break;
       default:
        console.error("this should not happen!!!");
        return;
     }


     console.log("new value is: " +  newVal);
     simulation.updatedDeviceValue(device, controlUnit, newVal);
     res.json(device);
});

app.post("/auth", function (req, res) {
  var user = new Object();
  user.username = req.body['username'];
  user.password = req.body['password'];

  console.log(JSON.stringify(user));

  readUser();

  if(credentials.username == user.username &&
     credentials.password == user.password) {
    var token = jwt.sign(user, 'f3f9c3ed-b2d6-48e2-9243-1eb772f0d869');
    res.json({token: token});
    tokens.push(token);
    console.log(tokens);
  } else {
    res.json({message: "User '" + user.username + "' not found or wrong password."});
  }
});

app.get("/state", function(req, res) {
  res.json(state);
});

app.ws("/devices", function(ws, res) {
  console.log("connected!");
  wsConnected.push(ws);
  ws.on('message', function(data) {
    console.log("client says " + JSON.stringify(data));
  });
  ws.on('close', function() {
    let idx = wsConnected.indexOf(ws);
    if(idx >= 0) {
      wsConnected.splice(idx, 1);
    }
  });
});

function readUser() {
    "use strict";
    // Lesen Sie die Benutzerdaten aus dem login.config File ein.
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
    // Übermitteln Sie jedem verbundenen Client die aktuellen Gerätedaten über das Websocket
    /*
     * Jedem Client mit aktiver Verbindung zum Websocket sollen die aktuellen Daten der Geräte übermittelt werden.
     * Dabei soll jeder Client die aktuellen Werte aller Steuerungselemente von allen Geräte erhalten.
     * Stellen Sie jedoch auch sicher, dass nur Clients die eingeloggt sind entsprechende Daten erhalten.
     *
     * Bitte beachten Sie, dass diese Funktion von der Simulation genutzt wird um periodisch die simulierten Daten an alle Clients zu übertragen.
     */
     console.log("sending devices to " + wsConnected.length + " clients");
     wsConnected.forEach(ws => ws.send(JSON.stringify(devices)));
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
