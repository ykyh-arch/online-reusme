import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Cpu, Code2, Network, Mail, 
  Brain, Share2, Cloud, Users, CheckCircle2, 
  ExternalLink, Download, Lock, X, Shield, Eye, EyeOff
} from 'lucide-react';
import aiResumeImg from './img/airesume.png';
import cloudScheduleImg from './img/cloudschedule.png';
import lzgdImg from './img/lzgd.png';
import comingSoonImg from './img/comesoon.png';
import avatarImg from './img/avator.png';

/**
 * 粒子星云背景组件
 * @param {number} particleCount - 粒子数量，默认30个（稀疏效果）
 * @param {string} color - 粒子颜色，默认蓝紫色
 */
const ParticleBackground = ({ particleCount = 30, color = '#00d4ff' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    // 设置canvas实际尺寸
    const setCanvasSize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setCanvasSize();

    // 粒子类
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#a855f7';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // 边界检查
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // 绘制光晕效果
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 4
        );
        gradient.addColorStop(0, this.color + '40');
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // 初始化粒子
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle());
    }

    // 绘制连线
    const drawConnections = () => {
      const particles = particlesRef.current;
      const maxDistance = 100;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 更新和绘制粒子
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // 绘制连线
      drawConnections();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 监听窗口大小变化
    const handleResize = () => {
      setCanvasSize();
      particlesRef.current.forEach(particle => particle.reset());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

// 附件码验证弹框组件
const AttachmentModal = ({ isOpen, onClose, onConfirm }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showCode, setShowCode] = useState(false);

  // 从环境变量获取附件码
  const CORRECT_CODE = import.meta.env.VITE_ATTACHMENT_CODE || 'resume2024';

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // 模拟验证延迟，增加安全性
    setTimeout(() => {
      if (code === CORRECT_CODE) {
        setError('');
        onConfirm();
        onClose();
        setCode('');
      } else {
        setError('附件码错误，请重新输入');
      }
      setIsVerifying(false);
    }, 300);
  };

  const handleClose = () => {
    setCode('');
    setError('');
    setShowCode(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 背景遮罩 - 毛玻璃效果 */}
      <div 
        className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* 弹框主体 */}
      <div className="relative w-full max-w-md animate-modal-enter">
        {/* 外发光边框 */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#00d4ff]/50 via-[#a855f7]/50 to-[#00d4ff]/50 rounded-2xl blur-sm opacity-60" />
        
        {/* 内容容器 */}
        <div className="relative bg-[#131315] border border-[#353437] rounded-2xl overflow-hidden">
          {/* 顶部装饰条 */}
          <div className="h-1 bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-[#00d4ff]" />
          
          {/* 关闭按钮 */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-[#C2C6D6] hover:text-[#E5E1E4] hover:bg-[#1a1a1f] transition-all"
          >
            <X size={20} />
          </button>

          <div className="p-8">
            {/* 图标和标题 */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/20 to-[#a855f7]/20 rounded-2xl" />
                <div className="absolute inset-0 border border-[#00d4ff]/30 rounded-2xl" />
                <Shield className="w-8 h-8 text-[#00d4ff] relative z-10" />
              </div>
              <h3 className="text-xl font-bold text-[#E5E1E4] mb-2">
                附件下载验证
              </h3>
              <p className="text-sm text-[#C2C6D6]">
                请输入附件码以获取简历文件
              </p>
            </div>

            {/* 输入表单 */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C2C6D6]">
                  <Lock size={18} />
                </div>
                <input
                  type={showCode ? "text" : "password"}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="请输入附件码"
                  className="w-full pl-12 pr-12 py-3.5 bg-[#1a1a1f] border border-[#353437] rounded-xl text-[#E5E1E4] placeholder-[#C2C6D6]/50 focus:outline-none focus:border-[#00d4ff]/50 focus:ring-2 focus:ring-[#00d4ff]/10 transition-all"
                  autoFocus
                />
                {/* 显示/隐藏密码按钮 */}
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#C2C6D6] hover:text-[#E5E1E4] hover:bg-[#25252a] transition-all"
                >
                  {showCode ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {/* 输入框发光效果 */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00d4ff]/5 to-[#a855f7]/5 pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity" />
              </div>

              {/* 错误提示 */}
              {error && (
                <div className="flex items-center gap-2 text-[#ef4444] text-sm animate-shake">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                  {error}
                </div>
              )}

              {/* 确认按钮 */}
              <button
                type="submit"
                disabled={isVerifying || !code.trim()}
                className="w-full py-3.5 px-6 rounded-xl font-medium text-white relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {/* 按钮背景 */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] transition-all group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/0 via-white/20 to-[#00d4ff]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isVerifying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      验证中...
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      确认下载
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* 底部提示 */}
            <div className="mt-6 pt-4 border-t border-[#353437]/50 text-center">
              <p className="text-xs text-[#C2C6D6]/60">
                如需获取附件码，请联系本人
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TopNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    // 创建隐藏的a标签触发下载
    const link = document.createElement('a');
    link.href = '/doc/资深研发工程师 - 郭玉凯 - 10年.pdf';
    link.download = '资深研发工程师 - 郭玉凯 - 10年.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#131315]/60 backdrop-blur-xl border-b border-[#353437]/20 shadow-[0_0_40px_rgba(173,198,255,0.05)] font-body antialiased tracking-tight print:hidden">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
          <div className="text-xl font-bold tracking-tighter text-[#E5E1E4]">Architect.ai</div>
          <div className="hidden md:flex items-center space-gap-8 gap-8">
            <a className="text-[#ADC6FF] font-medium border-b-2 border-[#ADC6FF] pb-1" href="#">首页</a>
            <a className="text-[#C2C6D6] hover:text-[#E5E1E4] transition-colors" href="#skills">核心技能</a>
            <a className="text-[#C2C6D6] hover:text-[#E5E1E4] transition-colors" href="#experience">职业历程</a>
            <a className="text-[#C2C6D6] hover:text-[#E5E1E4] transition-colors" href="#projects">精选项目</a>
            <a className="text-[#C2C6D6] hover:text-[#E5E1E4] transition-colors" href="#evaluation">自我评价</a>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#1a1a1f] text-[#ADC6FF] px-4 py-1.5 rounded-lg font-medium hover:bg-[#25252a] transition-all active:scale-95 flex items-center gap-2 border border-[#353437]"
          >
            <Download size={16} />
            附件
          </button>
        </div>
      </nav>

      {/* 附件码验证弹框 */}
      <AttachmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDownload}
      />
    </>
  );
};

const HeroSection = () => (
  <section className="relative flex flex-col md:flex-row items-center md:items-start gap-12 mb-32 pt-32 animate-slide-up print:pt-0 print:mb-16">
    {/* 粒子星云背景 */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <ParticleBackground particleCount={25} />
    </div>
    {/* 头像区域 */}
    <div className="relative group print:hidden z-10">
      {/* 外发光环 */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-[#00d4ff] to-[#a855f7] rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      {/* 内发光环 */}
      <div className="absolute -inset-1 bg-gradient-to-br from-[#00d4ff]/50 to-[#a855f7]/50 rounded-full blur-md opacity-40"></div>
      {/* 头像容器 */}
      <div 
        className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden"
        style={{
          border: '2px solid rgba(0,212,255,0.3)',
          boxShadow: '0 0 30px rgba(0,212,255,0.15), inset 0 0 20px rgba(0,212,255,0.05)',
        }}
      >
        <img 
          src={avatarImg} 
          alt="郭玉凯" 
          className="w-full h-full object-cover"
        />
        {/* 图片边缘遮罩 - 让图片与圆形边框融合 */}
        <div className="absolute inset-0 rounded-full border-2 border-[#00d4ff]/20 pointer-events-none"></div>
      </div>
      {/* 状态指示点 */}
      <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-[#0a0a0f] flex items-center justify-center border border-[#10b981]/30">
        <div className="w-3 h-3 rounded-full bg-[#10b981] animate-pulse"></div>
      </div>
    </div>
    
    <div className="flex-1 text-center md:text-left">
      {/* 职位标签 */}
      <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
        <div className="h-px w-8 bg-gradient-to-r from-[#00d4ff] to-transparent"></div>
        <span className="text-sm font-medium tracking-[0.2em] uppercase" style={{ color: '#00d4ff' }}>
          Senior Backend Architect
        </span>
      </div>
      
      {/* 姓名 */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90 mb-4 print:text-black">
        郭玉凯
      </h1>
      
      {/* 副标题 */}
      <p className="text-xl md:text-2xl font-medium mb-6 print:text-gray-800" style={{ color: '#a855f7' }}>
        资深研发工程师 / AI后端架构师
      </p>
      
      {/* 技能标签 */}
      <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
        <div 
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(0,212,255,0.1)',
            border: '1px solid rgba(0,212,255,0.2)',
          }}
        >
          <Terminal className="w-4 h-4" style={{ color: '#00d4ff' }} />
          <span className="text-sm font-medium" style={{ color: '#00d4ff' }}>架构设计</span>
        </div>
        <div 
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.2)',
          }}
        >
          <Cpu className="w-4 h-4" style={{ color: '#a855f7' }} />
          <span className="text-sm font-medium" style={{ color: '#a855f7' }}>AI工程化</span>
        </div>
        <div 
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.2)',
          }}
        >
          <Cloud className="w-4 h-4" style={{ color: '#10b981' }} />
          <span className="text-sm font-medium" style={{ color: '#10b981' }}>云原生</span>
        </div>
      </div>
      
      {/* 简介 */}
      <p className="text-base text-white/60 leading-relaxed text-justify mb-6 max-w-2xl group-hover:text-white/70 transition-colors print:text-gray-800">
        拥有10年后端架构经验，精通高并发系统设计与微服务治理，致力于通过技术驱动业务增长，具备极强的技术攻坚与团队领导能力。
      </p>
      
      {/* 联系方式 */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-white/50 mb-8 print:text-gray-800">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00d4ff]"></span>
          18225529115
        </span>
        <span className="text-white/20">|</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#a855f7]"></span>
          643582433@qq.com
        </span>
        <span className="text-white/20">|</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
          合肥
        </span>
      </div>
      
      {/* 社交链接 */}
      <div className="flex justify-center md:justify-start gap-4 print:hidden">
        {[
          { icon: Code2, color: '#00d4ff', href: '#' },
          { icon: Network, color: '#a855f7', href: '#' },
          { icon: Mail, color: '#10b981', href: 'mailto:643582433@qq.com' },
        ].map((item, i) => (
          <a 
            key={i}
            href={item.href}
            className="p-2.5 rounded-lg transition-all duration-300 hover:scale-110"
            style={{
              background: `${item.color}10`,
              border: `1px solid ${item.color}20`,
              color: item.color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = item.color;
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${item.color}10`;
              e.currentTarget.style.color = item.color;
            }}
          >
            <item.icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </div>
  </section>
);

const SkillsSection = () => {
  // 技能卡片颜色配置
  const skillCards = [
    {
      id: 'ai',
      title: '大模型工程化',
      icon: Brain,
      colors: { primary: '#00d4ff', secondary: '#6366f1' },
      span: 'md:col-span-7',
      tags: ["vLLM", "RAG", "LangChain", "Agentic Workflow", "Milvus"],
      desc: "熟悉LangChain4j/Spring AI，实现RAG与模型微调；熟练部署vLLM并搭建Dify/Coze智能体工作流。精通Milvus、Qdrant向量数据库。掌握Elasticsearch、MySQL、Redis等混合存储方案。",
      badge: 'Core focus'
    },
    {
      id: 'distributed',
      title: '分布式架构',
      icon: Share2,
      colors: { primary: '#a855f7', secondary: '#ec4899' },
      span: 'md:col-span-5',
      tags: ["Spring Cloud", "Redis", "Kafka", "Java/JVM"],
      desc: "精通Java及JVM调优，主导Spring Cloud Alibaba微服务治理，具备AgileBPM工作流引擎及高并发系统设计经验。"
    },
    {
      id: 'cloud',
      title: '云原生容器化',
      icon: Cloud,
      colors: { primary: '#10b981', secondary: '#00d4ff' },
      span: 'md:col-span-5',
      tags: ["K8s", "Docker", "Terraform", "CI/CD"],
      desc: "实现Docker容器化与K8s集群管理；构建CI/CD流水线，优化Jenkins与GitLab流程。"
    },
    {
      id: 'leadership',
      title: '团队管理',
      icon: Users,
      colors: { primary: '#f59e0b', secondary: '#ef4444' },
      span: 'md:col-span-7',
      tags: [],
      desc: "曾带领10+人研发团队主导全流程管理；建立Code Review机制，通过技术分享提升团队能力。具备从需求分析、技术选型到系统落地与运维的全生命周期管理能力。",
      stats: [
        { value: '10+ 年', label: 'Industry Exp' },
        { value: '20+ 项目', label: 'Architected' }
      ]
    }
  ];

  return (
    <section className="relative mb-32 print:mb-12 animate-slide-up delay-100 overflow-hidden" id="skills">
      {/* 粒子星云背景 */}
      <ParticleBackground particleCount={20} />
      <div className="relative z-10 flex items-center gap-4 mb-10">
        <div className="h-8 w-1 bg-gradient-to-b from-[#00d4ff] to-[#a855f7] rounded-full"></div>
        <h2 className="text-3xl font-bold tracking-tight text-white/90 print:text-black">
          技术栈与专业能力
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
      </div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5">
        {skillCards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.id}
              className={`${card.span} group relative rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 print:break-inside-avoid`}
              style={{
                background: 'linear-gradient(145deg, rgba(25,25,30,0.8) 0%, rgba(15,15,20,0.9) 100%)',
                border: `1px solid ${card.colors.primary}15`,
              }}
            >
              {/* 顶部发光边框 */}
              <div 
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${card.colors.primary}, transparent)` }}
              ></div>
              
              <div className="p-6 relative">
                {/* 头部区域 */}
                <div className="flex justify-between items-start mb-5">
                  <div 
                    className="w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{ background: `${card.colors.primary}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: card.colors.primary }} />
                  </div>
                  {card.badge && (
                    <span 
                      className="text-xs uppercase tracking-widest px-2.5 py-1.5 rounded border"
                      style={{ 
                        color: card.colors.primary, 
                        borderColor: `${card.colors.primary}30`,
                        background: `${card.colors.primary}10`
                      }}
                    >
                      {card.badge}
                    </span>
                  )}
                </div>
                
                {/* 标题 */}
                <h3 className="text-2xl font-bold text-white/90 mb-3 group-hover:text-white transition-colors print:text-black">
                  {card.title}
                </h3>
                
                {/* 描述 */}
                <p className="text-white/60 text-base leading-relaxed mb-5 group-hover:text-white/70 transition-colors print:text-gray-800">
                  {card.desc}
                </p>
                
                {/* 标签或统计 */}
                {card.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-sm px-3 py-1.5 rounded-lg font-medium"
                        style={{
                          color: card.colors.primary,
                          background: `${card.colors.primary}10`,
                          border: `1px solid ${card.colors.primary}25`
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : card.stats ? (
                  <div className="grid grid-cols-2 gap-3">
                    {card.stats.map((stat, i) => (
                      <div 
                        key={i}
                        className="p-4 rounded-lg"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: `1px solid ${card.colors.primary}15`
                        }}
                      >
                        <div 
                          className="text-xl font-bold mb-1 print:text-black"
                          style={{ color: card.colors.primary }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-xs text-white/40 uppercase tracking-wider print:text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              
              {/* 底部装饰线 */}
              <div 
                className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-700 ease-out"
                style={{ background: `linear-gradient(to right, ${card.colors.primary}, ${card.colors.secondary})` }}
              ></div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  const experiences = [
    {
      time: "2025.12 - Present",
      company: "OPC模式探索",
      role: "独立开发者 / Vibe Coding",
      desc: "践行Vibe Coding理念,借助Trae辅助编程提效,使用Stitch、Pencil完成AI简历产品的UI设计与交互打磨,并结合Lovart生成产品视觉物料。",
      points: ["全栈独立开发与产品设计落地", "借助AI工具极大提升研发效能"]
    },
    {
      time: "2024.12 - 2025.08",
      company: "中电信量子集团",
      role: "资深后端研发工程师",
      desc: "主导超量融合调度计算服务的开发与部署，保障平台高并发下的计算稳定性；负责云平台与教研系统的日常开发维护；构建量子智能客服系统，实现智能问答。",
      points: ["主导超量融合调度计算服务", "保障高并发计算稳定性"]
    },
    {
      time: "2021.05 - 2024.11",
      company: "上海飞未信息技术股份有限公司",
      role: "架构师 / 项目组长",
      desc: "参与农业行业项目架构设计与优化；承担培训研发工作；跟踪评估大模型等新技术；统筹项目管理、等保测评、云资源管理及平台部署工作。",
      points: ["农业行业项目架构设计与优化", "统筹项目管理与云资源"]
    },
    {
      time: "2020.03 - 2021.04",
      company: "安徽晶奇网络科技股份有限公司",
      role: "核心研发工程师",
      desc: "负责医疗产品线核心模块开发与组件封装；参与代码评审，推动技术方案落地；引入新技术框架赋能业务创新。",
      points: []
    },
    {
      time: "2016.03 - 2020.02",
      company: "安徽连营电子科技有限公司",
      role: "后端研发工程师",
      desc: "从事教育行业项目需求分析与核心开发；统筹项目进度，保障平台稳定运行与线上运维。",
      points: []
    }
  ];

  // 职业历程颜色配置
  const expColors = [
    { primary: '#00d4ff', secondary: '#6366f1' },  // 蓝色
    { primary: '#a855f7', secondary: '#ec4899' },  // 紫色
    { primary: '#10b981', secondary: '#00d4ff' },  // 绿色
    { primary: '#f59e0b', secondary: '#ef4444' },  // 橙色
    { primary: '#3b82f6', secondary: '#8b5cf6' },  // 靛蓝
  ];

  return (
    <section className="relative mb-32 print:mb-12 animate-slide-up delay-200 overflow-hidden" id="experience">
      {/* 粒子星云背景 */}
      <ParticleBackground particleCount={20} />
      <div className="relative z-10 flex items-center gap-4 mb-10">
        <div className="h-8 w-1 bg-gradient-to-b from-[#00d4ff] to-[#a855f7] rounded-full"></div>
        <h2 className="text-3xl font-bold tracking-tight text-white/90 print:text-black">
          职业历程
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
      </div>
      
      <div className="relative z-10 pl-8 md:pl-0">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] timeline-line -translate-x-1/2 hidden md:block print:bg-gray-300 print:bg-none"></div>
        
        {experiences.map((exp, idx) => {
          const isEven = idx % 2 !== 0;
          const colors = expColors[idx % expColors.length];
          const isLatest = idx === 0;
          
          return (
            <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center mb-16 group print:mb-8 print-break-inside-avoid">
              {/* Dot */}
              <div 
                className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 transition-transform duration-300 print:bg-white print:border-gray-800"
                style={{
                  background: '#0a0a0f',
                  border: `2px solid ${isLatest ? colors.primary : 'rgba(255,255,255,0.2)'}`,
                  boxShadow: isLatest ? `0 0 20px ${colors.primary}40` : 'none'
                }}
              >
                {isLatest && <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: colors.primary }}></div>}
              </div>
              
              {/* Left Side */}
              <div className={`md:w-1/2 ${isEven ? 'md:pr-16 hidden md:block order-1' : 'md:pr-16 text-left md:text-right order-2 md:order-1 mt-6 md:mt-0'} print:w-full print:pr-0 print:text-left print:order-1`}>
                {isEven ? (
                   exp.points && exp.points.length > 0 && (
                     <div 
                       className="p-6 rounded-xl print:break-inside-avoid"
                       style={{
                         background: 'linear-gradient(145deg, rgba(25,25,30,0.6) 0%, rgba(15,15,20,0.8) 100%)',
                         border: `1px solid ${colors.primary}20`,
                       }}
                     >
                       <ul className="space-y-3">
                         {exp.points.map((pt, i) => (
                           <li key={i} className="flex items-start gap-3 text-base text-white/70 print:text-gray-800">
                             <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: colors.primary }} />
                             <span>{pt}</span>
                           </li>
                         ))}
                       </ul>
                     </div>
                   )
                ) : (
                  <div className="group-hover:translate-x-1 transition-transform duration-300">
                    <span 
                      className="text-sm font-bold mb-2 block tracking-widest uppercase print:text-gray-600"
                      style={{ color: colors.primary }}
                    >
                      {exp.time}
                    </span>
                    <h3 className="text-2xl font-bold text-white/90 mb-2 group-hover:text-white transition-colors print:text-black">
                      {exp.company}
                    </h3>
                    <div 
                      className="text-base font-medium mb-3 print:text-gray-800"
                      style={{ color: colors.secondary }}
                    >
                      {exp.role}
                    </div>
                    <p className="text-white/60 leading-relaxed text-base group-hover:text-white/70 transition-colors print:text-gray-800">
                      {exp.desc}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Right Side */}
              <div className={`md:w-1/2 ${isEven ? 'md:pl-16 text-left order-2 mt-6 md:mt-0' : 'md:pl-16 order-3'} print:hidden`}>
                 {isEven ? (
                  <div className="group-hover:-translate-x-1 transition-transform duration-300">
                    <span 
                      className="text-sm font-bold mb-2 block tracking-widest uppercase print:text-gray-600"
                      style={{ color: colors.primary }}
                    >
                      {exp.time}
                    </span>
                    <h3 className="text-2xl font-bold text-white/90 mb-2 group-hover:text-white transition-colors print:text-black">
                      {exp.company}
                    </h3>
                    <div 
                      className="text-base font-medium mb-3 print:text-gray-800"
                      style={{ color: colors.secondary }}
                    >
                      {exp.role}
                    </div>
                    <p className="text-white/60 leading-relaxed text-base group-hover:text-white/70 transition-colors print:text-gray-800">
                      {exp.desc}
                    </p>
                  </div>
                 ) : (
                   exp.points && exp.points.length > 0 && (
                     <div 
                       className="p-6 rounded-xl print:break-inside-avoid"
                       style={{
                         background: 'linear-gradient(145deg, rgba(25,25,30,0.6) 0%, rgba(15,15,20,0.8) 100%)',
                         border: `1px solid ${colors.primary}20`,
                       }}
                     >
                       <ul className="space-y-3">
                         {exp.points.map((pt, i) => (
                           <li key={i} className="flex items-start gap-3 text-base text-white/70 print:text-gray-800">
                             <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: colors.primary }} />
                             <span>{pt}</span>
                           </li>
                         ))}
                       </ul>
                     </div>
                   )
                 )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// 设备框装饰组件 - 用于包裹产品截图
const DeviceFrame = ({ children, color = "blue", url = "" }) => {
  // 提取简洁的URL显示
  const displayUrl = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'localhost:3000';
  
  return (
    <div className="relative p-4 bg-[#0f0f12] rounded-t-2xl">
      {/* 设备顶部栏 */}
      <div className="flex items-center gap-2 mb-3 px-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
        <div className="flex-1 text-center">
          <div className="inline-block px-3 py-1 bg-[#1a1a1f] rounded text-[10px] text-[#6b7280] truncate max-w-[200px]">
            {displayUrl}
          </div>
        </div>
      </div>
      {/* 屏幕内容 */}
      <div className={`relative rounded-lg overflow-hidden border-2 ${color === 'blue' ? 'border-[#00d4ff]/30' : color === 'purple' ? 'border-[#a855f7]/30' : 'border-[#10b981]/30'} bg-[#1a1a1f]`}>
        {children}
        {/* 屏幕反光效果 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
      </div>
      {/* 底部发光条 */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 ${color === 'blue' ? 'bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent' : color === 'purple' ? 'bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent' : 'bg-gradient-to-r from-transparent via-[#10b981]/50 to-transparent'}`}></div>
    </div>
  );
};

// 抽象科技背景组件 - 用于无图项目
const TechBackground = ({ name, index }) => {
  const colors = [
    'from-[#00d4ff]/20 via-[#6366f1]/20 to-[#a855f7]/20',
    'from-[#a855f7]/20 via-[#ec4899]/20 to-[#f43f5e]/20',
    'from-[#10b981]/20 via-[#00d4ff]/20 to-[#3b82f6]/20'
  ];
  const glowColors = ['#00d4ff', '#a855f7', '#10b981'];
  
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-[#0a0a0f]">
      {/* 动态网格背景 */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* 渐变光晕 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors[index % 3]} opacity-60`}></div>
      
      {/* 脉冲圆环 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border border-white/10 animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-0 w-32 h-32 rounded-full border border-white/20" style={{ transform: 'scale(0.7)' }}></div>
          <div className="absolute inset-0 w-32 h-32 rounded-full border border-white/30" style={{ transform: 'scale(0.4)' }}></div>
        </div>
      </div>
      
      {/* 中心大字母 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-7xl font-bold text-white/20" style={{ 
          textShadow: `0 0 60px ${glowColors[index % 3]}40`,
          fontFamily: '"阿里妈妈数黑体", sans-serif'
        }}>
          {name.charAt(0)}
        </span>
      </div>
      
      {/* 角落装饰 */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20"></div>
    </div>
  );
};

// 发光标签组件
const GlowTag = ({ children, color = "blue" }) => (
  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${
    color === 'blue' 
      ? 'bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/30' 
      : 'bg-[#a855f7]/10 text-[#a855f7] border-[#a855f7]/30'
  } backdrop-blur-sm`}>
    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${color === 'blue' ? 'bg-[#00d4ff]' : 'bg-[#a855f7]'} animate-pulse`}></span>
    {children}
  </span>
);

// 占位项目背景组件 - 使用自定义图标
const PlaceholderBackground = () => (
  <div className="relative aspect-video w-full overflow-hidden bg-[#0a0a0f]">
    {/* 代码雨效果背景 */}
    <div className="absolute inset-0 opacity-15">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-[10px] text-[#f59e0b] font-mono leading-tight whitespace-pre"
          style={{
            left: `${i * 12 + 5}%`,
            top: '-20%',
            animation: `codeRain ${3 + i * 0.5}s linear infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          {`01001010
10101010
01010101
10101010
01010101
10101010`}
        </div>
      ))}
    </div>
    
    {/* 中央发光区域 */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* 外圈光环 */}
        <div className="w-32 h-32 rounded-full border border-[#f59e0b]/20 animate-pulse"></div>
        <div className="absolute inset-0 w-32 h-32 rounded-full border border-[#f59e0b]/10" style={{ transform: 'scale(1.3)' }}></div>
        
        {/* 中心图标 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={comingSoonImg} 
            alt="Coming Soon" 
            className="w-20 h-20 object-contain drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]"
          />
        </div>
      </div>
    </div>
    
    {/* 底部文字 */}
    <div className="absolute bottom-6 left-0 right-0 text-center">
      <div className="text-[#f59e0b] text-xs font-medium tracking-[0.2em] uppercase">Coming Soon</div>
    </div>
    
    {/* 角落装饰 */}
    <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-[#f59e0b]/30"></div>
    <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-[#f59e0b]/30"></div>
    <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-[#f59e0b]/30"></div>
    <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-[#f59e0b]/30"></div>
  </div>
);

const ProjectSection = () => {
  const projects = [
    {
      name: "一站式AI智能简历制作平台",
      role: "独立开发者全栈",
      time: "2025.12 - 至今",
      url: "http://1.15.44.114:1480",
      desc: "业务系统架构：基于Spring Boot构建高可用后台API中枢。Node.js文档中台：利用Puppeteer实现URL到高清PDF/PNG渲染；AI能力工程化：对接大模型构建智能生成与诊断链路。",
      tags: ["Spring Boot", "Node.js", "Puppeteer", "AI / RAG"],
      img: aiResumeImg,
      color: "blue"
    },
    {
      name: "云平台超量融合调度计算服务",
      role: "资深后端研发工程师",
      time: "2024.12 - 2025.08",
      url: "https://qc.zdxlz.com/",
      desc: "核心调度系统：基于Spring Alibaba构建高可用任务管理微服务，集成Slurm与Apptainer。量子领域智能问答(RAG)：基于通义千问进行LoRA微调；结合LlamaIndex与Qdrant构建高准确率问答。",
      tags: ["Spring Alibaba", "Slurm", "LoRA", "Qdrant"],
      img: cloudScheduleImg,
      color: "purple"
    },
    {
      name: "乱占耕地建房专项整治试点工作平台",
      role: "项目组长",
      time: "2022.03 - 2024.11",
      url: "https://rs.abdc.org.cn/",
      desc: "高可用架构：结合VPN、负载均衡器构建安全链路；主导线上性能排查。多租户工作流：支撑108个县级单位并发流转。实施读写分离、分区分表，WebGIS地图加载速度提升60%。",
      tags: ["高可用", "AgileBPM", "多租户", "WebGIS"],
      img: lzgdImg,
      color: "green"
    },
    {
      name: "下一代智能系统架构",
      role: "探索中",
      time: "2026 - Future",
      url: "",
      desc: "持续探索云原生、AI工程化、分布式系统的边界。关注WebAssembly、边缘计算、量子计算等前沿技术，为下一代产品架构做准备。",
      tags: ["WebAssembly", "边缘计算", "量子计算", "探索"],
      img: null,
      color: "orange",
      isPlaceholder: true
    }
  ];

  return (
    <section className="relative mb-32 print:mb-12 animate-slide-up delay-300 overflow-hidden" id="projects">
      {/* 粒子星云背景 */}
      <ParticleBackground particleCount={20} />
      <div className="relative z-10 flex items-center gap-4 mb-10">
        <div className="h-8 w-1 bg-gradient-to-b from-[#00d4ff] to-[#a855f7] rounded-full"></div>
        <h2 className="text-3xl font-bold tracking-tight text-white/90 print:text-black">
          精选项目
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
      </div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 print:block print:space-y-6">
        {projects.map((proj, idx) => (
          <div 
            key={idx} 
            className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 print:break-inside-avoid ${
              proj.color === 'blue' 
                ? 'hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]' 
                : proj.color === 'purple'
                ? 'hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]'
                : 'hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]'
            }`}
            style={{
              background: 'linear-gradient(145deg, rgba(25,25,30,0.8) 0%, rgba(15,15,20,0.9) 100%)',
              border: `1px solid ${proj.color === 'blue' ? 'rgba(0,212,255,0.15)' : proj.color === 'purple' ? 'rgba(168,85,247,0.15)' : proj.color === 'orange' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)'}`,
            }}
          >
            {/* 顶部发光边框 */}
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
              proj.color === 'blue' 
                ? 'via-[#00d4ff]/50' 
                : proj.color === 'purple'
                ? 'via-[#a855f7]/50'
                : proj.color === 'orange'
                ? 'via-[#f59e0b]/50'
                : 'via-[#10b981]/50'
            } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            {/* 图片/视觉区域 */}
            {proj.img ? (
              <DeviceFrame color={proj.color} url={proj.url}>
                <img 
                  src={proj.img} 
                  alt={proj.name}
                  className="w-full h-auto object-contain"
                />
              </DeviceFrame>
            ) : proj.isPlaceholder ? (
              <PlaceholderBackground />
            ) : (
              <TechBackground name={proj.name} index={idx} />
            )}
            
            {/* 内容区域 */}
            <div className="p-6 relative">
              {/* 标题行 */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-xl font-bold text-white/90 group-hover:text-white transition-colors leading-tight">
                  {proj.name}
                </h3>
                {proj.url && (
                  <a 
                    href={proj.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`shrink-0 p-2.5 rounded-lg transition-all duration-300 print:hidden ${
                      proj.color === 'blue'
                        ? 'bg-[#00d4ff]/10 text-[#00d4ff] hover:bg-[#00d4ff] hover:text-white'
                        : proj.color === 'purple'
                        ? 'bg-[#a855f7]/10 text-[#a855f7] hover:bg-[#a855f7] hover:text-white'
                        : 'bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981] hover:text-white'
                    }`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
              
              {/* 元信息 */}
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span className={`font-medium ${
                  proj.color === 'blue' ? 'text-[#00d4ff]' : proj.color === 'purple' ? 'text-[#a855f7]' : proj.color === 'orange' ? 'text-[#f59e0b]' : 'text-[#10b981]'
                }`}>
                  {proj.role}
                </span>
                <span className="text-white/20">·</span>
                <span className="text-white/50">{proj.time}</span>
              </div>

              {/* 描述 */}
              <p className="text-white/60 text-base leading-relaxed mb-5 group-hover:text-white/70 transition-colors">
                {proj.desc}
              </p>
              
              {/* 标签 */}
              <div className="flex flex-wrap gap-2">
                {proj.tags.map((tag, i) => (
                  <GlowTag key={tag} color={proj.color === 'green' ? 'blue' : proj.color === 'orange' ? 'blue' : proj.color}>
                    {tag}
                  </GlowTag>
                ))}
              </div>
            </div>
            
            {/* 底部装饰线 */}
            <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r ${
              proj.color === 'blue'
                ? 'from-[#00d4ff] to-[#6366f1]'
                : proj.color === 'purple'
                ? 'from-[#a855f7] to-[#ec4899]'
                : proj.color === 'orange'
                ? 'from-[#f59e0b] to-[#ef4444]'
                : 'from-[#10b981] to-[#00d4ff]'
            } group-hover:w-full transition-all duration-700 ease-out`}></div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 自我评价模块
const SelfEvaluationSection = () => {
  const highlights = [
    { text: "10年经验", color: "#00d4ff" },
    { text: "全生命周期管理", color: "#a855f7" },
    { text: "高并发架构", color: "#10b981" },
    { text: "技术攻坚", color: "#f59e0b" },
    { text: "团队协作", color: "#ec4899" },
  ];

  return (
    <section className="relative mb-32 print:mb-12 animate-slide-up delay-400 overflow-hidden" id="evaluation">
      {/* 粒子星云背景 */}
      <ParticleBackground particleCount={20} />
      <div className="relative z-10 flex items-center gap-4 mb-10">
        <div className="h-8 w-1 bg-gradient-to-b from-[#00d4ff] to-[#a855f7] rounded-full"></div>
        <h2 className="text-3xl font-bold tracking-tight text-white/90 print:text-black">
          自我评价
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
      </div>

      <div className="relative z-10 rounded-2xl overflow-hidden group">
        {/* 背景卡片 */}
        <div
          className="p-8 md:p-10"
          style={{
            background: 'linear-gradient(145deg, rgba(25,25,30,0.8) 0%, rgba(15,15,20,0.9) 100%)',
            border: '1px solid rgba(0,212,255,0.15)',
          }}
        >
          {/* 顶部发光边框 */}
          <div
            className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(to right, transparent, #00d4ff, transparent)' }}
          ></div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* 左侧图标 */}
            <div className="flex-shrink-0">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(0,212,255,0.1)',
                  border: '1px solid rgba(0,212,255,0.2)',
                }}
              >
                <Users className="w-8 h-8" style={{ color: '#00d4ff' }} />
              </div>
            </div>

            {/* 右侧内容 */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white/90 mb-4 group-hover:text-white transition-colors">
                关于我
              </h3>

              <p className="text-white/60 text-base leading-relaxed mb-6 group-hover:text-white/70 transition-colors">
                拥有10年一线后端开发与架构设计经验，具备从需求分析、技术选型到系统落地与运维的全生命周期管理能力。对高并发、高可用、高性能的系统设计有深刻理解，善于解决复杂技术难题。具备极强的责任心与团队协作精神，善于技术分享与知识沉淀，致力于通过技术创新推动业务发展。
              </p>

              {/* 亮点标签 */}
              <div className="flex flex-wrap gap-3">
                {highlights.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      color: item.color,
                      background: `${item.color}10`,
                      border: `1px solid ${item.color}25`,
                    }}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 底部装饰线 */}
          <div
            className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-700 ease-out"
            style={{ background: 'linear-gradient(to right, #00d4ff, #a855f7)' }}
          ></div>
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen">
      <TopNav />
      <main className="px-6 max-w-7xl mx-auto">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectSection />
        <SelfEvaluationSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-surface w-full py-12 border-t border-outline-variant/10 print:hidden">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-8 gap-4">
          <div className="text-on-surface text-xl font-bold tracking-tighter">Architect.ai</div>
          <div className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant">
            © {new Date().getFullYear()} Senior Backend Architect. Built with Precision.
          </div>
          <div className="flex gap-6">
            <a className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">GitHub</a>
            <a className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">LinkedIn</a>
            <a className="font-label text-[0.75rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
