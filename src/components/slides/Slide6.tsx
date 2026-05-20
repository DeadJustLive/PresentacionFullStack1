import { motion } from 'framer-motion';
import { ArrowRight, Zap, Radio, Shield, BarChart3 } from 'lucide-react';

export default function Slide6() {
  const feignCalls = [
    { from: '9 MS', to: 'ms-auth', desc: 'Validar permisos (validar-acceso)', type: 'sync', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    { from: 'ms-pedidos', to: 'ms-menu', desc: 'Consultar precio de items', type: 'sync', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { from: 'ms-reportes', to: 'ms-pagos / ms-pedidos', desc: 'Consultar datos para reportes', type: 'sync', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  ];

  const kafkaTopics = [
    { topic: 'topico-usuarios', from: 'ms-auth', to: 'ms-carrito', color: 'text-violet-400' },
    { topic: 'sucursal-events', from: 'ms-sucursales', to: 'ms-menu, ms-pedidos', color: 'text-emerald-400' },
    { topic: 'menu-item-events', from: 'ms-menu', to: 'ms-pedidos, ms-carrito', color: 'text-amber-400' },
    { topic: 'pedido-events', from: 'ms-pedidos', to: '4 consumidores', color: 'text-cyan-400' },
    { topic: 'pago-events', from: 'ms-pagos', to: 'ms-reportes', color: 'text-blue-400' },
    { topic: 'delivery-events', from: 'ms-delivery', to: 'ms-notificaciones', color: 'text-orange-400' },
    { topic: 'stock-events', from: 'ms-inventario', to: '(futuros consumidores)', color: 'text-teal-400' },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950/10 to-slate-950 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3 sm:mb-4 flex-shrink-0 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-cyan-500" />
          <span className="text-cyan-400 uppercase tracking-wider text-[10px] sm:text-xs lg:text-sm font-medium">Comunicacion</span>
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-cyan-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">Feign vs Kafka</h2>
        <p className="text-xs sm:text-sm lg:text-base text-slate-400 max-w-3xl">
          Comunicacion hibrida: sincrona cuando se necesita respuesta inmediata, asincrona cuando se busca desacoplamiento.
        </p>
      </motion.div>

      <div className="flex-1 min-h-0 flex items-center justify-center w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
          {/* Feign */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-blue-400">Feign (Sincrono)</h3>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
              {feignCalls.map((call, i) => (
                <div key={i} className={`slide-card ${call.bg} border ${call.border} flex items-start gap-2 sm:gap-3 text-left`}>
                  <div className={`${call.bg} border ${call.border} rounded-lg p-1.5 sm:p-2 flex items-center justify-center flex-shrink-0`}>
                    <Shield className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${call.color}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] sm:text-xs lg:text-sm font-bold ${call.color}`}>{call.from}</span>
                      <ArrowRight className="w-3 h-3 text-slate-500 flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-slate-300">{call.to}</span>
                    </div>
                    <p className="text-[9px] sm:text-[10px] lg:text-xs text-slate-400 mt-0.5">{call.desc}</p>
                  </div>
                </div>
              ))}
              <div className="bg-blue-950/20 border border-blue-500/10 rounded-lg p-2 sm:p-3 text-left">
                <p className="text-[10px] sm:text-xs text-blue-300/80">
                  <span className="font-semibold">Por que sincrono?</span> La autorizacion y consulta de precios requieren respuesta inmediata. No se puede operar sin confirmacion.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Kafka */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-emerald-400">Kafka (Asincrono)</h3>
            </div>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              {kafkaTopics.map((topic, i) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="bg-white/5 border border-white/10 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center gap-2 text-left hover:bg-white/10 transition-colors"
                >
                  <BarChart3 className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${topic.color} flex-shrink-0`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className={`text-[9px] sm:text-[10px] lg:text-xs font-mono font-bold ${topic.color}`}>{topic.topic}</span>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="text-[8px] sm:text-[9px] text-slate-500">{topic.from}</span>
                      <ArrowRight className="w-2.5 h-2.5 text-slate-600 flex-shrink-0" />
                      <span className="text-[8px] sm:text-[9px] text-slate-400">{topic.to}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-lg p-2 sm:p-3 text-left">
                <p className="text-[10px] sm:text-xs text-emerald-300/80">
                  <span className="font-semibold">Por que asincrono?</span> Los pedidos notifican a 5+ servicios. Si uno falla, el pedido ya fue creado. CQRS replica datos localmente.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}