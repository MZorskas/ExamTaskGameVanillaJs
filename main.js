let board = document.getElementById('board');
let select = document.getElementById('select-board-size');
let startButton = document.getElementById('start');
let turnRightButton = document.getElementById('right');
let goForwardButton = document.getElementById('forward');
let direction = 0;

startButton.addEventListener('click', () => {
  direction = 0;
  while (board.hasChildNodes()) {
    board.removeChild(board.lastChild);
  }

  let selectedBoardSize = select.options[select.selectedIndex].value;

  board.className = `x${selectedBoardSize}`;

  for (i = 0; i < selectedBoardSize * selectedBoardSize; i++) {
    board.appendChild(document.createElement('div'));
  }

  board.childNodes.forEach((node) => {
    node.className = 'square';
  });

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    console.log(Math.floor(Math.random() * (max - min + 1)) + min);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let target =
    board.childNodes[
      getRandomInt(selectedBoardSize, selectedBoardSize * selectedBoardSize)
    ];

  target.style.backgroundColor = 'red';
  target.setAttribute('id', 'Target');

  let arrow = document.createElement('img');
  arrow.setAttribute('src', 'images/Arrow.png');
  arrow.setAttribute('height', '40');
  arrow.setAttribute('width', '40');
  arrow.setAttribute('alt', 'Arrow');
  arrow.setAttribute('id', 'Arrow');
  board.appendChild(arrow);
  arrow.style.position = 'absolute';
});

turnRightButton.addEventListener('click', () => {
  console.log(direction);
  let arrow = document.getElementById('Arrow');
  if (direction === 0) {
    arrow.style.transform = 'rotate(90deg)';
    direction = 1;
  } else if (direction === 1) {
    arrow.style.transform = 'rotate(180deg)';
    direction = 2;
  } else if (direction === 2) {
    arrow.style.transform = 'rotate(270deg)';
    direction = 3;
  } else if (direction === 3) {
    arrow.style.transform = 'rotate(360deg)';
    direction = 0;
  }
});

goForwardButton.addEventListener('click', () => {
  console.log(direction);
  let arrow = document.getElementById('Arrow');
  let target = document.getElementById('Target');

  let arrowLeftOffset = arrow.offsetLeft;
  let arrowTopOffset = arrow.offsetTop;
  let targetLeftOffset = target.offsetLeft;
  let targetTopOffset = target.offsetTop;

  let boardWidth = board.getBoundingClientRect().width;
  let boardHeight = board.getBoundingClientRect().height;
  let arrowWidth = arrow.getBoundingClientRect().width;
  let arrowHeight = arrow.getBoundingClientRect().height;

  let distanceToRightWall = boardWidth - arrowWidth - arrowLeftOffset;
  let distanceToBottomWall = boardHeight - arrowHeight - arrowTopOffset;
  const winCondition1 = () => {
    if (
      arrowTopOffset + arrowHeight === targetTopOffset &&
      arrowLeftOffset === targetLeftOffset
    ) {
      target.style.backgroundColor = 'green';
      direction = 5;
    }
  };
  const winCondition2 = () => {
    if (
      arrowLeftOffset + arrowWidth === targetLeftOffset &&
      arrowTopOffset === targetTopOffset
    ) {
      target.style.backgroundColor = 'green';
      direction = 4;
    }
  };

  switch (direction) {
    case 0:
      winCondition2();
      distanceToRightWall === 0
        ? ((arrow.style.transform = 'rotate(90deg)'), (direction = 1))
        : (arrow.style.left = String(arrowLeftOffset + arrowWidth) + 'px');
      break;
    case 1:
      winCondition1();
      distanceToBottomWall === 0
        ? ((arrow.style.transform = 'rotate(180deg)'), (direction = 2))
        : (arrow.style.top = String(arrowTopOffset + arrowHeight) + 'px');
      break;
    case 2:
      winCondition1();
      arrowLeftOffset === 0
        ? ((arrow.style.transform = 'rotate(270deg)'), (direction = 3))
        : (arrow.style.left = String(arrowLeftOffset - arrowWidth) + 'px');
      break;
    case 3:
      winCondition2();
      arrowTopOffset === 0
        ? ((arrow.style.transform = 'rotate(360deg)'), (direction = 0))
        : (arrow.style.top = String(arrowTopOffset - arrowHeight) + 'px');
      break;
  }
});
