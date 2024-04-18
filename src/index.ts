/* 
Showdown Extensions for mathjax
@ 2024 Pho Thin Maung , https://github.com/phothinmg/showdown-mathjax
This extension was inspired by https://github.com/easyhappy/math-extension.
*/


import Showdown, { ShowdownExtension } from "showdown";

function ShowdownMathjax(): ShowdownExtension[] {
  const ext: ShowdownExtension[] = [
    {
      type: "lang",
      filter: (text: string) => {
        return text.replace(/\\\((.*?)\\\)/g, (match, p1) => {
          return (
            "<mathxxxjax>" +
            encode("\\(" + escapehtml(p1) + "\\)") +
            "</mathxxxjax>"
          );
        });
      },
    },
    {
      type: "lang",
      filter: (text: string) => {
        return text.replace(/\\\[([\s\S]*?)\\\]/g, (match, p1) => {
          return (
            "<mathxxxjax>" +
            encode("\\[" + escapehtml(p1) + "\\]") +
            "</mathxxxjax>"
          );
        });
      },
    },
    {
      type: "output",
      filter: (text: string) => {
        return text.replace(/<mathxxxjax>(.*?)<\/mathxxxjax>/g, (match, p1) => {
          return decode(p1);
        });
      },
    },
    {
      type: "output",
      filter: (text: string) => {
        const scriptTag = `
        <script>
            window.MathJax = {
              loader: {
                load: [
                  '[tex]/color', 
                  '[tex]/mathtools', 
                  '[tex]/ams',
                  '[tex]/html', 
                  '[tex]/textmacros', 
                  '[tex]/textcomp' ,
                  '[mml]/mml3',
                ]
              },
              tex: {
                packages: {
                  '[+]': [
                    'color', 
                    'mathtools', 
                    'ams', 
                    'html',
                    'textmacros' 
                  ]
                },        
                inlineMath: [  
                  ['$','$'],    
                  ['\(', '\)']
                ],
                displayMath: [             
                  ['$$', '$$'],
                  ['\[', '\]']
                ],
                color: {
                  padding: '5px',
                  borderWidth: '2px'
                },
                ams: {
                  multlineWidth: '100%',
                  multlineIndent: '1em'
                },
                processEscapes: true,      
                processEnvironments: true, 
                processRefs: true,         
                digits: /^(?:[0-9]+(?:{,}[0-9]{3})*(?:.[0-9]*)?|.[0-9]+)/,
                tags: 'none',              
                tagSide: 'right',          
                tagIndent: '0.8em',        
                useLabelIds: true,         
                maxMacros: 10000,          
                maxBuffer: 5 * 1024,       
                baseURL: (document.getElementsByTagName('base').length === 0) ? '' : String(document.location).replace(/#.*$/, ''),
                formatError: (jax, err) => jax.formatError(err)
              },
              textmacros: {
                packages: {'[+]': ['textcomp']}
              }
            }
        </script>
          <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
          <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
        `;
        return scriptTag + text;
      },
    },
  ];
  return ext;
}

function escapehtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function encode(text: string) {
  if (typeof Buffer === "function") {
    return Buffer.from(text).toString("base64");
  } else {
    return btoa(text);
  }
}
function decode(text: string) {
  if (typeof Buffer === "function") {
    return Buffer.from(text, "base64").toString();
  } else {
    return atob(text);
  }
}

Showdown.extension("ShowdownMathjax", ShowdownMathjax);

export default ShowdownMathjax;
