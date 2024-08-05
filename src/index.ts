/* 
Showdown Extensions for mathjax
@ 2024 Pho Thin Maung , https://github.com/phothinmg/showdown-mathjax
This extension was inspired by https://github.com/easyhappy/math-extension.
*/

import Showdown, { ShowdownExtension } from "showdown";

function showdownMathjax(): ShowdownExtension[] {
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
          var script = document.createElement("script");
          script.id = "MathJax-script";
          script.async = true;
          script.src =
            "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
          document.head.appendChild(script);
        </script>
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

Showdown.extension("showdownMathjax", showdownMathjax());

export default showdownMathjax;

// module.exports = showdownMathjax;
