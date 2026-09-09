import { useState, useEffect, useRef } from "react";
import { GitCommit, GitBranch, Package, Rocket, Tag, FolderGit2, MapPin } from "lucide-react";

// Hook personalizado para detectar quando o elemento está visível no centro da tela
function useOnScreen(ref, rootMargin = "-40% 0px -40% 0px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}

// Componente para cada item da linha do tempo
function TimelineItem({ item, index, isLast }) {
  const ref = useRef();
  const isFocused = useOnScreen(ref);

  // Mapeamento de ícones baseados na tag/comando
  const getIcon = (tag) => {
    switch (tag) {
      case "git init": return <FolderGit2 className="w-full h-full text-purple-300" />;
      case "npm install": return <Package className="w-full h-full text-pink-300" />;
      case "git commit": return <GitCommit className="w-full h-full text-white" />;
      case "git branch --track": return <GitBranch className="w-full h-full text-purple-300" />;
      case "git merge": return <GitBranch className="w-full h-full text-pink-300 rotate-180" />;
      case "deploy": return <Rocket className="w-full h-full text-white" />;
      case "v1.0.0 (Release)": return <Tag className="w-full h-full text-pink-300" />;
      default: return <GitCommit className="w-full h-full text-white" />;
    }
  };

  return (
    <div ref={ref} className="relative flex gap-8 group pb-16 md:pb-24">
      {/* Linha vertical e Conector (GitHub Style) */}
      <div className="relative flex flex-col items-center flex-none w-12 pt-1">
        {/* A linha em si */}
        {!isLast && (
          <div className="absolute top-12 bottom-0 w-0.5 bg-slate-800 rounded-full" />
        )}
        
        {/* Marcador de Commit que aumenta de tamanho e brilha ao focar */}
        <div 
          className={`relative flex items-center justify-center rounded-full border-2 transition-all duration-500 ease-out z-10 
            ${isFocused 
              ? "w-12 h-12 bg-pink-600 border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.7)] scale-110" 
              : "w-9 h-9 bg-slate-900 border-slate-700 hover:border-pink-500/50 group-hover:scale-105"
            }`}
        >
          <div className={`p-1.5 transition-opacity duration-300 ${isFocused ? "opacity-100" : "opacity-70"}`}>
            {getIcon(item.tag)}
          </div>
        </div>
      </div>

      {/* Conteúdo do Commit (Foto + Texto que aparecem ao focar) */}
      <div className={`flex-grow pt-0.5 transition-all duration-700 ease-out 
        ${isFocused ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-[0_4px_30px_rgba(0,0,0,0.3)] group-hover:border-purple-500/30 transition-colors duration-300">
          {/* Seta do card */}
          <div className="absolute top-4 -left-2 w-4 h-4 bg-slate-900 border-l border-b border-slate-800 rotate-45" />

          {/* Cabeçalho do Card (GitHub style) */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-1.5 font-mono text-sm text-purple-300">
                <MapPin size={14} className="text-pink-400"/>
                <span>{item.data}</span>
            </div>
            <div className="text-slate-600">•</div>
            <div className="text-sm text-slate-400 font-mono">
                commit: <span className="text-pink-300/90">{`hs3b${index}f1` /* hash fake */}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Texto do Commit */}
            <div className="flex-grow flex flex-col gap-2.5 order-2 md:order-1">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 shadow-[0_0_8px_rgba(244,114,182,0.3)]">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-200 via-pink-300 to-purple-100 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(216,180,254,0.35)]">
                {item.titulo}
              </h3>

              <div className="my-1.5">
                <code className="text-xs font-mono text-pink-200/90 bg-purple-950/40 border border-purple-500/20 px-3 py-1.5 rounded-md inline-block shadow-inner">
                  {item.comando}
                </code>
              </div>

              <p className="text-sm sm:text-base text-purple-100/80 leading-relaxed font-light">
                {item.descricao}
              </p>
            </div>

            {/* Foto do Commit (Substitua os SRCs pelas suas fotos reais) */}
            <div className="flex-none w-full md:w-48 h-48 order-1 md:order-2">
              <div className="w-full h-full rounded-xl overflow-hidden border-2 border-slate-700/50 shadow-inner group-hover:border-pink-500/30 transition-colors duration-300">
                <img 
                  src={item.foto} 
                  alt={`Momento: ${item.titulo}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback visual caso a imagem não exista
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/300x300/1e1b4b/ec4899?text=Nossa+Foto";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const timelineEvents = [
    {
      ano: "2024",
      data: "Novembro de 2024",
      tag: "git init",
      titulo: "O Repositório Inicial",
      comando: "$ git init --bare ./nossa-historia",
      // Adicione o caminho das suas fotos aqui
      foto: "/MyLoveSibele/pictures/momento-1.jpeg", 
      descricao:
        "O ano era 2024, quando no dia 29 de Novembro nosso querido Brenninho trouxe a ideia de participarmos do BaneseLab e Iasmin sabiamente indicou você para o lugar dela. Mal sabíamos que ali estávamos inicializando a nossa incrivel historia.",
    },
    {
      ano: "2025",
      data: "Fevereiro de 2025",
      tag: "npm install",
      titulo: "Instalando as Dependências",
      comando: "$ npm i @vida/sibele --save-exact",
      foto: "/MyLoveSibele/pictures/momento-2.jpeg",
      descricao:
        "Depois do Projeto do Banese, nós estávamos mais próximos. Esse foi o segundo show a que fomos juntos e, diferente do de Heitor Costa, dessa vez não teve fora e a gente dormiu junto naquela praça.",
    },
    {
      ano: "2025",
      data: "Março de 2025",
      tag: "git commit",
      titulo: "O Primeiro Commit",
      comando: '$ git commit -m "feat: primeiro commit do nosso sentimento"',
      foto: "/MyLoveSibele/pictures/momento-3.jpeg",
      descricao:
        "Aqui não dava mais para negar, eu tava muito afim de você e como disse Iasmin você já tinha deixado na cara eu que era lerdo, e depois que eu voltei de viagem a gente ficou pela primeira vez.",
    },
    {
      ano: "2025",
      data: "Junho de 2025",
      tag: "git branch --track",
      titulo: "Alinhando as Branches",
      comando: "$ git checkout -b conexao/aprofundando",
      foto: "/MyLoveSibele/pictures/momento-4.jpeg",
      descricao:
        "Mais momentos juntos, cada dia que passava eu gostava ainda mais de você, aquele show de Wesley Safadão que fomos com bibia foi a prova disso quase explodi quando soube que tinha pessoas dando em cima de você. Eu tinha sido laçado.",
    },
    {
      ano: "2025",
      data: "Agosto de 2025",
      tag: "git merge",
      titulo: "Merge Sem Conflitos",
      comando: "$ git merge --no-ff feature/cumplicidade",
      foto: "/MyLoveSibele/pictures/momento-5.jpeg",
      descricao:
        "Nós nem namorávamos e, mesmo assim, eu já te consultava para tudo o que ia fazer. Nesse mês, teve o ERBASE e, com ele, o momento em que você diz que decidiu que queria namorar comigo (eu já sabia que te queria bem antes disso)."
,
    },
    {
      ano: "2025",
      data: "Setembro de 2025",
      tag: "deploy",
      titulo: "O Deploy para Produção",
      comando: "$ npm run build && vercel --prod",
      foto: "/MyLoveSibele/pictures/momento-6.jpeg",
      descricao:
        "O deploy oficial, depois de uma conversa muito longa no WhatsApp e com você um pouquinho irritada, fez a gente decidir que estávamos namorando. É claro que ainda não era o pedido; eu não era maluco de deixar a gente sem ter um pedido decente.",
    },
    {
      ano: "2025",
      data: "Novemvro de 2025",
      tag: "git commit",
      titulo: "Commit das Alianças",
      comando: '$ git commit -m "feat: entrega das alianças"',
      foto: "/MyLoveSibele/pictures/momento-7.jpeg",
      descricao:
        "Como eu disse, não ia deixar a gente sem ter um pedido decente. Então, para comemorar dois meses de muito amor, finalmente veio a entrega das alianças, a representação física do nosso amor e da nossa incrível parceria.",
    },
    {
      ano: "2026",
      data: "Setembro de 2026",
      tag: "v1.0.0 (Release)",
      titulo: "Stable Release: Sempre Nós",
      comando: '$ git tag -a v1.0.0 -m "Versão mais estável e perfeita"',
      foto: "/MyLoveSibele/pictures/momento-8.jpeg",
      descricao:
        "Chegamos aqui. Um ano depois do deploy, a versão só melhora, cheia de atualizações diárias de amor e a certeza absoluta de que você é a mulher da minha vida EU TE AMO MEU AMOR, FELIZ 1 ANO.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 overflow-x-hidden pb-20">
      {/* Luzes difusas de fundo constantes (suavizadas) */}
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-950/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-0 w-[450px] h-[450px] bg-pink-950/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header Estilo GitHub Commit History */}
      <header className="relative z-10 max-w-6xl mx-auto pt-16 px-6 mb-16 border-b border-slate-800 pb-10">
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-purple-400">
                <FolderGit2 size={28}/>
            </div>
            <div>
                <div className="flex items-center gap-2 text-sm font-mono text-slate-400">
                    <span>S1L4S5&Sibele</span>
                    <span>/</span>
                    <span className="font-semibold text-slate-200">nossa-historia</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter mt-1 bg-gradient-to-r from-purple-200 via-pink-300 to-purple-100 bg-clip-text text-transparent">
                    Commits em <span className="font-mono text-pink-400">main</span>
                </h1>
            </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4 shadow-inner">
            <GitBranch className="text-purple-400 flex-none" size={20}/>
            <p className="text-purple-100/90 text-base font-light leading-relaxed">
                Olá amor, você entendeu que às vezes o P é de pelada, mas você é <span className="font-semibold text-pink-300">Perfeita</span> mesmo. 
                <span className="hidden sm:inline"> Se liga no <span className="font-semibold text-pink-300"> git log </span> dessa estrada que construímos juntos:</span>
            </p>
        </div>
      </header>

      {/* Container Principal da Linha do Tempo */}
      <main className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="md:pl-10"> {/* Alinhamento para parecer a lista do git */}
          {timelineEvents.map((item, index) => (
            <TimelineItem 
              key={index} 
              item={item} 
              index={index} 
              isLast={index === timelineEvents.length - 1} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}