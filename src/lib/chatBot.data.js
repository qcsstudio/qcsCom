export const chatflow = [
    {
        "key": "nova_intro",
        "type": "question",
        "message": "Hey there!  I’m Nova, your personal AI guide at QuantumCrafters Studio. Whether you’re a student looking to upskill, a business owner ready to automate, or a creator building your brand — I’ve got just the thing for you.\n\nWhat brings you here today? Let me guide you to the perfect solution tailored to your journey ",
        "options": [
            {
            "textHeading": "Training & Career Development\n\n\n",
            "textDescription":"I want to grow my skills and unlock better career opportunities.",
            "next": "eva_intro"
            },
            {
            "textHeading": "AI-Based Digital Services & Solutions\n\n\n",
            "textDescription":"I run a business and want to use AI or custom websites, web apps, software to grow faster and smarter.",
            "next": "ai_services"
            },
            {
            "textHeading": "ElevatrX – AI-Powered Social Media & Content Suite\n\n\n",
            "textDescription":"I want more reach, better content, and a tool to manage my social media easily.",
            "next": "elevatrx_intro"
            }
        ]
    },
    {
        "key": "eva_intro",
        "type": "question",
        "message": "Hi there  I’m NOVA — your personal career mentor. How are you feeling today?",
        "options": [
            { "textDescription": " I feel lost and don’t know where to start", "next": "lost_start" },
            { "textDescription": "I have an idea but need guidance", "next": "idea_start" },
            { "textDescription": "I know my goal, just show me the roadmap", "next": "goal_start" },
            { "textDescription": "I want to learn a skill and get a job", "next": "learn_start" },
            { "textDescription": "Just exploring", "next": "explore_start" }
        ]
    },
    {
        "key": "lost_start",
        "type": "question",
        "message": "It’s perfectly okay to feel that way. Most of our successful students began here. Let’s figure this out together. Want to take a short career discovery quiz?",
        "options": [
            { "textDescription": "Start Quiz", "next": "start_quiz" },
            { "textDescription": "Talk to a mentor instead", "next": "mentor_chat" }
        ]
    },
    {
        "key": "idea_start",
        "type": "question",
        "message": "That’s a great place to be! Share a bit about what you’re thinking — I’ll help shape it into a clear path.\nWhat are you considering?",
        "options": [
            { "textDescription": "Tech", "next": "idea_tech" },
            { "textDescription": "Design", "next": "idea_design" },
            { "textDescription": "Marketing", "next": "idea_marketing" },
            { "textDescription": "Data", "next": "idea_data" }
        ]
    },
    {
        "key": "goal_start",
        "type": "question",
        "message": "Love the clarity! Just tell me your target role — I’ll show you the exact steps to get there.",
        "options": [
            { "textDescription": "Developer", "next": "course_fullstack" },
            { "textDescription": "Marketer", "next": "course_marketing" },
            { "textDescription": "Designer", "next": "course_uiux" },
            { "textDescription": "Analyst", "next": "course_data" },
            { "textDescription": "AI Engineer", "next": "course_ai" }
        ]
    },
    {
        "key": "learn_start",
        "type": "question",
        "message": "Smart move. Let’s focus on job-ready programs with real outcomes.\nWould you prefer tech or non-tech roles?",
        "options": [
            { "textDescription": "Tech", "next": "course_tech_suggestion" },
            { "textDescription": "Non-Tech", "next": "course_nontech_suggestion" }
        ]
    },
    {
        "key": "explore_start",
        "type": "question",
        "message": "No pressure! Let me give you a tour of our top career programs, student stories, and maybe a few hidden gems",
        "options": [
            { "textDescription": "Explore All Courses", "next": "explore_all_courses" },
            { "textDescription": "Watch Learner Stories", "next": "explore_learner_stories" }
        ]
    },
    // COURSES & STORIES
    {
        "key": "explore_all_courses",
        "type": "info",
        "message": "We offer programs in Tech (Full Stack, Data, AI) and Non-Tech (Marketing, UI/UX). Feel free to explore based on your interests!",
        "next": "goal_start" 
    },
    {
        "key": "explore_learner_stories",
        "type": "info",
        "message": "Hear from students just like you! They've gone from confused to confident — and landed great jobs. Visit our YouTube or view testimonials on our site.",
        "next": "course_end_options" 
    },
    // TECH & NON-TECH ROLES MAP
    {
        "key": "course_tech_suggestion",
        "type": "question",
        "message": "Which of these tech roles are you most interested in?",
        "options": [
            { "textDescription": "Full Stack Developer", "next": "course_fullstack" },
            { "textDescription": "Data Analyst", "next": "course_data" },
            { "textDescription": "AI/ML Engineer", "next": "course_ai" }
        ]
    },
    {
        "key": "course_nontech_suggestion",
        "type": "question",
        "message": "Awesome! Non-tech roles can be just as impactful. What excites you the most?",
        "options": [
            { "textDescription": "Digital Marketer", "next": "course_marketing" },
            { "textDescription": "UI/UX Designer", "next": "course_uiux" }
        ]
    },
    // COURSES SECTION
    {
        "key": "course_fullstack",
        "type": "info",
        "message": `FULL STACK DEVELOPMENT FLOW

            This path is perfect if you enjoy building things from scratch — and want to work in tech.

            Roadmap:
            Month 1: HTML, CSS, Git
            Month 2: JavaScript, APIs
            Month 3: React, Node.js
            Month 4: Projects + Hosting
            Month 5: Internship/Mock Interviews

            FAQs:
            • Do I need prior experience? → No.
            • Placement support? → Yes.

            Resources:
            Download Full Stack Career Pack
            Book Tech Mentor Call`,
        "next": "course_end_options"
    },
    {
        "key": "course_marketing",
        "type": "info",
        "message": `DIGITAL MARKETING FLOW

            Perfect if you love communication, creativity, and data-driven campaigns.

            Roadmap:
            Month 1: Fundamentals, SEO
            Month 2: Social Media + Copywriting
            Month 3: Ads (Google, Meta)
            Month 4: Analytics + Freelance setup
            Month 5: Capstone + Internship

            FAQs:
            • Is this beginner friendly? → Yes.
            • Can I freelance with this? → Absolutely.

            Resources:
            Marketing Toolkit
            Meet a Growth Mentor`,
        "next": "course_end_options"
    },
    {
        "key": "course_uiux",
        "type": "info",
        "message": `UI/UX DESIGN FLOW

            For creative minds who love design, empathy, and user experience.

            Roadmap:
            Month 1: UI principles, Figma
            Month 2: Wireframes, Prototyping
            Month 3: UX research
            Month 4: Portfolios & Dribbble
            Month 5: Case studies + Placement prep

            FAQs:
            • Need to code? → No.
            • Tools required? → Just Figma (free).

            Resources:
            Download Design Starter Kit
            Schedule a Design Mentor Call`,
        "next": "course_end_options"
    },
    {
        "key": "course_data",
        "type": "info",
        "message": `DATA ANALYTICS FLOW

            Great for logical thinkers who enjoy uncovering patterns and insights.

            Roadmap:
            Month 1: Excel, SQL
            Month 2: Power BI / Tableau
            Month 3: Python for data
            Month 4: Projects
            Month 5: Case interviews + Jobs

            FAQs:
            • Math required? → Basic level only.
            • Real data used? → Yes.

            Resources:
            Data Science Handbook
            Book a Data Career Mentor Call`,
        "next": "course_end_options"
    },
    {
        "key": "course_ai",
        "type": "info",
        "message": ` AI/ML ENGINEER FLOW

            Ideal for tech lovers who want to build smart machines and automate tasks.

            Roadmap:
            Month 1: Python, Numpy
            Month 2: ML Algorithms
            Month 3: Deep Learning
            Month 4: AI Projects
            Month 5: Deploy Models + Interviews

            FAQs:
            • Need a strong math background? → Basic linear algebra & stats help.
            • Real-world projects? → Yes, industry based.

            Resources:
            AI Mastery Guide
            Talk to an AI Career Coach`,
        "next": "course_end_options"
    },
    {
        "key": "course_end_options",
        "type": "question",
        "message": "Would you like to explore more courses or talk to a mentor?",
        "options": [
            { "textHeading": "Show me another course", "next": "goal_start" },
            { "textHeading": "Talk to a mentor", "next": "mentor_chat" },
            { "textHeading": "Exit", "next": "exit" }
        ]
    },
    {
        "key": "mentor_chat",
        "type": "info",
        "message": `Talk to a real expert who can guide you personally.`,
        "calendlyLink": "https://calendly.com/rksankhyan-qcsstudio/book-meeting-with-our-expert-career-mentors"
    },

    // AI-POWERED SERVICES WORKFLOW
    {
        "key": "ai_services",
        "type": "question",
        "message": "Hey there! I’m Nova — not just an assistant, but your business transformation partner at QuantumCrafters. Whether you're scaling up, starting out, or stuck somewhere in between — I'm here to help.\n\nWhat’s on your mind today?",
        "options": [
            { "textDescription": "I have an idea but don’t know how to execute it", "next": "idea_support" },
            { "textDescription": "I have processes I want to automate", "next": "automation_support" },
            { "textDescription": "I want better business insights", "next": "bi_support" },
            { "textDescription": "I want to grow my digital presence", "next": "growth_support" },
            { "textDescription": "I’m just exploring what’s possible", "next": "curiosity_support" }
        ]
    },
    {
        "key": "idea_support",
        "type": "info",
        "message": "Let’s turn that idea into a smart product. We can help you with design, development, and AI automation.",
        "next": "business_profile"
    },
    {
        "key": "automation_support",
        "type": "info",
        "message": "Repetitive work is energy draining. Let’s explore what we can automate for you.",
        "next": "business_profile"
    },
    {
        "key": "bi_support",
        "type": "info",
        "message": "Data is a superpower. We’ll help you make sense of it all — visually and in real-time.",
        "next": "business_profile"
    },
    {
        "key": "growth_support",
        "type": "info",
        "message": "Want better reach, conversions, or social presence? Let’s boost your growth with AI-powered digital marketing.",
        "next": "business_profile"
    },
    {
        "key": "curiosity_support",
        "type": "info",
        "message": "Curiosity is the first step to innovation. I’ll show you a few ways AI is transforming businesses like yours.",
        "next": "business_profile"
    },
    {
        "key": "business_profile",
        "type": "question",
        "message": "Let’s personalize this journey. What best describes your role or business type?",
        "options": [
            { "textDescription": "Startup Founder", "next": "goal_exploration" },
            { "textDescription": "MSME / Growing Business", "next": "goal_exploration" },
            { "textDescription": "Enterprise Executive", "next": "goal_exploration" },
            { "textDescription": "Marketing/Brand Consultant", "next": "goal_exploration" },
            { "textDescription": "Freelancer / Solopreneur", "next": "goal_exploration" }
        ]
    },
    {
        "key": "goal_exploration",
        "type": "question",
        "message": "What are you hoping to achieve in the next 90 days?",
        "options": [
            { "textDescription": "Reduce manual or repetitive work", "next": "solution_automation" },
            { "textDescription": "Leverage AI to increase efficiency", "next": "solution_strategy" },
            { "textDescription": "Build a SaaS or automation tool", "next": "solution_saas" },
            { "textDescription": "Get a tech team to build my idea", "next": "solution_ux" },
            { "textDescription": "Grow online visibility & conversions", "next": "solution_marketing" },
            { "textDescription": "Get a BI dashboard to monitor my KPIs", "next": "solution_bi" }
        ]
    },
    {
        "key": "solution_automation",
        "type": "info",
        "message": " *AI Workflow Automation*\nBots, triggers, email workflows, smart forms\n\n *Case:* Automated HR onboarding saved 6 hours/week for a 20-member startup.\n*Outcome:* 45% faster internal onboarding & 70% fewer follow-up emails.",
        "next": "next_action"
    },
    {
        "key": "solution_strategy",
        "type": "info",
        "message": "*AI Strategy & Consultation*\nAudits, AI adoption roadmap, MVP definition\n\n *Case:* Café chain used our AI audit to reduce order delays by 32%.\n*Outcome:* 20% boost in daily operational efficiency.",
        "next": "next_action"
    },
    {
        "key": "solution_saas",
        "type": "info",
        "message": "*Custom SaaS Development*\nCRM, portals, scheduling platforms, internal tools\n\n *Case:* Built a student CRM for an edtech firm with custom dashboards.\n*Outcome:* Doubled student conversion rate within 3 months.",
        "next": "next_action"
    },
    {
        "key": "solution_ux",
        "type": "info",
        "message": "*UI/UX Design & Frontend Systems*\nWireframes, design systems, frontend architecture\n\n *Case:* Redesigned app interface for wellness startup.\n*Outcome:* 52% increase in user retention.",
        "next": "next_action"
    },
    {
        "key": "solution_bi",
        "type": "info",
        "message": "*Business Intelligence Dashboards*\nReal-time KPIs, SQL pipelines, reports, analytics\n\n *Case:* Created dashboards for a logistics firm to track fleet efficiency.\n*Outcome:* Cut delivery delays by 18% in Q1.",
        "next": "next_action"
    },
    {
        "key": "solution_marketing",
        "type": "info",
        "message": "*Digital Marketing & Growth Automation*\nPaid campaigns, email funnels, SEO, analytics integration\n\n *Case:* Managed complete ad and email funnel for D2C brand.\n*Outcome:* 3x ROI in paid campaigns and 500+ leads in 45 days.",
        "next": "next_action"
    },
    {
        "key": "next_action",
        "type": "question",
        "message": "Want me to summarize your needs or connect you to a strategist now?",
        "options": [
            { "textDescription": "Email me the summary", "next": "exit" },
            { "textDescription": "Schedule a call with the tech team", "next": "book_strategy_call" },
            { "textDescription": "Explore another solution", "next": "goal_exploration" },
            { "textDescription": "Chat with a consultant", "next": "chat_consultant" }
        ]
    },
    {
        "key": "book_strategy_call",
        "type": "info",
        "message": "Let’s get you on a strategy call with our experts!",
        "calendlyLink": "https://calendly.com/rksankhyan-qcsstudio/book-meeting-with-our-expert-career-mentors"
    },
    {
        "key": "chat_consultant",
        "type": "info",
        "message": "One of our consultants will connect with you shortly via chat or email. Stay tuned!"
    }

]
