import Axios from '@/utils/axios'

//获取所有试题类型
export function getQuestionsType() {
  return Axios.get('/api/exam/getQuestionsType')
}

//添加试题接口
export function questions(data) {
  //console.log(data)
  return Axios.post('/api/exam/questions', data);
}

//获取考试类型
export function examType() {
  //console.log(data)
  return Axios.get('/api/exam/examType');
}


//获取所有课程类型
export function getSubject() {
  return Axios.get('/api/exam/subject')
}

//获取所有考试类型
export function getExamType() {
  return Axios.get('/api/exam/examType')
}

 //获取所有试题
 export function getAllTest(){
  return Axios.get('/api/exam/questions/new')
}

 //试题分类
 export function getTestType(){
  return Axios.get('/api/exam/questions/condition')
}