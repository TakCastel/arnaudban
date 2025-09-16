// Script pour forcer les événements tactiles à être passifs
// Cela résout les avertissements de performance pour les événements touchstart/touchmove

export function enablePassiveEvents() {
  if (typeof window === 'undefined') return;

  // Détecter si les événements passifs sont supportés
  let passiveSupported = false;
  
  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    
    const testListener = () => {};
    window.addEventListener('test', testListener, options);
    window.removeEventListener('test', testListener);
  } catch (err) {
    passiveSupported = false;
  }

  // Si les événements passifs sont supportés, les activer
  if (passiveSupported) {
    // Override addEventListener pour les événements tactiles
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    
    EventTarget.prototype.addEventListener = function(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      // Si c'est un événement tactile et que les options ne sont pas spécifiées
      if ((type === 'touchstart' || type === 'touchmove') && 
          (typeof options === 'boolean' || !options || !options.passive)) {
        const passiveOptions = typeof options === 'object' 
          ? { ...options, passive: true }
          : { passive: true };
        
        return originalAddEventListener.call(this, type, listener, passiveOptions);
      }
      
      return originalAddEventListener.call(this, type, listener, options);
    };
  }
}
