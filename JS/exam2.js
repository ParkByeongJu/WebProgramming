function checkNumber() {
  let number = prompt("숫자를 입력해주세요.");

  if (isNaN(number)) {
    alert("숫자를 입력해주세요");
  } else if (number < 1 || number > 100) {
    alert("1이상 100이하를 넣어주세요");
  } else {
    for (i = 1; i <= 100; i++) {
      console.log(i);
    }
    alert("완료되었습니다.");
  }
}
