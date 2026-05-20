import { motion } from 'framer-motion';
import { Database, Link2, Key, Copy } from 'lucide-react';

export default function Slide5() {
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

      <div className="flex-1 min-h-0 flex items-center justify-center w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 w-full">
          {/* Database list */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {databases.map((db, i) => (
                <motion.div
                  key={db.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  className={`slide-card ${db.bg} border ${db.border} hover:bg-white/5 transition-all text-left`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                    <Database className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${db.color}`} />
                    <span className={`text-[10px] sm:text-xs lg:text-sm font-bold ${db.color}`}>{db.name}</span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] lg:text-xs text-slate-400 font-mono leading-tight">{db.tables}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Principles */}
          <div className="lg:col-span-2 flex flex-col gap-2 sm:gap-3">
            {principles.map(({ icon: Icon, title, desc, color, bg, border }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
                className={`slide-card ${bg} border ${border} flex items-start gap-2 sm:gap-3 text-left`}
              >
                <div className={`${bg} border ${border} rounded-lg p-2 sm:p-2.5 flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm lg:text-base font-bold text-white mb-0.5">{title}</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}