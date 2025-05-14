const {

  Application,
  Container,
  Assets,
  Sprite,
  Texture,
  Ticker,
  Rectangle
} = PIXI;

let app;
const gridSize = 3;
const tileSize = 200;
const empty = { x: 2, y: 2 };
let tiles = [];
let textures = [];
textures[0] = [];
textures[1] = [];
textures[2] = [];
textures[0][0] = await Assets.load('/assets/images/1.png');
textures[0][1] = await Assets.load('/assets/images/2.png');
textures[0][2] = await Assets.load('/assets/images/3.png');
textures[1][0] = await Assets.load('/assets/images/4.png');
textures[1][1] = await Assets.load('/assets/images/5.png');
textures[1][2] = await Assets.load('/assets/images/6.png');
textures[2][0] = await Assets.load('/assets/images/7.png');
textures[2][1] = await Assets.load('/assets/images/8.png');
textures[2][2] = await Assets.load('/assets/images/9.png');


(async () => {
  app = new Application();
  await app.init({
    width: 600,
    height: 600,
    backgroundAlpha: 0.2
  });

  document.getElementById("FourthGame").appendChild(app.canvas);
  resize();

  const texture = await Assets.load('assets/images/thigh.jpg');
  const baseTexture = texture.baseTexture;

  const tileWidth = baseTexture.width / gridSize;
  const tileHeight = baseTexture.height / gridSize;

  const tileContainer = new Container();
  app.stage.addChild(tileContainer);

  for (let y = 0; y < gridSize; y++) {
    tiles[y] = [];
    for (let x = 0; x < gridSize; x++) {
      if (x === empty.x && y === empty.y) {
        tiles[y][x] = null;
        continue;
      }

      const frame = new Rectangle(
        x * tileWidth,
        y * tileHeight,
        tileWidth,
        tileHeight
      );

      const tileTexture = new Texture(textures[x][y]);
      const sprite = new Sprite(tileTexture);

      sprite.x = x * tileSize;
      sprite.y = y * tileSize;
      sprite.width = tileSize;
      sprite.height = tileSize;
      sprite.gridX = x;
      sprite.gridY = y;

      sprite.eventMode = 'static';
      sprite.cursor = 'pointer';
      sprite.on('pointerdown', () => tryMove(sprite));

      tileContainer.addChild(sprite);
      tiles[y][x] = sprite;
    }
  }

  shuffleBoard();
})();

function tryMove(tile) {
  const dx = Math.abs(tile.gridX - empty.x);
  const dy = Math.abs(tile.gridY - empty.y);

  if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
    const oldX = tile.gridX;
    const oldY = tile.gridY;

    tiles[empty.y][empty.x] = tile;
    tiles[oldY][oldX] = null;

    tile.gridX = empty.x;
    tile.gridY = empty.y;

    animateMove(tile, tile.gridX, tile.gridY);

    empty.x = oldX;
    empty.y = oldY;
  }
}

function animateMove(sprite, targetGridX, targetGridY) {
  const targetX = targetGridX * tileSize;
  const targetY = targetGridY * tileSize;

  const speed = 10;
  const ticker = new Ticker();
  ticker.add(() => {
    const dx = targetX - sprite.x;
    const dy = targetY - sprite.y;

    if (Math.abs(dx) < speed && Math.abs(dy) < speed) {
      sprite.x = targetX;
      sprite.y = targetY;
      ticker.stop();
      return;
    }

    sprite.x += dx * 0.2;
    sprite.y += dy * 0.2;
  });
  ticker.start();
}

function shuffleBoard() {
  for (let i = 0; i < 100; i++) {
    const movable = getMovableTiles();
    const tile = movable[Math.floor(Math.random() * movable.length)];
    if (tile) {
      const oldX = tile.gridX;
      const oldY = tile.gridY;

      tiles[empty.y][empty.x] = tile;
      tiles[oldY][oldX] = null;

      tile.gridX = empty.x;
      tile.gridY = empty.y;
      tile.x = tile.gridX * tileSize;
      tile.y = tile.gridY * tileSize;

      empty.x = oldX;
      empty.y = oldY;
    }
  }
}

function getMovableTiles() {
  const result = [];
  const { x, y } = empty;
  const offsets = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  for (const [dx, dy] of offsets) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
      const tile = tiles[ny][nx];
      if (tile) result.push(tile);
    }
  }
  return result;
}

function resize() {
  const parent = app.view.parentNode;
  app.renderer.resize(parent.clientWidth, parent.clientHeight);
}

window.addEventListener("resize", resize);
window.onload = () => resize();
