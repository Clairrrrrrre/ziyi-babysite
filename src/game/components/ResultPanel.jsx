// 文件职责：展示测评结果与入口动作
import React from "react"; // React 运行时
import { Button, Panel } from "../../design-system"; // 设计系统组件

// MARK: ResultPanel 结果面板
export const ResultPanel = ({
  character, // 角色结果
  onStart, // 进入章节
  onRestart, // 重新测试
}) => {
  return (
    <Panel className="mt-10">
      <h2 className="text-xl font-bold">你最像</h2>
      <div className="mt-4 grid gap-4 rounded-2xl border border-[#ffb5d9]/40 bg-white px-5 py-4 md:grid-cols-[140px_1fr]">
        <div className="h-[140px] w-[140px] overflow-hidden rounded-2xl border border-[#ffb5d9]/30 bg-white">
          <img
            src={character.image}
            alt={`${character.name} 卡通头像`}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-lg font-semibold">
            {character.name} · {character.book}
          </p>
          <p className="mt-2 text-sm text-[#8b6d5c]">{character.summary}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={onStart}>进入章节</Button>
        <Button color="ghost" onClick={onRestart}>
          重新测试
        </Button>
        <Button color="outline" disabled>
          保存结果图
        </Button>
        <Button color="outline" disabled>
          分享结果
        </Button>
      </div>
    </Panel>
  );
};
