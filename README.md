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
