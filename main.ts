namespace userconfig
{
    export const ARCADE_SCREEN_WIDTH  = 30 // 160
    export const ARCADE_SCREEN_HEIGHT = 30 // 120
}
/*
 * 6-bit colors (transparent = black)
 * want 10 x 10 screen
 * need 30 x 30 screen
 * 
 * Hex6ToRGB
 *     each color = 0 - 5 (5 is lightest, 0 is darkest)
 *     | = next line
 * ex. 
 * 000 100 200 300 400 500 |\
 * 000 010 020 030 040 050 |\ // acts as below
 * 000 001 002 003 004 005
 * or (acts as below)
 * 000 100 200 300 400 500 | 000 010 020 030 040 050 | 000 001 002 003 004 005
 * or // how it will be formated
 * 000100200300400500|000010020030040050|000001002003004005
 * converts to RGBs
 * 
 * if formatted wrong, it will return blank image
*/

/*
let example1 = sprites.create(img`
    . . b . . c . . d . . e . . f
    . . b . . c . . d . . e . . f
    . . b . . c . . d . . e . . f
    . 6 . . 7 . . 8 . . 9 . . a .
    . 6 . . 7 . . 8 . . 9 . . a .
    . 6 . . 7 . . 8 . . 9 . . a .
    1 . . 2 . . 3 . . 4 . . 5 . .
    1 . . 2 . . 3 . . 4 . . 5 . .
    1 . . 2 . . 3 . . 4 . . 5 . .
`, SpriteKind.Player)
*/
/*
let mySprite = sprites.create(img`
    1 a .
    1 a .
    1 a .
`, SpriteKind.Player)
*/
/*
let example3 = sprites.create(Hex6ToRGB("
    500400300200100000|
    050040030020010000|
    005004003002001000")
, SpriteKind.Player)
*/
/* how to use:
 * make a basic image with:
 * 1.  the colors you choose from are the colors given
 * 2.  the width and height of the image is a multiple of 3
 * 1.  one "pixel" is a 3x3 pixel contaning:
 *     a.  3 reds in the left column
 *     b.  3 greens in the middle column
 *     c.  3 blues in the right column
 * 3.  you have to reimagine the colors in a 3-digit code:
 *     a. for one pixel, look at example2.
 *         for red, you have a 5
 *         for green, you have a 1
 *         for blue, you have a 0
 * 4. make a string (example3)
 *  I highly recommend using a bigger screen than 3x3, and
 *  try to make the sprites / whatever move 3 pixels
 *  instead of 1
*/

function Hex6ToRGB(Hex6: string) {
    let rgbImg: Image
    Hex6 = Hex6.replaceAll(" ", "")
 
    let width:  number = -1
    let height: number = -1
    let lastl:  number = -1
    let lcount: number = 0
    for (let i = 0; i < Hex6.length; i++) {
        if (Hex6.charAt(i) == "|") {
            width = Math.max(((i - 1) - (lastl + 1) + 1) / 3, width)
            lastl = i
            lcount++
        }
    }
    height = lcount + 1

    console.log(width)
    if (width <= 0 || height <= 0) {
        return image.create(0, 0)
    }
    rgbImg = image.create(width * 3, height * 3)

    let row: number = 0
    let col: number = 0
    let num: number = 0
    let r: number
    let g: number
    let b: number

    for (let i = 0; i < Hex6.length; i++) {
        if (Hex6.charAt(i) == "|") {
            col+=3
            num = 0; // r
            row = 0
            continue
        }
        switch(num) {
            case 0:
                r = parseInt(Hex6.charAt(i))
                break
            case 1:
                g = parseInt(Hex6.charAt(i))
                break
            case 2:
                b = parseInt(Hex6.charAt(i))
                break
            default:
                r = parseInt(Hex6.charAt(i))
                break
        }
        num++
        if(num > 2) {
            num = 0

            let r0: boolean = r == 0
            let g0: boolean = g == 0
            let b0: boolean = b == 0

            rgbImg.drawLine(row,     col, row,     col + 2,   r == 0 ? 0 : r     )
            rgbImg.drawLine(row + 1, col, row + 1, col + 2,   g == 0 ? 0 : g + 5 )
            rgbImg.drawLine(row + 2, col, row + 2, col + 2,   b == 0 ? 0 : b + 10)            
        }
        row++
    }
    return rgbImg
}


// 34957342895673473425873475732475734265432573458934658324893479534763263599347587345

/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */

//% color="#AA278D" weight=100
namespace Hex6 {
    /*
    let example1 = sprites.create(img`
        . . b . . c . . d . . e . . f
        . . b . . c . . d . . e . . f
        . . b . . c . . d . . e . . f
        . 6 . . 7 . . 8 . . 9 . . a .
        . 6 . . 7 . . 8 . . 9 . . a .
        . 6 . . 7 . . 8 . . 9 . . a .
        1 . . 2 . . 3 . . 4 . . 5 . .
        1 . . 2 . . 3 . . 4 . . 5 . .
        1 . . 2 . . 3 . . 4 . . 5 . .
    `, SpriteKind.Player)
    */
    /*
    let mySprite = sprites.create(img`
        1 a .
        1 a .
        1 a .
    `, SpriteKind.Player)
    */
    /*
    let example3 = sprites.create(Hex6ToRGB("
        500400300200100000|
        050040030020010000|
        005004003002001000")
    , SpriteKind.Player)
    */
    /* how to use:
     * make a basic image with:
     * 1.  the colors you choose from are the colors given
     * 2.  the width and height of the image is a multiple of 3
     * 1.  one "pixel" is a 3x3 pixel contaning:
     *     a.  3 reds in the left column
     *     b.  3 greens in the middle column
     *     c.  3 blues in the right column
     * 3.  you have to reimagine the colors in a 3-digit code:
     *     a. for one pixel, look at example2.
     *         for red, you have a 5
     *         for green, you have a 1
     *         for blue, you have a 0
     * 4. make a string (example3)
     *  I highly recommend using a bigger screen than 3x3, and
     *  try to make the sprites / whatever move 3 pixels
     *  instead of 1
    */

    //% block
    export function ToRGB(Hex6: string) {
        let rgbImg: Image
        Hex6 = Hex6.replaceAll(" ", "")

        let width: number = -1
        let height: number = -1
        let lastl: number = -1
        let lcount: number = 0
        for (let i = 0; i < Hex6.length; i++) {
            if (Hex6.charAt(i) == "|") {
                width = Math.max(((i - 1) - (lastl + 1) + 1) / 3, width)
                lastl = i
                lcount++
            }
        }
        height = lcount + 1

        console.log(width)
        if (width <= 0 || height <= 0) {
            return image.create(0, 0)
        }
        rgbImg = image.create(width * 3, height * 3)

        let row: number = 0
        let col: number = 0
        let num: number = 0
        let r: number
        let g: number
        let b: number

        for (let i = 0; i < Hex6.length; i++) {
            if (Hex6.charAt(i) == "|") {
                col += 3
                num = 0; // r
                row = 0
                continue
            }
            switch (num) {
                case 0:
                    r = parseInt(Hex6.charAt(i))
                    break
                case 1:
                    g = parseInt(Hex6.charAt(i))
                    break
                case 2:
                    b = parseInt(Hex6.charAt(i))
                    break
                default:
                    r = parseInt(Hex6.charAt(i))
                    break
            }
            num++
            if (num > 2) {
                num = 0

                let r0: boolean = r == 0
                let g0: boolean = g == 0
                let b0: boolean = b == 0

                rgbImg.drawLine(row, col, row, col + 2, r == 0 ? 0 : r)
                rgbImg.drawLine(row + 1, col, row + 1, col + 2, g == 0 ? 0 : g + 5)
                rgbImg.drawLine(row + 2, col, row + 2, col + 2, b == 0 ? 0 : b + 10)
            }
            row++
        }
        return rgbImg
    }
}