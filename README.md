# React + Vite
Cách chạy:
cày đặt  node v16.20.0

1/ Cài thư viện: npm i
2/ npm run dev

http://localhost:3000/  là trang chủ sau khi chạy, bắt buộc chạy backend cổng http://localhost:8080
from-end
vite: 5.4.1
react: 18.3.1
redux toolkit: 1.9.3
ant: 5.4
react-router-dom: 6.9.0

backend cài đặt: cần mysql và sửa thông tin   
"datasource:
url: jdbc:mysql://localhost:3306/DemoSpringSecurity?useSSL=false&serverTimezone=UTC
username: root
password: root" 
trong file application.yml sửa us và pass ứng với username và password trong mysql
tạo database DemoSpringSecurity: create database DemoSpringSecurity
cần khởi động mysql trước khi chạy

back-end
java spring boot
jpa
spring-security-oauth2-resource-server - jwt
swagger
mysql
