import { motion } from 'framer-motion';
import { Database, ArrowRight, RefreshCw, Copy } from 'lucide-react';

export default function Slide7() {
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

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center w-full max-w-5xl mx-auto gap-4 sm:gap-6">
        {/* CQRS Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-8 flex-wrap">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center min-w-[80px] sm:min-w-[100px]">
              <Database className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mx-auto mb-1" />
              <div className="text-[9px] sm:text-xs lg:text-sm font-bold text-blue-400">ms-pedidos</div>
              <div className="text-[8px] sm:text-[10px] text-slate-500">BD propia</div>
            </div>

            <div className="flex flex-col items-center">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 hidden sm:block" />
              <ArrowRight className="w-3 h-3 text-emerald-400 sm:hidden" />
              <span className="text-[8px] sm:text-[10px] text-emerald-400 font-semibold mt-0.5">Kafka</span>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center min-w-[80px] sm:min-w-[100px]">
              <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 mx-auto mb-1" />
              <div className="text-[9px] sm:text-xs lg:text-sm font-bold text-emerald-400">pedido-events</div>
              <div className="text-[8px] sm:text-[10px] text-slate-500">Topic</div>
            </div>

            <div className="flex flex-col items-center">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 hidden sm:block" />
              <ArrowRight className="w-3 h-3 text-cyan-400 sm:hidden" />
              <span className="text-[8px] sm:text-[10px] text-cyan-400 font-semibold mt-0.5">Consume</span>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center min-w-[80px] sm:min-w-[100px]">
              <Copy className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mx-auto mb-1" />
              <div className="text-[9px] sm:text-xs lg:text-sm font-bold text-cyan-400">ms-pagos</div>
              <div className="text-[8px] sm:text-[10px] text-slate-500">Proyeccion local</div>
            </div>
          </div>
        </motion.div>

        {/* Projection tables */}
        <div className="w-full">
          <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3 text-left">Tablas de Proyeccion CQRS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {projections.map((proj, i) => (
              <motion.div
                key={proj.table}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                className={`slide-card ${proj.bg} border ${proj.border} text-left`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                  <span className={`text-[10px] sm:text-xs lg:text-sm font-bold font-mono ${proj.color}`}>{proj.table}</span>
                </div>
                <div className="text-[9px] sm:text-[10px] lg:text-xs text-slate-400 space-y-0.5">
                  <p><span className="text-slate-500">Ubicada en:</span> <span className="text-slate-300">{proj.in}</span></p>
                  <p><span className="text-slate-500">Alimentada por:</span> <span className={`${proj.color} font-medium`}>{proj.fed}</span></p>
                  <p><span className="text-slate-500">Contiene:</span> <span className="text-slate-300 font-mono">{proj.fields}</span></p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}