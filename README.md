# natours

A website development attempt to learn CSS

# TakeAways

## background image with gradient on top

```css
background-image: linear-gradient(
    to right bottom,
    rgba(127, 213, 103, 0.8),
    rgba(40, 180, 133, 0.8)
  ), url(../img/hero.jpg);
```

## background image adjustment

```css
/* background-size;cover covers the container with image */
background-size: cover;
/* background position:top keeps the image top in view always */
background-position: top;
```

## make shapes of the background

```css
/* the x and y positions of the sides of the polygon */
clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
```

[clippy](https://bennettfeely.com/clippy/) - a small tool to make clip-paths on the go.(not golang, I meant fast & easy)

## center an element in a div - absolutely

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

## center the inline-block elements

```css
text-align: center;
```

## define an animation

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

## multiple properties of an animation

```css
#el {
  transform: scaleX(1.2) scaleY(1.6) rotate(45deg);
}
```

# How CSS Works

## **Importance > Specificity > Source Order**

### Importance Order

1. User !important declarations
2. Author !important declarations
3. Author declarations
4. User declarations
5. Default browser declarations

### Specificity Order

1. Inline styles
2. IDs
3. Classes, pseudo-classes, attribute
4. Elements, pseudo-elements

### Source Order

The last declaration in the code will apply if the Importance and specificity of the declaration are the same.

## Key points

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

## Good Practices to declare selectors

### with or without adding specificity

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

# How is CSS Parsed?

## Processing

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

### Key Points -

- each property has initial value, used if nothing is declared (or inherited).
- Browsers specify a root-font-size for each page(usually 16px).
- Percentages and relative values are always converted to pixels.
- Percentages are measured relative to their parent's font-size, if used to specify font-size.
- Percentages are measured relative to their parent's **width**, if used to specify lengths.
- **em** are measured relative to their parent **font-size**,if used to specify **font-size**.
- **em** are measured relative to their current **font-size** if used to specify **lengths**.
- **rem** are always measured relative to the **document's root** **font-size**.
- vh and vw are simply percentage measurements of the viewport height and width respectively.

## Inheritance

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

### Key Points

- Inherited value of line-height of child element is the computed value of parent element(20\*1.5=30px)
- Inheritance passes the values for some specific properties from parents to children - more maintainable code.
- Properties related to text are inherited: font-family, font-size, color, etc.
- The **computed value** of a property is **inherited**, _not the declared value_.
- Inheritance of a property only works if no one declares a value for that property.
- The **inherit** keyword forces inheritance of a certain property;
- The **initial** keyword resets a property to its initial value.
