/* == Blogspot Images CDN Resizer ==
/* Author: Taufik Nurhidayat
/* © Copyright Nurhidayat
*/
function change() {
  let url = document.getElementById("imgurl").value;
  let alt = document.getElementById("alt").value;
  let set = document.getElementsByName("settings");
  let settings = "default";
  for (i = 0; i < set.length; i++) {
    if (set[i].checked){
      settings = set[i].value;
    }
  }
  let parse = "Url of image is not valid";
  let parseLazy = parse;
  let parseNative = parse;
  let img = url.split("/");
  console.log(img);
  if (url.includes("bp.blogspot.com") & (img.length == 9)) {
    let img1 =
      "https://" +
      img[2] +
      "/" +
      img[3] +
      "/" +
      img[4] +
      "/" +
      img[5] +
      "/" +
      img[6] +
      "/s320/" +
      img[8];
    let img2 =
      "https://" +
      img[2] +
      "/" +
      img[3] +
      "/" +
      img[4] +
      "/" +
      img[5] +
      "/" +
      img[6] +
      "/s640/" +
      img[8];
    let img3 =
      "https://" +
      img[2] +
      "/" +
      img[3] +
      "/" +
      img[4] +
      "/" +
      img[5] +
      "/" +
      img[6] +
      "/s800/" +
      img[8];
    let img4 =
      "https://" +
      img[2] +
      "/" +
      img[3] +
      "/" +
      img[4] +
      "/" +
      img[5] +
      "/" +
      img[6] +
      "/s1200/" +
      img[8];
    parse = `<img alt="${alt}" sizes="100%" src="${img2}" srcset="${img1} 320w, ${img2} 640w, ${img3} 800w, ${img4} 1200w" sizes="100%"/>`;
    parseLazy = `<img alt="${alt}" class="lazyload" data-sizes="auto" src="${img2}"  srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-srcset="${img1} 320w, ${img2} 640w, ${img3} 800w, ${img4} 1200w"/>`;
    parseNative =`<img alt="${alt}" loading="lazy" sizes="100%" src="${img2}" srcset="${img1} 320w, ${img2} 640w, ${img3} 800w, ${img4} 1200w"/>`
  }
  if (settings == "lazysizes"){
    document.getElementById("parsed").value = parseLazy;
  }
  else if(settings == "native"){
    document.getElementById("parsed").value = parseNative;
  }
  else{
    document.getElementById("parsed").value = parse;
  }
}
