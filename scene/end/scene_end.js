class SceneEnd extends GameScene{
    constructor(game) {
        super(game);
        log('game is', game)
        game.registerAction('r', (event) => {
            var s = new SceneTitle(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillText('游戏结束，按r重新开始游戏', 100, 190)
    }
}