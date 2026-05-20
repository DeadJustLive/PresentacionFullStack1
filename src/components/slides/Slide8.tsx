import { motion } from 'framer-motion';
import { Shield, Lock, Key, Eye } from 'lucide-react';

export default function Slide8() {
  const features = [
    { icon: Lock, title: 'JWT Stateless', desc: 'HS256 con access token (24h) + refresh token (7d). Sin sesiones en servidor.', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    { icon: Key, title: 'Spring Security', desc: 'JwtAuthFilter en ms-auth. Valida permisos via endpoint dedicado /validar-acceso consumido por todos los MS.', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { icon: Shield, title: 'BCrypt Hashing', desc: 'Passwords hasheados con BCrypt en user_credentials. Nunca expuestos en respuestas DTO.', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { icon: Eye, title: 'Validacion Centralizada', desc: 'AuthFeignClient en todos los MS (excepto Eureka). Cada operacion valida permisos antes de ejecutar.', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-violet-950/10 to-slate-950 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 sm:mb-6 flex-shrink-0 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-violet-500" />
          <span className="text-violet-400 uppercase tracking-wider text-[10px] sm:text-xs lg:text-sm font-medium">Seguridad</span>
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-violet-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
          Seguridad <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">JWT</span>
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-slate-400 max-w-3xl">
          Autenticacion y autorizacion centralizada en ms-auth con propagacion via Feign.
        </p>
      </motion.div>

      <div className="flex-1 min-h-0 flex items-center justify-center w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 w-full">
          {features.map(({ icon: Icon, title, desc, color, bg, border }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              className={`slide-card ${bg} border ${border} hover:bg-white/5 transition-colors flex items-start gap-3 sm:gap-4 text-left`}
            >
              <div className={`${bg} border ${border} rounded-xl p-2.5 sm:p-3 flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${color}`} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base lg:text-xl font-bold text-white mb-0.5 sm:mb-1">{title}</h3>
                <p className="text-[10px] sm:text-xs lg:text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Auth flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-4 sm:mt-6 w-full max-w-4xl"
      >
        <div className="bg-gradient-to-r from-violet-950/30 via-slate-900/30 to-blue-950/30 border border-violet-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap text-[10px] sm:text-xs lg:text-sm">
            <span className="text-slate-400">1. Login</span>
            <span className="text-violet-400">→</span>
            <span className="text-violet-300">ms-auth genera JWT</span>
            <span className="text-violet-400">→</span>
            <span className="text-slate-400">2. Request con token</span>
            <span className="text-blue-400">→</span>
            <span className="text-blue-300">Feign: validar-acceso</span>
            <span className="text-blue-400">→</span>
            <span className="text-emerald-400">3. Permitido/Denegado</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}