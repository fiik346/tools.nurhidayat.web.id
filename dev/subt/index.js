// https://www.geeksforgeeks.org/how-to-read-a-local-text-file-using-javascript/


watchinput();
function watchinput() {
  document.getElementById('fileinput')
    .addEventListener('change', function () {
      let file = this.files[0].name.split('.').pop()
      if (file === 'srt') {
        let fr = new FileReader()
        fr.onload = function () {
          const array = fr.result.split(`\n\r`)
          let tbody = document.createElement('tbody')
          let arrayId = document.getElementById('array')
          arrayId.innerHTML = `<thead><tr><th>Index</th><th>Time</th><th>Original Text</th><th>Translated Text</th></thead>`
          let createBody = arrayId.appendChild(tbody)
          array.forEach(array => {
            if (array !== '\n') {
              const itemListing = array.split('\n')
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
              createBody.appendChild(tr).innerHTML += `<th>${itemListing[0]}</th><td class="time">${itemListing[1]}</td><td><span class="pre">${isText}</span></td><td class="text"><span class="pre" id="editable">${isText}</span></td>`
            }
          });
        }
        fr.readAsText(this.files[0])
      } else {
        alert('File not supported, please upload .srt file')
      }
    })
};