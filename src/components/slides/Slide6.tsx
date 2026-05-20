import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Radio, Shield, BarChart3 } from 'lucide-react';

export default function Slide6() {
  const [step, setStep] = useState(0);
  const stepLabels = ['Feign (Síncrono)', 'Kafka (Asíncrono)'];

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

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-4">
        {stepLabels.map((label, i) => (
          <button
            key={label}
            onClick={() => setStep(i)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all ${
              step === i
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20'
            }`}
          >
            <div className={`w-2 h-2 rounded-full transition-colors ${
              step === i ? 'bg-cyan-400' : 'bg-slate-600'
            }`} />
            <span className="text-[10px] sm:text-xs lg:text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center w-full max-w-4xl mx-auto">
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
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-blue-400">Feign (Sincrono)</h3>
              </div>
              <div className="flex flex-col gap-3 sm:gap-4">
                {feignCalls.map((call, i) => (
                  <div key={i} className={`slide-card ${call.bg} border ${call.border} flex items-start gap-3 sm:gap-4 text-left p-4 sm:p-5`}>
                    <div className={`${call.bg} border ${call.border} rounded-xl p-2.5 sm:p-3 flex items-center justify-center flex-shrink-0`}>
                      <Shield className={`w-5 h-5 sm:w-6 sm:h-6 ${call.color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-xs sm:text-sm lg:text-base font-bold ${call.color}`}>{call.from}</span>
                        <ArrowRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm lg:text-base font-medium text-slate-300">{call.to}</span>
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-400 mt-1">{call.desc}</p>
                    </div>
                  </div>
                ))}
                <div className="bg-blue-950/20 border border-blue-500/10 rounded-xl p-4 sm:p-5 text-left mt-2">
                  <p className="text-xs sm:text-sm lg:text-base text-blue-300/80 leading-relaxed">
                    <span className="font-semibold block mb-1">¿Por que sincrono?</span>
                    La autorizacion y consulta de precios requieren respuesta inmediata. No se puede operar sin confirmacion.
                  </p>
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
              <div className="flex items-center gap-2 mb-4">
                <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-emerald-400">Kafka (Asincrono)</h3>
              </div>
              <div className="flex flex-col gap-2.5 sm:gap-3">
                {kafkaTopics.map((topic, i) => (
                  <motion.div
                    key={topic.topic}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 text-left hover:bg-white/10 transition-colors"
                  >
                    <BarChart3 className={`w-4 h-4 sm:w-5 sm:h-5 ${topic.color} flex-shrink-0`} />
                    <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs sm:text-sm lg:text-base font-mono font-bold ${topic.color}`}>{topic.topic}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] sm:text-xs lg:text-sm text-slate-500">{topic.from}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                        <span className="text-[10px] sm:text-xs lg:text-sm text-slate-400 font-medium">{topic.to}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-xl p-4 sm:p-5 text-left mt-2">
                  <p className="text-xs sm:text-sm lg:text-base text-emerald-300/80 leading-relaxed">
                    <span className="font-semibold block mb-1">¿Por que asincrono?</span>
                    Los pedidos notifican a multiples servicios en cascada. Si uno falla, el pedido base sigue existiendo intacto. CQRS se beneficia de esto replicando datos.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}