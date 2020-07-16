class SceneTitle extends GameScene{
    constructor(game) {
        super(game);
        log('game is', game)
        game.registerAction('k', (event) => {
            var s = Scene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillText('按k游戏开始', 100, 190)
    }
}