let display = document.getElementById('display');
        let currentInput = '0';
        let shouldResetDisplay = false;

        function updateDisplay() {
            display.textContent = currentInput;
        }

        function clearDisplay() {
            currentInput = '0';
            shouldResetDisplay = false;
            updateDisplay();
        }

        function deleteLast() {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }

        function appendToDisplay(value) {
            if (shouldResetDisplay) {
                currentInput = '0';
                shouldResetDisplay = false;
            }

            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                return; 
            } else if (isOperator(value) && isOperator(currentInput.slice(-1))) {
                currentInput = currentInput.slice(0, -1) + value;
            } else {
                currentInput += value;
            }
            
            updateDisplay();
        }

        function isOperator(char) {
            return ['+', '-', '*', '/'].includes(char);
        }

        function calculate() {
            try {
                let expression = currentInput.replace(/×/g, '*');
                

                let result = eval(expression);
                

                if (!isFinite(result)) {
                    currentInput = 'Error';
                } else {
                    currentInput = parseFloat(result.toFixed(10)).toString();
                }
                
                shouldResetDisplay = true;
            } catch (error) {
                currentInput = 'Error';
                shouldResetDisplay = true;
            }
            
            updateDisplay();
        }

        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (key >= '0' && key <= '9' || key === '.') {
                appendToDisplay(key);
            } else if (key === '+' || key === '-' || key === '/' || key === '*') {
                appendToDisplay(key);
            } else if (key === 'Enter' || key === '=') {
                event.preventDefault();
                calculate();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearDisplay();
            } else if (key === 'Backspace') {
                event.preventDefault();
                deleteLast();
            }
        });