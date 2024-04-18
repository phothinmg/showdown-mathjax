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
            tex: {
              packages: ['base'],        // extensions to use
              inlineMath: [              // start/end delimiter pairs for in-line math
                ['\\(', '\\)']
              ],
              displayMath: [             // start/end delimiter pairs for display math
                ['$$', '$$'],
                ['\\[', '\\]']
              ],
              processEscapes: true,      // use \$ to produce a literal dollar sign
              processEnvironments: true, // process \begin{xxx}...\end{xxx} outside math mode
              processRefs: true,         // process \ref{...} outside of math mode
              digits: /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)?|\.[0-9]+)/,
                                         // pattern for recognizing numbers
              tags: 'none',              // or 'ams' or 'all'
              tagSide: 'right',          // side for \tag macros
              tagIndent: '0.8em',        // amount to indent tags
              useLabelIds: true,         // use label name rather than tag for ids
              maxMacros: 10000,          // maximum number of macro substitutions per expression
              maxBuffer: 5 * 1024,       // maximum size for the internal TeX string (5K)
              baseURL:                   // URL for use with links to tags (when there is a <base> tag in effect)
                 (document.getElementsByTagName('base').length === 0) ?
                  '' : String(document.location).replace(/#.*$/, '')),
              formatError:               // function called when TeX syntax errors occur
                  (jax, err) => jax.formatError(err)
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
