import { motion } from 'framer-motion';
import { ShoppingCart, PackageCheck, CreditCard, Send, ArrowRight } from 'lucide-react';

export default function Slide10() {
  const steps = [
    { step: 1, title: 'Validar Carrito', svc: 'ms-carrito', type: 'Sincrono', icon: ShoppingCart, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
    { step: 2, title: 'Consultar Precio', svc: 'ms-menu', type: 'Sincrono', icon: PackageCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { step: 3, title: 'Crear Pedido', svc: 'ms-pedidos', type: 'Persistencia', icon: CreditCard, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    { step: 4, title: 'Emitir Evento', svc: 'Kafka', type: 'pedido-events', icon: Send, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
  ];

  const consumers = [
    { svc: 'ms-pagos', desc: 'Crear registro de pago', color: 'text-blue-400' },
    { svc: 'ms-delivery', desc: 'Inicializar seguimiento', color: 'text-orange-400' },
    { svc: 'ms-notificaciones', desc: 'Notificar al cliente', color: 'text-slate-300' },
    { svc: 'ms-reportes', desc: 'Snapshot para reportes', color: 'text-rose-400' },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-cyan-950/10 to-slate-950 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3 sm:mb-4 flex-shrink-0 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-cyan-500" />
          <span className="text-cyan-400 uppercase tracking-wider text-[10px] sm:text-xs lg:text-sm font-medium">Flujo Funcional</span>
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-cyan-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">Happy Path: Crear Pedido</h2>
        <p className="text-xs sm:text-sm lg:text-base text-slate-400 max-w-3xl">
          El cliente finaliza un pedido. Se combinan llamadas sincronas (Feign) con eventos asincronos (Kafka).
        </p>
      </motion.div>

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center w-full max-w-6xl mx-auto gap-4 sm:gap-6">
        {/* Flow steps */}
        <div className="flex items-stretch justify-center gap-1.5 sm:gap-2 lg:gap-4 w-full">
          {steps.map(({ step, title, svc, type, icon: Icon, color, bg, border }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
              className={`slide-card ${bg} border ${border} flex flex-col items-center justify-between gap-2 sm:gap-3 text-center flex-1`}
            >
              <div className={`${bg} border ${border} rounded-xl p-2 sm:p-3 flex items-center justify-center`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${color}`} />
              </div>
              <div>
                <div className="text-[10px] sm:text-xs lg:text-sm font-bold text-white mb-0.5">{title}</div>
                <div className={`text-[9px] sm:text-[10px] lg:text-xs font-mono ${color}`}>{svc}</div>
              </div>
              <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] lg:text-xs font-medium ${bg} ${border} border rounded-full ${color}`}>
                {type}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-2 text-slate-500"
        >
          <div className="h-px flex-1 bg-slate-700" />
          <ArrowRight className="w-5 h-5" />
          <span className="text-xs sm:text-sm font-semibold text-slate-400">Kafka: pedido-events</span>
          <ArrowRight className="w-5 h-5" />
          <div className="h-px flex-1 bg-slate-700" />
        </motion.div>

        {/* Consumers */}
        <div className="w-full">
          <h3 className="text-xs sm:text-sm font-semibold text-slate-400 mb-2 sm:mb-3">Consumen el evento y reaccionan asincronamente:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {consumers.map((consumer, i) => (
              <motion.div
                key={consumer.svc}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                className="bg-white/5 border border-white/10 rounded-lg p-2 sm:p-3 flex flex-col items-center text-center hover:bg-white/10 transition-colors"
              >
                <span className={`text-[10px] sm:text-xs lg:text-sm font-bold ${consumer.color} font-mono`}>{consumer.svc}</span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5">{consumer.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}