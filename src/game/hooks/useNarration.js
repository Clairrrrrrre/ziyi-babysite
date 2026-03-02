// 文件职责：管理 AI 旁白与节点背景生成
import { useEffect, useState } from "react"; // React Hooks
import { supabase } from "../../lib/supabaseClient"; // Supabase 客户端
import { buildEndingPrompt, buildNarrativePrompt } from "../utils/prompts"; // 提示词

// MARK: useNarration 旁白 Hook
export const useNarration = ({
  activeCharacterId, // 角色 ID
  activeCharacter, // 角色信息
  selectedChapter, // 当前章节
  currentNode, // 当前节点
  currentEnding, // 当前结局
  storySteps, // 剧情步骤
  phase, // 当前阶段
}) => {
  const [aiEnding, setAiEnding] = useState(""); // AI 旁白
  const [aiLoading, setAiLoading] = useState(false); // AI 加载
  const [nodeNarratives, setNodeNarratives] = useState({}); // 旁白缓存
  const [narrativeLoadingId, setNarrativeLoadingId] = useState(null); // 旁白加载
  const [error, setError] = useState(""); // 错误提示

  // MARK: 生成结局旁白
  const generateAiEnding = async () => {
    if (!currentEnding || !selectedChapter || !activeCharacter) return;
    setAiLoading(true);
    setError("");
    setAiEnding("");

    const summary = storySteps
      .map((step, index) => {
        const node = selectedChapter.nodes[step.nodeId];
        const choice = node.choices.find((c) => c.id === step.choiceId);
        return `第${index + 1}步：${choice?.text || "未选择"}`;
      })
      .join("；");
    const prompt = buildEndingPrompt({
      character: activeCharacter,
      chapter: selectedChapter,
      ending: currentEnding,
      summary,
    });

    try {
      const { data, error } = await supabase.functions.invoke("ai", {
        body: { prompt },
      });
      if (error) throw new Error(error.message || "AI 生成失败");
      setAiEnding(data?.answer || "");
    } catch (e) {
      setError(e.message || "AI 请求失败");
    } finally {
      setAiLoading(false);
    }
  };

  // MARK: 生成节点旁白
  const generateNarrative = async (node) => {
    if (!node || !selectedChapter || !activeCharacter) return;
    if (nodeNarratives[node.id]) return;
    setNarrativeLoadingId(node.id);
    setError("");

    const choicesHint = node.choices
      .map((choice) => `${choice.text}（可能后果：${choice.hint || "未知"}）`)
      .join("；");
    const extraTone =
      activeCharacterId === "yangguo"
        ? "注意情感线含蓄点到为止，但不要直说结局。"
        : "注意保持人物性格一致。";
    const prompt = buildNarrativePrompt({
      character: activeCharacter,
      chapter: selectedChapter,
      node,
      choicesHint,
      extraTone,
    });

    try {
      const { data, error } = await supabase.functions.invoke("ai", {
        body: { prompt },
      });
      if (error) throw new Error(error.message || "AI 生成失败");
      setNodeNarratives((prev) => ({
        ...prev,
        [node.id]: data?.answer || "",
      }));
    } catch (e) {
      setError(e.message || "AI 请求失败");
    } finally {
      setNarrativeLoadingId(null);
    }
  };

  // MARK: 自动生成背景
  useEffect(() => {
    if (phase === "story" && currentNode) {
      generateNarrative(currentNode);
    }
  }, [phase, currentNode?.id]);

  return {
    aiEnding,
    aiLoading,
    nodeNarratives,
    narrativeLoadingId,
    generateAiEnding,
    generateNarrative,
    narrationError: error,
    resetNarration: () => {
      setAiEnding("");
      setAiLoading(false);
      setNodeNarratives({});
      setNarrativeLoadingId(null);
      setError("");
    },
  };
};
