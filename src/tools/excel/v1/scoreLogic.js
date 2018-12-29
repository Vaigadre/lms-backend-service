module.exports.excelGetScore = function (correctAnswerJson, studentResponseJson) {
  if (!(correctAnswerJson && studentResponseJson)) {
    return;
  }
  var totalGradedCells = 0,
    answeredGradedCells = 0,
    correctAnsweredCells = 0,
    wrongAnsweredCells = 0,
    match = false;
    totalGradedCellCount = 0;
    totalAnsweredCellCount = 0;
    studentFeedback = {
    'score': 0,
    'completionPercentage': 100,
    'gradedCells': {}
    };
    individualCellScore = [];
    formatGradedCell = 0;
    formatAnsweredCell = 0;

  // to get question type
 // var questionType = correctAnswerJson.type;
    var questionType = correctAnswerJson.questionType;
    if (questionType == "format") {
    //logic to get gradable question cells object
    var questionCells = getGradedCells(correctAnswerJson);
    //logic to get gradable answer cells object
    var studentResponseCells = getGradedCells(studentResponseJson);
    var count = 0;
    for (var cell in questionCells) {
      if (questionCells.hasOwnProperty(cell)) {
        for (var i = 0; i < questionCells[cell].length; i++) {
          formatGradedCell++;
          if (studentResponseCells[cell] && studentResponseCells[cell][i][i]) {
            var cellScore = getIndividualCellScore(questionCells[cell][i][i], studentResponseCells[cell][i][i]);
            individualCellScore.push(cellScore);
            if (cellScore == 100) {
              studentFeedback.gradedCells[cell] = [{
                'correctAnswer': true
              }];
            } else {
              studentFeedback.gradedCells[cell] = [{
                'correctAnswer': false
              }];
            }
          } else {
            individualCellScore.push(0);
            studentFeedback.gradedCells[cell] = [{
              'correctAnswer': false
            }];
          }
        }
      }
    }
    studentFeedback.score = (individualCellScore.reduce(add, 0)) / individualCellScore.length;

    function add(a, b) {
      return a + b;
    }
    
    if (formatAnsweredCell <= formatGradedCell && formatGradedCell != 0) {
      studentFeedback.completionPercentage = (formatAnsweredCell / formatGradedCell) * 100;
    }

    function getIndividualCellScore(qJson, aJson) {
      var totalGradedPoint = 0;
      totalCorrectAnsweredPoint = 0;
      cellLevelScore = 0;
      formatCellAnswerFound = false;
      for (var prop in qJson) {
        if (prop == 'rangeFormat' || prop == 'formatFill' || prop == 'formatFont') {
          for (var innerProp in qJson[prop]) {
            totalGradedPoint++;
            if (aJson.hasOwnProperty(prop) && aJson[prop].hasOwnProperty(innerProp)) {
              formatCellAnswerFound = true;
              if (aJson[prop][innerProp] == qJson[prop][innerProp]) {
                totalCorrectAnsweredPoint++;
              }
            }
          }
        }
        if (prop == 'formatBorder') {
          for (var innerProp in qJson[prop]) {
            totalGradedPoint++;
            var tempCount = 0;
            if (aJson[prop][innerProp]) {
              formatCellAnswerFound = true;
              if (Object.keys(qJson[prop][innerProp]).length == Object.keys(aJson[prop][innerProp]).length) {
                for (var innerMost in qJson[prop][innerProp]) {
                  if (aJson[prop][innerProp].hasOwnProperty(innerMost) && qJson[prop][innerProp][innerMost] == aJson[prop][innerProp][innerMost]) {
                    tempCount += 1;
                  }
                }
                if (tempCount == Object.keys(qJson[prop][innerProp]).length) {
                  totalCorrectAnsweredPoint++;
                }
              }
            }
          }
        }
      }
      if (formatCellAnswerFound) {
        formatAnsweredCell++;
      }
      if (totalCorrectAnsweredPoint <= totalGradedPoint && totalGradedPoint != 0) {
        cellLevelScore = (totalCorrectAnsweredPoint / totalGradedPoint) * 100;
      }
      return cellLevelScore;
    }

    function getGradedCells(jsonObj) {
      var rObj = {};
      if (jsonObj.gradedCells) {
        for (var key in jsonObj.gradedCells) {
          if (jsonObj.gradedCells.hasOwnProperty(key)) {
            if (rObj[key] == undefined) {
              rObj[key] = getAnswers(jsonObj.gradedCells[key]);
            }
          }
        }
      }
      return rObj;
    }

    function getAnswers(gCell) {
      var rObj = [],
        temp;
      for (var i = 0; i < gCell.length; i++) {
        temp = [{
          formatFill: {},
          formatFont: {},
          formatBorder: {},
          rangeFormat: {}
        }];
        if (gCell[i]) {
          if (gCell[i].formatFill) {
            for (var formatfill in gCell[i].formatFill) {
              temp[i].formatFill[formatfill] = gCell[i].formatFill[formatfill];
            }
          }
          if (gCell[i].rangeFormat) {
            for (var rangeFormat in gCell[i].rangeFormat) {
              temp[i].rangeFormat[rangeFormat] = gCell[i].rangeFormat[rangeFormat];
            }
          }
          if (gCell[i].formatFont) {
            for (var formatFont in gCell[i].formatFont) {
              temp[i].formatFont[formatFont] = gCell[i].formatFont[formatFont];
            }
          }
          if (gCell[i].formatBorder && gCell[i].formatBorder.items) {
            for (var formatFont in gCell[i].formatBorder.items) {
              temp[i].formatBorder = gCell[i].formatBorder.items;
            }
          }
          rObj.push(temp);
        }
      }
      return rObj;
    }

  } else {
    //logic to get gradable question cells object
    var questionCells = getGradedCells(correctAnswerJson);
    //logic to get gradable answer cells object
    var studentResponseCells = getGradedCells(studentResponseJson);
    for (var cell in questionCells) {
      if (questionCells.hasOwnProperty(cell)) {
        totalGradedCells++;
        if (questionType === 'value' && questionCells[cell]) {
          for (var i = 0; i < questionCells[cell].length; i++) {
            if (questionCells[cell][i].value) {
              totalGradedCellCount++;
              if (studentResponseCells[cell] && studentResponseCells[cell][0] && studentResponseCells[cell][0].value != '') {
                totalAnsweredCellCount++;
              }
              break;
            }
          }
        }
        if (questionType === 'formula' && questionCells[cell]) {
          for (var i = 0; i < questionCells[cell].length; i++) {
            if (questionCells[cell][i].formula != '' || questionCells[cell][i].value != '') {
              totalGradedCellCount++;
              if (studentResponseCells[cell] && studentResponseCells[cell][0] && (studentResponseCells[cell][0].value != '' || studentResponseCells[cell][0].formula != '')) {
                totalAnsweredCellCount++;
              }
              break;
            }
          }
        }
        if (studentResponseCells[cell]) {
          answeredGradedCells++;
          //compare logic
          match = false;
          match = compare(questionCells[cell], studentResponseCells[cell]);
          if (match) {
            correctAnsweredCells++;
            studentFeedback.gradedCells[cell] = [{
              'correctAnswer': true
            }];

          } else {
            wrongAnsweredCells++;
            studentFeedback.gradedCells[cell] = [{
              'correctAnswer': false
            }];
          }
        }
      }
    }
    if (answeredGradedCells <= totalGradedCells && totalGradedCells != 0) {
      studentFeedback.score = (correctAnsweredCells / totalGradedCells) * 100;
    }
    if (correctAnsweredCells <= totalGradedCells && totalGradedCellCount != 0) {
      studentFeedback.completionPercentage = (totalAnsweredCellCount / totalGradedCellCount) * 100;
    }

    function getGradedCells(jsonObj) {
      var rObj = {};
      if (jsonObj.gradedCells) {
        for (var key in jsonObj.gradedCells) {
          if (jsonObj.gradedCells.hasOwnProperty(key)) {
            if (rObj[key] == undefined) {
              rObj[key] = getAnswers(jsonObj.gradedCells[key]);
            }
          }
        }
      }
      return rObj;
    }

    function getAnswers(gCell) {
      var rObj = [],
        temp;
      for (var i = 0; i < gCell.length; i++) {
        temp = {
          value: "",
          formula: ""
        };
        if (gCell[i] && gCell[i].range) {
          if (gCell[i].range && gCell[i].range.values && gCell[i].range.values[0] && gCell[i].range.values[0][0]) {
            temp.value = gCell[i].range.values[0][0];
          }
          if (gCell[i].range && gCell[i].range.formulas && gCell[i].range.formulas[0] && gCell[i].range.formulas[0][0]) {
            temp.formula = gCell[i].range.formulas[0][0];
          }
          rObj.push(temp);
        }
      }
      return rObj;
    }

    function compare(qObj, aObj) {
      var Match = false;
      var answervalue = aObj[0].value,
        answerFormula = aObj[0].formula;
      for (var i = 0; i < qObj.length; i++) {
        if (questionType === 'formula') {
          if (qObj[i].value && qObj[i].formula && qObj[i].value == answervalue && qObj[i].formula == answerFormula) {
            Match = true;
            break;
          }
          if ((qObj[i].value == "" || qObj[i].formula == "") && qObj[i].value == answervalue && qObj[i].formula == answerFormula) {
            Match = true;
            break;
          }
        }
        if (questionType === 'value') {
          if (qObj[i].value && qObj[i].value == answervalue) {
            Match = true;
            break;
          }
          if (qObj[i].value == "" && qObj[i].value == answervalue) {
            Match = true;
            break;
          }
        }
      }
      return Match;
    }
  }
  return studentFeedback;
}
