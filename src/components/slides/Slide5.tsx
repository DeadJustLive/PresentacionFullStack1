import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Link2, Key, Copy } from 'lucide-react';

export default function Slide5() {
  const [step, setStep] = useState(0);
  const stepLabels = ['10 Bases de Datos', 'Principios y Relaciones'];

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

  const databases = [
    { name: 'auth', tables: 'user_credentials, usuarios', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    { name: 'sucursales', tables: 'sucursales', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { name: 'menu', tables: 'categorias, menu_items', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { name: 'carrito', tables: 'carritos, carrito_items', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    { name: 'pedidos', tables: 'pedidos, pedido_items', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { name: 'pagos', tables: 'pagos', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { name: 'delivery', tables: 'deliveries', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { name: 'inventario', tables: 'insumos, movimientos', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
    { name: 'notificaciones', tables: 'notificaciones', color: 'text-slate-300', bg: 'bg-slate-500/10', border: 'border-slate-500/20' },
    { name: 'reportes', tables: 'reporte_snapshots', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  ];

  const principles = [
    { icon: Database, title: 'Database per Service', desc: 'Cada MS posee su propia BD PostgreSQL aislada. Cero dependencias de FK entre dominios.', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { icon: Key, title: 'FKs Logicas', desc: 'usuarioId, sucursalId, pedidoId se almacenan como Long sin relacion JPA. La integridad se gestiona via API.', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { icon: Copy, title: 'Soft Delete', desc: 'Flags "eliminado" y "activa" en vez de DELETE fisico. Los datos se marcan como inactivos pero nunca se borran.', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { icon: Link2, title: 'Relaciones Internas', desc: 'Solo dentro del mismo MS se usan @OneToMany/@ManyToOne reales (ej: Pedido → PedidoItem).', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3 sm:mb-4 flex-shrink-0 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-emerald-500" />
          <span className="text-emerald-400 uppercase tracking-wider text-[10px] sm:text-xs lg:text-sm font-medium">Modelo de Datos</span>
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-emerald-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">10 Bases de Datos Independientes</h2>
        <p className="text-xs sm:text-sm lg:text-base text-slate-400 max-w-3xl">
          Patron Database-per-Service. Cada microservicio gestiona su propio esquema aislado en PostgreSQL.
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
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20'
            }`}
          >
            <div className={`w-2 h-2 rounded-full transition-colors ${
              step === i ? 'bg-emerald-400' : 'bg-slate-600'
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {databases.map((db, i) => (
                  <motion.div
                    key={db.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                    className={`slide-card ${db.bg} border ${db.border} hover:bg-white/5 transition-all text-left p-3 sm:p-4`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                      <Database className={`w-4 h-4 sm:w-5 sm:h-5 ${db.color}`} />
                      <span className={`text-xs sm:text-sm lg:text-base font-bold ${db.color}`}>{db.name}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-slate-400 font-mono leading-relaxed">{db.tables}</p>
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
              className="w-full max-w-4xl"
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                {principles.map(({ icon: Icon, title, desc, color, bg, border }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                    className={`slide-card ${bg} border ${border} flex items-start gap-3 sm:gap-4 text-left p-4 sm:p-5`}
                  >
                    <div className={`${bg} border ${border} rounded-xl p-3 flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1.5">{title}</h4>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-400 leading-relaxed">{desc}</p>
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