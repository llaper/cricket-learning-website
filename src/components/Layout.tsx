import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';

interface KnowledgeNode {
  id: string;
  title: string;
  type: 'category' | 'section' | 'subsection' | 'content';
  level?: 'beginner' | 'intermediate' | 'advanced';
  children?: KnowledgeNode[];
}

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | undefined>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNodeSelect = (node: KnowledgeNode) => {
    setSelectedNode(node);
    setIsMobileMenuOpen(false); // 移动端选择后关闭菜单
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // 这里可以实现搜索逻辑
    console.log('Searching for:', query);
  };

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="h-screen bg-background-primary flex flex-col">
      {/* 顶部导航栏 */}
      <Header 
        onSearch={handleSearch}
        onMenuToggle={handleMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      {/* 主体内容区域 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧导航 */}
        <div className={`
          ${isMobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'} 
          md:relative md:z-auto md:block
        `}>
          {/* 移动端遮罩 */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-background-overlay md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
          
          {/* 侧边栏 */}
          <div className={`
            relative transform transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0
          `}>
            <Sidebar 
              onNodeSelect={handleNodeSelect}
              selectedNodeId={selectedNode?.id}
            />
          </div>
        </div>

        {/* 右侧内容区域 */}
        <ContentArea 
          selectedNode={selectedNode}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default Layout;
