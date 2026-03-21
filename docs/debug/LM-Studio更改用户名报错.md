---
Title: LM-Studio更改用户名报错
tags:
  - 教程
  - 经验分享
date: 2026-01-15
code-name: 20260115-lmstudioerror
writing-date: 2025-12-29
---
# 1、问题

当用户更改了macOS的用户名并使用LM studio，会出现配置路径**依然按照旧用户名目录访问文件**,由于旧目录不存在导致无法打开软件并报错，内容为：

```txt
It appears that LM Studio does not have sufficient permissions to run. (Tried to write to /Users/旧用户/.lmstudio/test.txt). Please check your antivirus software settings to ensure that LM Studio is not being blocked.

Email us for assistance: bugs@lmstudio.ai

Raw Error: EACCES: permission denied, mkdir '/Users/旧用户/.lmstudio'
```

# 2、原因

在用户首次使用LM Studio时，会创建位于 **/users/.lmstudio-home-pointer**的文件，将要求原登录账户使用，若不删除则需要使用其他用户名登录（因为其他用户目录下原先没有lmstudio-home-pointer文件）， **/.zshrc**则会存储LM studio用户数据，虽然能正常运行但会残留数据，建议一并删除

# 3、解决步骤

## 3.1、删除lmstudio-home-pointer文件

在普通用户目录下执行：

```zsh
rm ~/.lmstudio-home-pointer
```

即**删除位于用户目录下的lmstudio-home-pointer文件**，到此就可以正常使用了

## 3.2、清除原用户配置

```zsh
vim ~/.zshrc
```

通过vim编辑器编辑 **/.zshrc**

```zsh
# Added by LM Studio CLI (lms)
export PATH="$PATH:/Users/旧用户名/.lmstudio/bin"
# End of LM Studio CLI section

# Added by LM Studio CLI (lms)
export PATH="$PATH:/Users/新用户名/.lmstudio/bin"
# End of LM Studio CLI section
```

删除带有原来用户名的字符,比如删除下面的旧用户路径

```zsh
# Added by LM Studio CLI (lms)
export PATH="$PATH:/Users/新用户名/.lmstudio/bin"
# End of LM Studio CLI section
```

然后就可以正常运行LM Studio了✅

---
GitHub issue原帖: [https://github.com/lmstudio-ai/lmstudio-bug-tracker/issues/402](https://github.com/lmstudio-ai/lmstudio-bug-tracker/issues/402)

版本：0.3.30