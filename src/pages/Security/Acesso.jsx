import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Acesso() {
  const [resposta, setResposta] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const fotosFundo = [
    "/MyLoveSibele/Foto 1.jpeg",
    "/MyLoveSibele/Foto 2.jpeg",
    "/MyLoveSibele/Foto 3.jpeg",
    "/MyLoveSibele/Foto 4.jpeg",
    "/MyLoveSibele/Foto 5.jpeg",
    "/MyLoveSibele/Foto 6.jpeg",
    "/MyLoveSibele/Foto 7.jpeg",
    "/MyLoveSibele/Foto 8.jpeg",
    "/MyLoveSibele/Foto 9.jpeg",
    "/MyLoveSibele/Foto 10.jpeg",
    "/MyLoveSibele/Foto 11.jpeg",
    "/MyLoveSibele/Foto 12.jpeg",
    "/MyLoveSibele/Foto 13.jpeg",
    "/MyLoveSibele/Foto 14.jpeg",
    "/MyLoveSibele/Foto 1.jpeg",
    "/MyLoveSibele/Foto 2.jpeg",
    "/MyLoveSibele/Foto 3.jpeg",
    "/MyLoveSibele/Foto 4.jpeg",
    "/MyLoveSibele/Foto 5.jpeg",
    "/MyLoveSibele/Foto 6.jpeg",
    "/MyLoveSibele/Foto 7.jpeg",
    "/MyLoveSibele/Foto 8.jpeg",
    "/MyLoveSibele/Foto 9.jpeg",
    "/MyLoveSibele/Foto 10.jpeg",
    "/MyLoveSibele/Foto 11.jpeg",
    "/MyLoveSibele/Foto 12.jpeg",
    "/MyLoveSibele/Foto 1.jpeg",
    "/MyLoveSibele/Foto 2.jpeg",
    "/MyLoveSibele/Foto 3.jpeg",
    "/MyLoveSibele/Foto 4.jpeg",
    "/MyLoveSibele/Foto 5.jpeg",
    "/MyLoveSibele/Foto 6.jpeg",
    "/MyLoveSibele/Foto 7.jpeg",
    "/MyLoveSibele/Foto 8.jpeg",
    "/MyLoveSibele/Foto 13.jpeg",
    "/MyLoveSibele/Foto 14.jpeg",
    
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const respostaEsperada = "Pelada"; 

    if (resposta.trim().toLowerCase() === respostaEsperada.toLowerCase()) {
      sessionStorage.setItem("acesso_liberado", "true");
      navigate("/home");
    } else {
      setText("Você não é sibele");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 px-4">
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 opacity-30">
        {fotosFundo.map((src, index) => (
          <div key={index} className="w-full h-full overflow-hidden">
            <img
              src={src}
              alt={`Fundo ${index + 1}`}
              className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </div>

      {/* Overlay gradiente roxo/rosa para integrar o fundo com o tema */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/80 via-black/60 to-pink-950/80 backdrop-blur-[2px] opacity-45" />

      {/* Card do formulário centralizado */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-purple-950/30 border border-pink-500/30 backdrop-blur-xl shadow-[0_0_50px_rgba(236,72,153,0.15)]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {text && (
            <p className="text-pink-400 bg-pink-500/10 border border-pink-500/20 py-2 px-3 rounded-xl font-medium text-center text-sm animate-shake">
              {text}
            </p>
          )}

          <h3 className="text-pink-100/90 text-center text-sm sm:text-base font-normal leading-relaxed">
            OK, OK enxerido você fica por aqui e para meu amor para avançar você tem que entender que nem todo P é de perfeita.
          </h3>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={resposta}
              onChange={(e) => {
                setResposta(e.target.value);
                if (text) setText("");
              }}
              required
              placeholder="Sua resposta..."
              className="w-full bg-purple-900/20 border border-pink-500/20 p-3.5 rounded-xl text-pink-50 text-sm placeholder:text-pink-300/40 outline-none focus:border-pink-500 focus:bg-purple-900/30 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
            />

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-pink-500/25 active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}