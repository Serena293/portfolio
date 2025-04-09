document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    
    if (!form) {
      console.error('Form not found!');
      return;
    }
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      // Mostra stato di caricamento
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 
            'Accept': 'application/json'
          }
        });
  
        if (response.ok) {
          // Successo - mostra messaggio
          const successDiv = document.createElement('div');
          successDiv.className = 'success-message';
          successDiv.innerHTML = `
            <h3><i class="fas fa-check-circle"></i> Message Sent!</h3>
            <p>I'll respond as soon as possible.</p>
          `;
          form.parentNode.insertBefore(successDiv, form.nextSibling);
          form.style.display = 'none';
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        alert('Error: Please try again or contact me directly.');
        console.error('Form error:', error);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  });