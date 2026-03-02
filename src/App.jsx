// 文件职责：应用入口，挂载游戏主流程
import React from "react"; // React 运行时
import { AppShell } from "./game"; // 游戏主入口

// MARK: 应用根组件
export default function App() {
  return <AppShell />;
}