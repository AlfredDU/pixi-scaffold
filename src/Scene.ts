/** main scene */
// imports
import * as PIXI from 'pixi.js'
import Lambda from './Lambda'

// import assets
import PIXI_LOGO_IMG from '/images/pixi.js.png'


/** constants */
// label; id
const SPRITE_NAME = 'my_sprite'

// scalar
const BACKGROUND_COLOR = 0xe7eced
const SPRITE_SIZE_ = 64  // suffix with '_' means it needs to be multiplied by dpr


/** `Scene` class */
export default class Scene {
    /** properties */
    canvas: HTMLCanvasElement
    width: number
    height: number
    dpr: number

    app: PIXI.Application
    rect: PIXI.Rectangle

    sprite?: PIXI.Sprite
    assets: Record<string, string> = {}

    /** convenience getters */
    get stage(): PIXI.Container { return this.app.stage }

    static get bundle(): { name: string, assets: Record<string, string> } {
        return {
            name: 'default',
            assets: {
                pixi_logo: PIXI_LOGO_IMG,
            }
        }
    }

    /** constructor */ 
    constructor(render_canvas: HTMLCanvasElement) {
        // dimension; notice the device pixel ratio
        this.dpr = Lambda.device_dpr
        this.width = window.innerWidth * this.dpr
        this.height = window.innerHeight * this.dpr

        // set canvas size
        render_canvas.width = this.width
        render_canvas.height = this.height
        this.canvas = render_canvas

        // create a PIXI Application
        this.app = new PIXI.Application({
            width: this.width,
            height: this.height,
            antialias: true,
            view: this.canvas,
            // forceCanvas: true,  // force canvas instead of webgl
            backgroundColor: BACKGROUND_COLOR
        })

        this.rect = new PIXI.Rectangle(
            0, 0, this.width, this.height
        )

        // load assets
        PIXI.Assets.addBundle(Scene.bundle.name, Scene.bundle.assets)
        PIXI.Assets.loadBundle(Scene.bundle.name).then(loaded_assets => {
            // assets loaded
            this.assets = loaded_assets

            // init
            this.init()

            // set gesture recognizer
            this.create_interaction()

            // bind game loop
            this.bind_loop()
        })
    }

    // initial draw
    init(): void {
        // create sprite
        this.sprite = PIXI.Sprite.from(this.assets['pixi_logo'])
        this.sprite.name = SPRITE_NAME

        // set size
        this.sprite.width = SPRITE_SIZE_ * this.dpr
        this.sprite.height = SPRITE_SIZE_ * this.dpr

        // set anchor to center instead of left-top
        this.sprite.anchor.set(0.5, 0.5)

        // place to scene center
        this.sprite.position.set(this.width / 2, this.height / 2)

        // interactivity
        this.sprite.eventMode = 'static'

        // show
        this.stage.addChild(this.sprite)
    }

    // game loop
    bind_loop(): void {
        this.app.ticker.add((delta: number) => {
        })
    }

    // gesture recognizer using hammer js
    create_interaction(): void {
        this.sprite!.on('tap', e => {
            console.log('Sprite is tapped!')
        })
    }
}
