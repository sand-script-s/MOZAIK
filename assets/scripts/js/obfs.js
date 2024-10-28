// Email obfuscator script 2.1 by Tim Williams, University of Arizona
// Random encryption key feature by Andrew Moulden, Site Engineering Ltd
// This code is freeware provided these four comment lines remain intact
// A wizard to generate this code is at http://www.jottings.com/obfuscator/

{ coded = "LPbQ.Lwi7v5.L@viz5zb0P72.wz0"
  key = "xHcIe2MCobQNSi6ERVX0qavgsZGtKDwjyT1hzful87Bnd39rFPUWLmA5pkJYO4"
  shift=coded.length
  link=""
  for (i=0; i<coded.length; i++) {
    if (key.indexOf(coded.charAt(i))==-1) {
      ltr = coded.charAt(i)
      link += (ltr)
    }
    else {     
      ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length
      link += (key.charAt(ltr))
    }
  }

  //document.write("<a href='mailto:"+link+"'>here</a>") <-- original code

  insertplace = document.getElementById('insert');
  insertplace.innerHTML += "<a href='mailto:" + link + "'>here</a>" + ".";
}
