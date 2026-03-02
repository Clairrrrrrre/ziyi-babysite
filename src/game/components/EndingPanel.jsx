// 文件职责：展示结局与 AI 旁白
import React from "react"; // React 运行时
import { Button, Panel } from "../../design-system"; // 设计系统组件

// MARK: EndingPanel 结局面板
export const EndingPanel = ({
  endingTitle, // 结局标题
  endingText, // 结局正文
  aiEnding, // AI 旁白
  aiLoading, // AI 加载
  onGenerateAiEnding, // 生成旁白
  onRestart, // 再玩一次
}) => {
  return (
    <Panel className="mt-10">
      <h2 className="text-xl font-bold">{endingTitle}</h2>
      <p className="mt-4 text-sm text-[#8b6d5c]">{endingText}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={onGenerateAiEnding} disabled={aiLoading}>
          {aiLoading ? "生成中…" : "生成 AI 旁白"}
        </Button>
        <Button color="ghost" onClick={onRestart}>
          再玩一次
        </Button>
        <Button color="outline" disabled>
          保存结局图
        </Button>
        <Button color="outline" disabled>
          分享结局
        </Button>
      </div>

      {aiEnding && (
        <div className="mt-6 rounded-2xl border border-[#ffb5d9]/40 bg-white px-5 py-4 text-sm leading-relaxed">
          {aiEnding}
        </div>
      )}
    </Panel>
  );
};
