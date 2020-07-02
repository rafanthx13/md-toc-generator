// Set Default Text
var defaultText = `
  Example of MarkDown Text to generate TOC

  # h1

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere laoreet condimentum.

  ## h2

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere laoreet condimentum.

  ### h3.1

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere laoreet condimentum.

  ### h2.2

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere laoreet condimentum.`;

// Replace content to place in HTML
defaultText = defaultText.replace(/\\t/g, '').replace(/  /g, '').trim();
document.getElementById("md-text").value = defaultText;

/*

 Observações:
 + '.' deve ser retiraod nos links
 + ' ' deve ser convertido em '-'
 + O correto está no TOC generator original

*/

var symbols = { 1: '+', 2: '-', 3: '*', 4: '+', 5: '-', 6: '*' };

function generate_toc() {

   let flagSpaces = document.getElementById("spaces").checked;

   let list = document.getElementById("md-text").value;
   list = list.split("\n").filter(el => el != "").filter(el => el[0] == '#');

   let response = null;
   response = list.map(el => {
     let count_hashtags = count_hashtag(el);
     let symbol = symbols[count_hashtags]
     if (count_hashtags == 0) {
       console.log('error')
     }
     let spaces = count_hashtags - 1;
     let el_clean = el.replace(/#/g, '').trim()
     let el_clean_link = el_clean.replace(/\s/g,'-').replace(/\./g,'')
     return generate_spaces(spaces) + symbol + ' ' + '[' + el_clean + `](#${el_clean_link})`
   })

   let saida = '';
   let space = flagSpaces ? '\n' : '';
   for (let r of response) {
     saida += r + '\n' + space;
   }
   document.getElementById("md-output").value = saida;

 }

 function generate_spaces(num) {
   let str = '';
   for (let i = 0; i < num; i++) {
     str += '  '
   }
   return str
 }

 function count_hashtag(el) {
   console.log('el', el)
   let count = 0;
   for (let i = 0; i < el.length; i = i + 1) {
     if (el[i] == '#') {
       count = count + 1;
     } else {
       break
     }
   }
   return count;
 }
