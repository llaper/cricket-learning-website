import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, User, BookOpen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface KnowledgeNode {
  id: string;
  title: string;
  type: 'category' | 'section' | 'subsection' | 'content';
  level?: 'beginner' | 'intermediate' | 'advanced';
  children?: KnowledgeNode[];
}

interface ContentAreaProps {
  selectedNode?: KnowledgeNode;
  className?: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({ selectedNode, className }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedNode) {
      loadContent(selectedNode);
    }
  }, [selectedNode]);

  const loadContent = async (node: KnowledgeNode) => {
    setLoading(true);
    
    try {
      // 加载真实板球知识内容
      const response = await fetch('/data/cricket-content.json');
      const contentData = await response.json();
      
      // 获取对应节点的内容
      const nodeContent = contentData[node.id];
      if (nodeContent) {
        setContent(nodeContent.content);
      } else {
        // 如果没有找到对应内容，使用默认内容
        const defaultContent = generateDefaultContent(node);
        setContent(defaultContent);
      }
    } catch (error) {
      console.error('加载内容失败:', error);
      // 如果加载失败，使用默认内容
      const defaultContent = generateDefaultContent(node);
      setContent(defaultContent);
    }
    
    setLoading(false);
  };

  const generateDefaultContent = (node: KnowledgeNode): string => {
    const levelText = node.level === 'beginner' ? '入门级' : 
                     node.level === 'intermediate' ? '进阶级' : '专业级';
    
    // 根据节点类型生成不同内容
    let content = '';
    
    if (node.type === 'content') {
      content = `# ${node.title}

## 概述

${node.title}是板球学习体系中的重要组成部分。作为${levelText}内容，本章节将为您详细介绍相关知识点和实践应用。

## 主要内容

### 1. 基础概念

在深入学习${node.title}之前，我们需要先了解一些基础概念：

- **核心原理**：解释该技术的根本原理和作用机制
- **应用场景**：说明在什么情况下使用这种技术
- **与其他技术的关系**：分析与其他板球技术的关联

### 2. 技术要点

#### 2.1 关键要素

${node.title}包含以下几个关键要素：

1. **动作要领**：详细说明正确的动作步骤
2. **常见错误**：列举初学者容易犯的错误
3. **练习方法**：提供有效的练习建议

#### 2.2 实践指导

- **训练计划**：制定循序渐进的训练计划
- **评估标准**：建立技能评估的标准
- **进阶路径**：指明进一步提升的方向

### 3. 高级应用

对于已经掌握基础内容的学员，可以进一步学习：

- **战术应用**：在比赛中的实际运用
- **心理因素**：心理准备和心态调整
- **创新发展**：结合个人特点的个性化发展

## 练习建议

1. **基础练习**：从最基础的动作开始练习
2. **进阶训练**：逐步提高难度和复杂度
3. **实战应用**：在模拟比赛环境中应用所学技能

## 注意事项

- 安全第一：在任何练习中都要注意安全
- 循序渐进：不要急于求成，稳扎稳打
- 持续练习：技能的提升需要持续的练习和积累

## 相关链接

- [板球基础知识](/basics)
- [技术训练方法](/training)
- [战术策略分析](/tactics)

---

*本内容为板球学习指南的一部分，旨在帮助学习者系统掌握板球知识和技能。*`;
    } else {
      // 对于非content类型的节点，显示概览内容
      content = `# ${node.title}

## 概述

${node.title}是板球学习体系中的重要组成部分。本章节将为您介绍相关内容概览。

## 主要内容

### 包含的知识点

本章节包含以下主要知识点：

${node.children ? node.children.map(child => `- **${child.title}**`).join('\n') : '- 暂无子知识点'}

## 学习建议

- 从基础概念开始学习
- 结合实际练习加深理解
- 循序渐进掌握技能

---

*点击左侧导航中的具体知识点开始学习*`;
    }
    
    return content;
  };

  const generateMockContent = (node: KnowledgeNode): string => {
    const levelText = node.level === 'beginner' ? '入门级' : 
                     node.level === 'intermediate' ? '进阶级' : '专业级';
    
    // 根据节点类型生成不同内容
    let content = '';
    
    if (node.type === 'content') {
      content = `# ${node.title}

## 概述

${node.title}是板球学习体系中的重要组成部分。作为${levelText}内容，本章节将为您详细介绍相关知识点和实践应用。

## 主要内容

### 1. 基础概念

在深入学习${node.title}之前，我们需要先了解一些基础概念：

- **核心原理**：解释该技术的根本原理和作用机制
- **应用场景**：说明在什么情况下使用这种技术
- **与其他技术的关系**：分析与其他板球技术的关联

### 2. 技术要点

#### 2.1 关键要素

${node.title}包含以下几个关键要素：

1. **动作要领**：详细说明正确的动作步骤
2. **常见错误**：列举初学者容易犯的错误
3. **练习方法**：提供有效的练习建议

#### 2.2 实践指导

- **训练计划**：制定循序渐进的训练计划
- **评估标准**：建立技能评估的标准
- **进阶路径**：指明进一步提升的方向

### 3. 高级应用

对于已经掌握基础内容的学员，可以进一步学习：

- **战术应用**：在比赛中的实际运用
- **心理因素**：心理准备和心态调整
- **创新发展**：结合个人特点的个性化发展

## 练习建议

1. **基础练习**：从最基础的动作开始练习
2. **进阶训练**：逐步提高难度和复杂度
3. **实战应用**：在模拟比赛环境中应用所学技能

## 注意事项

- 安全第一：在任何练习中都要注意安全
- 循序渐进：不要急于求成，稳扎稳打
- 持续练习：技能的提升需要持续的练习和积累

## 相关链接

- [板球基础知识](/basics)
- [技术训练方法](/training)
- [战术策略分析](/tactics)

---

*本内容为板球学习指南的一部分，旨在帮助学习者系统掌握板球知识和技能。*`;
    } else {
      // 对于非content类型的节点，显示概览内容
      content = `# ${node.title}

## 概述

${node.title}是板球学习体系中的重要组成部分。本章节将为您介绍相关内容概览。

## 主要内容

### 包含的知识点

本章节包含以下主要知识点：

${node.children ? node.children.map(child => `- **${child.title}**`).join('\n') : '- 暂无子知识点'}

## 学习建议

- 从基础概念开始学习
- 结合实际练习加深理解
- 循序渐进掌握技能

---

*点击左侧导航中的具体知识点开始学习*`;
    }
    
    return content;
  };

  const getBreadcrumbs = (node?: KnowledgeNode) => {
    if (!node) return [];
    
    // 简化版面包屑 - 在实际项目中需要更复杂的逻辑
    const breadcrumbs = [];
    
    switch (node.type) {
      case 'category':
        breadcrumbs.push({ title: node.title, id: node.id });
        break;
      case 'section':
        breadcrumbs.push({ title: '基础知识', id: 'basic-knowledge' });
        breadcrumbs.push({ title: node.title, id: node.id });
        break;
      case 'subsection':
        breadcrumbs.push({ title: '基础知识', id: 'basic-knowledge' });
        breadcrumbs.push({ title: '历史与发展', id: 'history-development' });
        breadcrumbs.push({ title: node.title, id: node.id });
        break;
      case 'content':
        breadcrumbs.push({ title: '基础知识', id: 'basic-knowledge' });
        breadcrumbs.push({ title: '历史与发展', id: 'history-development' });
        breadcrumbs.push({ title: '起源与演变', id: 'origin-evolution' });
        breadcrumbs.push({ title: node.title, id: node.id });
        break;
    }
    
    return breadcrumbs;
  };

  const formatContent = (content: string) => {
    // 简单的markdown解析 - 在实际项目中可以使用完整的markdown解析器
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-4xl font-bold text-neutral-50 mb-8 leading-tight">{line.substring(2)}</h1>;
        } else if (line.startsWith('## ')) {
          return <h2 key={index} className="text-3xl font-bold text-neutral-50 mb-6 mt-12 leading-tight">{line.substring(3)}</h2>;
        } else if (line.startsWith('### ')) {
          return <h3 key={index} className="text-2xl font-semibold text-neutral-100 mb-4 mt-8">{line.substring(4)}</h3>;
        } else if (line.startsWith('#### ')) {
          return <h4 key={index} className="text-xl font-semibold text-neutral-200 mb-3 mt-6">{line.substring(5)}</h4>;
        } else if (line.startsWith('- ')) {
          return <li key={index} className="text-neutral-200 mb-2 ml-6">{line.substring(2)}</li>;
        } else if (line.trim() === '') {
          return <div key={index} className="mb-4" />;
        } else if (line.startsWith('*') && line.endsWith('*')) {
          return <p key={index} className="text-neutral-400 italic mt-8 text-sm">{line.substring(1, line.length - 1)}</p>;
        } else {
          return <p key={index} className="text-neutral-200 mb-4 leading-relaxed">{line}</p>;
        }
      });
  };

  if (!selectedNode) {
    return (
      <div className={`flex-1 bg-background-primary p-8 ${className}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-neutral-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-neutral-50 mb-4">欢迎来到板球学习指南</h2>
            <p className="text-xl text-neutral-400 mb-8">
              从左侧导航中选择您想学习的知识点，开始您的板球学习之旅
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { title: '基础知识', desc: '了解板球的历史、规则和基本概念', color: 'bg-primary-500' },
                { title: '技术技能', desc: '学习击球、投球、守备等核心技术', color: 'bg-semantic-success' },
                { title: '战术策略', desc: '掌握团队战术和个人策略', color: 'bg-semantic-warning' },
                { title: '训练方法', desc: '科学的训练方法和计划', color: 'bg-semantic-info' },
                { title: '心理战术', desc: '心理技能和压力管理', color: 'bg-semantic-error' },
                { title: '比赛管理', desc: '赛前、赛中、赛后的管理', color: 'bg-neutral-600' }
              ].map((item, index) => (
                <div key={index} className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-750 transition-colors">
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-100 mb-2">{item.title}</h3>
                  <p className="text-neutral-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbs = getBreadcrumbs(selectedNode);

  return (
    <div className={`flex-1 bg-background-primary overflow-y-auto ${className}`}>
      <div className="max-w-4xl mx-auto p-8">
        {/* 面包屑导航 */}
        <nav className="flex items-center space-x-2 text-sm text-neutral-300 mb-8">
          <a href="/" className="hover:text-primary-500 transition-colors">首页</a>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.id}>
              <ChevronRight className="w-4 h-4" />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-neutral-100 font-medium">{crumb.title}</span>
              ) : (
                <a href={`#${crumb.id}`} className="hover:text-primary-500 transition-colors">
                  {crumb.title}
                </a>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* 文章标题区域 */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            {selectedNode.level && (
              <Badge variant={selectedNode.level}>
                {selectedNode.level === 'beginner' ? '入门级' : 
                 selectedNode.level === 'intermediate' ? '进阶级' : '专业级'}
              </Badge>
            )}
            <div className="flex items-center space-x-4 text-sm text-neutral-400">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>阅读时间: 5-10分钟</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>板球学习指南</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-neutral-50 leading-tight">
            {selectedNode.title}
          </h1>
        </div>

        {/* 文章内容 */}
        <div className="prose prose-invert max-w-none">
          {loading ? (
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 bg-neutral-800 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="text-neutral-200">
              {formatContent(content)}
            </div>
          )}
        </div>

        {/* 文章底部操作 */}
        <div className="mt-12 pt-8 border-t border-neutral-700">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <Button variant="outline" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                收藏
              </Button>
              <Button variant="outline" size="sm">
                分享
              </Button>
            </div>
            <div className="text-sm text-neutral-400">
              最后更新: 2025-11-05
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
