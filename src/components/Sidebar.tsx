import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface KnowledgeNode {
  id: string;
  title: string;
  type: 'category' | 'section' | 'subsection' | 'content';
  level?: 'beginner' | 'intermediate' | 'advanced';
  children?: KnowledgeNode[];
}

interface SidebarProps {
  className?: string;
  onNodeSelect?: (node: KnowledgeNode) => void;
  selectedNodeId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  className, 
  onNodeSelect, 
  selectedNodeId 
}) => {
  const [knowledgeTree, setKnowledgeTree] = useState<KnowledgeNode[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadKnowledgeTree = async () => {
      try {
        const response = await fetch('/data/knowledge-tree.json');
        const data = await response.json();
        setKnowledgeTree(data.categories);
        // 默认展开一级分类
        const defaultExpanded = new Set(data.categories.map((cat: KnowledgeNode) => cat.id)) as Set<string>;
        setExpandedNodes(defaultExpanded);
      } catch (error) {
        console.error('Failed to load knowledge tree:', error);
      } finally {
        setLoading(false);
      }
    };

    loadKnowledgeTree();
  }, []);

  const toggleExpanded = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleNodeClick = (node: KnowledgeNode) => {
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  };

  const renderNode = (node: KnowledgeNode, depth = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedNodeId === node.id;
    const isLeaf = !hasChildren;

    const getNodeIcon = () => {
      switch (node.type) {
        case 'category':
          return <BookOpen className="w-5 h-5 text-primary-500" />;
        case 'section':
          return <div className="w-4 h-4 rounded-full bg-primary-500" />;
        case 'subsection':
          return <div className="w-3 h-3 rounded-full bg-primary-300" />;
        case 'content':
          return <div className="w-2 h-2 rounded-full bg-neutral-300" />;
        default:
          return null;
      }
    };

    const getNodeStyles = () => {
      const baseStyles = "flex items-center w-full px-3 py-2 text-left transition-colors duration-200 rounded-md";
      
      switch (node.type) {
        case 'category':
          return cn(baseStyles, 
            "text-base font-semibold text-neutral-100 hover:bg-neutral-800 cursor-pointer"
          );
        case 'section':
          return cn(baseStyles,
            "text-sm font-medium text-neutral-200 hover:bg-neutral-800 cursor-pointer"
          );
        case 'subsection':
          return cn(baseStyles,
            "text-sm text-neutral-200 hover:bg-neutral-800 cursor-pointer ml-4"
          );
        case 'content':
          return cn(baseStyles,
            "text-sm text-neutral-300 hover:bg-neutral-800 cursor-pointer ml-8",
            isSelected && "bg-primary-900/15 border-l-3 border-primary-500 text-primary-500 font-medium"
          );
        default:
          return baseStyles;
      }
    };

    return (
      <div key={node.id} className="select-none">
        <div
          className={getNodeStyles()}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(node.id);
            }
            if (isLeaf) {
              handleNodeClick(node);
            }
          }}
        >
          <div className="flex items-center flex-1">
            {hasChildren && (
              <div className="mr-2">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                )}
              </div>
            )}
            <div className="mr-3">
              {getNodeIcon()}
            </div>
            <span className="flex-1">{node.title}</span>
            {node.level && (
              <Badge 
                variant={node.level}
                className="ml-2 text-xs"
              >
                {node.level === 'beginner' ? '入门' : 
                 node.level === 'intermediate' ? '进阶' : '高级'}
              </Badge>
            )}
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {node.children!.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={cn("w-80 bg-neutral-850 border-r border-neutral-700 p-6", className)}>
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-8 bg-neutral-800 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-80 bg-neutral-850 border-r border-neutral-700 overflow-y-auto", className)}>
      <div className="p-6">
        <h2 className="text-xl font-bold text-neutral-50 mb-6">板球知识体系</h2>
        <nav className="space-y-2">
          {knowledgeTree.map(node => renderNode(node))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
