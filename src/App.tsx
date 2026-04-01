import Background3D from './components/Background3D';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Code2, Database, Layout, Server, Cpu, Briefcase, GraduationCap, User, Gamepad2, Music, Globe, Wifi, Network, Layers, Building2 } from 'lucide-react';
import { SiHtml5, SiCss, SiJavascript, SiTypescript, SiAngular, SiDotnet, SiPostgresql, SiMongodb, SiRedis, SiElasticsearch, SiDocker, SiKubernetes, SiJenkins } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { DiMsqlServer } from 'react-icons/di';
import { ReactNode, useState } from 'react';
import { translations } from './translations';

function Section({ children, title, icon: Icon }: { children: ReactNode, title: string, icon?: any }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-24"
    >
      <div className="flex items-center gap-3 mb-8">
        {Icon && <Icon className="w-8 h-8 text-blue-400" />}
        <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function GlassCard({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 shadow-xl ${className}`}>
      {children}
    </div>
  );
}

function SkillBadge({ name, icon: Icon, colorClass }: { name: string, icon: any, colorClass: string }) {
  return (
    <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 hover:bg-slate-700/80 transition-colors">
      <Icon className={`w-5 h-5 ${colorClass}`} />
      <span className="text-sm font-medium text-slate-300">{name}</span>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<'vi' | 'en'>('en');
  const t = translations[lang];

  return (
    <div className="relative min-h-screen text-slate-300 font-sans selection:bg-blue-500/30">
      <Background3D />

      {/* Language Switcher */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
          className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-md border border-slate-600 hover:bg-slate-700/80 text-white px-4 py-2 rounded-full shadow-lg transition-all"
        >
          <Globe className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-sm">{lang === 'vi' ? 'EN' : 'VI'}</span>
        </button>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-20">

        {/* Hero Section */}
        <motion.header
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-32 text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-8"
        >
          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-4 pb-2 tracking-tight leading-tight">
              {t.name}
            </h1>
            <p className="text-2xl text-slate-400 font-medium mb-6">{t.role}</p>

            <p className="text-lg leading-relaxed text-slate-300 max-w-2xl mb-8">
              {t.summary}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium">
              <a href={`mailto:${t.email}`} className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 px-4 py-2 rounded-full border border-slate-700 transition-colors">
                <Mail className="w-4 h-4 text-blue-400" />
                {t.email}
              </a>
              <a href={`tel:${t.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 px-4 py-2 rounded-full border border-slate-700 transition-colors">
                <Phone className="w-4 h-4 text-green-400" />
                {t.phone}
              </a>
              <span className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
                <MapPin className="w-4 h-4 text-red-400" />
                {t.location}
              </span>
            </div>
          </div>
        </motion.header>

        {/* Skills Section */}
        <Section title={t.skillsTitle} icon={Cpu}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard>
              <div className="flex items-center gap-3 mb-4">
                <Layout className="w-6 h-6 text-pink-400" />
                <h3 className="text-xl font-semibold text-white">Front-end</h3>
              </div>
              <p className="text-sm text-slate-300 mb-4">{t.skills.frontend}</p>
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="HTML5" icon={SiHtml5} colorClass="text-orange-500" />
                <SkillBadge name="CSS3" icon={SiCss} colorClass="text-blue-500" />
                <SkillBadge name="JavaScript" icon={SiJavascript} colorClass="text-yellow-400" />
                <SkillBadge name="TypeScript" icon={SiTypescript} colorClass="text-blue-400" />
                <SkillBadge name="Angular" icon={SiAngular} colorClass="text-red-500" />
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Back-end</h3>
              </div>
              <p className="text-sm text-slate-300 mb-4">{t.skills.backend}</p>
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="C#" icon={TbBrandCSharp} colorClass="text-purple-500" />
                <SkillBadge name=".NET Core" icon={SiDotnet} colorClass="text-purple-600" />
                <SkillBadge name="LINQ" icon={Code2} colorClass="text-slate-400" />
                <SkillBadge name="Entity Framework" icon={Database} colorClass="text-slate-400" />
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Database</h3>
              </div>
              <p className="text-sm text-slate-300 mb-4">{t.skills.database}</p>
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="SQL Server" icon={DiMsqlServer} colorClass="text-red-500" />
                <SkillBadge name="PostgreSQL" icon={SiPostgresql} colorClass="text-blue-400" />
                <SkillBadge name="MongoDB" icon={SiMongodb} colorClass="text-green-500" />
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Layers className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-semibold text-white">{t.archTitle}</h3>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">{t.skills.architecture}</p>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge name="MVC" icon={Layout} colorClass="text-blue-400" />
                    <SkillBadge name="N-Layer" icon={Layers} colorClass="text-purple-400" />
                    <SkillBadge name="Repository" icon={Database} colorClass="text-green-400" />
                    <SkillBadge name="Microservice" icon={Network} colorClass="text-indigo-400" />
                    <SkillBadge name="SOLID" icon={Code2} colorClass="text-yellow-400" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu className="w-6 h-6 text-indigo-400" />
                    <h3 className="text-xl font-semibold text-white">{t.aiTitle}</h3>
                  </div>
                  <p className="text-sm text-slate-300 bg-slate-800/30 border border-slate-700/30 p-3 rounded-lg flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                    {t.skills.ai}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Code2 className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-xl font-semibold text-white">Performance Optimization</h3>
                  </div>
                  <p className="text-sm text-slate-300 bg-slate-800/30 border border-slate-700/30 p-3 rounded-lg italic">
                    {t.skills.optimization}
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </Section>

        {/* Experience Section */}
        <Section title={t.expTitle} icon={Briefcase}>
          <GlassCard className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
            <div className="pl-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Building2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Lac Viet Computing Group</h3>
                </div>
                <span className="inline-block bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold mt-2 md:mt-0">
                  2020 - {t.current}
                </span>
              </div>
              <p className="text-lg text-indigo-300 font-medium mb-6">Software Developer</p>

              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                  <p><strong className="text-white">{t.exp1Title}</strong> {t.exp1Desc}</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                  <p><strong className="text-white">{t.exp2Title}</strong> {t.exp2Desc}</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                  <p><strong className="text-white">{t.exp3Title}</strong> {t.exp3Desc}</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                  <p><strong className="text-white">{t.exp4Title}</strong> {t.exp4Desc}</p>
                </li>
              </ul>
            </div>
          </GlassCard>
        </Section>

        {/* Projects Section */}
        <Section title={t.projTitle} icon={Code2}>
          <div className="space-y-6">
            <GlassCard>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">ERP System</h3>
                <span className="text-slate-400 font-medium mt-2 md:mt-0">2022 - {t.current}</span>
              </div>
              <p className="text-lg text-indigo-300 font-medium mb-4">Fullstack Developer <span className="text-slate-500 mx-2">|</span> {t.teamSizeLabel} 20</p>

              <div className="mb-4">
                <strong className="text-white block mb-2">{t.respLabel}</strong>
                <ul className="list-disc list-inside text-slate-300 space-y-1 ml-2">
                  {t.erpResp.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-white block mb-3">{t.techLabel}</strong>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge name="C#" icon={TbBrandCSharp} colorClass="text-purple-500" />
                  <SkillBadge name=".NET Core" icon={SiDotnet} colorClass="text-purple-600" />
                  <SkillBadge name="SignalR" icon={Wifi} colorClass="text-blue-400" />
                  <SkillBadge name="LINQ" icon={Code2} colorClass="text-slate-400" />
                  <SkillBadge name="EF Core" icon={Layers} colorClass="text-slate-400" />
                  <SkillBadge name="PostgreSQL" icon={SiPostgresql} colorClass="text-blue-400" />
                  <SkillBadge name="MongoDB" icon={SiMongodb} colorClass="text-green-500" />
                  <SkillBadge name="Angular" icon={SiAngular} colorClass="text-red-500" />
                  <SkillBadge name="Microservice" icon={Network} colorClass="text-indigo-400" />
                  <SkillBadge name="Redis Cache" icon={SiRedis} colorClass="text-red-600" />
                  <SkillBadge name="ElasticSearch" icon={SiElasticsearch} colorClass="text-yellow-500" />
                  <SkillBadge name="Docker" icon={SiDocker} colorClass="text-blue-500" />
                  <SkillBadge name="Kubernetes (K8s)" icon={SiKubernetes} colorClass="text-blue-600" />
                  <SkillBadge name="Jenkins" icon={SiJenkins} colorClass="text-red-500" />
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">Document Management System</h3>
                <span className="text-slate-400 font-medium mt-2 md:mt-0">2020 - 2022</span>
              </div>
              <p className="text-lg text-indigo-300 font-medium mb-4">Fullstack Developer <span className="text-slate-500 mx-2">|</span> {t.teamSizeLabel} 5</p>

              <div className="mb-4">
                <strong className="text-white block mb-2">{t.respLabel}</strong>
                <ul className="list-disc list-inside text-slate-300 space-y-1 ml-2">
                  {t.dmsResp.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-white block mb-3">{t.techLabel}</strong>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge name="C#" icon={TbBrandCSharp} colorClass="text-purple-500" />
                  <SkillBadge name=".NET Core" icon={SiDotnet} colorClass="text-purple-600" />
                  <SkillBadge name="ADO.NET" icon={Database} colorClass="text-slate-400" />
                  <SkillBadge name="SQL Server" icon={DiMsqlServer} colorClass="text-red-500" />
                  <SkillBadge name="AngularJS" icon={SiAngular} colorClass="text-red-500" />
                  <SkillBadge name="ElasticSearch" icon={SiElasticsearch} colorClass="text-yellow-500" />
                </div>
              </div>
            </GlassCard>
          </div>
        </Section>

        {/* Education & Interests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Section title={t.eduTitle} icon={GraduationCap}>
            <GlassCard className="h-full flex flex-col justify-center">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl shrink-0">
                  <Building2 className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{t.uniName}</h3>
                  <p className="text-indigo-300 font-medium mb-3">2015 - 2020</p>
                  <p className="text-slate-300 mb-1"><strong className="text-white">{t.majorLabel}</strong> {t.majorName}</p>
                  <p className="text-slate-300"><strong className="text-white">{t.degreeLabel}</strong> {t.degreeName}</p>
                </div>
              </div>
            </GlassCard>
          </Section>

          <Section title={t.intTitle} icon={User}>
            <GlassCard className="h-full">
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 bg-blue-500/20 rounded-lg"><Code2 className="w-5 h-5 text-blue-400" /></div>
                  {t.int1}
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 bg-purple-500/20 rounded-lg"><Music className="w-5 h-5 text-purple-400" /></div>
                  {t.int2}
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 bg-green-500/20 rounded-lg"><Gamepad2 className="w-5 h-5 text-green-400" /></div>
                  {t.int3}
                </li>
              </ul>
            </GlassCard>
          </Section>
        </div>

        <footer className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {t.name}. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
