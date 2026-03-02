// 文件职责：展示章节列表与空降入口
import React from "react"; // React 运行时
import { Button, Panel } from "../../design-system"; // 设计系统组件

// MARK: ChapterPanel 章节面板
export const ChapterPanel = ({
  chapters, // 章节列表
  onStart, // 开始章节
  onRestart, // 重新测试
}) => {
  return (
    <Panel className="mt-10">
      <h2 className="text-xl font-bold">选择章节</h2>
      {chapters.length === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-[#ffb5d9] p-4 text-sm text-[#8b6d5c]">
          当前角色章节还在制作中，可以先重新测评。
          {onRestart && (
            <div className="mt-4">
              <Button color="outline" onClick={onRestart}>
                重新测试
              </Button>
            </div>
          )}
        </div>
      )}
      <div className="mt-6 grid gap-4">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="rounded-2xl border border-[#ffb5d9]/30 bg-white px-5 py-4"
          >
            <p className="text-lg font-semibold">{chapter.title}</p>
            <p className="mt-2 text-sm text-[#8b6d5c]">{chapter.intro}</p>
            {chapter.theme && (
              <p className="mt-2 text-xs text-[#8b6d5c]/80">
                {chapter.theme}
              </p>
            )}
            <div className="mt-4">
              <Button onClick={() => onStart(chapter)}>进入剧情</Button>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
};
