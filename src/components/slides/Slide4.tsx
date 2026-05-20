import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderTree, Server as ServerIcon, Layers, Database, Code2, AlertCircle, Wifi, ArrowDown } from 'lucide-react';

export default function Slide4() {
  const [step, setStep] = useState(0);
  const stepLabels = ['Estructura de Carpetas', 'Flujo de Ejecución'];

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

  const folders = [
    { name: 'controller/', icon: ServerIcon, desc: 'Capa REST. Expone endpoints y valida inputs. Sin logica de negocio.', color: 'text-cyan-400' },
    { name: 'service/impl/', icon: Layers, desc: 'El cerebro. Logica de negocio, orquestacion, validaciones.', color: 'text-violet-400' },
    { name: 'repository/', icon: Database, desc: 'Acceso a datos. Extiende JpaRepository con queries derivadas.', color: 'text-emerald-400' },
    { name: 'entity/', icon: Database, desc: 'Modelo JPA. Representa las tablas de PostgreSQL.', color: 'text-slate-400' },
    { name: 'dto/', icon: Code2, desc: 'Request/Response/Event DTOs. Separacion entre API y persistencia.', color: 'text-amber-400' },
    { name: 'mapper/', icon: Code2, desc: 'MapStruct. Conversion automatica Entity <-> DTO.', color: 'text-pink-400' },
    { name: 'exception/', icon: AlertCircle, desc: 'Excepciones custom + GlobalExceptionHandler (@RestControllerAdvice).', color: 'text-rose-400' },
    { name: 'client/', icon: Wifi, desc: 'Feign clients para comunicacion sincrona con otros MS.', color: 'text-blue-400' },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3 sm:mb-4 lg:mb-6 flex-shrink-0 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-blue-500" />
          <span className="text-blue-400 uppercase tracking-wider text-[10px] sm:text-xs lg:text-sm font-medium">Patron CSR</span>
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-blue-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">Estructura Interna Com&uacute;n</h2>
        <p className="text-xs sm:text-sm lg:text-base text-slate-400 max-w-3xl">
          Patron Controller → Service → Repository. Se repite en todos los microservicios.
        </p>
      </motion.div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-3">
        {stepLabels.map((label, i) => (
          <button
            key={label}
            onClick={() => setStep(i)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all ${
              step === i
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20'
            }`}
          >
            <div className={`w-2 h-2 rounded-full transition-colors ${
              step === i ? 'bg-blue-400' : 'bg-slate-600'
            }`} />
            <span className="text-[10px] sm:text-xs lg:text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center w-full max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl bg-[#1e1e1e] rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <FolderTree className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                <span className="text-xs sm:text-sm text-slate-300 font-mono">cl/triskeledu/dominio/</span>
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2 text-left">
                {folders.map((f, i) => (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="flex items-center gap-2 sm:gap-3"
                  >
                    <span className="text-slate-600 font-mono text-xs sm:text-sm">├─</span>
                    <f.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${f.color}`} />
                    <span className="text-white font-mono text-xs sm:text-sm font-medium w-24 sm:w-32">{f.name}</span>
                    <span className="text-[10px] sm:text-xs text-slate-400 truncate">{f.desc}</span>
                  </motion.div>
                ))}
              </div>

              {/* Additional folders */}
              <div className="mt-3 sm:mt-4 flex flex-col gap-1.5 sm:gap-2 text-left">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-slate-600 font-mono text-xs sm:text-sm">├─</span>
                  <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
                  <span className="text-white font-mono text-xs sm:text-sm font-medium w-24 sm:w-32">listener/</span>
                  <span className="text-[10px] sm:text-xs text-slate-500">Kafka consumers</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-slate-600 font-mono text-xs sm:text-sm">├─</span>
                  <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
                  <span className="text-white font-mono text-xs sm:text-sm font-medium w-24 sm:w-32">proyecciones/</span>
                  <span className="text-[10px] sm:text-xs text-slate-500">CQRS replicas</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-slate-600 font-mono text-xs sm:text-sm">└─</span>
                  <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
                  <span className="text-white font-mono text-xs sm:text-sm font-medium w-24 sm:w-32">config/</span>
                  <span className="text-[10px] sm:text-xs text-slate-500">CORS, etc.</span>
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
              className="flex flex-col gap-3 sm:gap-4 w-full max-w-3xl"
            >
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white text-left mb-1">Flujo CSR</h3>
              
              {[
                { step: '1', label: 'Controller', desc: 'Recibe HTTP, valida @Valid, delega al Service', color: 'bg-cyan-500', border: 'border-cyan-500/30' },
                { step: '2', label: 'Service (Impl)', desc: 'Logica de negocio: validaciones, Feign calls, Kafka events', color: 'bg-violet-500', border: 'border-violet-500/30' },
                { step: '3', label: 'Repository', desc: 'JpaRepository: CRUD auto + queries derivadas/@Query', color: 'bg-emerald-500', border: 'border-emerald-500/30' },
                { step: '4', label: 'Entity ↔ Mapper', desc: 'MapStruct convierte Entity → ResponseDTO, RequestDTO → Entity', color: 'bg-amber-500', border: 'border-amber-500/30' },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`slide-card bg-white/5 border ${item.border} flex items-start gap-2 sm:gap-3 text-left p-4`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0 text-white font-bold text-base`}>
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1">{item.label}</h4>
                    <p className="text-xs sm:text-sm lg:text-base text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}