// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "A collection of my notes and projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-super-egg-drop",
        
          title: "Super Egg Drop",
        
        description: "An algorithm problem I find interesting and inspiring",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/super-egg-drop/";
          
        },
      },{id: "post-course-review-cmu-10701",
        
          title: "Course review --- CMU 10701",
        
        description: "Course review and reflection on CMU 10701, introduction to machine learning (PhD)",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/10701-review/";
          
        },
      },{id: "post-course-review-cmu-15210",
        
          title: "Course review --- CMU 15210",
        
        description: "Course review and reflection on CMU 15210, parallel and sequential data structures and algorithms",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/15210-review/";
          
        },
      },{id: "post-two-weeks-of-summer-summary-and-reflection",
        
          title: "Two weeks of summer --- summary and reflection",
        
        description: "Thoughts and reflection on my first two weeks of summer --- internship, self-study, etc.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/summary/";
          
        },
      },{id: "post-setting-up-this-website",
        
          title: "Setting up this website",
        
        description: "Difficulties and solutions for setting up this website",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/setup/";
          
        },
      },{id: "post-counting-numbers",
        
          title: "Counting numbers",
        
        description: "A number counting dynamic programming problem",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/numdp/";
          
        },
      },{id: "news-start-building-this-website",
          title: 'Start building this website!',
          description: "",
          section: "News",},{id: "news-finish-setting-up-the-blog-and-repositories-section",
          title: 'Finish setting up the blog and repositories section!',
          description: "",
          section: "News",},{id: "news-add-course-review-for-cmu-15210-10701-started-studying-folland-real-analysis",
          title: 'Add course review for CMU 15210, 10701. Started studying Folland real analysis.',
          description: "",
          section: "News",},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
