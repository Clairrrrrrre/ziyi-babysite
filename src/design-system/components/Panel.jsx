// 文件职责：提供统一的内容面板容器
import React from "react"; // React 运行时
import { clsx } from "clsx"; // className 合并工具

// MARK: Panel 面板组件
export const Panel = ({ children, className }) => {
  const panelClass = clsx(
    "rounded-3xl bg-white/80 p-6 shadow-[0_20px_60px_rgba(255,181,217,0.25)]",
    className
  ); // 面板样式

  return (
    <section className={panelClass}>
      {children}
    </section>
  );
};
