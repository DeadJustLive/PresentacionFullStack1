import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Code2 } from 'lucide-react';

export default function Slide9() {
  const [step, setStep] = useState(0);
  const stepLabels = ['Tipos de Excepciones', 'Respuesta y Flujo'];

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (e.detail === 'next' && step === 0) {
        e.preventDefault();
        setStep(1);
      } else if (e.detail === 'prev' && step === 1) {
        e.preventDefault();
        setStep(0);
      }
    };
    window.addEventListener('slideCommand', handler as EventListener);
    return () => window.removeEventListener('slideCommand', handler as EventListener);
  }, [step]);

  const errorExamples = [
    { status: '401', name: 'CredencialesInvalidasException', from: 'ms-auth', desc: 'Username o password incorrectos' },
    { status: '403', name: 'AccesoDenegadoException', from: 'Todos los MS', desc: 'Sin permisos para la operacion' },
    { status: '404', name: 'PedidoNotFoundException', from: 'ms-pedidos', desc: 'Pedido no encontrado con ID dado' },
    { status: '409', name: 'ItemDuplicadoException', from: 'ms-menu', desc: 'Item ya existe en la categoria' },
    { status: '409', name: 'StockInsuficienteException', from: 'ms-inventario', desc: 'Stock actual menor a la cantidad solicitada' },
  ];

  const responseFormat = `{
  "timestamp": "2026-05-20T10:30:00",
  "status": 404,
  "error": "Not Found",
  "mensaje": "Pedido no encontrado con ID: 5"
}`;

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3 sm:mb-4 flex-shrink-0 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-rose-500" />
          <span className="text-rose-400 uppercase tracking-wider text-[10px] sm:text-xs lg:text-sm font-medium">Excepciones</span>
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-rose-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">Manejo Centralizado de Errores</h2>
        <p className="text-xs sm:text-sm lg:text-base text-slate-400 max-w-3xl">
          @RestControllerAdvice en todos los MS. Respuestas JSON consistentes con timestamp, status, error y mensaje.
        </p>
      </motion.div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-4">
        {stepLabels.map((label, i) => (
          <button
            key={label}
            onClick={() => setStep(i)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all ${
              step === i
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20'
            }`}
          >
            <div className={`w-2 h-2 rounded-full transition-colors ${
              step === i ? 'bg-rose-400' : 'bg-slate-600'
            }`} />
            <span className="text-[10px] sm:text-xs lg:text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center w-full max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-rose-400 mb-4 flex items-center justify-center gap-2 text-center">
                <AlertTriangle className="w-5 h-5" />
                Excepciones Custom por Microservicio
              </h3>
              <div className="flex flex-col gap-3 sm:gap-4">
                {errorExamples.map((err, i) => (
                  <motion.div
                    key={err.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-4 sm:gap-6 text-left hover:bg-white/10 transition-colors"
                  >
                    <span className={`text-xs sm:text-sm lg:text-base font-bold font-mono px-2 sm:px-3 py-1 rounded w-14 sm:w-16 text-center shrink-0 ${
                      err.status === '401' ? 'bg-yellow-500/20 text-yellow-400' :
                      err.status === '403' ? 'bg-orange-500/20 text-orange-400' :
                      err.status === '404' ? 'bg-rose-500/20 text-rose-400' :
                      err.status === '409' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>{err.status}</span>
                    <div className="min-w-0">
                      <div className="text-sm sm:text-base lg:text-lg font-mono font-bold text-slate-200 leading-tight mb-1">{err.name}</div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-400">{err.desc} — <span className="text-slate-500 font-medium">{err.from}</span></p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10"
            >
              {/* Response format */}
              <div className="flex-1">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-400 mb-3 flex items-center justify-center lg:justify-start gap-2 text-center lg:text-left">
                  <CheckCircle className="w-5 h-5" />
                  Formato de Respuesta Uniforme
                </h3>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10"
                >
                  <div className="bg-[#2d2d2d] px-4 sm:px-5 py-2.5 flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-400 font-mono ml-3">ErrorResponse.json</span>
                  </div>
                  <div className="p-4 sm:p-6 text-left overflow-x-auto code-scroll">
                    <pre className="text-xs sm:text-sm lg:text-base text-slate-300 font-mono leading-relaxed whitespace-pre">{responseFormat}</pre>
                  </div>
                </motion.div>
              </div>

              {/* Flow */}
              <div className="flex-1">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-blue-400 mb-3 flex items-center justify-center lg:justify-start gap-2 text-center lg:text-left">
                  <Code2 className="w-5 h-5" />
                  Flujo de Excepciones
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 text-left h-[calc(100%-2.5rem)] flex flex-col justify-center">
                  <div className="flex flex-col gap-4 sm:gap-6 text-xs sm:text-sm lg:text-base">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm sm:text-base">1</span>
                      <span className="text-slate-300">El <strong className="text-white">Service</strong> lanza una excepcion custom</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm sm:text-base">2</span>
                      <span className="text-slate-300">Spring propaga la excepcion al Controller</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm sm:text-base">3</span>
                      <span className="text-slate-300"><strong className="text-emerald-400">GlobalExceptionHandler</strong> la intercepta por tipo</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm sm:text-base">4</span>
                      <span className="text-slate-300">Devuelve un <code className="text-blue-300">ResponseEntity</code> con JSON estandarizado</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}