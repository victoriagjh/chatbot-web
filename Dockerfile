# 1단계: Node 이미지를 기반으로 의존성 설치 및 애플리케이션 빌드
FROM node:16-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# 2단계: nginx를 사용하여 빌드된 정적 파일 제공
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
