# natours

A website development attempt to learn CSS

## Run Locally

```bash
npm i

##either
npm run dev

##or
##npm run compile:sass
##npm run live-reload
```

## TakeAways

### background image with gradient on top

```css
background-image: linear-gradient(
    to right bottom,
    rgba(127, 213, 103, 0.8),
    rgba(40, 180, 133, 0.8)
  ), url(../img/hero.jpg);
```

### background image adjustment

```css
/* background-size;cover covers the container with image */
background-size: cover;
/* background position:top keeps the image top in view always */
background-position: top;
```

### make shapes of the background

```css
/* the x and y positions of the sides of the polygon */
clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
```

[clippy](https://bennettfeely.com/clippy/) - a small tool to make clip-paths on the go.(not golang, I meant fast & easy)

### center an element in a div - absolutely

```css
#parent {
  position: relative;
}
#child {
  position: absolute;
  top: 50%;
  left: 50%;
  /* starts the element from 50% height and 50% width of the parent */

  transform: translate(-50%, -50%);
  /* pulls back the element 50% of it's own height and 50% of it's own width to overall pull it's own center to match the center of the parent */
}
```

### center the inline-block elements

```css
text-align: center;
```

### define an animation

```css
@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }

  80% {
    transform: translateX(10px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
/* now we can use moveInLeft anywhere like */

#el {
  animation-name: moveInLeft;
  animation-duration: 0.2s;
  animation-function: ease-out;
  animation-delay: 0.75s;

  animation-fill-mode: backwards;
  /* animation-fill-mode specifies the state of element before the animation starts(because of animation-delay) */
  /* backwards specifies that the state of element before the animation starts should be the same as initial state of the animation */

  /* or */

  animation: moveInLeft 0.2s ease-out 0.75 backwards;
}
```

### multiple properties of an animation

```css
#el {
  transform: scaleX(1.2) scaleY(1.6) rotate(45deg);
}
```

## How CSS Works

### **Importance > Specificity > Source Order**

#### Importance Order

1. User !important declarations
2. Author !important declarations
3. Author declarations
4. User declarations
5. Default browser declarations

#### Specificity Order

1. Inline styles
2. IDs
3. Classes, pseudo-classes, attribute
4. Elements, pseudo-elements

#### Source Order

The last declaration in the code will apply if the Importance and specificity of the declaration are the same.

### Key points

- directly targeted elements have higher precedence than inherited styles

  ```html
  <div id="parent">
    <h1>Heading</h1>
  </div>
  ```

  ```css
  * {
    color: red; /* specificity (0-0-0) */
  }

  #parent {
    color: green;
  }

  h1 {
    color: purple; /* purple wins */
  }
  ```

- !important needs to be avoided as much as possible.

- these pseudo-classes themselves don't add any weight to the specificity of the selector.

  ```css
  :not() /*negation pseudo-class */
  :is() /*matches any pseudo-class */
  :has() /*relational pseudo-class */
  ```

  but the specifiers present inside them do add their own weight to the specificity of the selector.

- :where() pseudo-class makes the specificity of the specifiers within it to be (0-0-0);

  ```css
  :where(#id .class div) a ; /* (0-0-0) + (0-0-1) = (0-0-1)
  ```

### Good Practices to declare selectors

#### with or without adding specificity

```css
#myContent h1 {
  color: green; /* 1-0-1 */
}

/* reducing id specificity */
[id="myContent"] h1 {
  color: yellow; /* 0-1-1 */
}
:where(#myContent) h1 {
  color: blue; /* 0-0-1 */
}

/* increasing specificity - NOTE: use sparingly*/
#myId#myId#myId span {
  /* 3-0-1 */
}
.myClass.myClass.myClass span {
  /* 0-3-1 */
}
:not(#fakeID#fakeId#fakeID) span {
  /* 3-0-1 */
}
:is(#fakeID#fakeId#fakeID, span) {
  /* 3-0-0 */
}
```

## How is CSS Parsed?

### Processing

```css
1 rem = 1 \* 16px; /* 16px is browser default font-size of root element */
```

1. % (fonts): x% \* parent's computed font-size
2. % (length) : x% \* parent's computed width
3. em(font) : x\* parent computed font-size
4. em(length): x\* current element computed font-size
5. rem: x\* root computed font-size
6. vh: x\*1% of viewport height
7. vw: x \* 1% of viewport weight

#### Key Points -

- each property has initial value, used if nothing is declared (or inherited).
- Browsers specify a root-font-size for each page(usually 16px).
- Percentages and relative values are always converted to pixels.
- Percentages are measured relative to their parent's font-size, if used to specify font-size.
- Percentages are measured relative to their parent's **width**, if used to specify lengths.
- **em** are measured relative to their parent **font-size**,if used to specify **font-size**.
- **em** are measured relative to their current **font-size** if used to specify **lengths**.
- **rem** are always measured relative to the **document's root** **font-size**.
- vh and vw are simply percentage measurements of the viewport height and width respectively.

### Inheritance

```css
.parent {
  font-size: 20px;
  line-height: 150%;
  /* the line-height computed value will be 150/100 * 20px = 30px; */
}

.child {
  font-size: 25px;
  /* inherited line height will be 30px*/
  /* NOT 150% */
}
```

#### Key Points

- Inherited value of line-height of child element is the computed value of parent element(20\*1.5=30px)
- Inheritance passes the values for some specific properties from parents to children - more maintainable code.
- Properties related to text are inherited: font-family, font-size, color, etc.
- The **computed value** of a property is **inherited**, _not the declared value_.
- Inheritance of a property only works if no one declares a value for that property.
- The **inherit** keyword forces inheritance of a certain property;
- The **initial** keyword resets a property to its initial value.

## Visual Formatting Model

### Box Model

- content area width\*height (text content)
- fill area width \* height + padding (background images, background color)

- `box-sizing: border-box` height and width include the padding of the box

### Box Types

#### Block-level boxes

- elements formatted visually as blocks.
- 100% of parents width.
- vertically one after another.

```css
display: block;
display: flex;
display: list-item;
display: table;
```

#### Inline boxes

- Content is distributed in lines.
- Occupies only content space.
- No line-breaks
- **No heights and widths**.
- **paddings and margins only horizontal(left and right)**

```css
display: inline;
```

#### Inline block boxes

- A mix of block and inline.
- Occupies only content space.
- No line-breaks.

```css
display: inline-block;
```

### Positioning Schemes

#### Normal Flow

- default positioning scheme.
- elements laid out according to their source order.

```css
position: relative;
/* top, right left and bottom properties can still be used on relative to displace
 it from its position from normal document flow */
```

#### Floats

- Element is removed from normal flow.
- Text and inline elements will wrap around the floated element.
- the container will not adjust it's height according to the floated element. to fix this we use clear-fixes.

```css
float: left;
float: right;
```

#### Absolute Positioning

- Element is removed from normal flow
- No impact on surrounding content or elements.
- we use top, bottom, left and right ot offset the element from it's relatively positioned container.

```css
position: absolute; /* positions wrt to it's position:relative ancestor */
position: fixed; /* positions wrt to the viewport of screen regardless of scroll */
```

#### Stacking Contexts

- z-index creates stacking contexts.
- also other things like opacity value other than 1, transform , filter and other properties cause stacking context.

## Think Build Architect

### Think

- Clean
- Modular
- Reusable
- Ready for growth

layout - naming classes - good folders structure

#### Component Driven Design

- **Modular building blocks** that make up interfaces.
- Held together by the **layout** of the page.
- **Re-usable** across the project, and between different projects.
- **Independent**, allowing us to use them anywhere on the page.

### Build

#### B--E\_\_M

- Block Element Modifier
- BLOCK - standalone component that is meaningful on its own.
- ELEMENT - part of block that has no standalone meaning.
- MODIFIER - a different version of a block or an element.

```css
.block {
}
.block--element {
}
.block--element__modifier {
}
```

### Architect

The seven folders

1. base/ _basic project definitions_
2. components/ _a file for every component_
3. layout/ _overall layout of the project_
4. pages/ _styles for specific pages of the project_
5. themes/ _if the project has different visual themes_
6. abstracts/ _the code which doesn't output any css, variables and mixins_
7. vendors/ _all the third party css_

## SASS

- **Variables**: for reusable values such as colors, font-sizes, spacing, etc.
- **Nesting**: to nest selectors inside of one another, allowing us to write less code.
- **Operators**: mathematical operators right inside CSS.
- **Partials and imports**: write different files and importing them all into one single file.
- **Mixins**: to write reusable pieces of CSS code.
- **Functions**: similar to mixins, with the difference that they produce a value that can be used.
- **Extends**: to make different selectors inherit declarations that are common to all of them.
- **Control Directives**: for writing complex code using conditionals and loops (not covered in this course).

### Making a navbar with SCSS syntax (Sassy CSS)

[click here to view the codepen](https://codepen.io/templar-command0/pen/wvRgzwa)

```html
<nav>
  <ul class="navigation">
    <li><a href="#">About Us</a></li>
    <li><a href="#">Pricing</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
  <div class="buttons">
    <a class="btn-main" href="#">Sign Up</a>
    <a class="btn-hot" href="#">Get a quote</a>
  </div>
</nav>
```

```scss
* {
  margin: 0;
  padding: 0;
}

$color-primary: #f9ed69; // yellow
$color-secondary: #f08a5d; //orange
$color-tertiary: #b83b5e; //pink
$color-text-dark: #333;
$color-text-light: #fff;

$width-button: 150px;

@mixin clearfix {
  &::after {
    //clearfix
    content: "";
    clear: both;
    display: table;
  }
}

@mixin style-link-text($color) {
  text-decoration: none;
  text-transform: uppercase;
  color: $color;
}

@function divide($a, $b) {
  @return $a/$b;
}

nav {
  margin: divide(60, 2) * 1px; // 30px;
  background-color: $color-primary;

  @include clearfix;
}

.navigation {
  list-style: none;
  float: left;

  li {
    display: inline-block;
    margin-left: 30px;

    &:first-child {
      margin: 0;
    }

    a:link {
      @include style-link-text($color-text-dark);
    }
  }
}

%btn-placeholder {
  padding: 10px;
  display: inline-block;
  border-radius: 100px;
  text-align: center;
  width: $width-button;

  @include style-link-text($color-text-light);
}

.buttons {
  float: right;

  .btn-main {
    &:link {
      @extend %btn-placeholder;
      background-color: $color-secondary;
    }
    &:hover {
      background-color: darken($color-secondary, 15%);
    }
  }

  .btn-hot {
    &:link {
      @extend %btn-placeholder;
      background-color: $color-tertiary;
    }
    &:hover {
      background-color: lighten($color-tertiary, 5%);
    }
  }
}
```

compiled css

```css
* {
  margin: 0;
  padding: 0;
}

nav {
  margin: 30px;
  background-color: #f9ed69;
}
nav::after {
  content: "";
  clear: both;
  display: table;
}

.navigation {
  list-style: none;
  float: left;
}
.navigation li {
  display: inline-block;
  margin-left: 30px;
}
.navigation li:first-child {
  margin: 0;
}
.navigation li a:link {
  text-decoration: none;
  text-transform: uppercase;
  color: #333;
}

.buttons .btn-hot:link,
.buttons .btn-main:link {
  padding: 10px;
  display: inline-block;
  border-radius: 100px;
  text-align: center;
  width: 150px;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
}

.buttons {
  float: right;
}
.buttons .btn-main:link {
  background-color: #f08a5d;
}
.buttons .btn-main:hover {
  background-color: #ea5717;
}
.buttons .btn-hot:link {
  background-color: #b83b5e;
}
.buttons .btn-hot:hover {
  background-color: #c4486b;
}
```

#### Note

##### the difference between extend and mixin

```scss
// scss

$color-text-dark: #1a1a1a;

@mixin style-link-text($color) {
  text-transform: uppercase;
  color: $color;
}

%remove-underline {
  text-decoration: none;
}

a:link {
  extend %remove-underline;
  @include style-link-text($color-text-dark);
}

.btn {
  extend %remove-underline;
  @include style-link-text(#eee);
}
```

```css
/* output css */

a:link,
.btn {
  text-decoration: none;
}

a:link {
  text-transform: uppercase;
  color: #1a1a1a;
}
.btn {
  text-transform: uppercase;
  color: #eee;
}
```

### Command Line

- `open xyz.jpg` opens the file in the supported software.

## BASIC RESPONSIVE DESIGN PRINCIPLES

- FLUID LAYOUTS
- RESPONSIVE UNITS
- FLEXIBLE IMAGES
- MEDIA QUERIES

### FLUID LAYOUTS

- To allow webpage to adapt to the current viewport width (or even height)
- Use `%`(or vh/vw) unit instead of `px` for elements that should adapt to viewport (usually layout)

- Use `max-width` instead of `width`

## RESPONSIVE UNITS

- Use `rem` unit instead of `px` for most lengths.
- To make it easy to scale the entire layout down (or up) automatically.

## FLEXIBLE IMAGES

- By default, images don't scale automatically as we change the viewport, so we need to fix that
- Always use `%` for images dimensions, together with the `max-width` property

## MEDIA QUERIES

- To change CSS styles on certain viewport widths (called breakpoints)

## LAYOUT TYPES

1. Float Layouts
2. Flexbox
3. CSS Grid
