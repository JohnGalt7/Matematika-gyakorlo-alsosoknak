"use strict";
////////////////////////////////
//DATA STORAGE
//Main object for storing data

const exampleObject = {
  playerName: "",
  selectedType: new Set([]), //user choosen math example types listed in
  setToArr: [], //the above set sorted to array
  selectedOrder: [], //[choosen order method, counter for orderly call, returned value of selector fn]
  selectedForm: "", //user selected form of examples
  addAndSubOptions: [], //user defined options for additions and subtractions like: [minNum, maxNum]
  multAndDivOptions: [], //user defined options for multiplicaton, division and rem.division like: [1,2,3,4,5]
  answer: [], //the answer of the current example; contains one or two elements (remDiv->2)
  highScoreCounter: 0,
};

/// turn evaluator ///
//becomes true upon pushing new example button and turns false on providing correct answer(s);
//determining active and inactive buttons
let waitingForAnswer = false;

const changingActivity = () => {
  if (waitingForAnswer == false) {
    waitingForAnswer = true;
    checkExample.classList.remove("button_inactive");
    newExample.classList.add("button_inactive");
  } else if (waitingForAnswer == true) {
    waitingForAnswer = false;
    checkExample.classList.add("button_inactive");
    newExample.classList.remove("button_inactive");
  }
};
/////////////////////////////////
// arrays to fill text examples
const text3LMult = [
  [
    `Egy kertész `,
    `rózsabokrot ültetett.`,
    `A szorgalmas gondozásnak köszönhetően minden bokor`,
    `virágot hozott.`,
    `Hány rózsában gyönyörködhet a kertész?`,
  ],
  [
    `A fűrészmalom a mai napon `,
    `darab fát dolgozott fel.`,
    `Mindegyiket `,
    `darabra vágták a munkások.`,
    `Hány darab fa keletkezett a nap végére?`,
  ],
  [
    `A Télapó manói minden órában `,
    `darab játékot készítenek a jó gyerekeknek.`,
    `Ha a mai napon `,
    `órát dolgoznak, akkor`,
    `hány darab játék készül el?`,
  ],
  [
    `A Madárcsicsergés óvodának összesen `,
    `csoportja van.`,
    `Minden csoportba `,
    `gyermek jár.`,
    `Hány gyerkőc jár összesen ebbe az oviba?`,
  ],
  [
    `A nyáriszünetben `,
    `alkalommal ettem fagyit.`,
    `Minden fagyizáskor `,
    `gombócot kértem.`,
    `Hány gombóc fagylaltot ettem meg a nyáron?`,
  ],
  [
    `Géza bácsinak `,
    `macskája van.`,
    `Az év során mindegyiknek született `,
    `kiscicája.`,
    `Hány kismacskája lett így Géza bácsinak?`,
  ],
  [
    `Karácsony előtt `,
    `doboz szaloncukrot vásároltunk.`,
    `Minden dobozban `,
    `darab volt.`,
    `Összesen hány darab szaloncukrunk lesz Karácsonyra?`,
  ],
  [
    `Összesen `,
    `darab vonalas füzetem van.`,
    `A szünetben mindegyikbe írnom kell `,
    `mondatot.`,
    `Hány mondatok fogok leírni összesen?`,
  ],
  [
    `A vadlibák vonulását figyelve `,
    `csapatot láttam ma.`,
    `Minden csapatban `,
    `madár volt.`,
    `Hány vadludat láttam ma összesen?`,
  ],
  [
    `A kistestvérem szétszórta a zsírkrétáimat. `,
    `különböző dobozban találtam rájuk.`,
    `Minden dobozban `,
    `darabot találtam meg.`,
    `Segítenél kiszámolni, összesen hány zsírkrétám lehet?`,
  ],
];
const text2LMult = [[]];

const text3LDiv = [
  [
    `A rózsáskertben összesen `,
    `virágot láthatunk.`,
    `Ezek a virágok `,
    `különböző bokron nőnek.`,
    `Hány virágot találunk egy bokron?`,
  ],
  [
    `Az elmúlt napokban `,
    `darab tüzifát hasogattam össze.`,
    `Összesen `,
    `napon át dolgoztam, minden nap ugyanannyit.`,
    `Naponta hány darab tüzifát tudtam összevágni?`,
  ],
  [
    `A Kakaóbajusz óvódába összesen `,
    `gyermeket hordanak a szüleik.`,
    `Minden csoportba `,
    `gyermek jár.`,
    `Hány csoportja van ennek az óvodának?`,
  ],
  [
    `Nagymamám kertjében `,
    `sárgarépa nőtt.`,
    `Minden ágyásban `,
    `répát számoltam meg.`,
    `Hány ágyás van a mamám kertjében?`,
  ],
  [
    `Az állatkertben `,
    `kis görögteknős bújt ki a tojásból.`,
    `Ezeket a tojásokat `,
    `különböző teknősmama rakta le.`,
    `Hány kisteknőse kelt ki egy-egy anyateknősnek?`,
  ],
  [
    `Karácsonyra összesen `,
    `darab szaloncukrot vettünk.`,
    `Ezek a finomságok `,
    `különböző dobozban vannak, mindegyikben ugyanannyi.`,
    `Hány cukor lapul egy dobozban?`,
  ],
  [
    `Télapó egyik manókülönítménye `,
    `darab játékot készített ma.`,
    `Ebben a csoportban `,
    `manó dolgozik.`,
    `Hány játékot készített ma egy manó?`,
  ],
  [
    `Az olvasás házifeladatom `,
    `mondatból áll.`,
    `Úgy látom, hogy `,
    `mondatonként új bekezdés kezdődik.`,
    `Hány bekezdésből áll az olvasmány?`,
  ],
  [
    `Hógolyózás közben `,
    `hógolyót gyúrtunk.`,
    `Minden játszó gyermek `,
    `darabot.`,
    `Hány hógolyót gyúrt egy gyermek?`,
  ],
  [
    `A tanévben összesen `,
    `osztályzatot kaptam.`,
    `Ha `,
    `tantárgyam van,`,
    `akkor hány jegyet kaptam tantárgyanként?`,
  ],
];

const text2LDiv = [[]];

const text3LAdd = [
  [
    `Játék közben a réten `,
    `pillangót számoltam meg.`,
    `Később, homokozás közben láttam még `,
    `pillangót.`,
    `Hányat láttam ma összesen?`,
  ],
  [
    `Papával a csónakázó-tónál `,
    `kis halacskát láttunk.`,
    `Később a tévében is láttam `,
    `halat.`,
    `Összesen hányat láttam ma?`,
  ],
  [
    `A délutáni séta alatt `,
    `őszi falevelet gyűjtöttem.`,
    `Már otthon is van `,
    `darab.`,
    `Hány falevelem lesz így összesen?`,
  ],
  [
    `A múlt héten kaptam anyától `,
    `Forint zsebpénzt.`,
    `Ezen a héten is kapok `,
    `Forintot.`,
    `Mennyi pénzt kaptam ezen a két héten?`,
  ],
  [
    `A barátommal ásványokat gyűjtünk. Neki `,
    `darab van, `,
    `nekem pedig `,
    `.`,
    `Hány darab ásványunk van közösen?`,
  ],
  [
    `Németből tavaly már megtanultunk `,
    `szót.`,
    `Idén megtanultunk `,
    `újat.`,
    `Hány szót fogunk összesen tudni az év végére?`,
  ],
  [
    `A kedvenc könyvemnek `,
    `fejezete van.`,
    `A barátom kedvencének pedig `,
    `.`,
    `Hány fejezetet tartalmaz a két könyv összesen?`,
  ],
  [
    `A játszótéri homokozóban a barátaimmal `,
    `homokvárat építettünk.`,
    `Egy másik csoport gyerek `,
    `darabot épített.`,
    `Hány homokvár áll most összesen ebben a homokozóban?`,
  ],
  [
    `Mama kertjében `,
    `tulipán virágzik.`,
    `Ma ültetünk még `,
    `liliomot.`,
    `Hány virág lesz összesen a kertben?`,
  ],
  [`Az állatkertben `, `emlőst `, `és `, `madarat figyeltem meg.`, `Hány állatot láttam összesen?`],
];

const text2LAdd = [[]];

const text3LSub = [
  [
    `Reggel édesanyám adott nekem `,
    `Forintot.`,
    `Ebből tízóraira elköltöttem `,
    `Forintot.`,
    `Mennyi pénzem maradt?`,
  ],
  [
    `A papa kertjében `,
    `almafa áll.`,
    `Már `,
    `gyümölcsét leszüreteltük.`,
    `Mennyi fán maradt még érett alma?`,
  ],
  [
    `Az állatkertben összesen `,
    `különböző állatot figyelhetünk meg.`,
    `Én már `,
    `állatot láttam.`,
    `Hányat kell még megnéznem, ha mindet látni szeretném?`,
  ],
  [
    `Egy hóvár megépítéséhez `,
    `hógolyóra van szükség.`,
    `Már meggyúrtunk `,
    `darabot.`,
    `Mennyit kell még készítenünk?`,
  ],
  [
    `A kirándulásra kaptam `,
    `Forint költőpénzt.`,
    `Eddig egy jégkérmet vettem `,
    `Forintért.`,
    `Mennyi pénzem maradt?`,
  ],
  [
    `Kaptam egy `,
    `darabos ceruzakészletet.`,
    `A napokban `,
    `ceruzának kitört a hegye.`,
    `Hány ceruzámmal tudok még rajzolni?`,
  ],
  [
    `A kedvenc kirakós játékom `,
    `darabos.`,
    `Tegnap `,
    `darabka helyét már megtaláltam.`,
    `Hány elemet kell még a megfelelő helyre tennem?`,
  ],
  [
    `A szobámban `,
    `plüssállat volt.`,
    `Ezekből a barátomnak adtam `,
    `darabot.`,
    `Mennyi plüss maradt nekem?`,
  ],
  [
    `A mozaik, amit készíteni szeretnék `,
    `darabból fog állni.`,
    `Elkezdtem és kiraktam `,
    `darabot.`,
    `Hány elemet kell még a helyére tennem, hogy kész legyen?`,
  ],
  [
    `Összesen `,
    `játékkatonám van.`,
    `Ezekből `,
    `már elfoglalta a pozícióját az erődben.`,
    `Mennyit kell még a helyére tennem?`,
  ],
];

const text2LSub = [[]];

const text3LRemDiv = [
  [
    `Egy dobozban `,
    `cukorka van.`,
    `A feladatom, hogy `,
    `gyermek között egyenlően osszam el.`,
    `Hány darab cukrot tudok adni egy gyermeknek?`,
    `Mennyi cukor marad a dobozban?`,
  ],
  [
    `A hűtőben `,
    `tojás van.`,
    `Reggleire `,
    `tojásból készítünk rántottát.`,
    `Hány reggelit tudunk készíteni?`,
    `Mennyi tojás marad meg a végén?`,
  ],
  [
    `A kertben `,
    `eper nőtt.`,
    `A tenyerembe `,
    `darab fér egyszerre.`,
    `Hányszor tudom teleszedni a markom?`,
    `Mennyi eper marad a végére?`,
  ],
  [
    `Egy nagy akváriumban `,
    `hal úszkál.`,
    `Áttelepítésük esetén a hálóba egyszerre `,
    `hal fér.`,
    `Hányszor kell meríteni a hálóval?`,
    `Mennyi hal marad ezután az akváriumban?`,
  ],
  [
    `Az idén `,
    `darab körte termett.`,
    `Ha mindenkinek adni szerertnénk, akkor `,
    `egyenlő részre kell elosztani.`,
    `Hány körtét kap egy-egy ember?`,
    `Mennyi marad meg, amit nem osztunk szét?`,
  ],
  [
    `A könyvem `,
    `oldal hosszú.`,
    `Minden nap `,
    `oldalt tudok elolvasni.`,
    `Hány napig tudok ennyi oldalt olvasni?`,
    `Hány oldal marad végül az utolsó napra?`,
  ],
  [
    `Uzsonnára egy tálcára `,
    `almát tettek.`,
    `Minden gyermek `,
    `szemet vehet el.`,
    `Hány gyermeknek jut ennyi alma?`,
    `Mennyi marad a tálcán?`,
  ],
  [
    `Az osztálynak egy `,
    `mondatból álló szöveget kell felolvasnia.`,
    `Ide `,
    `gyerek jár, mindannyian ugyanannyit olvasnak.`,
    `Hány mondat jut egy gyermekre?`,
    `Hány mondat marad a végére olvasatlanul?`,
  ],
  [
    `Az arborétumban `,
    `különböző virágot láthattok.`,
    `Ezeket `,
    `egyenlő csoportba sorolhatjuk.`,
    `Hány virág fog tartozni egy csoportba?`,
    `Mennyit nem fogunk tudni besorolni?`,
  ],
  [
    `Az udvaron láttam `,
    `hangyát.`,
    `Szorgalmasan dolgoztak, `,
    `egyenlő nagyságú csoportban.`,
    `Hány hangya tartozott egy csoportba?`,
    `Mennyi hangya dolgozott a csoportokon kívül?`,
  ],
];

const emojiArray = [
  "❤",
  "🧡",
  "💛",
  "💚",
  "❤",
  "💖",
  "💝",
  "✅",
  "✔",
  "😀",
  "😉",
  "😎",
  "😍",
  "🥰",
  "😚",
  "🤩",
  "🤗",
  "🤠",
  "🧐",
  "😺",
  "😸",
  "😻",
  "🐱‍👤",
  "🐱‍🏍",
  "🐱‍💻",
  "🐱‍🐉",
  "🐱‍👓",
  "🐱‍🚀",
  "🐵",
  "🐶",
  "🐱",
  "🦁",
  "🐯",
  "🦒",
  "🦊",
  "🦝",
  "🐮",
  "🐭",
  "🐹",
  "🐰",
  "🐻",
  "🐨",
  "🐼",
  "🐸",
  "🦓",
  "🐴",
  "🦄",
  "🐲",
  "🐧",
  "🐣",
  "🐛",
  "🐞",
  "👸",
  "🤴",
  "🤶",
  "🎅",
  "👨‍🎓",
  "🦸‍♀️",
  "🦸‍♂️",
  "🧙‍♀️",
  "🧙‍♂️",
  "🧚‍♀️",
  "🧚‍♂️",
  "🧜‍♀️",
  "🙋‍♀️",
  "🙋‍♂️",
  "🤸‍♀️",
  "🤸‍♂️",
  "💪",
  "🤘",
  "👌",
  "👍",
  "👏",
  "🎉",
  "🎊",
  "🎃",
  "🥇",
  "🏅",
  "🏆",
  "🧸",
  "🥁",
  "💣",
  "🌺",
  "🌻",
  "🌼",
  "🌷",
  "🥀",
  "🌹",
  "🍀",
  "🚀",
  "🌞",
  "🌜",
  "🌈",
  "🌟",
  "⭐",
  "⚡",
  "🔥",
  "🌊",
];
//////////////////////
// functions to remove RemDiv DOM elements
const removeRemText = () => remText.classList.add("hidden");
const removeRemInput = () => remainInput.classList.add("hidden");
const removeArithmetic = () => arithmeticField.classList.add("hidden");
const showRemstuff = () => {
  remText.classList.remove("hidden");
  remainInput.classList.remove("hidden");
};
const showMachineField = () => machineField.classList.remove("hidden");

//some general functions
const generalArithmFn = function () {
  removeRemInput();
  removeRemText();
  answerInput.value = "";
};
const emptyTextInputValue = function () {
  textInput.value = "";
  textRemInput.value = "";
  textInput.focus();
  textInput.select();
};
const hideRemModule = function () {
  textExRemModule.classList.add("hidden");
};
const generalAnswerDelFn = function () {
  exampleObject.answer = [];
};
//SPECIFIC FUNCTIONS TO GENERATE NUMBERS TO THE CURRENT EXAMPLE
// generating math examples by type
////////////////////// addition generating fn
const typeAdd = function () {
  let tempFirstNum = "";
  let tempSecondNum = "";
  let tempAnswer = "";
  const generateAddNums = function () {
    tempAnswer = Math.floor(
      Math.random() *
        (exampleObject.addAndSubOptions[1] - (exampleObject.addAndSubOptions[0] - 1)) +
        exampleObject.addAndSubOptions[0]
    );
    //generating the first number like: Math.random()*(answer - (min-1))+ min;
    tempFirstNum = Math.floor(
      Math.random() * (tempAnswer - (exampleObject.addAndSubOptions[0] - 1)) +
        exampleObject.addAndSubOptions[0]
    );
    tempSecondNum = tempAnswer - tempFirstNum;
  };
  // generating the answer of the ex like: Math.random()*(max-(min+1))+min;

  if (exampleObject.selectedForm === "arithmetics") {
    generateAddNums();
    generalArithmFn();
    typeSignal.innerHTML = "+";
    exampleObject.answer.push(tempAnswer);
    console.log(exampleObject.answer);
    firstNum.innerHTML = Number(tempFirstNum);
    secondNum.innerHTML = Number(tempSecondNum);
  }
  if (exampleObject.selectedForm === "text") {
    emptyTextInputValue();
    generateAddNums();
    hideRemModule();
    if (checkTextExampleType() == "3Liner") {
      let rndText = text3LAdd[Math.floor(Math.random() * text3LAdd.length)];
      for (let i = 1; i <= 5; i++) {
        document.querySelector(`#t${i}`).innerHTML = rndText[i - 1];
      }
      document.querySelector("#num1").innerHTML = tempFirstNum;
      document.querySelector("#num2").innerHTML = tempSecondNum;
      exampleObject.answer.push(tempAnswer);
      console.log(exampleObject.answer);
    } else if (checkTextExampleType() == "2Liner") {
      //no input, need to generate the questions to text bases.js TODO
      console.log("2Liner");
    }
  }
  if (exampleObject.selectedForm === "machine") {
    for (let i = 1; i <= 9; i++) {
      generateAddNums();
      if (document.querySelector(`.r1e${i}`).innerHTML == "num") {
        document.querySelector(`.r1e${i}`).innerHTML = tempFirstNum;
      } else exampleObject.answer.push(tempFirstNum);
      if (document.querySelector(`.r2e${i}`).innerHTML == "num") {
        document.querySelector(`.r2e${i}`).innerHTML = tempSecondNum;
      } else exampleObject.answer.push(tempSecondNum);
      if (document.querySelector(`.r3e${i}`).innerHTML == "num") {
        document.querySelector(`.r3e${i}`).innerHTML = tempAnswer;
      } else exampleObject.answer.push(tempAnswer);
    }
  }
};
////////////////////subtraction generating fn
const typeSub = function () {
  let tempFirstNum = "";
  let tempSecondNum = "";
  let tempAnswer = "";
  const generateSubNums = function () {
    tempFirstNum = Math.floor(
      Math.random() *
        (exampleObject.addAndSubOptions[1] - (exampleObject.addAndSubOptions[0] - 1)) +
        exampleObject.addAndSubOptions[0]
    );
    tempSecondNum =
      tempFirstNum -
      Math.floor(
        Math.random() * (tempFirstNum - (exampleObject.addAndSubOptions[0] - 1)) +
          exampleObject.addAndSubOptions[0]
      );
    tempAnswer = tempFirstNum - tempSecondNum;
  };
  //need to generate the firstNum randomly within the range, than the second within min and firstNum, than the answer
  //generating numbers, modifying DOM elements
  if (exampleObject.selectedForm === "arithmetics") {
    generateSubNums();
    typeSignal.innerHTML = "-";
    generalArithmFn();
    exampleObject.answer.push(tempAnswer);
    console.log(tempAnswer);
    firstNum.innerHTML = Number(tempFirstNum);
    secondNum.innerHTML = Number(tempSecondNum);
  } else if (exampleObject.selectedForm === "text") {
    emptyTextInputValue();
    generateSubNums();
    hideRemModule();
    if (checkTextExampleType() == "3Liner") {
      let rndText = text3LSub[Math.floor(Math.random() * text3LSub.length)];
      for (let i = 1; i <= 5; i++) {
        document.querySelector(`#t${i}`).innerHTML = rndText[i - 1];
      }
      document.querySelector("#num1").innerHTML = tempFirstNum;
      document.querySelector("#num2").innerHTML = tempSecondNum;
      exampleObject.answer.push(tempAnswer);
      console.log(exampleObject.answer);
    } else if (checkTextExampleType() == "2Liner") {
      //no input, need to generate the questions to text bases.js TODO
      console.log("2Liner");
    }
    // statements for text based examples
  } else if (exampleObject.selectedForm === "machine") {
    for (let i = 1; i <= 9; i++) {
      generateSubNums();
      if (document.querySelector(`.r1e${i}`).innerHTML == "num") {
        document.querySelector(`.r1e${i}`).innerHTML = tempFirstNum;
      } else exampleObject.answer.push(tempFirstNum);
      if (document.querySelector(`.r2e${i}`).innerHTML == "num") {
        document.querySelector(`.r2e${i}`).innerHTML = tempSecondNum;
      } else exampleObject.answer.push(tempSecondNum);
      if (document.querySelector(`.r3e${i}`).innerHTML == "num") {
        document.querySelector(`.r3e${i}`).innerHTML = tempAnswer;
      } else exampleObject.answer.push(tempAnswer);
    }
  }
};
////////////////////Multiplication generating fn
const typeMult = function () {
  let tempFirstNum = "";
  let tempSecondNum = "";
  let tempAnswer = "";
  const generateMultNums = function () {
    tempFirstNum =
      exampleObject.multAndDivOptions[
        [Math.floor(Math.random() * exampleObject.multAndDivOptions.length)]
      ];
    tempSecondNum = Math.floor(Math.random() * 10 + 1);
    tempAnswer = tempFirstNum * tempSecondNum;
  };
  if (exampleObject.selectedForm === "arithmetics") {
    generateMultNums();
    typeSignal.innerHTML = "*";
    generalArithmFn();
    exampleObject.answer.push(tempAnswer);
    console.log(exampleObject.answer);
    firstNum.innerHTML = Number(tempFirstNum);
    secondNum.innerHTML = Number(tempSecondNum);
  } else if (exampleObject.selectedForm === "text") {
    emptyTextInputValue();
    generateMultNums();
    hideRemModule();
    if (checkTextExampleType() == "3Liner") {
      let rndText = text3LMult[Math.floor(Math.random() * text3LMult.length)];
      for (let i = 1; i <= 5; i++) {
        document.querySelector(`#t${i}`).innerHTML = rndText[i - 1];
      }
      document.querySelector("#num1").innerHTML = tempFirstNum;
      document.querySelector("#num2").innerHTML = tempSecondNum;
      exampleObject.answer.push(tempAnswer);
      console.log(exampleObject.answer);
    } else if (checkTextExampleType() == "2Liner") {
      //no input, need to generate the questions to text bases.js TODO
      console.log("2Liner");
    }
  } else if (exampleObject.selectedForm === "machine") {
    for (let i = 1; i <= 9; i++) {
      generateMultNums();
      if (document.querySelector(`.r1e${i}`).innerHTML == "num") {
        document.querySelector(`.r1e${i}`).innerHTML = tempFirstNum;
      } else exampleObject.answer.push(Number(tempFirstNum));
      if (document.querySelector(`.r2e${i}`).innerHTML == "num") {
        document.querySelector(`.r2e${i}`).innerHTML = tempSecondNum;
      } else exampleObject.answer.push(Number(tempSecondNum));
      if (document.querySelector(`.r3e${i}`).innerHTML == "num") {
        document.querySelector(`.r3e${i}`).innerHTML = tempAnswer;
      } else exampleObject.answer.push(Number(tempAnswer));
    }
  }
};
////////////////////Division generating fn
const typeDiv = function () {
  let tempFirstNum = "";
  let tempSecondNum = "";
  let tempAnswer = "";
  const generateDivNums = function () {
    tempSecondNum =
      exampleObject.multAndDivOptions[
        [Math.floor(Math.random() * exampleObject.multAndDivOptions.length)]
      ];
    tempAnswer = Math.floor(Math.random() * 10 + 1);
    tempFirstNum = tempSecondNum * tempAnswer;
  };
  if (exampleObject.selectedForm === "arithmetics") {
    generateDivNums();
    typeSignal.innerHTML = "/";
    generalArithmFn();
    exampleObject.answer.push(tempAnswer);
    console.log(exampleObject.answer);
    firstNum.innerHTML = Number(tempFirstNum);
    secondNum.innerHTML = Number(tempSecondNum);
  } else if (exampleObject.selectedForm === "text") {
    emptyTextInputValue();
    generateDivNums();
    hideRemModule();
    if (checkTextExampleType() == "3Liner") {
      let rndText = text3LDiv[Math.floor(Math.random() * text3LDiv.length)];
      for (let i = 1; i <= 5; i++) {
        document.querySelector(`#t${i}`).innerHTML = rndText[i - 1];
      }
      document.querySelector("#num1").innerHTML = tempFirstNum;
      document.querySelector("#num2").innerHTML = tempSecondNum;
      exampleObject.answer.push(tempAnswer);
      console.log(exampleObject.answer);
    } else if (checkTextExampleType() == "2Liner") {
      //no input, need to generate the questions to text bases.js TODO
      console.log("2Liner");
    }
    // statements for text based examples
  } else if (exampleObject.selectedForm === "machine") {
    for (let i = 1; i <= 9; i++) {
      generateDivNums();
      if (document.querySelector(`.r1e${i}`).innerHTML == "num") {
        document.querySelector(`.r1e${i}`).innerHTML = tempFirstNum;
      } else exampleObject.answer.push(Number(tempFirstNum));
      if (document.querySelector(`.r2e${i}`).innerHTML == "num") {
        document.querySelector(`.r2e${i}`).innerHTML = tempSecondNum;
      } else exampleObject.answer.push(Number(tempSecondNum));
      if (document.querySelector(`.r3e${i}`).innerHTML == "num") {
        document.querySelector(`.r3e${i}`).innerHTML = tempAnswer;
      } else exampleObject.answer.push(Number(tempAnswer));
    }
  }
};
////////////////////Division with remaining generating fn
const typeRemDiv = function () {
  let tempFirstNum = "";
  let tempSecondNum = "";
  let tempAnswer = "";
  let tempRemain = "";
  const generateRemDivNums = function () {
    tempSecondNum =
      exampleObject.multAndDivOptions[
        [Math.floor(Math.random() * exampleObject.multAndDivOptions.length)]
      ];
    tempAnswer = Math.floor(Math.random() * 10 + 1);
    tempRemain = Math.floor(Math.random() * Number(tempSecondNum));
    tempFirstNum = tempSecondNum * tempAnswer + tempRemain;
  };
  if (exampleObject.selectedForm === "arithmetics") {
    generateRemDivNums();
    typeSignal.innerHTML = "/";
    showRemstuff();
    exampleObject.answer = [];
    exampleObject.answer.push(tempAnswer);
    exampleObject.answer.push(Number(tempRemain)); //pushing the remainder to the answer array to [1]
    remainInput.value = "";
    answerInput.value = "";
    //generating numbers, modifying DOM elements
    firstNum.innerHTML = Number(tempFirstNum);
    secondNum.innerHTML = Number(tempSecondNum);
    console.log(exampleObject.answer);
  } else if (exampleObject.selectedForm === "text") {
    emptyTextInputValue();
    generateRemDivNums();
    textExRemModule.classList.remove("hidden");
    if (checkTextExampleType() == "3Liner") {
      let rndText = text3LRemDiv[Math.floor(Math.random() * text3LRemDiv.length)];
      for (let i = 1; i <= 6; i++) {
        document.querySelector(`#t${i}`).innerHTML = rndText[i - 1];
      }
      document.querySelector("#num1").innerHTML = tempFirstNum;
      document.querySelector("#num2").innerHTML = tempSecondNum;
      exampleObject.answer.push(tempAnswer);
      exampleObject.answer.push(tempRemain);
    } else if (checkTextExampleType() == "2Liner") {
      //no input, need to generate the questions to text bases.js TODO
      console.log("2Liner");
    }
    // statements for text based examples
  } else if (exampleObject.selectedForm === "machine") {
    typeDiv();
  }
};

///////////////////////////////////////////////////////
// GENERAL FUNCTIONS TO SELECT THE NEXT SPECIFIC FUNCTION TO RUN
// the main function that puts up a new example after each click
const evalFunction = function () {
  chooseNextExample();
  if (exampleObject.selectedOrder[2] == "Összeadás") {
    return typeAdd();
  } else if (exampleObject.selectedOrder[2] == "Kivonás") {
    return typeSub();
  } else if (exampleObject.selectedOrder[2] == "Szorzás") {
    return typeMult();
  } else if (exampleObject.selectedOrder[2] == "Osztás") {
    return typeDiv();
  } else if (exampleObject.selectedOrder[2] == "Maradékos osztás") {
    return typeRemDiv();
  }
};

const checkTextExampleType = function () {
  if (!twoLiner.classList.contains("hidden")) return "2Liner";
  if (!threeLiner.classList.contains("hidden")) return "3Liner";
};

const hideTextExamples = function () {
  threeLiner.classList.add("hidden");
  twoLiner.classList.add("hidden");
};

const fieldSetupMachine = function () {
  removeArithmetic();
  showMachineField();
};

//generating input field randomly once in each columns
const randomizeMachine = function () {
  for (let j = 4; j <= 9; j++) {
    document.querySelector(
      `.r${Math.floor(Math.random() * 3 + 1)}e${j}`
    ).innerHTML = `<input type="number" class="machine_input" id="mi${j - 3}" />`;
  }
  document.querySelector("#mi1").select();
  document.querySelector("#mi1").focus();
};

// reseting the machine table to avoid building up input fields
const resetMachine = function () {
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 9; j++) {
      document.querySelector(`.r${i}e${j}`).innerHTML = "num";
    }
  }
};

// function to reward the user
const goodAnswer = function () {
  infoLine.insertAdjacentText(
    "beforeend",
    emojiArray[Math.floor(Math.random() * emojiArray.length)]
  );
  exampleObject.highScoreCounter++;
  highScore.textContent = exampleObject.highScoreCounter;
};
// calling goodAnswer() as many times as needed
const callFunction = (func, n) => {
  for (let i = 1; i <= n; i++) {
    func();
  }
};
// choosing the NEXT example type if orderly set
const selectOrderly = function () {
  let selectedElement = exampleObject.setToArr[exampleObject.selectedOrder[1]];
  if (exampleObject.selectedOrder[1] === exampleObject.setToArr.length - 1)
    exampleObject.selectedOrder[1] = 0;
  else exampleObject.selectedOrder[1]++;
  return selectedElement;
};
//choosing a RANDOM example type if random set
const selectRandomly = function () {
  return exampleObject.setToArr[Math.floor(Math.random() * exampleObject.setToArr.length)];
};
//selecting the next fn (random or orderly)
const chooseNextExample = function () {
  if (exampleObject.selectedOrder[0] == "order") {
    exampleObject.selectedOrder[2] = selectOrderly();
  } else if (exampleObject.selectedOrder[0] == "random")
    exampleObject.selectedOrder[2] = selectRandomly();
};

//checking the required form of the examples, generating new examples based on the options
const selectFunction = function () {
  if (infoLine.textContent.startsWith("Gyakorlat teszi a mestert!"))
    infoLine.textContent = "Jelvényeid:";
  if (waitingForAnswer == false) {
    generalAnswerDelFn();
    if (exampleObject.selectedForm === "arithmetics") {
      // console.log("arithmclick");
      answerInput.style.background = "white";
      remainInput.style.background = "white";
      arithmeticField.classList.remove("hidden");
      answerInput.focus();
      answerInput.select();
      changingActivity();
      return evalFunction();
    } else if (exampleObject.selectedForm === "text") {
      // console.log("textclick");
      textInput.style.background = "white";
      textRemInput.style.background = "white";
      textExRemModule.classList.add("hidden");
      textField.classList.remove("hidden");
      textInput.focus();
      textInput.select();
      hideTextExamples();
      let decider = [threeLiner]; //can add 2Liner later TODO or more
      decider[Math.floor(Math.random() * decider.length)].classList.remove("hidden");
      changingActivity();
      return evalFunction();
    } else if (exampleObject.selectedForm === "machine") {
      // console.log("machineclick");
      fieldSetupMachine();
      resetMachine();
      randomizeMachine();
      changingActivity();
      return evalFunction();
    }
  }
};
// evaluating user set options, generating error messages
const optionChecker = function () {
  errorMessage.textContent = "Error text";
  if (exampleObject.selectedType.size == 0) {
    errorField.classList.remove("hidden");
    errorMessage.textContent = "Feladat típusa nincs kiválasztva!";
  } else if (exampleObject.selectedForm == "") {
    errorField.classList.remove("hidden");
    errorMessage.textContent = "Feladat formája nincs kiválasztva!";
  } else if (
    (exampleObject.selectedType.has("Összeadás") || exampleObject.selectedType.has("Kivonás")) &&
    exampleObject.addAndSubOptions.length == 0
  ) {
    errorField.classList.remove("hidden");
    errorMessage.textContent = "Összeadás / kivonás értékei nincsenek beállítva!";
  } else if (
    (exampleObject.selectedType.has("Szorzás") ||
      exampleObject.selectedType.has("Osztás") ||
      exampleObject.selectedType.has("Maradékos osztás")) &&
    exampleObject.multAndDivOptions.length == 0
  ) {
    errorField.classList.remove("hidden");
    errorMessage.textContent = "Szorzás / osztás / maradékos osztás értékei nincsenek beállítva!";
  } else {
    document.querySelector(".playfield").classList.remove("hidden");
    document.querySelector(".options_field").classList.add("hidden");
  }
  if (
    exampleObject.selectedType.has("Maradékos osztás") &&
    exampleObject.selectedForm == "machine"
  ) {
    alert(
      "Gépjáték esetén (a szabály értelmezhetősége végett) maradékos osztás helyett mindig maradék nélküli osztást generál a program."
    );
  }
};

/////////////////////////////////////////////////////
// checking the user's answer to the current example
const checkAnswer = function () {
  if (waitingForAnswer == true) {
    let answerCheckerArr = [];
    if (exampleObject.selectedForm === "arithmetics") {
      if (exampleObject.selectedOrder[2] === "Maradékos osztás") {
        answerCheckerArr.push(Number(answerInput.value));
        answerCheckerArr.push(Number(remainInput.value));
        if (
          answerCheckerArr[0] === exampleObject.answer[0] &&
          answerCheckerArr[1] === exampleObject.answer[1]
        ) {
          answerInput.style.background = "green";
          remainInput.style.background = "green";
          callFunction(goodAnswer, 2);
          changingActivity();
        } else if (
          answerCheckerArr[1] !== exampleObject.answer[1] &&
          answerCheckerArr[0] !== exampleObject.answer[0]
        ) {
          remainInput.style.background = "#FF3C3D";
          answerInput.style.background = "#FF3C3D";
        } else if (
          answerCheckerArr[1] !== exampleObject.answer[1] &&
          answerCheckerArr[0] === exampleObject.answer[0]
        ) {
          remainInput.style.background = "#FF3C3D";
          answerInput.style.background = "green";
        } else if (
          answerCheckerArr[0] !== exampleObject.answer[0] &&
          answerCheckerArr[1] === exampleObject.answer[1]
        ) {
          answerInput.style.background = "#FF3C3D";
          remainInput.style.background = "green";
        }
      }
      answerCheckerArr.push(Number(answerInput.value));
      if (
        exampleObject.selectedOrder[2] !== "Maradékos osztás" &&
        answerCheckerArr[0] === exampleObject.answer[0]
      ) {
        answerInput.style.background = "green";
        goodAnswer();
        changingActivity();
      } else if (answerCheckerArr[0] !== exampleObject.answer[0]) {
        answerInput.style.background = "#FF3C3D";
      }
    }
    if (exampleObject.selectedForm === "text") {
      if (exampleObject.selectedOrder[2] === "Maradékos osztás") {
        answerCheckerArr.push(Number(textInput.value));
        answerCheckerArr.push(Number(textRemInput.value));
        // console.log(answerCheckerArr);
        if (
          answerCheckerArr[0] === exampleObject.answer[0] &&
          answerCheckerArr[1] === exampleObject.answer[1]
        ) {
          textRemInput.style.background = "green";
          textInput.style.background = "green";
          callFunction(goodAnswer, 2);
          changingActivity();
        } else if (
          answerCheckerArr[0] !== exampleObject.answer[0] &&
          answerCheckerArr[1] !== exampleObject.answer[1]
        ) {
          textRemInput.style.background = "#FF3C3D";
          textInput.style.background = "#FF3C3D";
        } else if (
          answerCheckerArr[0] === exampleObject.answer[0] &&
          answerCheckerArr[1] !== exampleObject.answer[1]
        ) {
          textInput.style.background = "green";
          textRemInput.style.background = "#FF3C3D";
        } else if (
          answerCheckerArr[0] !== exampleObject.answer[0] &&
          answerCheckerArr[1] === exampleObject.answer[1]
        ) {
          textRemInput.style.background = "green";
          textInput.style.background = "#FF3C3D";
        }
      }
      answerCheckerArr.push(Number(textInput.value));
      if (
        exampleObject.selectedOrder[2] !== "Maradékos osztás" &&
        answerCheckerArr[0] === exampleObject.answer[0]
      ) {
        textInput.style.background = "green";
        goodAnswer();
        changingActivity();
      } else if (answerCheckerArr[0] !== exampleObject.answer[0]) {
        textInput.style.background = "#FF3C3D";
      }
    }
    if (exampleObject.selectedForm === "machine") {
      let tempAnswer = "";
      let answerCounter = 0;
      for (let i = 1; i <= 6; i++) {
        tempAnswer = Number(document.querySelector(`#mi${i}`).value);
        if (Number(tempAnswer) === exampleObject.answer[i - 1]) {
          document.querySelector(`#mi${i}`).style.background = "green";
          answerCounter++;
          // console.log(`${i}: Correct`);
          if (answerCounter == 6) {
            for (let i = 1; i < 7; i++) {
              goodAnswer();
            }
            changingActivity();
          }
        } else {
          document.querySelector(`#mi${i}`).style.background = "#FF3C3D";
          // console.log(`${i}: Incorrect`);
        }
      }
    }
  }
};

//////////////////////////////
//Button names
const submitBtn1 = document.querySelector(".sub1");
const submitBtn2 = document.querySelector(".sub2");
const optionBtn1 = document.querySelector(".sub3");
const optionBtn2 = document.querySelector(".sub4");
const resetBtn1 = document.querySelector(".reset1");
const resetBtn2 = document.querySelector(".reset2");
const resetBtn3 = document.querySelector(".reset3");
const resetBtn4 = document.querySelector(".reset4");
const starterBtn = document.querySelector(".go");
const backBtn = document.querySelector(".back");
const opOrder = document.querySelector(".in_order");
const opRandom = document.querySelector(".in_random");
const inputNumMin = document.querySelector(".op_min");
const inputNumMax = document.querySelector(".op_max");
const newExample = document.querySelector("#new");
const checkExample = document.querySelector("#check");
const shortcutBtn = document.querySelector(".shortcut");

//option display
const opText1 = document.querySelector("#op_disp1");
const opText2 = document.querySelector("#op_disp2");
const opText3 = document.querySelector("#op_disp3");
const opText4 = document.querySelector("#op_disp4");
const opText5 = document.querySelector("#op_disp5");

//error display
const errorBackBtn = document.querySelector(".error_back");
const errorField = document.querySelector(".error_msg");
const errorMessage = document.querySelector(".error1");

//DOM elements of example screen
const firstNum = document.querySelector("#first_num");
const secondNum = document.querySelector("#second_num");
const typeSignal = document.querySelector(".type_signal");
const remText = document.querySelector(".rem_text");
const answerInput = document.querySelector("#arithm_input");
const remainInput = document.querySelector("#arithm_rem_input");
const arithmeticField = document.querySelector(".arithm_example");
const machineField = document.querySelector(".machine_example");
const machineInput = document.querySelector(".machine_input");
const textField = document.querySelector(".text_example");
const threeLiner = document.querySelector(".text_module_3line");
const twoLiner = document.querySelector(".text_module_2line");
const textExRemModule = document.querySelector(".text_rem");
const textInput = document.querySelector("#text_input");
const textRemInput = document.querySelector("#text_rem_input");
const infoLine = document.querySelector(".emoticons");
const highScore = document.querySelector(".total");
//General variable for activity check

////////////////////////////////////
//READING USER SETTINGS ON STARTUP
//This fn checks for user settings/1
function clickSub1() {
  exampleObject.selectedType.clear();
  document.querySelector("#op_disp1").innerHTML = "";
  document.querySelector("#op_disp2").innerHTML = "";
  let gatherArr = [];
  for (let i = 1; i <= 5; i++) {
    //checking the main settings for types of examples
    if (document.querySelector(`#op${i}`).checked == true) {
      exampleObject.selectedType.add(document.querySelector(`#op${i}`).value);
      gatherArr.push(document.querySelector(`#op${i}`).value);
    }
  }
  if (opOrder.checked === true) {
    exampleObject.selectedOrder[0] = opOrder.value;
    document.querySelector("#op_disp2").insertAdjacentText("beforeend", "Sorrendben");
  } else if (opRandom.checked === true) {
    exampleObject.selectedOrder[0] = opRandom.value;
    document.querySelector("#op_disp2").insertAdjacentText("beforeend", "Véletlenszerűen");
  }
  if (gatherArr.length == 0) document.querySelector("#op_disp1").innerHTML = "Nincs kiválasztva";
  else document.querySelector("#op_disp1").insertAdjacentText("beforeend", gatherArr.join(", "));
  console.log(exampleObject);
}
//This fn checks for user settings/2
function clickSub2() {
  document.querySelector("#op_disp3").innerHTML = "";
  for (let j = 6; j <= 8; j++) {
    // checking the main options for form of examples
    if (document.querySelector(`#op${j}`).checked == true) {
      exampleObject.selectedForm = document.querySelector(`#op${j}`).value;
      document.querySelector("#op_disp3").innerHTML = document.querySelector(
        `#form_label${j - 5}`
      ).textContent;
    }
  }
  console.log(exampleObject);
}

//Add ans Sub options check
function checkNumAddSub() {
  document.querySelector("#op_disp4").innerHTML = "";
  let gatherArr = [];
  if (inputNumMin.value == "" && inputNumMax.value == "") {
    for (let i = 1; i <= 7; i++) {
      if (document.querySelector(`.addsub${i}`).checked) {
        const [first, second] = document.querySelector(`.addsub${i}`).value.split(",");
        exampleObject.addAndSubOptions.push(Number(first), Number(second));
        gatherArr.push(first, second);
      }
    }
  } else if (inputNumMin.value == "" || inputNumMax.value == "") {
    console.log("Missing value"); // have to change later for a real output TODO
  } else {
    exampleObject.addAndSubOptions.push(Number(inputNumMin.value));
    gatherArr.push(inputNumMin.value);
    exampleObject.addAndSubOptions.push(Number(inputNumMax.value));
    gatherArr.push(inputNumMax.value);
  }
  if (gatherArr.length == 0) document.querySelector("#op_disp4").innerHTML = "Nincs kiválasztva";
  else document.querySelector("#op_disp4").insertAdjacentText("beforeend", gatherArr.join(", "));
  console.log(exampleObject);
}

//Mult, Div, RemDiv options check
function checkNumMultDiv() {
  document.querySelector("#op_disp5").innerHTML = "";
  let tempArr = [];
  for (let i = 1; i <= 5; i++) {
    if (document.querySelector(`.multdivrad${i}`).checked) {
      tempArr = document.querySelector(`.multdivrad${i}`).value.split(",");
    }
  }
  tempArr.forEach((elem) => exampleObject.multAndDivOptions.push(Number(elem)));
  if (exampleObject.multAndDivOptions.length == 0 || tempArr.length == 0) {
    for (let j = 1; j <= 10; j++) {
      if (document.querySelector(`.multdiv${j}`).checked) {
        exampleObject.multAndDivOptions.push(document.querySelector(`.multdiv${j}`).value);
        tempArr.push(document.querySelector(`.multdiv${j}`).value);
      }
    }
  }
  if (tempArr.length == 0) document.querySelector("#op_disp5").innerHTML = "Nincs kiválasztva";
  else document.querySelector("#op_disp5").insertAdjacentText("beforeend", tempArr.join(", "));
  console.log(exampleObject);
}

// /////////////////////////////////////////////
// //DEVTOOL
// //quick setup function for developement
// const setUpQuickly = function () {
//   exampleObject.selectedType.add("Összeadás");
//   exampleObject.selectedType.add("Kivonás");
//   exampleObject.selectedType.add("Szorzás");
//   exampleObject.selectedType.add("Osztás");
//   exampleObject.selectedType.add("Maradékos osztás");
//   exampleObject.selectedOrder[0] = "order";
//   exampleObject.selectedForm = "arithmetics"; //or 'text' or 'machine'
//   exampleObject.addAndSubOptions.push(0);
//   exampleObject.addAndSubOptions.push(100);
//   exampleObject.multAndDivOptions.push(2);
//   exampleObject.multAndDivOptions.push(4);
//   exampleObject.multAndDivOptions.push(7);
//   console.log(exampleObject);
// };

//////////////////////////////////
//INTERACTION
//Button clicks
submitBtn1.addEventListener("click", clickSub1);
submitBtn2.addEventListener("click", clickSub2);
resetBtn1.addEventListener("click", function () {
  exampleObject.selectedType.clear();
  for (let i = 1; i <= 5; i++) {
    if (document.querySelector(`#op${i}`).checked == true) {
      document.querySelector(`#op${i}`).checked = false;
    }
  }
  exampleObject.selectedOrder = [];
  document.querySelector("#op_disp1").innerHTML = "Nincs kiválasztva";
  document.querySelector("#op_disp2").innerHTML = "Nincs kiválasztva";
  console.log(exampleObject);
});
resetBtn2.addEventListener("click", function () {
  exampleObject.selectedForm = "";
  document.querySelector("#op_disp3").innerHTML = "Nincs kiválasztva";
  console.log(exampleObject);
});
resetBtn3.addEventListener("click", function () {
  exampleObject.addAndSubOptions = [];
  for (let i = 1; i <= 7; i++) {
    document.querySelector(`.addsub${i}`).checked = false;
  }
  inputNumMin.value = "";
  inputNumMax.value = "";
  document.querySelector("#op_disp4").innerHTML = "Nincs kiválasztva";

  console.log(exampleObject);
});
resetBtn4.addEventListener("click", function () {
  exampleObject.multAndDivOptions = [];
  for (let i = 1; i <= 5; i++) {
    document.querySelector(`.multdivrad${i}`).checked = false;
  }
  for (let j = 1; j <= 10; j++) {
    document.querySelector(`.multdiv${j}`).checked = false;
  }
  document.querySelector("#op_disp5").innerHTML = "Nincs kiválasztva";

  console.log(exampleObject);
});
optionBtn1.addEventListener("click", checkNumAddSub);
optionBtn2.addEventListener("click", checkNumMultDiv);
starterBtn.addEventListener("click", function () {
  document.querySelector(".copyright").classList.add("hidden");
  optionChecker();
  highScore.innerHTML = exampleObject.highScoreCounter;
  infoLine.innerHTML = "Gyakorlat teszi a mestert!";
  waitingForAnswer = false;
  checkExample.classList.add("button_inactive");
  newExample.classList.remove("button_inactive");
  arithmeticField.classList.add("hidden");
  textField.classList.add("hidden");
  textExRemModule.classList.add("hidden");
  hideTextExamples();
  machineField.classList.add("hidden");
  exampleObject.setToArr = [...exampleObject.selectedType];
  exampleObject.selectedOrder[1] = 0;
  // }
});
backBtn.addEventListener("click", function () {
  document.querySelector(".copyright").classList.remove("hidden");
  exampleObject.highScoreCounter = 0;
  // console.log("Click");
  document.querySelector(".playfield").classList.add("hidden");
  document.querySelector(".options_field").classList.remove("hidden");
  exampleObject.answer = [];
  if (exampleObject.selectedForm === "machine") {
    resetMachine();
  }
});
// Dev button for quick setup
// shortcutBtn.addEventListener("click", setUpQuickly);
newExample.addEventListener("click", selectFunction);
checkExample.addEventListener("click", checkAnswer);
errorBackBtn.addEventListener("click", function () {
  document.querySelector(".error_msg").classList.add("hidden");
  document.querySelector(".copyright").classList.remove("hidden");
});
