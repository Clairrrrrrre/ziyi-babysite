// 文件职责：组织测评、剧情与 AI 交互的主流程
import React, { useState } from "react"; // React 运行时
import { Button } from "../design-system"; // 设计系统组件
import {
  AuthPanel,
  ChapterPanel,
  EndingPanel,
  QuizPanel,
  ResultPanel,
  StoryPanel,
} from "./components"; // 页面组件
import { useAuthSession } from "./hooks/useAuthSession"; // 登录态 Hook
import { useQuizFlow } from "./hooks/useQuizFlow"; // 测评 Hook
import { useStoryFlow } from "./hooks/useStoryFlow"; // 剧情 Hook
import { useNarration } from "./hooks/useNarration"; // 旁白 Hook

// MARK: AppShell 主流程
export default function AppShell() {
  const [phase, setPhase] = useState("quiz"); // 流程阶段

  const {
    session, // 会话
    email, // 邮箱
    password, // 密码
    setEmail, // 设置邮箱
    setPassword, // 设置密码
    signIn, // 登录
    signUp, // 注册
    signOut, // 退出
    authError, // 登录错误
  } = useAuthSession();

  const {
    currentQuestion, // 当前题目
    questionIndex, // 题目索引
    totalQuestions, // 题目总数
    answers, // 测试答案
    characterResult, // 角色结果
    activeCharacter, // 当前角色
    activeCharacterId, // 当前角色 ID
    handleAnswer, // 答题回调
    resetQuiz, // 重置测评
  } = useQuizFlow();

  const {
    chapterList, // 章节列表
    selectedChapter, // 当前章节
    currentNode, // 当前节点
    currentEnding, // 当前结局
    error: storyError, // 剧情错误
    storySteps, // 剧情步骤
    startChapter, // 开始章节
    chooseStoryOption, // 选择选项
    resetStory, // 重置剧情
  } = useStoryFlow({
    session,
    activeCharacterId,
    answers,
    setPhase,
  });

  const {
    aiEnding, // AI 旁白
    aiLoading, // AI 加载
    nodeNarratives, // 节点旁白
    narrativeLoadingId, // 旁白加载 ID
    generateAiEnding, // 生成结局旁白
    generateNarrative, // 生成节点旁白
    narrationError, // 旁白错误
    resetNarration, // 重置旁白
  } = useNarration({
    activeCharacterId,
    activeCharacter,
    selectedChapter,
    currentNode,
    currentEnding,
    storySteps,
    phase,
  });

  // MARK: 重置全流程
  const resetGame = () => {
    setPhase("quiz");
    resetQuiz();
    resetStory();
    resetNarration();
  };

  // MARK: 处理答题流程
  const handleAnswerFlow = (optionId) => {
    const result = handleAnswer(optionId);
    if (result.done) {
      setPhase("result");
    }
  };

  const combinedError = storyError || narrationError || ""; // 错误合并

  if (!session) {
    return (
      <AuthPanel
        email={email}
        password={password}
        onEmailChange={(event) => setEmail(event.target.value)}
        onPasswordChange={(event) => setPassword(event.target.value)}
        onSignIn={signIn}
        onSignUp={signUp}
        error={authError}
      />
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-3xl px-6 pb-20 text-[#5a4a4a]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-mars-style">侠影心测</h1>
          <p className="mt-2 text-sm text-[#8b6d5c]">
            已登录：{session.user.email}
          </p>
        </div>
        <Button color="ghost" onClick={async () => {
          await signOut();
          resetGame();
        }}>
          退出登录
        </Button>
      </div>

      {phase === "quiz" && (
        <QuizPanel
          currentQuestion={currentQuestion}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          onAnswer={handleAnswerFlow}
        />
      )}

      {phase === "result" && characterResult && (
        <ResultPanel
          character={characterResult}
          onStart={() => setPhase("chapter")}
          onRestart={resetGame}
        />
      )}

      {phase === "chapter" && (
        <ChapterPanel
          chapters={chapterList}
          onStart={startChapter}
          onRestart={resetGame}
        />
      )}

      {phase === "story" && currentNode && (
        <StoryPanel
          chapterTitle={selectedChapter.title}
          nodeText={currentNode.text}
          choices={currentNode.choices}
          narrative={nodeNarratives[currentNode.id]}
          narrativeLoading={narrativeLoadingId === currentNode.id}
          onGenerateNarrative={() => generateNarrative(currentNode)}
          onChoose={chooseStoryOption}
        />
      )}

      {phase === "ending" && currentEnding && (
        <EndingPanel
          endingTitle={currentEnding.title}
          endingText={currentEnding.text}
          aiEnding={aiEnding}
          aiLoading={aiLoading}
          onGenerateAiEnding={generateAiEnding}
          onRestart={resetGame}
        />
      )}

      {combinedError && (
        <p className="mt-6 text-sm text-red-500">{combinedError}</p>
      )}
    </div>
  );
}
