//db에 중복으로 세션불러오는게 비효율적으로 보여서, 한 코드에 넣음

import { auth } from "@/auth";
import { cache } from "react";//auth를 캐싱해서 동일조건 반복 호출시, auth함수 계속 실행되지 않고, 처음 실행한 결과를 반환. 성능 최적화 중복된 인증 요청 줄일 수 있음

export default cache(auth);//서버싱글로딩만해준다(deduplicated).//이름보고 착각마라: refresh하면 다시 패칭해준다.

//getSessioin은 페이지가 열릴때만 사용하고 싶어. 버튼눌러서 작동되는 서버사이드 로직은 그냥 그때 데이터요청해라.

//nextjs의 unstable_cache 도 있으나, 범위가 크다.