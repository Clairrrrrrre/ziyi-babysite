// 文件职责：展示测评题目与选项
import React from "react"; // React 运行时
import { Button, Panel } from "../../design-system"; // 设计系统组件

// MARK: QuizPanel 测评面板
export const QuizPanel = ({
  currentQuestion, // 当前题目
  questionIndex, // 当前索引
  totalQuestions, // 题目总数
  onAnswer, // 选择回调
}) => {
  return (
    <Panel className="mt-10">
      <div className="flex items-center justify-between text-sm text-[#8b6d5c]">
        <span>
          问题 {questionIndex + 1} / {totalQuestions}
        </span>
        <span>选择最符合你的答案</span>
      </div>
      <h2 className="mt-4 text-xl font-semibold">{currentQuestion.text}</h2>
      <div className="mt-6 grid gap-3">
        {currentQuestion.options.map((option) => (
          <Button
            key={option.id}
            color="outline"
            className="w-full justify-start"
            onClick={() => onAnswer(option.id)}
          >
            {option.text}
          </Button>
        ))}
      </div>
    </Panel>
  );
};
