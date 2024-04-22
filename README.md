![Powered by MathJax](https://www.mathjax.org/badge/mj-logo.svg)

---

### Showdown Extension for MathJax 

***This extension was inspired by https://github.com/easyhappy/math-extension.***

---

#### Install

```bash
npm i showdown-mathjax
```

```bash
pnpm i showdown-mathjax
```

```bash
yarn add showdown-mathjax
```

---

#### About

- [Showdown](https://showdownjs.com/) : A Markdown to HTML bidirectional converter written in Javascript!

- [MathJax](https://www.mathjax.org/) : A JavaScript display engine for mathematics that works in all browsers.

- Showdown-mathjax is showdown extension for MathJax ,  `TeX / LaTeX` and `MathML` are supported.



##### TeX / LaTeX


- Supported TeX / LaTeX commands from MathJax website can see here : https://docs.mathjax.org/en/latest/input/tex/macros/index.html

- TeX commands available in MathJax by [Dr. Carol JVF Burns](https://www.onemathematicalcat.org/carol_vita_web.htm) , can see here : https://www.onemathematicalcat.org/MathJaxDocumentation/TeXSyntax.htm


##### MathML

- Mathematical Markup Language (MathML) Version 3.0 2nd Edition : https://www.w3.org/TR/MathML/

- Creating equations with MathML : https://www.drillster.com/info/mathml/

- Convert tools  for  MathML can find here : https://www.mathmlcentral.com/Tools/ToMathML.jsp


---

#### Documentations 

***The documentation is being developed and will be available soon.***

---

#### Example Usage


`index.js`

```javascript
import fs from "fs";
import Showdown from "showdown";
import showdownMathjax from "showdown-mathjax";

const converter = new Showdown.Converter({
    // others showdown options
  extensions: [showdownMathjax, /*others showdown extensions*/],
});

const content = fs.readFileSync("./example.md", "utf-8");

const converted = converter.makeHtml(content);

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Showdown-MathJax</title>
</head>
<body>
    ${converted}
</body>
</html>

`;

fs.writeFileSync("index.html", html);

```


`example.md`

```markdown
### TeX

$$
\begin{eqnarray}
\bf {a+2+\alpha+\frac{x+3}{\beta+4}}
\newline  \color{red}{ \frac{1+\sqrt{5}}{2} }
\end{eqnarray}
$$

<br>

$$
\sqrt{\frac ab}
\sqrt{\phantom{\frac ab}}
$$

<br>

$$ \overbrace{x + \cdots + x}^{n\rm\ times}_{\text{(note here)}} $$

<br>

$$
(x+1)^2     
= (x+1)(x+1) 
= x^2 + 2x + 1 
$$

<br>

### MathML

<math xmlns="http://www.w3.org/1998/Math/MathML">
  <msup>
    <mrow>
      <mfenced separators="|">
        <mrow>
          <mi>x</mi>
          <mo>+</mo>
          <mi>a</mi>
        </mrow>
      </mfenced>
    </mrow>
    <mrow>
      <mi>n</mi>
    </mrow>
  </msup>
  <mo>=</mo>
  <mrow>
    <msubsup>
      <mo stretchy="true">∑</mo>
      <mrow>
        <mi>k</mi>
        <mo>=</mo>
        <mn>0</mn>
      </mrow>
      <mrow>
        <mi>n</mi>
      </mrow>
    </msubsup>
    <mrow>
      <mfenced separators="|">
        <mrow>
          <mfrac linethickness="0pt">
            <mrow>
              <mi>n</mi>
            </mrow>
            <mrow>
              <mi>k</mi>
            </mrow>
          </mfrac>
        </mrow>
      </mfenced>
      <msup>
        <mrow>
          <mi>x</mi>
        </mrow>
        <mrow>
          <mi>k</mi>
        </mrow>
      </msup>
      <msup>
        <mrow>
          <mi>a</mi>
        </mrow>
        <mrow>
          <mi>n</mi>
          <mo>-</mo>
          <mi>k</mi>
        </mrow>
      </msup>
    </mrow>
  </mrow>
</math>


<br>
<br>

<math xmlns="http://www.w3.org/1998/Math/MathML">
  <msub>
    <mi>CH</mi>
    <mn>4</mn>
  </msub>
  <mo>+</mo>
  <mn>2</mn>
  <msub>
    <mi>O</mi>
    <mn>2</mn>
  </msub>
  <mo>→</mo>
  <msub>
    <mi>CO</mi>
    <mn>2</mn>
  </msub>
  <mo>+</mo>
  <mn>2</mn>
  <msub>
    <mi>H</mi>
    <mn>2</mn>
  </msub>
  <mi>O</mi>
</math>

<br><br>

<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <mi>x</mi>
    <mo>=</mo>
    <mfrac>
      <mrow>
        <mo form="prefix">−<!-- minus sign --></mo>
        <mi>b</mi>
        <mo>±<!-- ± --></mo>
        <msqrt>
          <msup>
            <mi>b</mi>
            <mn>2</mn>
          </msup>
          <mo>−<!-- minus sign --></mo>
          <mn>4</mn>
          <mo>⁢<!-- ⁢ --></mo>
          <mi>a</mi>
          <mo>⁢<!-- ⁢ --></mo>
          <mi>c</mi>
        </msqrt>
      </mrow>
      <mrow>
        <mn>2</mn>
        <mo>⁢<!-- ⁢ --></mo>
        <mi>a</mi>
      </mrow>
    </mfrac>
  </mrow>
</math>


```

```bash
node ./index.js
```
<br>

#### Output

![TeX](https://imagedelivery.net/6bSk6wUa9UOwEesJAZQuoA/0d94a865-225d-4599-2eeb-5605350d5900/public)

<br>

![MathMl](https://imagedelivery.net/6bSk6wUa9UOwEesJAZQuoA/82756c46-b74d-4238-6c24-372415ca3000/public)

---





