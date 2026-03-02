// 文件职责：定义性格测试题目与评分规则
export const quizQuestions = [
  {
    id: "q1",
    text: "江湖不平时，你更像哪种出手方式？",
    options: [
      { id: "q1o1", text: "孤身出手，宁可受伤", scores: { yangguo: 2, guoxiang: 1 } },
      { id: "q1o2", text: "先探虚实，再一击制胜", scores: { huangrong: 2, chengying: 1 } },
      { id: "q1o3", text: "先护住同伴，再谋后策", scores: { guojing: 2, guofu: 1 } },
      { id: "q1o4", text: "冷眼旁观，等对方露怯", scores: { limochou: 2, qiuqianchi: 1 } },
    ],
  },
  {
    id: "q2",
    text: "有人误解你时，你的第一反应是？",
    options: [
      { id: "q2o1", text: "当场说清楚，不留余地", scores: { guofu: 2, yangguo: 1 } },
      { id: "q2o2", text: "沉默忍下，事后再解释", scores: { chengying: 2, xiaolongnv: 1 } },
      { id: "q2o3", text: "先稳住局势，后找证据", scores: { huangrong: 2, guojing: 1 } },
      { id: "q2o4", text: "懒得解释，直接离开", scores: { limochou: 2, yangguo: 1 } },
    ],
  },
  {
    id: "q3",
    text: "面对强势长辈，你会怎么做？",
    options: [
      { id: "q3o1", text: "据理力争，绝不低头", scores: { yangguo: 2, guofu: 1 } },
      { id: "q3o2", text: "先应下再谋后路", scores: { huangrong: 2, luwushuang: 1 } },
      { id: "q3o3", text: "守规矩，但会慢慢争取", scores: { guojing: 2, guoxiang: 1 } },
      { id: "q3o4", text: "看似服从，实则暗自翻盘", scores: { qiuqianchi: 2, limochou: 1 } },
    ],
  },
  {
    id: "q4",
    text: "你更容易被哪类人打动？",
    options: [
      { id: "q4o1", text: "愿意陪你一起闯荡的人", scores: { yangguo: 2, guoxiang: 1 } },
      { id: "q4o2", text: "外冷内热、真心难得的人", scores: { xiaolongnv: 2, chengying: 1 } },
      { id: "q4o3", text: "机智聪明、能并肩作战的人", scores: { huangrong: 2, guofu: 1 } },
      { id: "q4o4", text: "不计过往、仍愿靠近你的人", scores: { limochou: 2, luwushuang: 1 } },
    ],
  },
  {
    id: "q5",
    text: "你更擅长解决哪种难题？",
    options: [
      { id: "q5o1", text: "武力压制，一招制敌", scores: { yangguo: 2, guofu: 1 } },
      { id: "q5o2", text: "布局谋划，一步到位", scores: { huangrong: 2, chengying: 1 } },
      { id: "q5o3", text: "坚持到底，水到渠成", scores: { guojing: 2, guoxiang: 1 } },
      { id: "q5o4", text: "狠下心肠，断舍离", scores: { limochou: 2, qiuqianchi: 1 } },
    ],
  },
  {
    id: "q6",
    text: "夜路遇伏，你第一步会？",
    options: [
      { id: "q6o1", text: "先护弱者，再反击", scores: { guojing: 2, guoxiang: 1 } },
      { id: "q6o2", text: "先找掩体，冷静判断", scores: { chengying: 2, huangrong: 1 } },
      { id: "q6o3", text: "拔剑硬冲，先声夺人", scores: { guofu: 2, yangguo: 1 } },
      { id: "q6o4", text: "设局反杀，让对方自乱", scores: { limochou: 2, qiuqianchi: 1 } },
    ],
  },
  {
    id: "q7",
    text: "你对“规矩”的态度更接近？",
    options: [
      { id: "q7o1", text: "规矩是束缚，能破则破", scores: { yangguo: 2, limochou: 1 } },
      { id: "q7o2", text: "规矩要守，但可灵活变通", scores: { huangrong: 2, chengying: 1 } },
      { id: "q7o3", text: "规矩是底线，必须遵守", scores: { guojing: 2, guofu: 1 } },
      { id: "q7o4", text: "规矩只对别人有用", scores: { qiuqianchi: 2, guofu: 1 } },
    ],
  },
  {
    id: "q8",
    text: "你更看重哪种情感表达？",
    options: [
      { id: "q8o1", text: "默默付出，行动胜于言语", scores: { xiaolongnv: 2, chengying: 1 } },
      { id: "q8o2", text: "直球表达，不留遗憾", scores: { guofu: 2, luwushuang: 1 } },
      { id: "q8o3", text: "克制而坚定，慢慢靠近", scores: { guojing: 2, guoxiang: 1 } },
      { id: "q8o4", text: "情感浓烈，爱恨分明", scores: { limochou: 2, yangguo: 1 } },
    ],
  },
  {
    id: "q9",
    text: "遇到背叛时，你更可能？",
    options: [
      { id: "q9o1", text: "彻底断绝，不再回头", scores: { limochou: 2, qiuqianchi: 1 } },
      { id: "q9o2", text: "先查清真相，再做决定", scores: { huangrong: 2, chengying: 1 } },
      { id: "q9o3", text: "愿意给对方最后一次机会", scores: { guojing: 2, guoxiang: 1 } },
      { id: "q9o4", text: "当场发作，让他知道代价", scores: { guofu: 2, yangguo: 1 } },
    ],
  },
  {
    id: "q10",
    text: "你更喜欢怎样的成长方式？",
    options: [
      { id: "q10o1", text: "孤身磨砺，靠自己变强", scores: { yangguo: 2, limochou: 1 } },
      { id: "q10o2", text: "有师友指引，步步精进", scores: { guojing: 2, guoxiang: 1 } },
      { id: "q10o3", text: "学会权衡，靠智慧突围", scores: { huangrong: 2, chengying: 1 } },
      { id: "q10o4", text: "先吃亏再反击，越挫越狠", scores: { qiuqianchi: 2, luwushuang: 1 } },
    ],
  },
  {
    id: "q11",
    text: "你更容易被哪种误解困扰？",
    options: [
      { id: "q11o1", text: "被说冷淡无情", scores: { xiaolongnv: 2, yangguo: 1 } },
      { id: "q11o2", text: "被说冲动鲁莽", scores: { guofu: 2, luwushuang: 1 } },
      { id: "q11o3", text: "被说太善良好欺负", scores: { guojing: 2, guoxiang: 1 } },
      { id: "q11o4", text: "被说心机太深", scores: { huangrong: 2, qiuqianchi: 1 } },
    ],
  },
  {
    id: "q12",
    text: "遇到危局时，你更信什么？",
    options: [
      { id: "q12o1", text: "靠自己，别指望任何人", scores: { yangguo: 2, limochou: 1 } },
      { id: "q12o2", text: "靠同伴，情义最重要", scores: { guojing: 2, guoxiang: 1 } },
      { id: "q12o3", text: "靠脑子，信息最重要", scores: { huangrong: 2, chengying: 1 } },
      { id: "q12o4", text: "靠威势，别人自会退让", scores: { qiuqianchi: 2, guofu: 1 } },
    ],
  },
  {
    id: "q13",
    text: "你面对爱时，更倾向？",
    options: [
      { id: "q13o1", text: "一旦确定就绝不回头", scores: { yangguo: 2, xiaolongnv: 1 } },
      { id: "q13o2", text: "慢慢靠近，但会紧张", scores: { guoxiang: 2, chengying: 1 } },
      { id: "q13o3", text: "骄傲克制，但其实很在意", scores: { guofu: 2, huangrong: 1 } },
      { id: "q13o4", text: "宁可孤独，也不轻易交心", scores: { limochou: 2, qiuqianchi: 1 } },
    ],
  },
  {
    id: "q14",
    text: "你更容易被哪句话击中？",
    options: [
      { id: "q14o1", text: "“我懂你，不必解释。”", scores: { xiaolongnv: 2, chengying: 1 } },
      { id: "q14o2", text: "“你很强，但也值得被爱。”", scores: { guofu: 2, yangguo: 1 } },
      { id: "q14o3", text: "“你一直做得很对。”", scores: { guojing: 2, guoxiang: 1 } },
      { id: "q14o4", text: "“你可以放下恨了。”", scores: { limochou: 2, qiuqianchi: 1 } },
    ],
  },
  {
    id: "q15",
    text: "你更能接受哪种牺牲？",
    options: [
      { id: "q15o1", text: "为爱离开熟悉的一切", scores: { yangguo: 2, xiaolongnv: 1 } },
      { id: "q15o2", text: "为大义守住城池", scores: { guojing: 2, guoxiang: 1 } },
      { id: "q15o3", text: "为局势忍一时委屈", scores: { huangrong: 2, chengying: 1 } },
      { id: "q15o4", text: "为尊严翻脸到底", scores: { guofu: 2, qiuqianchi: 1 } },
    ],
  },
  {
    id: "q16",
    text: "你对“江湖名声”的看法？",
    options: [
      { id: "q16o1", text: "不在乎，自己痛快最重要", scores: { yangguo: 2, limochou: 1 } },
      { id: "q16o2", text: "很重要，它代表家与责任", scores: { guojing: 2, guofu: 1 } },
      { id: "q16o3", text: "可用来做事，不必太当真", scores: { huangrong: 2, chengying: 1 } },
      { id: "q16o4", text: "名声反而会束缚我", scores: { xiaolongnv: 2, guoxiang: 1 } },
    ],
  },
]; // 题目列表
