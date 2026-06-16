---
id: f3f6e7
title: Git 清空历史
publishDate: 2026-01-02
tags:
  - 配置
  - git
description: 如何彻底清空 Git 提交历史并重新开始？四种方法详解
---


# 如何彻底清空 Git 提交历史并重新开始？
在长期维护的 Git 项目中，提交记录可能会变得杂乱无章，影响性能和可读性。本篇介绍四种方法彻底清空 Git 提交历史，包括删除 `.git` 目录、创建无历史分支、使用 `git filter-repo` 以及手动迁移代码。可以根据项目需求选择最合适的方式。

## 1. 删除 `.git` 目录并重新初始化（最干净的方法）

如果你想彻底清空所有 Git 记录并从头开始，最简单的方法就是直接删除 `.git` 目录并重新初始化仓库：

```sh
rm -rf .git  # 删除 Git 目录
git init     # 重新初始化 Git 仓库
git add .    # 添加所有文件
git commit -m "Initial commit"  # 创建新的提交
```

**优点：**

- 彻底清空所有提交记录。
- 简单直接。
- 适用于个人项目或小团队。

**缺点：**

- 需要重新设置 `.gitignore` 文件。
- 远程仓库关联会丢失，需要手动添加 `git remote add origin <repo-url>`。

## 2. 创建无历史的新分支 (`--orphan` 方法)

如果你希望清空提交历史但仍保留 `.git` 目录和远程仓库，可以使用 `--orphan` 创建一个新的无历史分支：

```sh
git checkout --orphan clean-main
```

然后添加所有文件并提交：

```sh
git add .
git commit -m "Initial commit"
```

删除旧的 `main` 分支，并将新分支重命名回 `main`：

```sh
git branch -D main  # 删除旧的 main 分支
git branch -m main  # 将 clean-main 重命名为 main
```

如果需要覆盖远程仓库（**谨慎操作！**）：

```sh
git push --force origin main
```

**优点：**

- 保留 `.git` 目录，不影响 Git 相关配置。
- 代码保留，但所有历史提交会被清空。

**缺点：**

- 远程仓库需要强制推送，可能影响团队成员。

## 3. 使用 `git filter-repo` 清理提交历史（适用于大项目）

如果你的项目非常大，历史提交太多，Git 官方推荐使用 `git filter-repo`（比 `git filter-branch` 更高效）：

```sh
git filter-repo --path . --force
```

然后强制推送到远程仓库：

```sh
git push --force --all
```

**优点：**

- 高效，适用于大仓库。
- 清理提交历史但保留 `.git` 目录。

**缺点：**

- 需要安装 `git filter-repo`。

如果未安装，可以使用以下命令安装（适用于 macOS）：

```sh
brew install git-filter-repo
```

## 4. 复制代码到新仓库（最彻底的方法）

如果你希望彻底摆脱所有历史记录，并创建一个全新的仓库，最干净的方法是手动复制代码：

1. **创建一个新目录**，然后复制你的代码（不包括 `.git` 目录）。
2. 进入新目录，初始化 Git：
    
    ```sh
    git init
    git add .
    git commit -m "Initial commit"
    ```
    
3. **如果有远程仓库，重新添加它**：
    
    ```sh
    git remote add origin <repo-url>
    git push -u origin main --force
    ```
    

**优点：**

- 绝对干净，没有任何历史遗留问题。
- 适合长期维护的大型项目。

**缺点：**

- 需要手动迁移远程仓库。
- 远程仓库的旧记录仍然可能存在（可选择删除并重新创建仓库）。

## 方法对比总结

|方法|适用情况|是否保留 `.git`|是否需要远程强制推送|
|---|---|---|---|
|**删除 `.git` 重新初始化**|彻底重置，最简单|❌ 否|✅ 需要|
|**创建无历史新分支**|只想清空提交记录|✅ 是|✅ 需要|
|**`git filter-repo` 清理历史**|处理大仓库，官方推荐|✅ 是|✅ 需要|
|**手动复制到新仓库**|最干净，适合长期维护|❌ 否|✅ 需要|

如果你只是想让提交记录清零，同时保留远程仓库，**方法 2（`--orphan`）** 是比较推荐的。如果你完全不在乎历史，**方法 1（删除 `.git`）** 最直接。