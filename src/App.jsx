import React from 'react';
import { 
  AvatarHero, 
  BioHeader, 
  SocialStrip, 
  ResumeTimeline, 
  PortfolioGallery, 
  ContactSection, 
  GlobalFooter 
} from './sections';

function App() {
  return (
    // 背景改为极其温柔的淡粉色渐变
    <div className="min-h-screen bg-gradient-to-b from-[#fff0f6] via-[#ffffff] to-[#fff0f6] font-sans selection:bg-[#ff0fa2] selection:text-white overflow-x-hidden">
      
      {/* 01 ▸ 头像区 */}
      <AvatarHero />

      <main className="main-container">
        {/* 02 ▸ 名称简介 */}
        <BioHeader />

        {/* 03 ▸ 社媒链接 */}
        <SocialStrip />

        {/* 04 ▸ 履历时间线 */}
        <ResumeTimeline />

        {/* 05 ▸ 作品集网格 */}
        <PortfolioGallery />

        {/* 06 ▸ 联系我 */}
        <ContactSection />
      </main>

      {/* 07 ▸ 页脚 */}
      <GlobalFooter />
    </div>
  );
}

export default App;
