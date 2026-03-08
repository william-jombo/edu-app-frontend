


// Voice command registry for all user roles

export const STUDENT_COMMANDS = [
  // ── Navigation ──────────────────────────────────────────────────────────────
  {
    keywords: ["open overview", "go to overview", "show overview", "home", "dashboard", "go home"],
    action: "navigate", target: "overview",
    feedback: "Opening overview dashboard",
  },
  {
    keywords: ["open grades", "go to grades", "show grades", "my grades", "check grades", "view grades"],
    action: "navigate", target: "grades",
    feedback: "Opening your grades",
  },
  {
    keywords: ["open assignments", "go to assignments", "show assignments", "my assignments", "view assignments"],
    action: "navigate", target: "assignments",
    feedback: "Opening your assignments",
  },
  {
    keywords: ["open subjects", "go to subjects", "show subjects", "my subjects", "view subjects"],
    action: "navigate", target: "subjects",
    feedback: "Opening your subjects",
  },
  {
    keywords: ["open attendance", "go to attendance", "show attendance", "my attendance", "check attendance"],
    action: "navigate", target: "attendance",
    feedback: "Opening your attendance record",
  },
  {
    keywords: ["open fees", "go to fees", "show fees", "my fees", "check fees", "fee payment"],
    action: "navigate", target: "fees",
    feedback: "Opening your fees information",
  },
  {
    keywords: ["open announcements", "show announcements", "any announcements", "view announcements"],
    action: "navigate", target: "announcements",
    feedback: "Opening announcements",
  },
  {
    keywords: ["open exams", "go to exams", "show exams", "my exams", "view exams", "take exam"],
    action: "navigate", target: "exams",
    feedback: "Opening your exams",
  },
  {
    keywords: ["open lessons", "go to lessons", "show lessons", "my lessons", "view lessons"],
    action: "navigate", target: "lessons",
    feedback: "Opening your lessons",
  },

  // ── Exam MCQ answer selection ───────────────────────────────────────────────
  {
    keywords: ["select a", "answer a", "choose a", "option a", "pick a", "letter a"],
    action: "exam_answer", target: "A",
    feedback: "Selected option A",
  },
  {
    keywords: ["select b", "answer b", "choose b", "option b", "pick b", "letter b"],
    action: "exam_answer", target: "B",
    feedback: "Selected option B",
  },
  {
    keywords: ["select c", "answer c", "choose c", "option c", "pick c", "letter c"],
    action: "exam_answer", target: "C",
    feedback: "Selected option C",
  },
  {
    keywords: ["select d", "answer d", "choose d", "option d", "pick d", "letter d"],
    action: "exam_answer", target: "D",
    feedback: "Selected option D",
  },

  // ── Exam navigation ─────────────────────────────────────────────────────────
  {
    keywords: ["next question", "go next", "next", "move forward"],
    action: "exam_next", target: null,
    feedback: "Moving to next question",
  },
  {
    keywords: ["previous question", "go back", "previous", "go previous", "last question"],
    action: "exam_prev", target: null,
    feedback: "Moving to previous question",
  },
  {
    keywords: ["submit exam", "finish exam", "end exam", "submit my exam"],
    action: "exam_submit", target: null,
    feedback: "Submitting your exam",
  },
  {
    keywords: ["read question", "what is the question", "repeat question"],
    action: "exam_read_question", target: null,
    feedback: null,
  },
  {
    keywords: ["start writing", "write answer", "dictate answer", "voice answer", "i will dictate"],
    action: "exam_start_dictate", target: null,
    feedback: "Voice dictation started. Speak your answer clearly.",
  },
  {
    keywords: ["stop writing", "stop dictating", "done writing", "done dictating", "finish writing"],
    action: "exam_stop_dictate", target: null,
    feedback: "Voice dictation stopped.",
  },
  {
    keywords: ["clear answer", "erase answer", "delete answer", "remove answer"],
    action: "exam_clear_answer", target: null,
    feedback: "Answer cleared",
  },
  {
    keywords: ["time remaining", "how much time", "time left", "check time"],
    action: "exam_time", target: null,
    feedback: null,
  },

  // ── Page reading ────────────────────────────────────────────────────────────
  {
    keywords: ["read page", "read this", "read content", "read everything", "read the page"],
    action: "read", target: "page",
    feedback: null,
  },
  {
    keywords: ["stop reading", "stop", "be quiet", "silence", "shut up"],
    action: "stop_reading", target: null,
    feedback: null,
  },

  // ── General ─────────────────────────────────────────────────────────────────
  {
    keywords: ["log out", "logout", "sign out", "exit"],
    action: "logout", target: null,
    feedback: "Logging you out",
  },
  {
    keywords: ["help", "what can you do", "commands", "list commands", "show commands"],
    action: "help", target: null,
    feedback: null,
  },
];

export const TEACHER_COMMANDS = [
  { keywords: ["open overview","go to overview","show overview","home","dashboard"], action:"navigate", target:"overview", feedback:"Opening overview dashboard" },
  { keywords: ["open classes","go to classes","show classes","my classes"],           action:"navigate", target:"classes",  feedback:"Opening your classes"         },
  { keywords: ["open students","go to students","show students","my students"],       action:"navigate", target:"students", feedback:"Opening your students list"    },
  { keywords: ["open grades","go to grades","show grades","grading"],                action:"navigate", target:"grades",   feedback:"Opening grades section"        },
  { keywords: ["open announcements","show announcements"],                            action:"navigate", target:"announcements", feedback:"Opening announcements"    },
  { keywords: ["read page","read this","read content","read everything"],             action:"read",     target:"page",    feedback:null                            },
  { keywords: ["stop reading","stop","be quiet"],                                     action:"stop_reading", target:null,  feedback:null                            },
  { keywords: ["log out","logout","sign out","exit"],                                 action:"logout",   target:null,      feedback:"Logging you out"               },
  { keywords: ["help","what can you do","commands"],                                  action:"help",     target:null,      feedback:null                            },
];

export const ADMIN_COMMANDS = [
  { keywords: ["open students","go to students","show students","manage students"],   action:"navigate", target:"students",     feedback:"Opening students management" },
  { keywords: ["open teachers","go to teachers","show teachers","manage teachers"],   action:"navigate", target:"teachers",     feedback:"Opening teachers management" },
  { keywords: ["open announcements","show announcements","manage announcements"],      action:"navigate", target:"announcements", feedback:"Opening announcements"       },
  { keywords: ["read page","read this","read content","read everything"],             action:"read",     target:"page",        feedback:null                          },
  { keywords: ["stop reading","stop","be quiet"],                                     action:"stop_reading", target:null,      feedback:null                          },
  { keywords: ["log out","logout","sign out","exit"],                                 action:"logout",   target:null,          feedback:"Logging you out"             },
  { keywords: ["help","what can you do","commands"],                                  action:"help",     target:null,          feedback:null                          },
];

export const HEAD_TEACHER_COMMANDS = [
  { keywords: ["open overview","go to overview","show overview","home","dashboard"],  action:"navigate", target:"overview",     feedback:"Opening overview dashboard" },
  { keywords: ["open students","go to students","show students"],                     action:"navigate", target:"students",     feedback:"Opening students list"       },
  { keywords: ["open teachers","go to teachers","show teachers"],                     action:"navigate", target:"teachers",     feedback:"Opening teachers list"       },
  { keywords: ["open announcements","show announcements"],                            action:"navigate", target:"announcements", feedback:"Opening announcements"      },
  { keywords: ["read page","read this","read content","read everything"],             action:"read",     target:"page",        feedback:null                          },
  { keywords: ["stop reading","stop","be quiet"],                                     action:"stop_reading", target:null,      feedback:null                          },
  { keywords: ["log out","logout","sign out","exit"],                                 action:"logout",   target:null,          feedback:"Logging you out"             },
  { keywords: ["help","what can you do","commands"],                                  action:"help",     target:null,          feedback:null                          },
];

// Match spoken text against a command list
export const matchCommand = (spokenText, commandList) => {
  const lower = spokenText.toLowerCase().trim();
  for (const command of commandList) {
    for (const keyword of command.keywords) {
      if (lower.includes(keyword)) return command;
    }
  }
  return null;
};

// Generate help text for a role
export const getHelpText = (commandList) => {
  const navCommands = commandList.filter(c => c.action === "navigate").map(c => c.keywords[0]);
  return (
    `Navigation commands: ${navCommands.join(", ")}. ` +
    `During exams you can say: select A, select B, next question, previous question, read question, start writing, stop writing, submit exam. ` +
    `You can also say "read page" to hear page content, "stop reading" to stop, or "log out" to sign out.`
  );
};