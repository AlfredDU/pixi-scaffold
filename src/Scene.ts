///<reference path="./default.d.ts" />
import Lambda from './Lambda'

/** constants */
// label; id
const SPRITE_NAME = 'my_sprite'

// assets; use 'require' for webpack packing work
const PIXI_LOGO_URL = require('../images/pixi.js.png')

// scalar
const SPRITE_SIZE_x = 64  // suffix with '_x' means it needs to be multiplied by dpr


/** Main scene. */
export default class Scene {
    // properties
    canvas: HTMLCanvasElement
    width: number
    height: number
    dpr: number

    app: PIXI.Application
    rect: PIXI.Rectangle

    sprite: PIXI.Sprite

    // for convenience
    get stage(): PIXI.Container {
        if (this.app === undefined) {
            return undefined
        }

        return this.app.stage
    }

    get interaction(): PIXI.interaction.InteractionManager {
        return this.app.renderer.plugins.interaction
    }

    static get assets(): Array<string> {
        return [
            PIXI_LOGO_URL
        ]
    }

    // constructor
    constructor(render_canvas: HTMLCanvasElement) {
        // dimension; mind the retina display
        this.dpr = Lambda.device_dpr()
        this.width = window.innerWidth * this.dpr
        this.height = window.innerHeight * this.dpr

        // set canvas size
        render_canvas.width = this.width
        render_canvas.height = this.height
        this.canvas = render_canvas

        // skip hello
        PIXI.utils.skipHello()

        // create a PIXI Application
        this.app = new PIXI.Application({
            width: this.width,
            height: this.height,
            antialias: true,
            // resolution: this.dpr,
            view: this.canvas,
            forceCanvas: true,  // force canvas instead of webgl
            backgroundColor: 0xe7eced
        })

        this.rect = new PIXI.Rectangle(
            0, 0, this.width, this.height
        )

        // load asset progress
        PIXI.loader.add(Scene.assets)
            .on('progress', (loader, resource) => {
                //Display the file `url` currently being loaded
                console.log("loading: " + resource.url)

                //Display the percentage of files currently loaded
                console.log("progress: " + loader.progress + "%")
            })

            // create fire sprite
            .load(() => {
                // init
                this.init()

                // set gesture recognizer
                this.create_gesture()

                // bind game loop
                // this.bind_loop()
            })
    }

    // draw
    init(): void {
        // create sprite
        this.sprite = new PIXI.Sprite(
            PIXI.loader.resources[PIXI_LOGO_URL].texture
        )
        this.sprite.name = SPRITE_NAME

        // set size
        this.sprite.width = SPRITE_SIZE_x * this.dpr
        this.sprite.height = SPRITE_SIZE_x * this.dpr

        // set anchor to center instead of left-top
        this.sprite.anchor.set(0.5, 0.5)

        // place to scene center
        this.sprite.position.set(this.width / 2, this.height / 2)

        // interactivity
        this.sprite.interactive = true

        // show
        this.stage.addChild(this.sprite)
    }

    // game loop
    bind_loop(): void {
        this.app.ticker.add((delta: number) => {
        })
    }

    // gesture recognizer using hammer js
    create_gesture(): void {
        const recognizer_manager = new Hammer.Manager(this.canvas)

        // Add Tap gesture recognizer
        recognizer_manager.add(new Hammer.Tap({}))
        recognizer_manager.on('tap', (e) => {
            this.on_tap(e.center.x * this.dpr, e.center.y * this.dpr)
        })
    }

    // tap callback
    on_tap(x: number, y: number): void {
        const hit = this.interaction.hitTest(new PIXI.Point(x, y))

        if (hit) {
            console.log(hit.name)
        }

    }
}
