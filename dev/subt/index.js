// https://www.geeksforgeeks.org/how-to-read-a-local-text-file-using-javascript/

let fileName = 'A.txt'
watchinput();
function watchinput() {
  document.getElementById('fileinput')
    .addEventListener('change', function () { // listen change of input file
      let file = this.files[0].name.split('.').pop() //split the file name and get the file extension
      if (file === 'srt') {
        let fr = new FileReader() //read file
        fr.onload = function () { //file function at read
          const array = fr.result.split(/\n\r/) // split by new paragraph and set as array
          const arrayB = fr.result.split(/\n\n/) // split by double new line (if split by paragraph not work)
          let tbody = document.createElement('tbody') //create new element tbody
          let arrayId = document.getElementById('array') // get id of table
          arrayId.innerHTML = `<thead class='notranslate'><tr><th>Index</th><th>Time</th><th>Original Text</th><th>Translated Text</th></thead>` // insert header to table
          let createBody = arrayId.appendChild(tbody) // new variable for insert table body after header in table
          if (array.length > 1) { // if array split by paragraph work is not only have 2 array
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
                  `<th class="index">${itemListing[0]}</th>
                <td class="time">${itemListing[1]}</td>
                <td class='notranslate'>${isText}</td>
                <td class="text" contenteditable="true">${isText}</td>`
              }
            });
          } else if (arrayB.length > 1) {
            arrayB.forEach(arrayB => {
              if (arrayB !== '\n' && arrayB !== '') {
                const itemListing = arrayB.split('\n')
                for (var i = 0; i < itemListing.length; i++) {

                  if (itemListing[i] === '') {
                    itemListing.splice(i, 1);
                  }
                }
                let isText = ''
                for (var zi = 2; zi < itemListing.length; zi++) {
                  isText += itemListing[zi]
                }
                let tr = document.createElement('tr')
                createBody.appendChild(tr).innerHTML += `<th>${itemListing[0]}</th><td class="time">${itemListing[1]}</td><td class='notranslate'><span class="pre">${isText}</span></td><td class="text"><span class="pre" contenteditable="true">${isText}</span></td>`
              }
            });
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

// https://jsfiddle.net/koldev/cW7W5/

// var saveData = (function () {

// var a = document.createElement("a");
// document.body.appendChild(a);
// a.style = "display: none";
// return function () {
//   blob = new Blob([data], { type: "text" }),
//     url = window.URL.createObjectURL(blob);
//   a.href = url;
//   a.download = fileName;
//   a.click();
//   window.URL.revokeObjectURL(url);
// };
// }());
function saveData() {
  let item = document.querySelectorAll('.text')
  let data = ''
  console.log(item)
}