/* ============================================================
   API SERVICE - CONECTOR GOOGLE SHEETS V28
   ============================================================ */

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzN1qalCPnn36WYruW-KLLjla5-S83fhyxB9v5IvuLdXk7GDnRX_0lpBop9qHLtH_QcyQ/exec";

// --- 1. INICIAR SESIÓN ---
export const loginUser = async (dni, password) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'login', dni, password }),
    });
    return await response.json();
  } catch (error) {
    return { status: 'error', message: 'Error de comunicación con el servidor' };
  }
};

export const getAuditLogs = async () => {
  try {
    const response = await fetch(`${SCRIPT_URL}?type=audit`);
    return await response.json();
  } catch (error) {
    console.error("Error logs:", error);
    return [];
  }
};

// --- 2. OBTENER TODOS LOS BONOS (Público y Privado) ---
export const getBonds = async () => {
  try {
    const response = await fetch(SCRIPT_URL);
    const data = await response.json();
    return data; // Ahora devuelve { sales: [...], delegates: [...] }
  } catch (error) {
    return { sales: [], delegates: [] };
  }
};

// --- 3. REGISTRAR UNA NUEVA VENTA (Delegados) ---
export const registerSale = async (saleData) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'cors', 
      body: JSON.stringify({ 
        action: 'register_sale', 
        ...saleData 
      }),
    });
    return await response.json();
  } catch (error) {
    return { status: 'error', message: 'No se pudo conectar con la base de datos' };
  }
};

// --- 4. VALIDAR PAGO DE UN BONO (Dueño) ---
export const validateSale = async (n_bono) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'validate_sale', n_bono }),
    });
    return await response.json();
  } catch (error) {
    return { status: 'error', message: 'Error al intentar validar el bono' };
  }
};

// --- 5. ANULAR VENTA / LIBERAR BONO (Dueño) ---
export const cancelSale = async (n_bono) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'cancel_sale', n_bono }),
    });
    return await response.json();
  } catch (error) {
    return { status: 'error', message: 'Error al intentar anular el bono' };
  }
};
// Añadir esta función a tu api.js actual
export const updateSale = async (n_bono, newData) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'update_sale', n_bono, ...newData }),
    });
    return await response.json();
  } catch (error) {
    return { status: 'error', message: 'Fallo de escritura en DB Cloud' };
  }
};

export const saveDelegate = async (delegateData) => {
  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'save_delegate', ...delegateData }),
  });
  return await response.json();
};

export const deleteDelegate = async (dni) => {
  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'delete_delegate', dni }),
  });
  return await response.json();
};