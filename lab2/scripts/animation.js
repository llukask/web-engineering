/*
  TODO
 Implementieren Sie die folgenden Funktionen um die SVG-Grafiken der Geräte anzuzeigen und verändern.

 Hinweise zur Implementierung:
 - Verwenden Sie das SVG-Plugin für jQuery, welches bereits für Sie eingebunden ist (Referenz: http://keith-wood.name/svg.html)
 - Sie dürfen das Bild bei jedem Funktionenaufruf neu laden und Ihre Veränderungen vornehmen;
 Tipp: Durch Überschreiben der OnLoad Funktion von svg.load() können Sie die Grafik noch bevor diese zum ersten Mal angezeigt wird verändern
 - In allen bereit gestellten SVG-Grafiken sind alle für Sie relevanten Stellen mit Labels markiert.
 - Da Ihre Grafiken nur beim Laden der Übersichtsseite neu gezeichnet werden müssen, bietet es ich an die draw_image Funktionen nach dem vollständigen Laden dieser Seite auszuführen.
 Rufen Sie dazu mit draw_image(id, src, min, max, current, values) die zugrunde liegende und hier definierte Funktione auf.
 */


function drawThermometer(id, src, min, max, current, values) {
  /* TODO
   Passen Sie die Höhe des Temperaturstandes entsprechend dem aktuellen Wert an.
   Beachten Sie weiters, dass auch die Beschriftung des Thermometers (max, min Temperatur) angepasst werden soll.
   */
   var _id = "#"+id;
   $(_id).empty();
   $(_id).svg({loadURL: src,
               onLoad: function(svg) {
                   svg.configure({viewBox: '250 0 100 750'}, false);
                   var txts = $(_id).find("tspan");
                   txts[0].innerHTML = min;
                   txts[1].innerHTML = max;
                   var rect = svg.rect(254, 324-((current+(min*(-1))*3.1415)), 70, ((current+(min*(-1)))*3.1415),{fill: 'black'});
               },
               changeSize: false});
}

function drawBulb(id, src, min, max, current, values) {
  var _id = "#"+id;
  if(current == 1) {
    var col = "#fc0"
  }
  else {
    var col = "#000"
  }
  $(_id).empty();
  $(_id).svg({loadURL: src,
              onLoad: function(svg) {
                svg.configure({viewBox: '200 -50 100 750'}, false);
                var ps =$(_id).find("path").attr("fill",col);
              },
              changeSize: false});
}

function drawCam(id, src, min, max, current, values) {
  /* TODO
    Verändern Sie die Darstellung der Webcam entsprechend den Vorgaben aus der Angabe.
    Dabei soll jedoch nicht nur einfach die Farbe der Elemente verändert werden, sondern es soll eine Kopie der zu verändernden Elemente erstellt
     und anschließend die aktuellen durch die angepassten Kopien ersetzt werden.
   */
   var _id = "#"+id;
   $(_id).empty();
   $(_id).svg({loadURL: src,
               onLoad: function(svg) {
                 svg.configure({viewBox: '-8 0 60 60'}, false);
                 if(current == 0){
                   var ps = $(_id).find("path");
                   var cs = $(_id).find("circle");
                   var p = ps[ps.length-1];
                   var c = cs[cs.length-1];
                   var nc = jQuery.extend({}, c)
                   var np = jQuery.extend({}, p)
                   nc.style.fill = "#000";
                   svg.add(nc);
                   svg.add(np);
                   svg.remove(c);
                   svg.remove(p);
                 }
               },
               changeSize: false});
}

function drawShutter(id, src, min, max, current, values) {
  var _id = "#"+id;
  $(_id).empty();
  $(_id).svg({loadURL: src,
              onLoad: function(svg) {
                svg.configure({viewBox: '-8 0 60 60'}, false);
                var ps =$(_id).find("path");
                switch(current) {
                  case 0:
                    svg.remove(ps[1]);
                    svg.remove(ps[2]);
                  case 1:
                    svg.remove(ps[3]);
                    svg.remove(ps[4]);
                }
              },
              changeSize: false});
}
