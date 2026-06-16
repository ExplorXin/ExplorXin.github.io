---
id: 08cccd
title: Git 操作命令
publishDate: 2026-01-21
updatedDate: 2026-01-21
tags:
  - git
description: Git 常用操作命令速查表与参考指南
comment: true
---
<!-- 这里开始是文章正文 -->

## 操作 

## 一、**仓库初始化与克隆**

### 1. **初始化新仓库**
```bash
git init                        # 初始化当前目录为 Git 仓库
git init <directory>            # 在指定目录初始化
git init --bare                 # 创建裸仓库（用于远程仓库）
```

### 2. **克隆现有仓库**
```bash
git clone <url>                 # 克隆仓库到当前目录
git clone <url> <folder>        # 克隆到指定文件夹
git clone --depth 1 <url>       # 浅克隆（只获取最新提交）
git clone --branch <branch> <url>  # 克隆指定分支
```

## 二、**基本工作流操作**

### 1. **检查状态**
```bash
git status                      # 查看工作区和暂存区状态
git status -s                   # 简洁模式
git status --short              # 同上
```

### 2. **添加到暂存区**
```bash
git add <file>                  # 添加指定文件
git add .                       # 添加所有新文件和修改的文件
git add -A                      # 添加所有文件（包括删除）
git add -u                      # 只添加已跟踪文件的修改和删除
git add *.js                    # 添加匹配模式的文件
git add --patch                 # 交互式添加部分修改
```

### 3. **提交更改**
```bash
git commit -m "message"         # 提交并添加描述
git commit -am "message"        # 添加所有修改并提交（跳过 git add）
git commit --amend              # 修改最后一次提交
git commit --amend -m "新消息"  # 修改最后一次提交信息
git commit --allow-empty        # 创建空提交
```

### 4. **查看历史**
```bash
git log                         # 查看提交历史
git log --oneline               # 简洁的单行显示
git log --graph                 # 图形化显示分支合并
git log --stat                  # 显示文件修改统计
git log -p                      # 显示具体修改内容
git log -n 5                    # 只显示最近5次提交
git log --since="2023-01-01"    # 按时间筛选
git log --author="name"         # 按作者筛选
git log --grep="关键字"         # 按提交信息筛选
git log <file>                  # 查看文件的提交历史
```

## 三、**分支管理**

### 1. **查看分支**
```bash
git branch                      # 查看本地分支
git branch -a                   # 查看所有分支（包括远程）
git branch -r                   # 查看远程分支
git branch -v                   # 查看分支及最新提交
git branch -vv                  # 查看分支及跟踪关系
```

### 2. **创建分支**
```bash
git branch <name>               # 创建新分支
git branch <name> <commit>      # 从指定提交创建分支
git checkout -b <name>          # 创建并切换到新分支
git switch -c <name>            # Git 2.23+ 创建并切换
```

### 3. **切换分支**
```bash
git checkout <branch>           # 切换到分支
git switch <branch>             # Git 2.23+ 切换分支
git checkout -                  # 切换到上一个分支
```

### 4. **合并分支**
```bash
git merge <branch>              # 合并指定分支到当前分支
git merge --no-ff <branch>      # 禁用快速合并（保留合并历史）
git merge --squash <branch>     # 压缩合并（合并为一次提交）
git merge --abort               # 终止合并（解决冲突时）
```

### 5. **删除分支**
```bash
git branch -d <branch>          # 删除已合并的分支
git branch -D <branch>          # 强制删除分支
git push origin --delete <branch>  # 删除远程分支
```

## 四、**远程仓库操作**

### 1. **管理远程仓库**
```bash
git remote                      # 查看远程仓库
git remote -v                   # 查看远程仓库及 URL
git remote add <name> <url>     # 添加远程仓库
git remote remove <name>        # 删除远程仓库
git remote rename <old> <new>   # 重命名远程仓库
git remote set-url <name> <url> # 修改远程仓库 URL
```

### 2. **拉取和推送**
```bash
git fetch                       # 从远程获取最新信息（不合并）
git fetch <remote>              # 从指定远程获取
git fetch --prune               # 获取并清理已删除的远程分支

git pull                        # 获取并合并到当前分支
git pull <remote> <branch>      # 从指定远程分支拉取
git pull --rebase               # 拉取并使用 rebase 合并

git push                        # 推送到远程仓库
git push <remote> <branch>      # 推送到指定远程分支
git push -u <remote> <branch>   # 推送并设置 upstream
git push --force                # 强制推送（慎用）
git push --force-with-lease     # 安全强制推送
```

## 五、**撤销与回退**

### 1. **撤销工作区修改**
```bash
git checkout -- <file>          # 撤销工作区的修改
git restore <file>              # Git 2.23+ 恢复文件
```

### 2. **撤销暂存区修改**
```bash
git reset HEAD <file>           # 将文件移出暂存区
git restore --staged <file>     # Git 2.23+ 取消暂存
```

### 3. **回退提交**
```bash
git reset --soft HEAD~1         # 回退提交但保留修改在暂存区
git reset --mixed HEAD~1        # 回退提交且保留修改在工作区（默认）
git reset --hard HEAD~1         # 彻底回退（删除修改）

git revert <commit>             # 创建新的提交来撤销指定提交
git revert HEAD                 # 撤销最后一次提交
git revert --no-commit <commit> # 撤销但不自动提交
```

## 六、**暂存与储藏**

### 1. **储藏（Stash）**
```bash
git stash                       # 储藏当前修改
git stash save "message"        # 储藏并添加描述
git stash -u                    # 储藏包括未跟踪的文件
git stash -a                    # 储藏所有文件

git stash list                  # 查看储藏列表
git stash show stash@{0}        # 查看指定储藏的修改
git stash show -p stash@{0}     # 查看具体修改内容

git stash pop                   # 恢复最新储藏并删除
git stash pop stash@{0}         # 恢复指定储藏
git stash apply                 # 恢复最新储藏但不删除
git stash apply stash@{0}       # 恢复指定储藏但不删除

git stash drop stash@{0}        # 删除指定储藏
git stash clear                 # 删除所有储藏

git stash branch <name>         # 从储藏创建新分支
```

## 七、**标签管理**

### 1. **创建标签**
```bash
git tag <tagname>               # 创建轻量标签
git tag -a <tagname> -m "msg"   # 创建附注标签
git tag <tagname> <commit>      # 给指定提交打标签
```

### 2. **查看标签**
```bash
git tag                         # 查看所有标签
git tag -l "v1.*"               # 按模式查找标签
git show <tagname>              # 查看标签详细信息
```

### 3. **操作标签**
```bash
git push origin <tagname>       # 推送标签到远程
git push origin --tags          # 推送所有标签
git tag -d <tagname>            # 删除本地标签
git push origin --delete <tagname>  # 删除远程标签
```

## 八、**比较与差异**

### 1. **查看差异**
```bash
git diff                        # 工作区 vs 暂存区
git diff --staged               # 暂存区 vs 最新提交
git diff HEAD                   # 工作区 vs 最新提交
git diff <commit>               # 工作区 vs 指定提交
git diff <commit1> <commit2>    # 两个提交间的差异
git diff --name-only            # 只显示文件名
git diff --stat                 # 显示统计信息
```

### 2. **比较分支**
```bash
git diff <branch1>..<branch2>   # 两个分支间的差异
git diff <branch1>...<branch2>  # 两个分支从共同祖先开始的差异
```

## 九、**配置管理**

### 1. **用户配置**
```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
git config --global core.editor "vim"  # 设置默认编辑器
```

### 2. **别名配置**
```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all"
```

### 3. **查看配置**
```bash
git config --list               # 查看所有配置
git config user.name            # 查看特定配置项
git config --global --list      # 查看全局配置
git config --local --list       # 查看本地仓库配置
```

## 十、**高级操作**

### 1. **Rebase（变基）**
```bash
git rebase <branch>             # 变基到指定分支
git rebase -i HEAD~5            # 交互式变基（最近5个提交）
git rebase --continue           # 继续变基（解决冲突后）
git rebase --abort              # 终止变基
git rebase --skip               # 跳过当前提交
```

### 2. **Cherry-pick**
```bash
git cherry-pick <commit>        # 应用指定提交
git cherry-pick <commit1> <commit2>  # 应用多个提交
git cherry-pick --abort         # 终止 cherry-pick
```

### 3. **Bisect（二分查找）**
```bash
git bisect start                # 开始二分查找
git bisect bad                  # 标记当前为坏提交
git bisect good <commit>        # 标记某个提交为好的
git bisect reset                # 结束二分查找
```

### 4. **子模块**
```bash
git submodule add <url> <path>  # 添加子模块
git submodule init              # 初始化子模块
git submodule update            # 更新子模块
git submodule update --init --recursive  # 递归初始化和更新
```

## 十一、**清理与维护**

### 1. **清理文件**
```bash
git clean -n                    # 显示将要清理的文件（预览）
git clean -f                    # 强制清理未跟踪的文件
git clean -fd                   # 清理未跟踪的文件和目录
git clean -x                    # 清理包括忽略的文件
```

### 2. **垃圾回收**
```bash
git gc                          # 垃圾回收，优化仓库
git gc --aggressive             # 更激进的优化
git prune                       # 删除悬空对象
```

## 十二、**工作流快速参考**

### 日常开发流程
```bash
# 1. 开始新功能
git checkout main              # 切换到主分支
git pull origin main           # 更新到最新
git checkout -b feature/new    # 创建功能分支

# 2. 开发过程
git add .                      # 添加修改
git commit -m "添加新功能"      # 提交
git push origin feature/new    # 推送到远程

# 3. 完成功能
git checkout main              # 回到主分支
git pull origin main           # 更新主分支
git merge feature/new          # 合并功能分支
git push origin main           # 推送主分支
git branch -d feature/new      # 删除本地分支
```

### 紧急修复流程
```bash
# 1. 创建修复分支
git checkout main
git checkout -b hotfix/urgent

# 2. 修复并提交
git add .
git commit -m "紧急修复"
git push origin hotfix/urgent

# 3. 合并到多个分支
git checkout main
git merge hotfix/urgent
git push origin main

git checkout develop
git merge hotfix/urgent
git push origin develop
```

## 十三、**实用技巧**

### 1. **查看引用日志**
```bash
git reflog                      # 查看所有操作记录
git reflog show <branch>        # 查看特定分支的操作记录
```

### 2. **查看文件历史**
```bash
git blame <file>                # 逐行查看文件修改历史
git log -p <file>               # 查看文件的详细修改历史
git show <commit>:<file>        # 查看指定提交的文件内容
```

### 3. **重写历史**
```bash
# 注意：这会改变提交历史，只在自己的分支使用
git rebase -i HEAD~10           # 交互式修改最近10个提交
git filter-branch               # 批量修改历史（慎用）
```

## 📊 **命令速查表**

| 类别 | 常用命令 | 用途 |
|------|----------|------|
| 初始化 | `git init`, `git clone` | 创建/获取仓库 |
| 状态 | `git status`, `git log` | 查看状态和历史 |
| 提交 | `git add`, `git commit` | 保存更改 |
| 分支 | `git branch`, `git checkout` | 分支管理 |
| 合并 | `git merge`, `git rebase` | 合并代码 |
| 远程 | `git remote`, `git push`, `git pull` | 远程协作 |
| 撤销 | `git reset`, `git revert`, `git checkout --` | 撤销操作 |
| 储藏 | `git stash` | 临时保存工作 |
| 标签 | `git tag` | 版本标记 |
