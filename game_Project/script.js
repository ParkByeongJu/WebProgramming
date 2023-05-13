$(function () {
  // 초기값 설정
  const jin = {
    element: $("#jin"),
    health: 10,
    power: 1,
  };
  const kazuya = {
    element: $("#kazuya"),
    health: 10,
    power: 1,
  };

  gameStart();

  function gameStart() {
    setKeyboardEvent();
    checkCollision();
    checkGameover();
  }

  // 충돌 감지
  function checkCollision(jin, kazuya) {
    let jinTop = jin.position().top;
    let jinLeft = jin.position().left;
    let jinWidth = jin.width();
    let jinHeight = jin.height();
    let kazuyaTop = kazuya.position().top;
    let kazuyaLeft = kazuya.position().left;
    let kazuyaWidth = kazuya.width();
    let kazuyaHeight = kazuya.height();
    if (
      jinLeft + jinWidth >= kazuyaLeft &&
      jinLeft <= kazuyaLeft + kazuyaWidth &&
      jinTop + jinHeight >= kazuyaTop &&
      jinTop <= kazuyaTop + kazuyaHeight
    ) {
      return true;
    } else {
      return false;
    }
  }

  // 결과 출력
  function printResult(result) {
    if (result == "jin") {
      alert("Jin Wins!");
    } else {
      alert("Kazuya Wins!");
    }
    location.reload();
  }

  // 키 입력 처리
  function setKeyboardEvent() {
    let jinLeft, kazuyaLeft;
    $(document).keydown(function (e) {
      switch (e.key) {
        case "a": // A
          jinLeft = jin.position().left;
          jin.css("left", jinLeft - 10);
          break;
        case "d": // D
          jinLeft = jin.position().left;
          jin.css("left", jinLeft + 10);
          break;
        case "arrowleft": // 왼쪽 화살표
          kazuyaLeft = kazuya.position().left;
          kazuya.css("left", kazuyaLeft - 10);
          break;
        case "arrowright": // 오른쪽 화살표
          kazuyaLeft = kazuya.position().left;
          kazuya.css("left", kazuyaLeft + 10);
          break;
      }
      if (checkCollision(jin, kazuya)) {
        if (jin.health > kazuya.health) {
          printResult("jin");
        } else {
          printResult("kazuya");
        }
      }
    });
  }
});
