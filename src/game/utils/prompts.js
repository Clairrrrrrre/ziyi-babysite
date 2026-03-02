// 文件职责：生成 AI 旁白与背景提示词
export const buildEndingPrompt = ({ character, chapter, ending, summary }) => {
  return `你是金庸风格的旁白写手。角色：${character.name}。角色背景：${character.profile}。章节：${chapter.title}。玩家选择：${summary}。结局：${ending.title} - ${ending.text}。请用120~200字写一个带情绪的结局旁白，语言简洁有力。`;
};

export const buildNarrativePrompt = ({
  character,
  chapter,
  node,
  choicesHint,
  extraTone,
}) => {
  return `你是金庸风格的旁白写手。角色：${character.name}。角色背景：${character.profile}。章节：${chapter.title}。章节背景：${chapter.intro}。当前情境：${node.text}。玩家可选项：${choicesHint}。${extraTone}。请写80~140字的背景旁白，先回顾关键信息，再点出可能后果，不要剧透最终结局。`;
};
