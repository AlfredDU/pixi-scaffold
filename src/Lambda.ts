/** static functions */

export default class Lambda {

    // color hex string to number
    static hex(color: string): number {
        color = color.replace(/#/g, '')
        return parseInt(color, 16)
    }

    // device dpr
    static device_dpr(): number {
        return window.devicePixelRatio
    }
}