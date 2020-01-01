import InstructorPanel from '../pages/InstructorPanel.vue'
import InstructorExams from '../pages/InstructorExams.vue'
import InstructorExamDetail from '../pages/InstructorExamDetail.vue'
import InstructorLogin from '../pages/InstructorLogin.vue'
import InstructorLive from '../pages/InstructorLive.vue'

export const routes = [{
    name: "Instructor",
    path: "/instructor",
    component: InstructorPanel,
    display: "Instructor",
    children: [{
        name: "InstructorExams",
        path: "exams",
        component: InstructorExams,
        display: "InstructorExams"
      },
      {
        name: 'InstrutorExamDetail',
        path: 'exams/:examId',
        component: InstructorExamDetail,
        display: 'InstrutorExamDetail'
      },
      {
        name: "InstructorLive",
        path: "live",
        component: InstructorLive,
        display: "InstructorLive"
      },
    ]
  },
  {
    name: "InstructorLogin",
    path: "/instructor/login",
    component: InstructorLogin,
    display: "InstructorLogin"
  }
];