export interface SampleResume {
  id: string;
  name: string;
  targetRole: string;
  experienceLevel: string;
  summary: string;
  content: string;
  jobDescription?: string;
}

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'fullstack-senior',
    name: 'Alex Rivera – Senior Full Stack Engineer',
    targetRole: 'Senior Full Stack Engineer',
    experienceLevel: 'Senior Specialist (6-8 years)',
    summary: 'Full stack engineer with React, Next.js, Node.js, and AWS experience looking for Staff/Senior opportunities.',
    content: `ALEX RIVERA
San Francisco, CA | (555) 382-9102 | alex.rivera@email.com | github.com/arivera | linkedin.com/in/arivera

PROFESSIONAL SUMMARY
Results-driven Senior Full Stack Engineer with 7+ years of experience architecting high-scale web applications, microservices, and distributed cloud infrastructure. Led engineering initiatives resulting in 45% latency reduction and $120K annual AWS savings. Skilled in Next.js, React, TypeScript, Node.js, GraphQL, PostgreSQL, Docker, and AWS.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript (ES6+), Python, SQL, HTML5, CSS3/Tailwind
Frameworks & Libraries: React, Next.js, Node.js, Express, NestJS, Redux Toolkit, React Query
Databases & Cloud: PostgreSQL, MongoDB, Redis, AWS (S3, ECS, Lambda, CloudFront), Docker, Terraform
Tools & Practices: CI/CD (GitHub Actions), Jest, Cypress, Git, Agile/Scrum, RESTful APIs, GraphQL

PROFESSIONAL EXPERIENCE

Senior Full Stack Engineer | CloudScale Inc., San Francisco, CA
March 2022 – Present
- Architected and deployed a multi-tenant enterprise analytics dashboard using Next.js 14, TypeScript, and Tailwind CSS, serving 120,000+ monthly active users.
- Redesigned backend data aggregation pipeline with Node.js and Redis caching, cutting average API response latency by 45% (from 850ms to 460ms).
- Spearheaded migration of monolithic infrastructure into Dockerized container services on AWS ECS, saving $120,000 annually in server overhead.
- Mentored 6 junior and mid-level engineers through code reviews, technical design sessions, and bi-weekly architecture workshops.
- Implemented automated end-to-end testing with Cypress and Jest, boosting test coverage from 58% to 89% and decreasing production defects by 34%.

Full Stack Developer | Nexus Digital Solutions, San Jose, CA
July 2019 – February 2022
- Developed scalable customer-facing eCommerce web applications using React, Node.js, and PostgreSQL processing $4M+ in annual transactions.
- Engineered real-time notification engine with WebSockets and Redis pub/sub, improving user engagement rate by 28%.
- Integrated Stripe payment processing API with custom webhook failure recovery, achieving 99.98% successful transaction rate.
- Collaborated with product designers in Figma to build a reusable design system of 40+ accessible UI components in Tailwind CSS.

Frontend Developer | BrightWave Media, Austin, TX
June 2017 – June 2019
- Built dynamic user interfaces and responsive landing pages utilizing React, Redux, and modern CSS, improving mobile conversion rate by 19%.
- Optimized asset delivery pipeline with image lazy loading and code splitting, decreasing bundle size by 35% and improving Google Lighthouse score from 62 to 94.
- Partnered with marketing and SEO teams to implement structured schema data and semantic HTML.

EDUCATION
Bachelor of Science in Computer Science
University of California, Davis (2013 – 2017)
Dean's Honor List, Magna Cum Laude

CERTIFICATIONS
- AWS Certified Solutions Architect – Associate (2023)
- Meta Front-End Developer Professional Certificate (2021)`,
    jobDescription: `Looking for a Senior Full Stack Engineer to lead architecture on next-generation cloud platforms. Requirements:
- 5+ years building production applications with React, Next.js, TypeScript, and Node.js.
- Deep expertise in cloud infrastructure (AWS/GCP), containerization with Docker, and Kubernetes.
- Experience with microservices, GraphQL, PostgreSQL, and distributed caching (Redis).
- Proven track record mentoring engineers, driving test-driven development, and improving ATS/CI/CD pipelines.`
  },
  {
    id: 'ai-ml-engineer',
    name: 'Priya Sharma – AI / Machine Learning Engineer',
    targetRole: 'AI / Machine Learning Engineer',
    experienceLevel: 'Mid-Level Professional (3-5 years)',
    summary: 'Machine learning practitioner specializing in LLMs, PyTorch, RAG pipelines, and vector databases.',
    content: `PRIYA SHARMA
Seattle, WA | priya.sharma.ml@email.com | github.com/priyasharma-ai | (206) 555-0194

SUMMARY
Innovative AI & Machine Learning Engineer with 4 years of experience developing deep learning models, Retrieval-Augmented Generation (RAG) architectures, and productionizing predictive systems. Proven track record deploying LLM solutions reducing customer support ticket resolution time by 60%.

TECHNICAL EXPERTISE
AI & ML: PyTorch, TensorFlow, Hugging Face Transformers, LangChain, LlamaIndex, Scikit-learn, OpenCV
LLM & Generative AI: Fine-tuning (LoRA, QLoRA), Vector DBs (Pinecone, Qdrant, Chroma), Prompt Engineering, RAG
Data Engineering: Python, SQL, Pandas, NumPy, Apache Spark, Kafka
Deployment & MLOps: MLflow, Docker, FastAPI, AWS SageMaker, Kubernetes, Triton Inference Server

WORK EXPERIENCE

Machine Learning Engineer | Apex Cognitive Systems, Seattle, WA
January 2022 – Present
- Designed and productionized enterprise RAG pipeline utilizing LangChain, Pinecone, and Claude 3.5 Sonnet, reducing customer support escalations by 60%.
- Fine-tuned open-source 7B and 14B parameter LLMs on proprietary domain data using QLoRA, achieving 91% factual accuracy benchmark score.
- Built low-latency FastAPI inference microservices hosted on AWS SageMaker with GPU auto-scaling, serving 2.5M inferences/day with p95 latency under 120ms.
- Implemented automated model monitoring and drift detection with MLflow, reducing silent model degradation incidents by 80%.

Data Scientist / AI Specialist | Horizon Analytics, Redmond, WA
August 2020 – December 2021
- Developed customer churn prediction models utilizing XGBoost and LightGBM, identifying at-risk accounts with 84% precision.
- Engineered NLP sentiment analysis system for social listening across 50,000 daily mentions using BERT embeddings.
- Built interactive analytics dashboards with Streamlit and Plotly for executive leadership decision making.

EDUCATION
Master of Science in Artificial Intelligence & Data Science
University of Washington, Seattle (2018 – 2020)
Bachelor of Science in Computer Science
Pune University (2014 – 2018)

PUBLICATIONS & AWARDS
- "Optimizing Retrieval Latency in Domain-Specific LLM Architectures" – IEEE AI Systems Conf (2023)
- First Place Winner: Pacific Northwest Hackathon (AI Track, 2022)`,
    jobDescription: `Seeking an AI / Machine Learning Engineer to build state-of-the-art Generative AI applications.
Requirements:
- 3+ years experience with PyTorch, Transformers, and LLM development.
- Hands-on experience building RAG systems with vector databases (Pinecone, Milvus, Chroma).
- Experience deploying models to production with Docker, Kubernetes, and FastAPI.
- Familiarity with MLOps best practices (monitoring, evaluations, drift detection).`
  }
];

export const POPULAR_ROLES = [
  'Senior Full Stack Engineer',
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'AI / Machine Learning Engineer',
  'Data Scientist / Data Analyst',
  'DevOps / Cloud Platform Engineer',
  'Product Manager / Technical PM',
  'UI/UX & Product Designer',
  'Cybersecurity Analyst',
  'Mobile App Developer (iOS / Android)',
  'Engineering Manager / Tech Lead',
  'Custom Role'
];

export const EXPERIENCE_LEVELS = [
  'Entry Level / New Graduate (0-2 years)',
  'Mid-Level Professional (3-5 years)',
  'Senior Specialist (6-8 years)',
  'Lead / Staff / Principal (9-12 years)',
  'Executive / Director / VP (12+ years)'
];
