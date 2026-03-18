---
Title: OpenResty413请求实体过大
tags:
  - 教程
  - 经验分享
date: 2026-02-13
code-name: 20260213-openresty413
writing-date: 2026-02-13
---
# 1、问题描述
## 1.1、我是怎么发现这个问题的
今天晚上（2026年2月13日晚22点07分），我的老服务器实例因为无法迁移地区，所以我重新开了一个新服务器，在上面我部署了1panel面板和pg数据库、OpenResty和Halo，当我想恢复老博客上的数据时，上传遇到了413错误:`Request Entity Too Large/openresty`。
## 1.2、原因
`Request Entity Too Large`即“请求实体过大”，也就是Nginx和OpenResty的配置文件中的`client_max_body_size`​的**参数设置过小或者是根本没有这个参数**，我属于后者，**而且是默认安装就没有带这个参数的**，以下是我的解决方案。
# 2、解决方案
进入1Panel的主页，在侧边栏中点击`网站`​，找到你的网站点击`配置`​，在页面里找到`配置文件`，你会看到一些配置数据比如以下内容：
```nginx
server {
    listen 80 ; 
    listen 443 ssl http2 ; 
    server_name 你的域名; 
    index index.php index.html index.htm default.php default.htm
default.html; 
...
```
我们要做的是在中间增加`client_max_body_size`值并配置参数，比如我们想要设置最大实体为10GB，那我们就写：
```nginx
# -----------设置最大请求实体大小:10GB-----------
    client_max_body_size 10240m;
# -------------2026-2-13_22:07:50-------------
```
*注：注释内容为个人的配置习惯（内容+时间）*
拼上配置文件就是
```nginx
server {
    listen 80 ; 
    listen 443 ssl http2 ; 
    server_name 你的域名; 
# -----------设置最大请求实体大小:10GB-----------
    client_max_body_size 10240m;
# -------------2026-2-13_22:07:50-------------
    index index.php index.html index.htm default.php default.htm
default.html; 
...
```
然后点击`重载`​，等待配置文件生效即可，此时就可以对其进行上传了，具体的最大可上传内容取决于你的`client_max_body_size`值

---

本教程使用的软件版本：
- 1Panel：社区版v1.10.26-lts
- Halo：2.22.14
- OpenResty：1.21.4.3-3-3-focal