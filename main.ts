scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    2 2 2 2 2 f . . . . . . . . . .
    2 5 5 5 f . . . . . . . . . . .
    2 5 5 f . . . . . . . . . . . .
    3 3 3 3 3 1 1 3 3 3 1 1 3 . . .
    2 5 3 3 3 3 1 1 3 1 1 3 3 3 . .
    2 5 3 3 3 3 3 1 8 1 3 3 3 3 3 .
    2 5 3 3 3 3 3 1 8 1 3 3 3 3 3 .
    2 5 3 3 3 3 1 1 3 1 3 3 3 3 . .
    3 3 3 3 3 1 1 3 3 1 1 3 3 . . .
    2 5 5 f . . . . . . . . . . . .
    2 5 5 5 f . . . . . . . . . . .
    2 2 2 2 2 f . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            1 . 1 . 1 . 1 . 1 . 1 . 1 . . .
            . . . . . . . . . . . . . f f f
            1 . 1 . 1 . 1 . 1 . 1 . 1 . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update() {
    let bogy = sprites.create(img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . f f f f f . . . .
                . . . f f f f f 9 9 9 f f f f .
                . f f f 9 9 9 9 9 9 9 9 9 9 f f
                f f 9 9 9 9 9 9 9 9 9 9 9 9 9 f
                f 9 9 f f 9 9 9 9 9 9 9 9 9 9 f
                f f 9 f f 9 9 9 9 9 9 9 9 9 9 f
                . f 9 9 9 9 9 9 9 9 9 9 9 9 f f
                . f f 9 9 9 9 9 9 9 9 9 9 f f .
                . . f 9 9 9 9 9 9 9 9 f f f . .
                . . f f f f 9 9 9 f f f . . . .
                . . . . . f f f f . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
            `, SpriteKind.Enemy)
    bogy.setVelocity(-1000, randint(-30, 30))
    bogy.y = randint(0, scene.screenHeight())
    bogy.left = scene.screenWidth()
    bogy.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})
