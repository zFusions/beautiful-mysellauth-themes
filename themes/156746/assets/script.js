document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
    appCurrency: {
      ratesUsd: window.currencyRatesUsd || {},
      currency: window.defaultCurrency || 'usd',

      convert(price, fromCurrency, toCurrency = this.currency) {
        const fromRate = this.ratesUsd[fromCurrency.toLowerCase()];
        const toRate = this.ratesUsd[toCurrency.toLowerCase()];

        if (!fromRate || !toRate) {
          console.error('Invalid currency conversion', { fromCurrency, toCurrency, rates: this.ratesUsd });
          return price;
        }

        return (price / fromRate) * toRate;
      },
      
      format(price, fromCurrency, locale = 'en-US') {
        const toCurrency = this.currency || fromCurrency;
        const convertedPrice = this.convert(price, fromCurrency, toCurrency);

        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: toCurrency,
          currencyDisplay: 'symbol',
        }).format(convertedPrice);
      },
      
      init() {
        const storedCurrency = localStorage.getItem('currency')?.toLowerCase();

        if (storedCurrency && this.ratesUsd[storedCurrency]) {
          this.currency = storedCurrency;
        } else if (storedCurrency) {
          console.error('Invalid currency in local storage', storedCurrency, this.ratesUsd);
        }

        window.addEventListener('load', () => {
          if (document.querySelector('.currency-selector select')) {
            document.querySelectorAll('.currency-selector select').forEach((element) => {
              const choices = new Choices(element, { 
                searchPlaceholderValue: 'Currency', 
                shouldSort: false, 
                allowHTML: true 
              });
              
              choices.passedElement.element.addEventListener('change', (event) => {
                this.currency = event.detail.value;
                localStorage.setItem('currency', this.currency);
              });

              choices.setChoiceByValue(this.currency);

              // Workaround to fix default value highlight issue
              const selectedChoiceElement = choices.choiceList.element.querySelector('.is-selected');
              if (selectedChoiceElement) {
                choices._highlightChoice(selectedChoiceElement);
              }
            });
          }
        });
      },
    },

    appCart: {
      items: [],
      
      updateLocalStorage: function () {
        localStorage.setItem('cart', JSON.stringify(this.items));
      },
      
      set: function (items) {
        this.items = items;
        this.updateLocalStorage();
      },
      
      add: function (productId, variantId, quantity) {
        const item = this.items.find((item) => item.variantId === variantId);

        if (item) {
          item.quantity += quantity;
        } else {
          this.items.push({ productId, variantId, quantity });
        }

        this.updateLocalStorage();
      },
      
      remove: function (variantId) {
        this.items = this.items.filter((item) => item.variantId !== variantId);
        this.updateLocalStorage();
      },
      
      editQuantity: function (variantId, quantity) {
        const item = this.items.find((item) => item.variantId === variantId);
        item.quantity = quantity;
        this.updateLocalStorage();
      },
      
      get countWithQuantities() {
        return this.items.reduce((acc, item) => acc + item.quantity, 0);
      },
      
      init: function () {
        if (localStorage.getItem('cart')) {
          try {
            this.items = JSON.parse(localStorage.getItem('cart'));
            if (!Array.isArray(this.items)) {
              this.items = [];
            }
          } catch (error) {
            console.error('Error parsing cart from local storage', error);
            this.items = [];
          }
        }
      }
    },

    appCustomer: {
      modalIsOpen: false,
      modalStep: 1,
      modalEmail: '',
      modalOtpDigits: Array(6).fill(''),
      modalEmailError: '',
      modalOtpError: '',
      modalLoading: false,
      altchaPayload: null,

      addAltchaEventListener: function () {
        window.alpineApp.$refs['appCustomer.altcha'].addEventListener('statechange', (event) => {
          if (event.detail.state === 'verifying') {
            this.buyNowDisabled = true;
          } else if (event.detail.state === 'verified') {
            this.buyNowDisabled = false;
            this.altchaPayload = event.detail.payload;
          }
        });
      },
      
      modalOpen() {
        this.modalIsOpen = true;
        this.modalStep = 1;
        document.body.style.overflow = 'hidden';

        window.alpineApp.$nextTick(() => {
          window.alpineApp.$refs['appCustomer.modalEmailInput'].focus();
        });
      },
  
      modalClose() {
        this.modalIsOpen = false;
        
        setTimeout(() => {
          this.modalEmail = '';
          this.otp = '';
          this.modalStep = 1;
          this.modalEmailError = '';
          this.modalOtpError = '';
        }, 300); // Transition

        document.body.style.overflow = 'auto';
      },

      async modalRequestOtp() {
        this.modalEmailError = '';
        this.modalOtpError = '';
        this.modalLoading = true;
  
        try {
          const response = await fetch(`${window.apiBaseUrl}v1/customer-dashboard/request-otp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.modalEmail,
              shop_id: window.shopId,
              altcha: this.altchaPayload
            })
          });
  
          const data = await response.json();
  
          if (data.success) {
            this.modalStep = 2;
            setTimeout(() => {
              window.alpineApp.$refs['appCustomer.modalOtpInputs[0]'].focus();
            }, 10);
          } else {
            this.modalEmailError = data?.message || 'Failed to send OTP. Please try again.';
          }
        } catch (error) {
          this.modalEmailError = 'Network error. Please try again.';
        } finally {
          this.modalLoading = false;
        }
      },

      modalOtpHandleInput(index) {
        const input = this.modalOtpDigits[index];
        
        if (input === '' || /^\d$/.test(input)) {
          if (input && index < this.modalOtpDigits.length - 1) {
            window.alpineApp.$refs[`appCustomer.modalOtpInputs[${index + 1}]`].focus();
          }
        } else {
          this.modalOtpDigits[index] = '';
        }
      },
  
      modalOtpHandleKeyDown(index, event) {
        if (event.key === 'Backspace' && !this.modalOtpDigits[index] && index > 0) {
          window.alpineApp.$refs[`appCustomer.modalOtpInputs[${index - 1}]`].focus();
        }
      },
  
      modalOtpHandlePaste(event) {
        event.preventDefault();
        const pastedData = event.clipboardData.getData('text');

        if (/^\d+$/.test(pastedData)) {
          const newOtp = pastedData.split('').slice(0, this.modalOtpDigits.length);
          
          newOtp.forEach((digit, index) => {
            this.modalOtpDigits[index] = digit;
          });
  
          for (let i = newOtp.length; i < this.modalOtpDigits.length; i++) {
            this.modalOtpDigits[i] = '';
          }
  
          window.alpineApp.$refs[`appCustomer.modalOtpInputs[${this.modalOtpDigits.length - 1}]`].focus();
        }
      },
  
      async modalLogin() {
        const otp = this.modalOtpDigits.join('');

        if (otp.length !== 6) {
          this.modalOtpError = 'Invalid OTP.';
          return;
        }
  
        this.modalEmailError = '';
        this.modalOtpError = '';
        this.modalLoading = true;
  
        try {
          const response = await fetch(`${window.apiBaseUrl}v1/customer-dashboard/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.modalEmail,
              otp: otp,
              shop_id: window.shopId
            })
          });
  
          const data = await response.json();
  
          if (data.token) {
            Cookies.set('shop_customer_token', data.token, { expires: 30, path: '/' });
            window.location.href = '/customer/dashboard';
          } else {
            this.modalOtpError = data?.message || 'Invalid credentials.';
          }
        } catch (error) {
          console.error(error);
          this.modalOtpError = data?.message || 'Invalid credentials.';
        } finally {
          this.modalLoading = false;
        }
      },

      loginOrRedirect() {
        if (window.shopCustomer) {
          window.location.href = '/customer/dashboard';
        } else {
          this.modalOpen();
        }
      },

      async logout() {
        const token = Cookies.get('shop_customer_token');

        if (!token) {
          return;
        }

        try {
          fetch(`${window.apiBaseUrl}v1/customer-dashboard/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${window.customerToken}`
            }
          });
        } catch (error) {
          console.error('Logout error', error);
        }

        Cookies.remove('shop_customer_token');
        window.location.href = '/';
      },

      init() {
        if (window.alpineApp.$refs['appCustomer.altcha']) {
          this.addAltchaEventListener();
        }
        
        if (window.alpineApp.$refs['appCustomer.modalOtpInputs[0]']) {
          window.alpineApp.$refs['appCustomer.modalOtpInputs[0]'].addEventListener('paste', (event) => this.modalOtpHandlePaste(event));
        }
      }
    },

    init: function () {
      window.alpineApp = this;

      this.appCurrency.init();
      this.appCart.init();
      this.appCustomer.init();
    }
  }));
});

function snow(config = {}) {
  const settings = {
    count: config.count || 200,
    minSize: config.minSize || 0.5,
    maxSize: config.maxSize || 1.0,
    minSpeed: config.minSpeed || 10,
    maxSpeed: config.maxSpeed || 30,
  };

  const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

  let html = '', css = '';

  for (let i = 1; i < settings.count; i++) {
    html += '<i class="snowflake"></i>';
    
    const sizeMultiplier = settings.minSize + (Math.random() * (settings.maxSize - settings.minSize));
    const rndX = (rand(0, 1000000) * 0.0001);
    const rndO = rand(-100000, 100000) * 0.0001;
    const rndT = (rand(3, 8) * 10).toFixed(2);
    const rndS = (sizeMultiplier * rand(0, 10000) * 0.0001).toFixed(2);
    const animationDuration = rand(settings.minSpeed, settings.maxSpeed);
    
    css += '.snowflake:nth-child(' + i + ') {' +
      'opacity: ' + (rand(1, 10000) * 0.0001).toFixed(2) + ';' +
      'transform: translate(' + rndX.toFixed(2) + 'vw, -10px) scale(' + rndS + ');' +
      'animation: fall-' + i + ' ' + animationDuration + 's -' + rand(0, 30) + 's linear infinite' +
    '}' +
    '@keyframes fall-' + i + ' {' +
      rndT + '% {' +
        'transform: translate(' + (rndX + rndO).toFixed(2) + 'vw, ' + rndT + 'vh) scale(' + rndS + ')' +
      '}' +
      'to {' +
        'transform: translate(' + (rndX + (rndO / 2)).toFixed(2) + 'vw, 105vh) scale(' + rndS + ')' +
      '}' +
    '}';
  }

  document.getElementById('snow').innerHTML = html;

  const style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}