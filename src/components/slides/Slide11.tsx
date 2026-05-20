import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import CodePanel from '../CodePanel';

export default function Slide11() {
  const [step, setStep] = useState(0);
  const stepLabels = ['Endpoint Auth', 'Endpoint Pedidos'];

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

  const authResponse = `{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 42,
    "email": "admin@restaurant.cl",
    "rol": "ADMIN"
  },
  "expiresIn": 3600
}`;

  const pedidoResponse = `{
  "id": 1,
  "sucursalId": 3,
  "total": 15400.00,
  "estado": "COMPLETADO",
  "fechaCreacion": "2026-05-19T10:30:00Z",
  "items": [
    {
      "productoId": 12,
      "cantidad": 2,
      "subtotal": 15400.00
    }
  ]
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
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-emerald-500" />
          <span className="text-emerald-400 uppercase tracking-wider text-[10px] sm:text-xs lg:text-sm font-medium">Evidencia</span>
          <div className="h-1 w-6 sm:w-8 lg:w-12 bg-emerald-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">Pruebas de Integracion</h2>
        <p className="text-xs sm:text-sm lg:text-base text-slate-400 max-w-3xl">
          Endpoints validados con Postman: respuestas HTTP correctas y datos coherentes.
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
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20'
            }`}
          >
            <div className={`w-2 h-2 rounded-full transition-colors ${
              step === i ? 'bg-emerald-400' : 'bg-slate-600'
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
              className="w-full flex flex-col gap-3 sm:gap-4"
            >
              <div className="flex items-center gap-3 justify-center text-left">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-white">POST /api/v1/auth/login</h3>
              </div>
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm lg:text-base font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md">
                  200 OK
                </span>
                <span className="text-xs sm:text-sm lg:text-base text-slate-400">Autenticacion exitosa — JWT generado</span>
              </div>
              <CodePanel code={authResponse} language="json" title="auth-login-response.json" maxHeight="350px" />
            </motion.div>
          ) : (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col gap-3 sm:gap-4"
            >
              <div className="flex items-center justify-center gap-3 text-left">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-white">POST /api/v1/pedidos</h3>
              </div>
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm lg:text-base font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-md">
                  201 Created
                </span>
                <span className="text-xs sm:text-sm lg:text-base text-slate-400">Pedido creado con items y total calculado</span>
              </div>
              <CodePanel code={pedidoResponse} language="json" title="pedidos-response.json" maxHeight="350px" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}