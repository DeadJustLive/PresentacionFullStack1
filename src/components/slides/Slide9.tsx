import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Code2 } from 'lucide-react';

export default function Slide9() {
  const errorExamples = [
    { status: '401', name: 'CredencialesInvalidasException', from: 'ms-auth', desc: 'Username o password incorrectos' },
    { status: '403', name: 'AccesoDenegadoException', from: 'Todos los MS', desc: 'Sin permisos para la operacion' },
    { status: '404', name: 'PedidoNotFoundException', from: 'ms-pedidos', desc: 'Pedido no encontrado con ID dado' },
    { status: '409', name: 'ItemDuplicadoException', from: 'ms-menu', desc: 'Item ya existe en la categoria' },
    { status: '409', name: 'StockInsuficienteException', from: 'ms-inventario', desc: 'Stock actual menor a la cantidad solicitada' },
  ];

  const responseFormat = `{
  "timestamp": "2026-05-20T10:30:00",
  "status": 404,
  "error": "Not Found",
  "mensaje": "Pedido no encontrado con ID: 5"
}`;

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3 sm:mb-4 flex-shrink-0 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-rose-500" />
          <span className="text-rose-400 uppercase tracking-wider text-[10px] sm:text-xs lg:text-sm font-medium">Excepciones</span>
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-rose-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">Manejo Centralizado de Errores</h2>
        <p className="text-xs sm:text-sm lg:text-base text-slate-400 max-w-3xl">
          @RestControllerAdvice en todos los MS. Respuestas JSON consistentes con timestamp, status, error y mensaje.
        </p>
      </motion.div>

      <div className="flex-1 min-h-0 flex items-center justify-center w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
          {/* Error types */}
          <div>
            <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-rose-400 mb-2 sm:mb-3 flex items-center gap-2 text-left">
              <AlertTriangle className="w-4 h-4" />
              Excepciones Custom por Microservicio
            </h3>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              {errorExamples.map((err, i) => (
                <motion.div
                  key={err.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="bg-white/5 border border-white/10 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-start gap-2 sm:gap-3 text-left hover:bg-white/10 transition-colors"
                >
                  <span className={`text-[10px] sm:text-xs font-bold font-mono px-1.5 sm:px-2 py-0.5 rounded ${
                    err.status === '401' ? 'bg-yellow-500/20 text-yellow-400' :
                    err.status === '403' ? 'bg-orange-500/20 text-orange-400' :
                    err.status === '404' ? 'bg-rose-500/20 text-rose-400' :
                    err.status === '409' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{err.status}</span>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-xs font-mono font-bold text-slate-200 leading-tight">{err.name}</div>
                    <p className="text-[9px] sm:text-[10px] text-slate-400">{err.desc} — <span className="text-slate-500">{err.from}</span></p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Response format and flow */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-emerald-400 mb-2 flex items-center gap-2 text-left">
                <CheckCircle className="w-4 h-4" />
                Formato de Respuesta Uniforme
              </h3>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-white/10"
              >
                <div className="bg-[#2d2d2d] px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-mono ml-2">ErrorResponse.json</span>
                </div>
                <div className="p-2.5 sm:p-3 overflow-x-auto code-scroll">
                  <pre className="text-[10px] sm:text-xs text-slate-300 font-mono leading-relaxed whitespace-pre">{responseFormat}</pre>
                </div>
              </motion.div>
            </div>

            {/* Flow */}
            <div>
              <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-blue-400 mb-2 flex items-center gap-2 text-left">
                <Code2 className="w-4 h-4" />
                Flujo de Excepciones
              </h3>
              <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 sm:p-3 text-left">
                <div className="flex flex-col gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-[9px]">1</span>
                    <span className="text-slate-300">El <strong className="text-white">Service</strong> lanza una excepcion custom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[9px]">2</span>
                    <span className="text-slate-300">Spring propaga al Controller</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[9px]">3</span>
                    <span className="text-slate-300"><strong className="text-emerald-400">GlobalExceptionHandler</strong> intercepta por tipo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[9px]">4</span>
                    <span className="text-slate-300">Devuelve <code className="text-blue-300">ResponseEntity</code> con JSON consistente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}