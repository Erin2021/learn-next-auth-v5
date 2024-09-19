export { auth as middleware } from "@/auth"//session이 30일 이후에는 유지가 되지 않을 것->30일뒤에 자동 로그아웃

//option2 : handle authentication-excute everytime we open the page/secure이 덜하긴 함-그리고 middleware유저정보를 다른페이지에 전달할 수 없어서 귀찮음

