import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, ArrowRight, RefreshCw, Copy } from 'lucide-react';

export default function Slide7() {
  const [step, setStep] = useState(0);
  const stepLabels = ['Flujo CQRS', 'Tablas de Proyeccion'];

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

  const projections = [
    { table: 'proyeccion_sucursales', in: 'ms-menu, ms-pedidos', fed: 'sucursal-events', fields: 'id, nombre, direccion, activa', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { table: 'proyeccion_menu_items', in: 'ms-pedidos, ms-carrito', fed: 'menu-item-events', fields: 'id, nombre, precio, disponible', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { table: 'clientes_proyeccion', in: 'ms-carrito', fed: 'topico-usuarios', fields: 'id, nombre, direccion, telefono', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    { table: 'proyeccion_pedidos', in: 'ms-pagos, ms-delivery', fed: 'pedido-events', fields: 'id_pedido, id_cliente, estado, total', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-violet-950/10 to-slate-950 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3 sm:mb-4 flex-shrink-0 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-violet-500" />
          <span className="text-violet-400 uppercase tracking-wider text-[10px] sm:text-xs lg:text-sm font-medium">Patron CQRS</span>
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-violet-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
          Proyecciones y <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">CQRS</span>
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-slate-400 max-w-3xl">
          Los datos de otros microservicios se replican localmente via Kafka, evitando llamadas sincronas en lectura.
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
                ? 'bg-violet-500/20 border-violet-500/50 text-violet-400'
                : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20'
            }`}
          >
            <div className={`w-2 h-2 rounded-full transition-colors ${
              step === i ? 'bg-violet-400' : 'bg-slate-600'
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl"
            >
              <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-10 w-full">
                <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-10 flex-wrap">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 lg:p-6 text-center min-w-[120px]">
                    <Database className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mx-auto mb-2" />
                    <div className="text-xs sm:text-sm lg:text-base font-bold text-blue-400">ms-pedidos</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 mt-1">BD propia</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 hidden sm:block" />
                    <ArrowRight className="w-5 h-5 text-emerald-400 sm:hidden" />
                    <span className="text-[10px] sm:text-xs text-emerald-400 font-semibold mt-1">Kafka</span>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 lg:p-6 text-center min-w-[120px]">
                    <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 mx-auto mb-2" />
                    <div className="text-xs sm:text-sm lg:text-base font-bold text-emerald-400">pedido-events</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 mt-1">Topic</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 hidden sm:block" />
                    <ArrowRight className="w-5 h-5 text-cyan-400 sm:hidden" />
                    <span className="text-[10px] sm:text-xs text-cyan-400 font-semibold mt-1">Consume</span>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 lg:p-6 text-center min-w-[120px]">
                    <Copy className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 mx-auto mb-2" />
                    <div className="text-xs sm:text-sm lg:text-base font-bold text-cyan-400">ms-pagos</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 mt-1">Proyeccion local</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                {projections.map((proj, i) => (
                  <motion.div
                    key={proj.table}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                    className={`slide-card ${proj.bg} border ${proj.border} text-left p-4 sm:p-5 lg:p-6`}
                  >
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <span className={`text-sm sm:text-base lg:text-lg font-bold font-mono ${proj.color}`}>{proj.table}</span>
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-slate-400 space-y-1.5">
                      <p><span className="text-slate-500 w-28 inline-block">Ubicada en:</span> <span className="text-slate-300 font-medium">{proj.in}</span></p>
                      <p><span className="text-slate-500 w-28 inline-block">Alimentada por:</span> <span className={`${proj.color} font-medium`}>{proj.fed}</span></p>
                      <p><span className="text-slate-500 w-28 inline-block">Contiene:</span> <span className="text-slate-300 font-mono text-[10px] sm:text-xs lg:text-sm">{proj.fields}</span></p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}