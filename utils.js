const log = console.log.bind(console)

const imageFromPath = (path) => {
    let img = new Image()
    img.src = path
    return img
}

const reactIntersects = (a, b) => {
    if (b.y > a.y && b.y < a.y + a.image.height && b.x > a.x && b.x < a.x + a.image.width) {
        return true
    } else {
        return false
    }
}
