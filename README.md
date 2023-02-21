# TETRIVOICE: TETRIS OF THE FUTURE
A variation of Tetris built in 3D and played with your voice.

&nbsp;

---
#### :warning: **Chrome works best and is the only browser supported by default.** :warning:

###### Refer to [this documentation](https://wiki.mozilla.org/Web_Speech_API_-_Speech_Recognition#How_can_I_use_it.3F) for enabling Firefox support and [this documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#Browser_compatibility) for checking compatibility of other browsers.

---
&nbsp;

### Libraries Used
---
* [Three.js](https://threejs.org/)
* [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
* [Cannon.js](https://schteppe.github.io/cannon.js/) (for collisions and physics modes)

### Other Third Party Content
---
##### Music
[Game Tunes by Various Artists (Enough Records)](https://archive.org/details/Game_Tunes-14289/)


...some feedbacks on the itch.io:

I couldn’t get my voice recognised. Even with Chromium (thanks for the link to Firefox documentation).

 
Sorry to hear that, but thanks for trying! From what I remember testing on my Ubuntu installation (where I did not want to install Chrome initially), Chromium did not work for me either. While Firefox worked once the settings changes were made, it seems to only recognize one word/phrase and then stop listening. If you want to confirm this you can open up the browser console and it should be relaying any recognized words/statements back to you.

As far as I know these issues are due to current limitations in the Web Speech API and Firefox not working with continuous recognition. I want to continue improving the game so I will be attempting to swap to a universal voice recognition API and try to ensure it's working in as many browsers as possible. 
