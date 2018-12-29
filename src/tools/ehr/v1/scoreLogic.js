const unscramble = require('../unscramble');
// const Question = require('../../../question/model');
const logger = require('winston');

module.exports = function getEHRScore(authorAns, studentAns) {
  if (!(authorAns && studentAns)) {
    return;
  }
  function scoreCalculation() {
    const authorData = JSON.parse(unscramble(authorAns));
    authorAns = authorData.ansData;
    studentAns = JSON.parse(unscramble(studentAns));
    const questionType = authorData.queInfo.queType;
    const scoreType = authorData.queInfo.scoreType;
    const gradeType = authorData.queInfo.gradeType;
    if (questionType === 'practice') {
      return scoreType === 'score'
        ? practiceScore(authorAns, studentAns, gradeType)
        : practiceCompletionScore();
    } else if (questionType === 'demo') {
      return scoreType === 'score'
        ? demoScore(authorAns, studentAns, gradeType)
        : demoCompletionScore();
    } else if (questionType === 'case') {
      return scoreType === 'score' ? 0 : caseCompletionScore();
    } else if (questionType === 'assessment') {
      return scoreType === 'score'
        ? assessmentScore(authorAns, studentAns, gradeType)
        : assessmentCompletionScore();
    }
    // scoreCalculation ends
  }
  // Calculate normal Score for all type of question.

  function practiceScore(authorAns, studentAns, gradeType) {
    console.log('------Type: Practice, Score Calculation---------');
    if (!studentAns.isScoringDone) {
      // once student achieves 100% it remains even if he reset's
      if (gradeType === '1') {
        // for grading type 1 - either 0% or 100%
        if (
          studentAns.currentStep ===
          authorAns.path[authorAns.defaultPathIndex].steps.length
        ) {
          return 100;
        } else {
          return 0;
        }
      } else if (gradeType === '2') {
        // for grading type 2 - percentage of completion
        return (
          studentAns.currentStep /
          authorAns.path[authorAns.defaultPathIndex].steps.length *
          100
        );
      }
    } else {
      return 100;
    }
  } // practice ends

  function demoScore(authorAns, studentAns, gradeType) {
    console.log('------Type: Demo, Score Calculation---------');
    const defaultPath = authorAns.path[authorAns.defaultPathIndex],
      stepsTaken = studentAns.stepsCount - 1;
    if (!studentAns.isScoringDone) {
      // once student achieves 100% it remains even if he reset's
      if (gradeType === '1') {
        // for grading type 1 - either 0% or 100%
        if (stepsTaken === defaultPath.steps.length) {
          return 100;
        } else {
          return 0;
        }
      } else if (gradeType === '2') {
        // for grading type 2 - percentage of completion
        return stepsTaken / defaultPath.steps.length * 100;
      }
    } else {
      return 100;
    }
  } // demo ends

  function assessmentScore(authorAns, studentAns, gradeType) {
    console.log('------Type: Assessment, Score Calculation---------');
    const authAnswerLength =
        authorAns.path[authorAns.defaultPathIndex].answerObject.length,
      stuAnswerLength = studentAns.path.correctAnswerCount;
    if (stuAnswerLength === authAnswerLength) {
      // If students answer object matched with all author anser object set score 100 otherwise 0
      return 100;
    } else {
      return 0;
    }
  } // assessment Ends

  return scoreCalculation();
};
