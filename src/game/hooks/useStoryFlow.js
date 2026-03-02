// 文件职责：管理章节与剧情流程
import { useState } from "react"; // React Hooks
import { supabase } from "../../lib/supabaseClient"; // Supabase 客户端
import { storyChapters } from "../data/storyChapters"; // 章节数据

// MARK: useStoryFlow 剧情流程 Hook
export const useStoryFlow = ({
  session, // 会话
  activeCharacterId, // 当前角色 ID
  answers, // 测试答案
  setPhase, // 设置阶段
}) => {
  const [selectedChapter, setSelectedChapter] = useState(null); // 选中章节
  const [currentNodeId, setCurrentNodeId] = useState(null); // 当前节点
  const [endingId, setEndingId] = useState(null); // 结局 ID
  const [runId, setRunId] = useState(null); // 跑局 ID
  const [storySteps, setStorySteps] = useState([]); // 剧情步骤
  const [error, setError] = useState(""); // 错误提示

  const chapterList = storyChapters[activeCharacterId] || [];
  const currentNode =
    selectedChapter && currentNodeId
      ? selectedChapter.nodes[currentNodeId]
      : null;
  const currentEnding =
    selectedChapter && endingId ? selectedChapter.endings[endingId] : null;

  // MARK: 重置剧情
  const resetStory = () => {
    setSelectedChapter(null);
    setCurrentNodeId(null);
    setEndingId(null);
    setRunId(null);
    setStorySteps([]);
    setError("");
  };

  // MARK: 开始章节
  const startChapter = async (chapter) => {
    setError("");
    setSelectedChapter(chapter);
    setCurrentNodeId(chapter.startNodeId);
    setEndingId(null);
    setStorySteps([]);
    setPhase("story");

    try {
      const { data, error } = await supabase
        .from("game_runs")
        .insert({
          user_id: session?.user?.id,
          character_id: activeCharacterId,
          chapter_id: chapter.id,
          quiz_answers: answers,
        })
        .select("id")
        .single();

      if (error) throw error;
      setRunId(data.id);
    } catch (e) {
      setError(e.message || "无法记录游戏进度");
    }
  };

  // MARK: 选择剧情选项
  const chooseStoryOption = async (choice) => {
    setError("");
    const nextSteps = [
      ...storySteps,
      { nodeId: currentNode.id, choiceId: choice.id },
    ];
    setStorySteps(nextSteps);

    if (runId) {
      try {
        await supabase.from("game_steps").insert({
          run_id: runId,
          step_index: nextSteps.length,
          node_id: currentNode.id,
          choice_id: choice.id,
        });
      } catch {
        // 不中断流程
      }
    }

    if (choice.endingId) {
      setEndingId(choice.endingId);
      setPhase("ending");
    } else {
      setCurrentNodeId(choice.nextId);
    }
  };

  return {
    chapterList,
    selectedChapter,
    currentNode,
    currentEnding,
    error,
    startChapter,
    chooseStoryOption,
    resetStory,
    storySteps,
  };
};
