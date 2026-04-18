---
name: install-jianying-skill
overview: 为用户安装剪映（JianYing）视频编辑自动化 skill，选择最适合的 jianying-editor 技能（498 次安装量最高），通过 npx skills add 远程安装到 CodeBuddy skills 目录
todos:
  - id: install-jianying-skill
    content: 使用 npx skills add 远程安装 luoluoluo22/jianying-editor-skill@jianying-editor 到本地
    status: completed
  - id: verify-install-path
    content: 检查 skill 安装路径并确保存在于 ~/.codebuddy/skills/ 目录
    status: completed
    dependencies:
      - install-jianying-skill
  - id: validate-skill-usable
    content: 验证 jianying-editor skill 可被 CodeBuddy 正确识别和加载
    status: completed
    dependencies:
      - verify-install-path
---

## Product Overview

为用户安装剪映相关的 AI 技能（Skill），用于**视频编辑自动化**场景。用户当前环境为 CodeBuddy 客户端（macOS），目标是将技能安装到 `~/.codebuddy/skills/` 目录下。

## Core Features

- 搜索并识别最适合"视频编辑自动化"用途的剪映相关 Skill
- 将选定 Skill 安装到 CodeBuddy 的 skills 目录
- 安装完成后验证 Skill 是否可用

### 候选技能对比（通过 `npx skills find` 获取）

| 技能名称 | 来源 | 安装量 | 适用场景 |
| --- | --- | --- | --- |
| **jianying-editor** | luoluoluo22/jianying-editor-skill | 498 | 剪映编辑器专用 |
| **jianying-video-gen** | cclank/lanshu-waytovideo | 323 | 剪映视频生成 |
| **video-editing** | maxazure/video-editing-skill | 53 | 通用视频编辑 |


### 推荐选择

**`luoluoluo22/jianying-editor-skill@jianying-editor`** — 安装量最高（498），专门针对剪映编辑器，最符合用户的"视频编辑自动化"需求。

## Tech Stack

- **Skill 管理**: `npx skills` CLI（Agent Skills Ecosystem 包管理器）
- **目标目录**: `~/.codebuddy/skills/`（CodeBuddy 客户端的 skills 存放路径）
- **操作系统**: macOS (Darwin)
- **Shell**: Zsh

## Implementation Approach

### 安装策略

1. **本地市场检查**: 已完成 — `~/.workbuddy/skills-marketplace/skills/` 中无剪映专用 skill
2. **远程安装**: 使用 `npx skills add` 从 Skills Registry 安装
3. **目标路径确认**: 当前客户端为 CodeBuddy → 目标目录 `~/.codebuddy/skills/`
4. **安装后验证**: 确认 skill 文件夹存在于正确位置

### 关键执行步骤

```
# Step 1: 安装剪映 skill（全局安装 + 自动确认）
npx skills add luoluoluo22/jianying-editor-skill@jianying-editor -g -y

# Step 2: 验证安装位置（skills CLI 默认安装到 ~/.agents/skills/）
ls -la ~/.agents/skills/jianying-editor/ 2>/dev/null && echo "Found in agents"

# Step 3: 如果安装在 ~/.agents/skills/ 而非 ~/.codebuddy/skills/，则复制到正确位置
cp -r ~/.agents/skills/jianying-editor ~/.codebuddy/skills/jianying-editor

# Step 4: 最终验证
ls -la ~/.codebuddy/skills/jianying-editor/
```

## Implementation Notes

- **Grounding**: 复用 find-skills 中定义的标准安装流程
- **路径处理**: `npx skills add -g` 通常安装到 `~/.agents/skills/`，需要额外复制到 CodeBuddy 的 `~/.codebuddy/skills/`
- **冲突检查**: 如果 `~/.codebuddy/skills/` 下已存在同名 skill，需要先确认是否覆盖
- **回滚策略**: 如安装失败或 skill 不满足需求，可直接删除对应文件夹

## Agent Extensions

### Skill

- **find-skills**
- Purpose: 提供 skills 搜索和安装的标准流程指导
- Expected outcome: 已在探索阶段使用完成，确定了候选技能和安装命令