/** Init PIXI.js scene when window loaded. */

// imports
import Scene from './Scene'

// constants
const CANVAS_ID = 'renderCanvas'


window.onload = () => {
    console.log('hello')

    // main scene
    new Scene(document.getElementById(CANVAS_ID) as HTMLCanvasElement)
}
