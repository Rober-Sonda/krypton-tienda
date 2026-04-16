const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

exports.calculateShipping = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Aceptar preflight CORS rapido
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    try {
      // Leer CP tanto de URL query como de Body por flexibilidad
      const destinationCp = req.query.cp || req.body.cp;
      
      if (!destinationCp) {
        return res.status(400).json({ error: "Falta Código Postal de destino." });
      }

      const cleanCp = destinationCp.toString().trim();
      
      // ====================================================================
      // LUGAR SEGURA PARA INTEGRACIÓN DE API ANDREANI (SECRETA) EN EL FUTURO:
      // const andreaniToken = process.env.ANDREANI_TOKEN;
      // const res = await fetch(`https://api.andreani.com/v1/tarifas...`, { headers: ... });
      // return res.json();
      // ====================================================================
      
      // LOGICA TEMPORAL SEGURA AL SERVIDOR (A prueba de manipulacion en Frontend)
      const firstDigit = cleanCp.charAt(0);
      let sucursalCost = 8500;
      let domicilioCost = 12000;
      
      if (cleanCp === '6500') {
         return res.json([
           { id: 'local', label: 'Retiro en Sucursal (9 de Julio)', cost: 0 },
           { id: 'moto', label: 'Cadete Motorizado Local', cost: 2000 }
         ]);
      }

      if (['4', '5', '8', '9'].includes(firstDigit)) {
        // Zonas Patagonicas o Norte
        sucursalCost = 13500;
        domicilioCost = 19500;
      } else {
        // Zonas Centro o Bs As
        sucursalCost = 9200;
        domicilioCost = 14500;
      }

      return res.json([
        { id: 'andreani_suc', label: 'Envío a Sucursal Andreani', cost: sucursalCost },
        { id: 'andreani_dom', label: 'Envío Domicilio Estándar', cost: domicilioCost }
      ]);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al cotizar la logistica." });
    }
  });
});
