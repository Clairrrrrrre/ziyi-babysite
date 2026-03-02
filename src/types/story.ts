// 文件职责：定义剧情与测试相关的类型接口
export interface Character {
  id: string; // 角色唯一 ID
  name: string; // 角色名称
  book: string; // 角色所属作品
  description: string | null; // 角色简介
  created_at: string; // 创建时间
}

export interface QuizQuestion {
  id: string; // 题目唯一 ID
  question: string; // 题目内容
  order_index: number; // 题目排序
  created_at: string; // 创建时间
}

export interface QuizOption {
  id: string; // 选项唯一 ID
  question_id: string; // 关联题目 ID
  label: string; // 选项文案
  score: Record<string, number>; // 角色分值
  order_index: number; // 选项排序
  created_at: string; // 创建时间
}

export interface StoryChapter {
  id: string; // 章节唯一 ID
  character_id: string; // 角色 ID
  title: string; // 章节标题
  intro: string | null; // 章节简介
  start_node_id: string | null; // 起始节点 ID
  created_at: string; // 创建时间
}

export interface StoryNode {
  id: string; // 节点唯一 ID
  chapter_id: string; // 章节 ID
  title: string | null; // 节点标题
  body: string; // 节点正文
  order_index: number | null; // 节点排序
  created_at: string; // 创建时间
}

export interface StoryEnding {
  id: string; // 结局唯一 ID
  chapter_id: string; // 章节 ID
  title: string; // 结局标题
  body: string; // 结局正文
  is_canon: boolean; // 是否原著结局
  created_at: string; // 创建时间
}

export interface StoryChoice {
  id: string; // 选项唯一 ID
  node_id: string; // 节点 ID
  label: string; // 选项文案
  next_node_id: string | null; // 下一节点 ID
  ending_id: string | null; // 结局 ID
  order_index: number | null; // 选项排序
  created_at: string; // 创建时间
}

export interface GameRun {
  id: string; // 跑局 ID
  user_id: string; // 用户 ID
  character_id: string | null; // 角色 ID
  chapter_id: string | null; // 章节 ID
  quiz_answers: { questionId: string; optionId: string }[]; // 测试答案
  result: Record<string, unknown> | null; // 结果扩展
  created_at: string; // 创建时间
}

export interface GameStep {
  id: string; // 步骤 ID
  run_id: string; // 跑局 ID
  step_index: number; // 步骤序号
  node_id: string | null; // 节点 ID
  choice_id: string | null; // 选项 ID
  created_at: string; // 创建时间
}
