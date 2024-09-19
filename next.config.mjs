/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",//단점:직접적이라 누구나 들어와서 사용할 수 있음. 그래서 해결법으로 유저가 로그인시 개인 storage에 넣어서 이미지 받아옴.중간다리 거쳐서 가져온다는 뜻
      },
    ],
  },
};

export default nextConfig;
