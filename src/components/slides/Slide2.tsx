import { motion } from 'framer-motion';
import { Server, ArrowRightLeft, Database, Cpu } from 'lucide-react';

export default function Slide2() {
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
    { icon: Server, title: 'Service Discovery', desc: 'Eureka como registro central. Cada MS se auto-registra al arrancar. Sin URLs hardcodeadas.', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', accent: 'border-l-cyan-500' },
    { icon: ArrowRightLeft, title: 'Comunicacion Hibrida', desc: 'Feign para llamadas sincronas (validar permisos, consultar precios). Kafka para eventos asincronos (pedidos, notificaciones).', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', accent: 'border-l-blue-500' },
    { icon: Database, title: 'Database per Service', desc: 'Cada MS tiene su propia BD PostgreSQL. FK logicas (Long) entre servicios, nunca relaciones JPA cross-service.', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', accent: 'border-l-emerald-500' },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950/10 to-slate-950 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3 sm:mb-4 lg:mb-6 flex-shrink-0 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-blue-500" />
          <span className="text-blue-400 uppercase tracking-wider text-[10px] sm:text-xs lg:text-sm font-medium">Arquitectura</span>
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-blue-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">Arquitectura General</h2>
        <p className="text-xs sm:text-sm lg:text-base text-slate-400 max-w-3xl">
          Sistema distribuido con 11 microservicios coordinados mediante Eureka para service discovery.
        </p>
      </motion.div>

      <div className="flex-1 min-h-0 flex items-center justify-center w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 w-full h-full">
          {/* Topology diagram */}
          <div className="lg:col-span-3 relative flex items-center justify-center">
            <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
              {/* Central Eureka node */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-cyan-500/10 border-2 border-cyan-500/50 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.15)]"
              >
                <Server className="w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-cyan-400" />
                <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-cyan-400 mt-1">EUREKA</span>
                <span className="text-[8px] sm:text-[10px] text-cyan-500/60">:8761</span>
              </motion.div>

              {/* Satellite services */}
              {services.map((svc, i) => {
                const angle = (i * 360 / services.length) * (Math.PI / 180) - Math.PI / 2;
                const radius = 42;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                return (
                  <motion.div
                    key={svc.name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    className="absolute z-5"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className={`${svc.bg} border ${svc.border} rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 flex items-center gap-1 sm:gap-1.5 shadow-lg`}>
                      <Cpu className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${svc.color}`} />
                      <div className="text-left">
                        <div className={`text-[9px] sm:text-xs lg:text-sm font-bold ${svc.color} leading-tight`}>{svc.name}</div>
                        <div className="text-[7px] sm:text-[9px] lg:text-[10px] text-slate-500">:{svc.port}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Explanation cards */}
          <div className="lg:col-span-2 flex flex-col gap-3 sm:gap-4 justify-center">
            {concepts.map(({ icon: Icon, title, desc, color, bg, border, accent }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                className={`slide-card ${bg} border ${border} border-l-4 ${accent} hover:bg-white/5 transition-colors`}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color} flex-shrink-0 mt-0.5`} />
                  <div className="text-left">
                    <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-0.5 sm:mb-1">{title}</h4>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-slate-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}