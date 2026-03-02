// 文件职责：根据答题结果计算角色匹配
export const buildOptionMap = (questions) => {
  const optionMap = {}; // 选项索引
  questions.forEach((question) => {
    question.options.forEach((option) => {
      optionMap[option.id] = option;
    });
  });
  return optionMap;
};

export const getCharacterResultFromAnswers = (
  answers,
  optionMap,
  characters
) => {
  if (!answers.length) return null;

  const totals = {}; // 计分累计
  answers.forEach(({ optionId }) => {
    const option = optionMap[optionId];
    Object.entries(option.scores).forEach(([key, value]) => {
      totals[key] = (totals[key] || 0) + value;
    });
  });

  const ranked = characters
    .map((character) => ({
      ...character,
      score: totals[character.id] || 0,
    }))
    .sort((a, b) => b.score - a.score);

  return ranked[0];
};
