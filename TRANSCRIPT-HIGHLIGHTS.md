## Transcript Highlights

### 1. Planning the localStorage before writing any code
Before starting any code, I asked Claude to help design a schema for all features. This allowed me to clearly plan what data each feature would need and how it would be stored.

### 2. Debugging the reservations form
After wiring up the reservation form, I noticed that clicking "Book Table" only caused a slight scroll and no data was saved upon refresh. The issue was that DOM element references (like form and listEl) were captured before DOMContentLoaded, preventing the submit listener from attaching. Wrapping all relevant code inside DOMContentLoaded fixed the problem.

### 3. Fixing a "function not defined" consode error 
While testing cart functions in the browser console, addToCart caused an Uncaught ReferenceError. The cause was that cart.js had not yet been added to index.html. This was a simple oversight on my part.

### 4. Iterating on the visual design 
The site went through three style passes. First, new fonts and a slightly updated color palette. Second, an emoji was removed, the header color changed, the hero heading font updated, and a pear watermark was added. Third, the fonts were refined further and separated for better readability. Class names were unchanged, so JavaScript functionality remained intact.













