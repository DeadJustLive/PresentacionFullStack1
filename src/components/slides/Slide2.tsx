import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, ArrowRightLeft, Database, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Slide2() {
  const [step, setStep] = useState(0); // 0 = Topología, 1 = Conceptos

  // Listen for slideCommand events from App for sub-step navigation
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (e.detail === 'next') {
        if (step === 0) {
          e.preventDefault();
          setStep(1);
        }
      } else if (e.detail === 'prev') {
        if (step === 1) {
          e.preventDefault();
          setStep(0);
        }
      }
    };
    window.addEventListener('slideCommand', handler as EventListener);
    return () => window.removeEventListener('slideCommand', handler as EventListener);
  }, [step]);

  const services = [
    { name: 'Auth', port: '9001', color: 'text-violet-400', bg: 'bg-violet-500/20', border: 'border-violet-500/40' },
    { name: 'Sucursales', port: '9003', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/40' },
    { name: 'Menu', port: '9004', color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/40' },
    { name: 'Carrito', port: '9006', color: 'text-pink-400', bg: 'bg-pink-500/20', border: 'border-pink-500/40' },
    { name: 'Pedidos', port: '9007', color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-500/40' },
    { name: 'Pagos', port: '9008', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/40' },
    { name: 'Delivery', port: '9009', color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/40' },
    { name: 'Inventario', port: '9010', color: 'text-teal-400', bg: 'bg-teal-500/20', border: 'border-teal-500/40' },
    { name: 'Notif.', port: '9011', color: 'text-slate-400', bg: 'bg-slate-500/20', border: 'border-slate-500/40' },
    { name: 'Reportes', port: '9012', color: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-500/40' },
  ];

  const concepts = [
    {
      icon: Server,
      title: 'Service Discovery',
      desc: 'Eureka como registro central. Cada microservicio se auto-registra al arrancar con instance-id unico. Feign resuelve nombres de servicio a IP:puerto automaticamente. Sin URLs hardcodeadas.',
      detail: 'register-with-eureka: true · fetch-registry: true · lease-renewal-interval: 15s',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
    {
      icon: ArrowRightLeft,
      title: 'Comunicacion Hibrida',
      desc: 'Feign para llamadas sincronas (validar permisos, consultar precios de menu). Kafka para eventos asincronos (pedidos, notificaciones, proyecciones CQRS).',
      detail: 'Feign = @FeignClient + Eureka · Kafka = @KafkaListener + topics · CQRS proyecciones locales',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      icon: Database,
      title: 'Database per Service',
      desc: 'Cada microservicio posee su propia base de datos PostgreSQL (10 BDs en total). Las claves foraneas entre dominios son logicas (Long), nunca relaciones JPA cross-service.',
      detail: 'HikariCP max-pool: 3 · ddl-auto: update · puerto PostgreSQL: 5433',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
  ];

  const stepLabels = ['Topologia', 'Conceptos Clave'];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950/10 to-slate-950 flex flex-col items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 py-2 sm:py-3">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-shrink-0 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-blue-500" />
          <span className="text-blue-400 uppercase tracking-wider text-[10px] sm:text-xs lg:text-sm font-medium">Arquitectura</span>
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-blue-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1">Arquitectura General</h2>
        <p className="text-xs sm:text-sm lg:text-base text-slate-400 max-w-3xl">
          11 microservicios coordinados mediante Eureka para service discovery.
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
                ? i === 0
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                  : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20'
            }`}
          >
            <div className={`w-2 h-2 rounded-full transition-colors ${
              step === i ? (i === 0 ? 'bg-blue-400' : 'bg-emerald-400') : 'bg-slate-600'
            }`} />
            <span className="text-[10px] sm:text-xs lg:text-sm font-medium">{label}</span>
          </button>
        ))}

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

      {/* Content */}
      <div className="flex-1 min-h-0 flex items-center justify-center w-full max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            /* ── STEP 0: Topology diagram ── */
            <motion.div
              key="topology"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full flex items-center justify-center"
            >
              <div className="relative w-full max-w-xl lg:max-w-2xl mx-auto" style={{ aspectRatio: '1/1' }}>
                {/* Outer orbital ring — matches satellite orbit at radius 40% (80% diameter) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border border-dashed border-cyan-500/15" />
                {/* Inner orbital ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full border border-cyan-500/10" />
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/40" />

                {/* Central Eureka node */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-cyan-500/10 border-2 border-cyan-500/50 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.2)]"
                >
                  <Server className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-cyan-400" />
                  <span className="text-xs sm:text-sm lg:text-base font-bold text-cyan-400 mt-1">EUREKA</span>
                  <span className="text-[9px] sm:text-[10px] lg:text-xs text-cyan-500/60">:8761</span>
                </motion.div>

                {/* Satellite services */}
                {services.map((svc, i) => {
                  const angle = (i * 360 / services.length) * (Math.PI / 180) - Math.PI / 2;
                  const radius = 40;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  return (
                    <motion.div
                      key={svc.name}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                      className="absolute z-5"
                      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      <div className={`${svc.bg} border ${svc.border} rounded-lg px-2.5 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 flex items-center gap-1.5 sm:gap-2 shadow-lg backdrop-blur-sm`}>
                        <Cpu className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 lg:w-5.5 lg:h-5.5 ${svc.color}`} />
                        <div className="text-left">
                          <div className={`text-[10px] sm:text-xs lg:text-sm font-bold ${svc.color} leading-tight`}>{svc.name}</div>
                          <div className="text-[8px] sm:text-[10px] lg:text-xs text-slate-500">:{svc.port}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* ── STEP 1: Concepts ── */
            <motion.div
              key="concepts"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
                {concepts.map(({ icon: Icon, title, desc, detail, color, bg, border }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                    className={`${bg} border ${border} border-l-4 rounded-xl p-4 sm:p-5 lg:p-6 hover:bg-white/5 transition-colors text-left`}
                    style={{ borderLeftColor: `var(--tw-border-opacity, 1)` }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`${bg} border ${border} rounded-xl p-2.5 sm:p-3 flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm sm:text-base lg:text-xl font-bold text-white mb-1 sm:mb-1.5">{title}</h4>
                        <p className="text-xs sm:text-sm lg:text-base text-slate-400 leading-relaxed mb-2">{desc}</p>
                        <div className={`${bg} border ${border} rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 inline-block`}>
                          <code className="text-[10px] sm:text-xs lg:text-sm text-slate-300 font-mono">{detail}</code>
                        </div>
                      </div>
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