import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import {PrismaNeon} from "@prisma/adapter-neon"

const prismaClientSingleton = () => {
  // TODO: Make this edge-compatible👍
  const neon = new Pool({connectionString:process.env.POSTGRES_PRISMA_URL});
  const adapter = new PrismaNeon(neon);
  return new PrismaClient({adapter});
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

//default 많은 클라이언트 있으면 에러. 그래서 재시작 안정성위해 이런 코드가 있는거임 prisma next공식문서
//해야할것 edge-compatitbel하게 만들기: 짧은 요청시간 & 지속적으로 서버 실행되는 게 아님 요청있을 때마다 활성화
//Prisma는 기본적으로 데이터베이스 연결을 유지하기 위해 **연결 풀링(Connection Pooling)**을 사용하지만, Edge 환경에서는 이 방식이 적합하지 않을 수 있습니다. Neon 같은 서버리스 데이터베이스와의 연결을 위해 Edge-compatible 코드를 작성해야 하며, 이를 위해 서버리스에 최적화된 연결 방식(예: Neon의 Pool)을 사용하고 있습니다.
//이 코드에서는 Prisma와 Neon을 Edge 환경에서 사용할 수 있도록 설정해 서버리스 환경에서 데이터베이스 연결을 효율적으로 처리할 수 있게 만듭니다.

//문제는 edge-compatitbel코드를 작성했더니, prisma모듈증에 그걸 싫어하는 모듈이 있어->무시되는 에러인데, 해결안하고 deploy하면 짱 느려짐->해결법:nextauth버전이 업데이트되길기다려라ㅋㅋㅠㅠ->middleware.ts 때문에(edge에서 도는 것이기 때문) 그러니 일단 그것의 이름을 변경해서 에러를 없앤다