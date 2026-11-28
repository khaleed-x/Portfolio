export interface StoryChapter {
  period: string
  title: string
  text: string[]
  /** Chapters marked draft are hidden on the site. Fill in the text, then remove `draft: true`. */
  draft?: boolean
}

export const aboutIntro = {
  paragraphs: [
    "I'm a software engineer with a strong backend focus. I work primarily with C# and the .NET ecosystem, and I'm drawn to the parts of engineering that require you to think carefully: understanding a problem, making sound architectural decisions, and building systems that remain reliable and maintainable as they grow.",
    "But software is only one part of my story. My journey has taken a few turns, from an early interest in different creative and technical fields to studying Computer Science, learning to build software, and developing a craft in men's tailoring. I still make time for both engineering and fashion designing. I enjoy learning how things work, getting beneath the surface, and turning what I discover into something tangible.",
  ],
}

export const story: StoryChapter[] = [
  {
    period: "Growing up",
    title: "Where my story begins",
    text: [
      "I was born in Oyo State and grew up in Ogun State, around the Lagos–Ogun axis. At a very early age, I moved to live with my Big Daddy, and that became an important part of my upbringing. My childhood and the places I grew up around form the background to the person I am today.",
      "As a child, I didn't have one fixed picture of what my future would look like. Like many people, I was still discovering what interested me and what kind of work I could imagine doing. Looking back, the different directions I considered were all part of finding my way.",
    ],
  },
  {
    period: "2020–2023",
    title: "Finding a craft in tailoring",
    text: [
      "One of the first paths I committed myself to learning was men's clothing. I started training around 2020 and spent the following years learning the process of turning fabric and an idea into a finished garment. My training covered a broad range of men's clothing, including trousers, casual pieces, waistcoats, and suits. I completed my apprenticeship in 2023.",
      "Tailoring has never been something I simply tried and left behind. I still sew, take on fashion designing opportunities, and enjoy the practical work involved in getting a piece right. It has taught me patience, attention to detail, and respect for the steps behind a finished result. Those lessons continue to influence how I approach engineering, too.",
    ],
  },
  {
    period: "Choosing a direction",
    title: "An unexpected turn towards Computer Science",
    text: [
      "When I was preparing for further education, I was still weighing up what I wanted to pursue. Architecture was one of the options I seriously considered, alongside other fields that interested me at the time. Computer Science wasn't necessarily the plan I had started with.",
      "While I was preparing my admission choices, I came across information about Computer Science on my phone. It caught my attention enough that I changed direction and decided to give it a chance. When I gained admission to study Computer Science, what began as a change of mind became the starting point of a much bigger interest.",
    ],
  },
  {
    period: "First year in higher institution",
    title: "When code started making sense",
    text: [
      "My curiosity about computing grew during my first year. An Introduction to Computing course got me thinking about how a few written instructions could become something much larger: a program, an application, or even a web experience that people could use. I wanted to understand what happened between writing code and seeing a working product.",
      "In the following semester, I studied Java and wrote my first programs. Java was the first language I used to put those ideas into practice. I worked through assignments, experimented with what I was learning, and gradually became more comfortable with the idea of solving problems through code. I also encountered C, although I didn't explore it as deeply at the time.",
    ],
  },
  {
    period: "SIWES",
    title: "Discovering C# during SIWES",
    text: [
      "My SIWES industrial training at SoftcodTechNG in Ibadan gave me a more practical introduction to software development. The training exposed me to PHP for web development, C# for software development, and graphic design. Each area offered something different, but C# was the one that really stayed with me.",
      "A big part of that was the way it was taught. The founder and CEO led the C# instruction, and the explanations helped me understand the concepts in a way that made me want to keep going. Even though PHP initially seemed like the simpler language, I found myself connecting more with C# because the teaching made the ideas clearer. That experience gave me a foundation and a language I wanted to explore beyond the training period.",
    ],
  },
  {
    period: "2025 onward",
    title: "Going deeper with C# and .NET",
    text: [
      "After SIWES, I became more interested in what C# could do beyond the desktop applications I had first associated it with. I began discovering the wider reach of the language and its ecosystem, from web applications and backend services to other areas of software development. Around the middle to latter part of 2025, I started focusing more deliberately on .NET.",
      "I learn best when I can connect an idea to something practical. When a concept makes me curious, I research it, follow the details until I have a clearer understanding, and then look for a way to build with it. I don't like learning a technology only as a collection of syntax or definitions; I want to understand how its pieces fit together and why they work the way they do.",
      "AurHER was the first project I built with .NET. It gave me an opportunity to take what I was learning and apply it to a complete e-commerce application, rather than keeping the knowledge in isolated exercises. Since then, projects have remained an important part of how I grow: each one gives me a reason to learn something new, revisit fundamentals, and become more deliberate about the way I build.",
      "C# and .NET remain my strongest technical foundation, but I don't see myself as limited to one language or ecosystem. The understanding I've developed around programming fundamentals, backend concepts, and application design has helped me move between technologies more confidently. I've worked with JavaScript, TypeScript, PHP, and Python in practical projects, and Java is also familiar territory from my early studies. I enjoy learning the differences in a language or framework and understanding the conventions of the ecosystem rather than starting from zero each time.",
      "That range is part of my work today. The backend infrastructure I currently lead at Hosté is built with TypeScript. Working with it has given me the opportunity to apply my backend engineering thinking in a different language and ecosystem, while continuing to grow beyond the .NET stack. I value having a primary area of depth while remaining adaptable enough to choose and work with the right tools for a project.",
      "For a significant part of this journey, I was learning without having a personal computer of my own. I continued finding ways to study and practise with the resources available to me. Getting my own PC made it easier to settle into a more consistent development routine, but it was a step forward in a learning journey that had already been underway.",
    ],
  },
  {
    period: "2024–2025",
    title: "Learning beyond the technical side",
    text: [
      "Serving as Software Director II at the NACOS TPi Chapter was another meaningful part of my development. It put me in an environment where I had to look beyond code and technical decisions and pay attention to the people, interests, conversations, and dynamics that shape an organisation.",
      "The experience gave me some insight into the political side of group life and prompted reflections about life and human behaviour that I might not have arrived at on my own. It broadened my perspective in ways that were different from what I was learning in the classroom or through software projects.",
    ],
  },
  {
    period: "Education",
    title: "Growing through study and practice",
    text: [
      "I completed my National Diploma in Computer Science in 2025 and am continuing my studies at HND level. My education has given me a formal grounding in computing, while personal projects and practical experience have helped me connect what I learn in class to the work of building real software.",
      "I see formal education and practical experience as complementary. There is value in understanding the principles behind a subject, and there is a different kind of understanding that comes from applying them, encountering problems, and working through the details yourself. My academic ambitions also extend beyond my current qualification: in the long term, I hope to continue through postgraduate study and earn a PhD.",
    ],
  },
  {
    period: "Now",
    title: "Taking on engineering responsibility at Hosté",
    text: [
      "Today, I oversee the backend engineering direction at Hosté. My responsibilities include making architectural decisions and overseeing the implementation of the backend infrastructure that powers the company's systems. It is work that calls for more than getting individual features working; it requires thinking about how the pieces fit together and how the systems can remain dependable over time.",
      "I approach that responsibility with the same mindset that has shaped my learning so far: understand the problem properly, think through the structure, and build with maintainability and reliability in mind. I'm continuing to deepen my engineering judgement while contributing to software that serves real users and business needs.",
    ],
  },
  {
    period: "Beyond software",
    title: "Still creating with my hands",
    text: [
      "When I'm not working on software, there's a good chance I'm working on a garment. Men's tailoring remains an active craft for me, not just a line in my history. I enjoy the process of taking measurements, thinking through construction, working with fabric, and gradually bringing a design together.",
      "I'm also naturally curious and enjoy researching topics simply because I want to understand how they work. And beyond work and learning, I enjoy lively experiences, spending time with people, and making room to have fun. I don't want my life to be defined only by the technologies I use or the projects I build. Those are important to me, but so are the interests and experiences that make me who I am.",
    ],
  },
]
