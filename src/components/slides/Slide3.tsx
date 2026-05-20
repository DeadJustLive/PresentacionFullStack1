import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShoppingCart, Box, Utensils, CreditCard, Bell, Truck, BarChart3, MapPin, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Slide3() {
  const [step, setStep] = useState(0); // 0 = Core, 1 = Periféricos

  // Listen for slideCommand events from App
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (e.detail === 'next') {
        if (step === 0) {
          e.preventDefault(); // Prevent parent slide change
          setStep(1);
        }
        // If step === 1, let the event propagate to App (next slide)
      } else if (e.detail === 'prev') {
        if (step === 1) {
          e.preventDefault(); // Prevent parent slide change
          setStep(0);
        }
        // If step === 0, let the event propagate to App (prev slide)
      }
    };
    window.addEventListener('slideCommand', handler as EventListener);
    return () => window.removeEventListener('slideCommand', handler as EventListener);
  }, [step]);

  const coreServices = [
    { icon: Shield, name: 'ms-auth', desc: 'Autenticacion JWT, autorizacion y gestion de usuarios', tech: 'Spring Security', port: '9001', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    { icon: ShoppingBag, name: 'ms-pedidos', desc: 'Ciclo de vida de pedidos: creacion, estados, cancelacion', tech: 'OpenFeign + Kafka', port: '9007', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { icon: Box, name: 'ms-inventario', desc: 'Insumos, movimientos de stock y Kardex con validacion', tech: 'JPA + Validacion', port: '9010', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
    { icon: Utensils, name: 'ms-menu', desc: 'Catalogo de productos y categorias con soft delete', tech: 'PostgreSQL', port: '9004', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  ];

  const peripheralServices = [
    { icon: MapPin, name: 'ms-sucursales', desc: 'CRUD de sucursales', tech: 'Kafka Producer', port: '9003', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { icon: ShoppingCart, name: 'ms-carrito', desc: 'Carrito de compras del cliente', tech: 'Kafka Consumer', port: '9006', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    { icon: CreditCard, name: 'ms-pagos', desc: 'Procesamiento de pagos', tech: 'Feign + Kafka', port: '9008', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { icon: Truck, name: 'ms-delivery', desc: 'Entregas y repartidores', tech: 'Kafka Consumer', port: '9009', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { icon: Bell, name: 'ms-notificaciones', desc: 'Email, SMS, Push', tech: 'Kafka Consumer', port: '9011', color: 'text-slate-300', bg: 'bg-slate-500/10', border: 'border-slate-500/20' },
    { icon: BarChart3, name: 'ms-reportes', desc: 'Reportes consolidados', tech: 'Feign + Kafka', port: '9012', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  ];

  const stepLabels = ['Servicios Core', 'Servicios Perifericos'];
  const stepColors = ['text-cyan-400', 'text-slate-400'];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3 sm:mb-4 flex-shrink-0 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-blue-500" />
          <span className="text-blue-400 uppercase tracking-wider text-[10px] sm:text-xs lg:text-sm font-medium">Microservicios</span>
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-blue-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
          Responsabilidad por Dominio
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-slate-400 max-w-3xl">
          Cada microservicio tiene un limite de dominio (Bounded Context) bien definido.
        </p>
      </motion.div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        {stepLabels.map((label, i) => (
          <button
            key={label}
            onClick={() => setStep(i)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all ${
              step === i
                ? i === 0
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                  : 'bg-slate-500/20 border-slate-500/50 text-slate-300'
                : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20'
            }`}
          >
            <div className={`w-2 h-2 rounded-full transition-colors ${
              step === i ? (i === 0 ? 'bg-cyan-400' : 'bg-slate-300') : 'bg-slate-600'
            }`} />
            <span className="text-[10px] sm:text-xs lg:text-sm font-medium">{label}</span>
          </button>
        ))}

        {/* Navigation hints */}
        <div className="hidden sm:flex items-center gap-1 text-slate-500 text-[10px]">
          {step === 0 ? (
            <>
              <ChevronRight className="w-3 h-3" />
              <span>Siguiente</span>
            </>
          ) : (
            <>
              <ChevronLeft className="w-3 h-3" />
              <span>Anterior</span>
            </>
          )}
        </div>
      </div>

      {/* Content area with AnimatePresence */}
      <div className="flex-1 min-h-0 flex items-center justify-center w-full max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="core"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                {coreServices.map(({ icon: Icon, name, desc, tech, port, color, bg, border }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={`${bg} border ${border} hover:bg-white/5 transition-colors flex items-start gap-3 sm:gap-4 text-left rounded-xl p-4 sm:p-5 lg:p-6`}
                  >
                    <div className={`${bg} border ${border} rounded-xl p-2.5 sm:p-3 flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                        <span className={`text-sm sm:text-base lg:text-xl font-bold ${color}`}>{name}</span>
                        <span className="text-[10px] sm:text-xs text-slate-500 font-mono">:{port}</span>
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-400 leading-relaxed mb-2 sm:mb-3">{desc}</p>
                      <span className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs lg:text-sm font-medium ${bg} ${border} border rounded-full ${color}`}>
                        {tech}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="peripheral"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                {peripheralServices.map(({ icon: Icon, name, desc, tech, port, color, bg, border }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className={`${bg} border ${border} hover:bg-white/5 transition-colors text-left rounded-xl p-3 sm:p-4 lg:p-5`}
                  >
                    <div className={`${bg} border ${border} rounded-lg p-2 sm:p-2.5 flex items-center justify-center flex-shrink-0 w-fit mb-2 sm:mb-3`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`text-xs sm:text-sm lg:text-base font-bold ${color}`}>{name}</span>
                        <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono">:{port}</span>
                      </div>
                      <p className="text-[10px] sm:text-xs lg:text-sm text-slate-400 leading-snug mb-1.5 sm:mb-2">{desc}</p>
                      <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] lg:text-xs font-medium ${bg} ${border} border rounded-full ${color}`}>
                        {tech}
                      </span>
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