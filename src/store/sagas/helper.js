function isQuestionEdited(originalQuestion, newQuestion) {
  const isQuestionNameEdited = originalQuestion.name !== newQuestion.name;
  const isQuestionTypeEdited = originalQuestion.type !== newQuestion.type;
  const isQuestionAnswerEdited =
    originalQuestion.answer.some(
      (answer, i) => answer !== newQuestion.answer[i],
    ) ||
    newQuestion.answer.some(
      (answer, i) => answer !== originalQuestion.answer[i],
    );
  const areQuestionOptionIdsEdited =
    originalQuestion.options.some(
      (opt, i) => opt.optionId !== newQuestion.options[i].optionId,
    ) ||
    newQuestion.options.some(
      (opt, i) => opt.optionId !== originalQuestion.options[i].optionId,
    );
  const areQuestionOptionNamesEdited =
    originalQuestion.options.some(
      (opt, i) => opt.name !== newQuestion.options[i].name,
    ) ||
    newQuestion.options.some(
      (opt, i) => opt.name !== originalQuestion.options[i].name,
    );

  return [
    isQuestionNameEdited,
    isQuestionTypeEdited,
    isQuestionAnswerEdited,
    areQuestionOptionIdsEdited,
    areQuestionOptionNamesEdited,
  ].some((isQuestionPartEdited) => isQuestionPartEdited);
}

function howHaveQuestionsBeenEdited(originalQuestions, newQuestions) {
  const originalQuestionIds = originalQuestions.map((question) => question.id);
  const newQuestionIds = newQuestions.map((question) => question.id);

  const deletedQuestions = originalQuestionIds.filter(
    (questionId) => !newQuestionIds.includes(questionId),
  );

  const addedQuestions = newQuestionIds.filter(
    (questionId) => !originalQuestionIds.includes(questionId),
  );

  const originalQuestionsWithDeletions = originalQuestions.filter(
    (question) => !deletedQuestions.includes(question.id),
  );
  const editedQuestions = originalQuestionsWithDeletions
    .filter((question) => {
      const newQuestion = newQuestions.find(
        (newQuestion) => newQuestion.id === question.id,
      );
      return isQuestionEdited(question, newQuestion);
    })
    .map((question) => question.id);

  return { deletedQuestions, addedQuestions, editedQuestions };
}

function howHaveStudentsBeenEdited(originalStudents, newStudents) {
  const originalStudentIds = originalStudents.map((student) => student._id);
  const newStudentIds = newStudents.map((student) => student.id);

  const deletedStudents = originalStudentIds.filter(
    (studentId) => !newStudentIds.includes(studentId),
  );

  const addedStudents = newStudentIds.filter(
    (studentId) => !originalStudentIds.includes(studentId),
  );

  const originalStudentsWithDeletions = originalStudents.filter(
    (student) => !deletedStudents.includes(student._id),
  );
  const editedStudents = originalStudentsWithDeletions
    .filter((student) => {
      const newStudentName = newStudents.find(
        (newStudent) => newStudent.id === student.id,
      ).name;
      return newStudentName !== student.name;
    })
    .map((student) => student.id);

  return { deletedStudents, addedStudents, editedStudents };
}

export { howHaveQuestionsBeenEdited, howHaveStudentsBeenEdited };
