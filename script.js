// 게임 초기화 함수
function initGame() {
    console.log("Card Matching Game Loaded!");
  
    // DOM 요소 가져오기
    const gameContainer = document.getElementById("game-container");
  
    if (gameContainer) {
      // 클릭 이벤트 등록
      gameContainer.addEventListener("click", () => {
        alert("Game Container Clicked!");
      });
    } else {
      console.error("Game container not found!");
    }
  }
  
  // 초기화 함수 실행
  initGame();
  