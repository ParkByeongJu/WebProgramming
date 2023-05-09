function exam1() {
  var text = prompt("이름을 입력해주세요");
  if (text === null) {
    var text = prompt("이름을 입력해주세요");
    if (text === null) var text = prompt("이름을 입력해주세요");
    else alert(text + "님 안녕하세요");
  } else alert(text + "님 안녕하세요");
}
