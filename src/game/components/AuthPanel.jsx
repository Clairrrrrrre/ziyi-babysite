// 文件职责：处理登录与注册的界面
import React from "react"; // React 运行时
import { Button, Input, Panel } from "../../design-system"; // 设计系统组件

// MARK: AuthPanel 登录面板
export const AuthPanel = ({
  email, // 邮箱
  password, // 密码
  onEmailChange, // 邮箱变更
  onPasswordChange, // 密码变更
  onSignIn, // 登录
  onSignUp, // 注册
  error, // 错误提示
}) => {
  return (
    <div className="mx-auto mt-24 max-w-md px-6 text-[#5a4a4a]">
      <Panel>
        <h2 className="text-2xl font-bold text-mars-style">登录 / 注册</h2>
        <div className="mt-6 space-y-3">
          <Input
            placeholder="邮箱"
            value={email}
            onChange={onEmailChange}
          />
          <Input
            placeholder="密码"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <div className="mt-6 flex gap-3">
          <Button onClick={onSignIn}>登录</Button>
          <Button color="outline" onClick={onSignUp}>
            注册
          </Button>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </Panel>
    </div>
  );
};
