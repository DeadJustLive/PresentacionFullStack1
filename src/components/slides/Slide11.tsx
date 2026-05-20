import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import CodePanel from '../CodePanel';

export default function Slide11() {
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

      <div className="flex-1 min-h-0 flex items-center justify-center w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
          {/* Auth endpoint */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col gap-2 sm:gap-3"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white">POST /api/v1/auth/login</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md">
                200 OK
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400">Autenticacion exitosa — JWT generado</span>
            </div>
            <CodePanel code={authResponse} language="json" title="auth-login-response.json" maxHeight="220px" />
          </motion.div>

          {/* Pedido endpoint */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col gap-2 sm:gap-3"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white">POST /api/v1/pedidos</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-md">
                201 Created
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400">Pedido creado con items y total</span>
            </div>
            <CodePanel code={pedidoResponse} language="json" title="pedidos-response.json" maxHeight="220px" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}