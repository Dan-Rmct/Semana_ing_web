document.addEventListener('DOMContentLoaded', () => {
  let carrito = [];

  const listaCarrito = document.getElementById('lista-carrito');
  const totalPrecio = document.getElementById('total-precio');
  const modalTotal = document.getElementById('modal-total');
  const cartCount = document.getElementById('cart-count');
  const btnVaciar = document.getElementById('vaciar-carrito');
  const btnPagar = document.getElementById('btn-pagar');
  const btnAceptarPago = document.getElementById('btn-aceptar-pago');

  // Delegación de eventos para agregar conferencias
  document.getElementById('lista-conferencias').addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar-carrito')) {
      const card = e.target.closest('.card');
      const conferencia = {
        id: e.target.getAttribute('data-id'),
        titulo: card.querySelector('.conferencia-titulo').textContent,
        lugar: card.querySelector('.text-muted').textContent.replace('📍 Lugar: ', ''),
        precio: parseFloat(card.querySelector('.conferencia-precio').textContent)
      };
      
      carrito.push(conferencia);
      actualizarCarrito();
    }
  });

  // Renderizar el carrito en la interfaz
  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
      listaCarrito.innerHTML = '<li class="list-group-item text-center text-muted">El carrito está vacío</li>';
      btnPagar.disabled = true;
    } else {
      btnPagar.disabled = false;
      carrito.forEach((item, index) => {
        total += item.precio;
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center fs-6 p-2';
        li.innerHTML = `
          <div>
            <strong>${item.titulo}</strong><br>
            <small class="text-muted">${item.lugar}</small><br>
            <span class="badge bg-primary text-wrap">$${item.precio.toFixed(2)}</span>
          </div>
          <button class="btn btn-danger btn-sm" onclick="eliminarItem(${index})">&times;</button>
        `;
        listaCarrito.appendChild(li);
      });
    }

    totalPrecio.textContent = `$${total.toFixed(2)}`;
    modalTotal.textContent = total.toFixed(2);
    cartCount.textContent = carrito.length;
  }

  // Eliminar elemento individual
  window.eliminarItem = (index) => {
    carrito.splice(index, 1);
    actualizarCarrito();
  };

  // Vaciar carrito
  btnVaciar.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
  });

  // Procesar pago
  btnAceptarPago.addEventListener('click', () => {
    if (carrito.length === 0) return;

    // Ventana emergente requerida
    alert("¡Gracias por tu compra!");

    // Vaciar el carrito
    carrito = [];
    actualizarCarrito();

    // Cerrar ventana emergente/modal de Bootstrap
    const modalElement = document.getElementById('modalPago');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  });

  // Inicializar estado del carrito
  actualizarCarrito();
});