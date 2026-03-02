// 文件职责：展示剧情节点与选项
import React from "react"; // React 运行时
import { Button, Panel } from "../../design-system"; // 设计系统组件

// MARK: StoryPanel 剧情面板
export const StoryPanel = ({
  chapterTitle, // 章节标题
  nodeText, // 节点文本
  choices, // 选项列表
  narrative, // 旁白内容
  narrativeLoading, // 旁白加载状态
  onGenerateNarrative, // 旁白生成
  onChoose, // 选项选择
}) => {
  return (
    <Panel className="mt-10">
      <h2 className="text-xl font-bold">{chapterTitle}</h2>
      <p className="mt-4 text-sm text-[#8b6d5c]">{nodeText}</p>

      <div className="mt-6 rounded-2xl border border-[#ffb5d9]/40 bg-white px-5 py-4 text-sm leading-relaxed">
        <div className="flex items-center justify-between gap-3">
          <span className="font-semibold text-[#5a4a4a]">背景旁白</span>
          <Button
            color="ghost"
            size="sm"
            onClick={onGenerateNarrative}
            disabled={narrativeLoading}
          >
            {narrativeLoading ? "生成中…" : "生成背景"}
          </Button>
        </div>
        <p className="mt-3 text-[#8b6d5c]">
          {narrative || "点击生成背景旁白，让你更懂当前情境。"}
        </p>
      </div>

      <div className="mt-6 grid gap-3">
        {choices.map((choice) => (
          <div key={choice.id} className="rounded-2xl border border-[#ffb5d9]/30 bg-white px-4 py-3">
            <Button
              color="outline"
              className="w-full justify-start"
              onClick={() => onChoose(choice)}
            >
              {choice.text}
            </Button>
            {choice.hint && (
              <p className="mt-2 text-xs text-[#8b6d5c]/80">{choice.hint}</p>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
};
