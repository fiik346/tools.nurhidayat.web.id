// https://www.geeksforgeeks.org/how-to-read-a-local-text-file-using-javascript/

var fileName = 'unkown.srt'
watchinput();
function watchinput() {
  document.getElementById('fileinput')
    .addEventListener('change', function () { // listen change of input file
      let file = this.files[0].name.split('.').pop() //split the file name and get the file extension
      let arrayId = document.getElementById('array') // get id of table
      if (file === 'srt') {
        let fr = new FileReader() //read file
        fr.onload = function () { //file function at read
          const array = fr.result.split(/\n\r/) // split by new paragraph and set as array
          const arrayB = fr.result.split(/\n\n/) // split by double new line (if split by paragraph not work)
          let tbody = document.createElement('tbody') //create new element tbody
          arrayId.innerHTML = `<thead class='notranslate'><tr><th>Index</th><th>Time</th><th>Original Text</th><th>Translated Text</th></thead>` // insert header to table
          let createBody = arrayId.appendChild(tbody) // new variable for insert table body after header in table
          function listing(items) { // write array functions
            let array = items // declare new variable of array
            array.forEach(array => { // array foreach funtion
              if (array !== '' && array !== '\n') { // exclude newline or space character (fixing array)
                const itemListing = array.split('\n') // new array from array and splitting by newline
                for (var i = 0; i < itemListing.length; i++) { // loop

                  if (itemListing[i] === '') { // if array of itemlisting is space
                    itemListing.splice(i, 1); // remove it if true
                  }
                }
                let isText = '' // new variable of text
                for (var zi = 2; zi < itemListing.length; zi++) { //loop again for exclude time and index number of subtitle
                  isText += itemListing[zi] // add text to variable 
                }
                let tr = document.createElement('tr') //create new table row

                // insert html and adding foreach of array adn sorting index number, time, text
                createBody.appendChild(tr).innerHTML +=
                  `<th class="index notranslate">${itemListing[0]}</th>
                <td class="time notranslate">${itemListing[1]}</td>
                <td class='notranslate'>${isText}</td>
                <td class="text" contenteditable="true">${isText}</td>`
              }
            });
          }
          if (array.length > 1) { // if array split by paragraph work is not only have 2 array
            listing(array)
          } else if (arrayB.length > 1) {
            listing(arrayB)
          } else {
            alert('error')
          }
        }
        fr.readAsText(this.files[0])
        let splitFN = this.files[0].name.split('.')
        splitFN.pop()
        let isname = ''
        for (var i = 0; i < splitFN.length; i++) {
          isname += splitFN[i] + '.'
        }
        fileName = isname + "TANSLATED.srt"
      } else {
        alert('File not supported, please upload .srt file')
      }
    })
};
function saveData() {
  let index = document.querySelectorAll('.index')
  let time = document.querySelectorAll('.time')
  let text = document.querySelectorAll('.text')
  let data = ''
  function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }
  function removeNLine(e) {
    let z = htmlDecode(e).replace('\n', '')
    return z
  }
  function removeR(e) {
    let z = e.split('\n')
    let s = ''
    for (var i = 0; i < z.length; i++) {
      if (z[i] === '\n' && z[i] === '') {
        z.splice(i, 1);
      };
      if (z[i] !== '' && z[i] !== '\n') {
        s += htmlDecode(z[i]) + '\n'
      }
    }
    return s
  }
  for (var i = 0; i < index.length; i++) {
    data += removeNLine(index[i].innerHTML) + '\n' + removeNLine(time[i].innerHTML) + '\n' + removeR(text[i].innerHTML) + '\r'
  }
  var saveD = (function () {

    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function () {
      blob = new Blob([data], { type: "text" }),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }());
  saveD()
}
function clickScroll() {
  console.log('hello')
  var src = document.querySelector('.source');
  var top = document.querySelector('#array').clientHeight;
  src.scrollTo(0, top)
}