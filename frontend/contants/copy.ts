export const home = {
  tabs: {
    about: 'About me',
    fun: 'Fun stuff',
    name: 'Alex Holm',
    linkedIn: {
      text: 'LinkedIn',
      url: 'http://linkedin.com/in/alex-holm-4b10a4175'
    },
    github: {
      text: 'GitHub',
      url: 'http://github.com/KALVS'
    }
  },
  about: {
    name: 'Alex Holm',
    role: 'Software Engineer',
    linkedIn: {
      text: 'LinkedIn',
      url: 'http://linkedin.com/in/alex-holm-4b10a4175'
    },
    github: {
      text: 'GitHub',
      url: 'http://github.com/KALVS'
    },
    intro: {
      name: 'Alex Holm',
      role: 'Software Engineer'
    }
  },
  fun: {
    secretSanta: 'Secret Santa as a service'
  },
  links: {
    education: 'Education',
    extracurricular: 'Extracurricular',
    experience: 'Experience',
    technology: 'Technologies'
  },
  contact: {
    okay: 'Okay',
    cancel: 'Cancel',
    email: 'alexholmsoftware@gmail.com'
  },
  pictureAlt: 'A picture of Alex'
}

export const technology = {
  title: 'Technology',
  content: [
    {
      heading: 'Tech Stack and knowledge:',
      text: 'Web app development: Angular, PrimeNG\nMobile app development: Angular, Ionic Backend development: Java, SpringBoot, SQL (Postgres)\nDevOps: GitHub, CircleCI, SonarCloud, AWS CDK/CloudFormation\nE2E testing: Cypress'
    },
    {
      heading: 'Responsibilities:',
      text: 'Daily scrum and Jira kanban management\nRoadmap planning and estimation\nHigh level and detailed design of key features\nBug testing and fixes\nCode reviews Monthly team retrospectives'
    },
    {
      heading: 'Projects:',
      text: 'Rebuilt biometric data collection of existing NativeScript mobile app\nMajor upgrades of club management application\nCreation of SpringBoot REST APIs to support all applications\nComplete rebuild of mobile app using Ionic Integration with wearable providers'
    }
  ]
}

export const experience = {
  title: 'Experience',
  content: [
    {
      heading: 'iNSPIRETEK',
      role: 'Web Developer',
      duration: 'January 2021 -> Now',
      text: "In this role Alex is part of the engineering team that builds and maintains iNSPIRETEK's sports analytics mobile application and data analytics pipeline. He primarily uses Angular and Typescript to build a responsive mobile app that communicates with a backend hosted in AWS."
    },
    {
      heading: 'LitePages',
      role: 'Technical Co-Founder',
      duration: 'June 2019 -> January 2021',
      text:
            'LitePages is a lead generation and marketing tool for tradesmen & small businesses. His role consisted of full stack development using Pug and NuxtJS for front end with a NodeJS 10 backend. He utilized AWS Elastic Beanstalk and CircleCI to build an automatic delivery pipeline for development and production workloads. As the lead developer he was also responsible for training and managing a small team of developer interns.'
    },
    {
      heading: 'Pizza Roulette',
      role: 'Software Engineer | Streamer',
      duration: 'June 2019 -> March 2020',
      text: 'Alex played a supportive role working at Pizza Roulette, working with Nuxt and Node to create an online game of chance where users could win a pizza in exchange for $2. During this time, Pizza Roulette would live stream games while Alex would stream games such as RuneScape and Sims.'
    },
    {
      heading: 'StartMIT Participant',
      role: 'Participant',
      duration: 'January 2020 -> January 2020',
      text: 'StartMIT is a two-and-a-half week course where students hear from leaders in innovation, participate in activities to refine their projects, and attend events with alumni and other leaders in the MIT entrepreneurial ecosystem.'
    }
  ]
}

export const education = {
  title: 'Educational Activities',
  content: [
    {
      heading: 'Bachelor of Information Technology Major: Computer Science',
      duration: 'February 2017 -> November 2020',
      text: 'During his time at QUT, Alex immersed himself in the Computer Science & Entrepreneurship ecosystems. This exposed him to running student clubs, working with startups and participating in a wide array of university programs including:'
    },
    {
      heading: 'Disrupting Law 2018',
      text: '- A hackathon between IT & Law students where the aim is to solve an issue in the legal industry using technology.'
    },
    {
      heading: 'Maurice Blackburn Hackathon 2018',
      text: '- Alex and his team designed a tool that improved access to justice for unfair dismissal claims.'
    }
  ]
}

export const extracurricular = {
  title: 'Extra Curricular Activities',
  content: [
    {
      heading: 'QUT Code Network 2019 Vice President',
      text:
            "Code Network is QUT's premier software development student club. In 2019 Alex held the position of Vice President, a role that saw him organizing and moderating the weekly guest lectures. He was also instrumental in planning and executing the 2019 Winter Hackathon."
    },
    {
      heading: '2018 Co-Founder & General Committee',
      text:
            'White Hats is the QUT Cybersecurity student club. It organizes weekly presentations from industry experts and student researched topics. Alex helped found the club in late 2018.'
    }
  ]
}

export const stripe = {
  submitButton: 'Pay Now'
}

export const secretSanta = {
  titleBarText: 'Secret Santa as a Service',
  closeAriaLabel: 'Close',
  secretSantaForm: {
    title: 'Secret Santa Form',
    participants: 'Participants:',
    removeButton: 'Remove',
    nameLabel: 'Name:',
    phoneLabem: 'Mobile Number:',
    invalidName: 'Invalid name.',
    invalidPhone: 'Invalid phone number.',
    addButton: 'Add Participant',
    submitButton: 'Submit'
  }
}

export const alert = {
  title: 'Alert',
  closeAriaLabel: 'Close',
  okay: 'Okay'
}
