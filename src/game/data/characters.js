// 文件职责：定义金庸角色的基础资料与背景信息
export const characters = [
  {
    id: "yangguo",
    name: "杨过",
    book: "神雕侠侣",
    tagline: "孤绝又深情，敢爱敢恨。",
    profile:
      "幼年被郭家收养，心中自尊敏感却倔强。与小龙女相恋，被世俗阻隔。对郭家旧怨未消，内心仍保留温软牵挂。",
    summary:
      "你最像杨过：锋利、真诚、敢爱敢恨。你有侠气，也有孤绝的自尊，容易被误解为冷硬，却其实极其重情。偶尔执拗，反而让你更坚定地走向想要的人生。",
    image: "/characters/yangguo.png",
  },
  {
    id: "xiaolongnv",
    name: "小龙女",
    book: "神雕侠侣",
    tagline: "清冷自守，却情深如火。",
    profile:
      "自幼清冷，习惯独处，对情感却异常纯粹。她的安静不是疏离，而是极致专注。",
    summary:
      "你最像小龙女：清冷、克制、内心澄澈。你不张扬，却在关键时刻敢于选择。偶尔被误解为冷淡，但你的深情一旦认定就不回头。",
    image: "/characters/xiaolongnv.png",
  },
  {
    id: "guofu",
    name: "郭芙",
    book: "神雕侠侣",
    tagline: "骄矜直率，外硬内软。",
    profile:
      "从小被宠爱，性子直来直往。外表骄矜，内心却渴望被理解与认可。",
    summary:
      "你最像郭芙：直率、要强、带着一点骄傲。你在意规则与体面，也在意真实的感情。偶尔冲动惹祸，但那份真心让你始终值得被珍惜。",
    image: "/characters/guofu.png",
  },
  {
    id: "guoxiang",
    name: "郭襄",
    book: "神雕侠侣",
    tagline: "清澈灵动，心怀山河。",
    profile:
      "天真又敏锐，心怀侠义。她的温柔与坚定并存，愿意为理想走远路。",
    summary:
      "你最像郭襄：明亮、好奇、心怀侠义。你有天真，也有清醒的洞察力。偶尔容易被情绪牵动，但那份真诚让你成为故事里的光。",
    image: "/characters/guoxiang.png",
  },
  {
    id: "limochou",
    name: "李莫愁",
    book: "神雕侠侣",
    tagline: "冷艳决绝，心藏执念。",
    profile:
      "曾被情伤，心里留下深刻裂痕。她的狠与冷，都是为了保护自己。",
    summary:
      "你最像李莫愁：独立、果决、极有主见。你讨厌被轻视，也不轻易示弱。偶尔执念太深，但这份强韧让你能穿越最冷的风。",
    image: "/characters/limochou.png",
  },
  {
    id: "luwushuang",
    name: "陆无双",
    book: "神雕侠侣",
    tagline: "爽朗明快，不服输。",
    profile:
      "性子明朗，敢爱敢恨。虽历经风波，却始终保有一股倔强。",
    summary:
      "你最像陆无双：率真、爽快、有点小倔强。你不怕失败，更不怕重来。偶尔莽撞，但这份直接让你活得真实。",
    image: "/characters/luwushuang.png",
  },
  {
    id: "chengying",
    name: "程英",
    book: "神雕侠侣",
    tagline: "温婉内敛，深情克制。",
    profile:
      "外柔内刚，善于隐忍与守护。她的温柔里有很深的力量。",
    summary:
      "你最像程英：温婉、细腻、克制有度。你不轻易张扬情绪，却愿意用行动守护重要的人。偶尔太压抑自己，但你的深情无人能替代。",
    image: "/characters/chengying.png",
  },
  {
    id: "qiuqianchi",
    name: "裘千尺",
    book: "神雕侠侣",
    tagline: "强势凌厉，爱恨分明。",
    profile:
      "性格强势，爱恨分明。她的选择往往极端，但也极其真实。",
    summary:
      "你最像裘千尺：强势、果断、边界感极强。你不怕冲突，也不怕孤独。偶尔过于极端，但那份真实让你不被轻易左右。",
    image: "/characters/qiuqianchi.png",
  },
  {
    id: "huangrong",
    name: "黄蓉",
    book: "神雕侠侣",
    tagline: "聪明机警，护短也护人。",
    profile:
      "才智过人，处事果断。她懂分寸，也懂人心，是最难被忽视的存在。",
    summary:
      "你最像黄蓉：聪明、机警、善于掌局。你既能温柔也能锋利，懂得保护自己的人。偶尔过于谨慎，但这让你很少被伤到。",
    image: "/characters/huangrong.png",
  },
  {
    id: "guojing",
    name: "郭靖",
    book: "神雕侠侣",
    tagline: "忠厚如山，舍己为人。",
    profile:
      "质朴敦厚，重情重义。以家国大义为先，凡事倾向守护与承担。",
    summary:
      "你最像郭靖：踏实可靠，勇于担当。你看似木讷，却有最稳的原则与勇气。偶尔不够灵活，容易吃亏，但这份笃定让你成为他人信赖的支柱。",
    image: "/characters/guojing.png",
  },
]; // 角色列表

// MARK: 角色索引表
export const characterMap = characters.reduce((acc, character) => {
  acc[character.id] = character;
  return acc;
}, {}); // 角色索引
