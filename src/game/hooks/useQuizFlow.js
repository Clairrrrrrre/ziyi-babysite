// 文件职责：管理性格测评流程
import { useMemo, useState } from "react"; // React Hooks
import { characters, characterMap } from "../data/characters"; // 角色数据
import { quizQuestions } from "../data/quizQuestions"; // 题目数据
import { buildOptionMap, getCharacterResultFromAnswers } from "../utils/score"; // 评分工具

const optionMap = buildOptionMap(quizQuestions); // 选项索引

// MARK: useQuizFlow 测评流程 Hook
export const useQuizFlow = () => {
  const [questionIndex, setQuestionIndex] = useState(0); // 当前题目索引
  const [answers, setAnswers] = useState([]); // 答案记录
  const [selectedCharacterId, setSelectedCharacterId] = useState(null); // 选中角色

  const currentQuestion = quizQuestions[questionIndex]; // 当前题目
  const characterResult = useMemo(() => {
    return getCharacterResultFromAnswers(answers, optionMap, characters);
  }, [answers]);

  const activeCharacterId =
    selectedCharacterId || characterResult?.id || "yangguo";
  const activeCharacter = characterMap[activeCharacterId] || characters[0];

  // MARK: 选择答案
  const handleAnswer = (optionId) => {
    const nextAnswers = [
      ...answers,
      { questionId: currentQuestion.id, optionId },
    ];
    setAnswers(nextAnswers);

    if (questionIndex < quizQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      return { done: false };
    }

    const result = getCharacterResultFromAnswers(
      nextAnswers,
      optionMap,
      characters
    );
    setSelectedCharacterId(result?.id || "yangguo");
    return { done: true, result };
  };

  // MARK: 重置测评
  const resetQuiz = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setSelectedCharacterId(null);
  };

  return {
    currentQuestion,
    questionIndex,
    totalQuestions: quizQuestions.length,
    answers,
    characterResult,
    activeCharacterId,
    activeCharacter,
    handleAnswer,
    setSelectedCharacterId,
    resetQuiz,
  };
};
