import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Slide12() {
  const principles = [
    { icon: '🎯', title: 'Alta Cohesion', desc: 'Cada microservicio tiene una unica responsabilidad de negocio bien definida.' },
    { icon: '🧩', title: 'Bajo Acoplamiento', desc: 'Kafka desacopla eventos. Feign solo para lo estrictamente necesario. BD aislada por dominio.' },
    { icon: '📈', title: 'Escalabilidad', desc: 'Cada MS escala independientemente. Eureka permite multiples instancias sin configuracion manual.' },
    { icon: '🔒', title: 'Seguridad Centralizada', desc: 'ms-auth como unico punto de autenticacion. JWT stateless propagado via Feign.' },
    { icon: '📊', title: 'CQRS', desc: 'Proyecciones locales alimentadas por Kafka eliminan llamadas sincronas en lectura.' },
    { icon: '🛡️', title: 'Resiliencia', desc: 'Excepciones centralizadas, soft delete, validacion en cada capa. Si un servicio cae, los demas continuan.' },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6 relative overflow-hidden">
      {/* Background orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-36 h-36 sm:w-56 sm:h-56 bg-violet-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 sm:mb-6 flex-shrink-0 flex flex-col items-center relative z-10"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-blue-500" />
          <span className="text-blue-400 uppercase tracking-wider text-[10px] sm:text-xs lg:text-sm font-medium">Cierre</span>
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-blue-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">Conclusiones</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-4xl mb-6 sm:mb-8"
      >
        <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed italic">
          &ldquo;El proyecto Restaurant esta compuesto por <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 font-bold not-italic">11 microservicios distribuidos</span>, coordinados mediante Eureka como service discovery. 
          La comunicacion entre servicios se realiza segun el caso con <span className="text-cyan-400 font-semibold not-italic">Feign para llamadas sincronas</span> y <span className="text-emerald-400 font-semibold not-italic">Kafka para procesos asincronos</span>, 
          aplicando el patron <span className="text-violet-400 font-semibold not-italic">CQRS</span> para proyecciones locales.&rdquo;
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 max-w-4xl relative z-10">
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-4 hover:bg-white/10 transition-colors text-center"
          >
            <div className="text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2">{p.icon}</div>
            <h4 className="text-xs sm:text-sm lg:text-base font-bold text-white mb-0.5 sm:mb-1">{p.title}</h4>
            <p className="text-[9px] sm:text-[10px] lg:text-xs text-slate-400 leading-snug">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-6 sm:mt-8 relative z-10"
      >
        <p className="text-slate-500 text-xs sm:text-sm">
          Presiona <span className="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded text-slate-400 text-[10px] sm:text-xs font-mono">Esc</span> para navegar entre diapositivas
        </p>
      </motion.div>
    </div>
  );
}