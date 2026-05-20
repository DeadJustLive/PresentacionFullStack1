import { motion } from 'framer-motion';
import { FolderTree, Server as ServerIcon, Layers, Database, Code2, AlertCircle, Wifi, ArrowDown } from 'lucide-react';

export default function Slide4() {
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

      <div className="flex-1 min-h-0 flex items-center justify-center w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
          {/* Visual tree */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1e1e1e] rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10 overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <FolderTree className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
              <span className="text-xs sm:text-sm text-slate-300 font-mono">cl/triskeledu/dominio/</span>
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              {folders.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <span className="text-slate-600 font-mono text-xs sm:text-sm">├─</span>
                  <f.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${f.color}`} />
                  <span className="text-white font-mono text-xs sm:text-sm font-medium">{f.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Additional folders */}
            <div className="mt-3 sm:mt-4 flex flex-col gap-1.5 sm:gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-slate-600 font-mono text-xs sm:text-sm">├─</span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
                <span className="text-white font-mono text-xs sm:text-sm font-medium">listener/</span>
                <span className="text-[9px] sm:text-[10px] text-slate-500">Kafka consumers</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-slate-600 font-mono text-xs sm:text-sm">├─</span>
                <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
                <span className="text-white font-mono text-xs sm:text-sm font-medium">proyecciones/</span>
                <span className="text-[9px] sm:text-[10px] text-slate-500">CQRS replicas</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-slate-600 font-mono text-xs sm:text-sm">└─</span>
                <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
                <span className="text-white font-mono text-xs sm:text-sm font-medium">config/</span>
                <span className="text-[9px] sm:text-[10px] text-slate-500">CORS, etc.</span>
              </div>
            </div>
          </motion.div>

          {/* Flow diagram */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-3 sm:gap-4"
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
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`slide-card bg-white/5 border ${item.border} flex items-start gap-2 sm:gap-3 text-left`}
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0 text-white font-bold text-sm`}>
                  {item.step}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm lg:text-base font-bold text-white">{item.label}</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}